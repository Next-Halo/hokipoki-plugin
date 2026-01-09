import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface HokiPokiCommandOptions {
  tool?: 'claude' | 'codex' | 'gemini';
  files?: string[];
  dir?: string[];
  all?: boolean;
  workspace?: string;
}

interface HokiPokiResult {
  success: boolean;
  patch?: string;
  output?: string;
  error?: string;
  taskId?: string;
  tool?: string;
  credits?: number;
}

/**
 * Detect AI tool from natural language task description
 */
function detectToolFromTask(task: string): 'claude' | 'codex' | 'gemini' | null {
  const lowerTask = task.toLowerCase();

  // Check for explicit tool mentions
  if (lowerTask.includes('use codex') || lowerTask.includes('with codex')) {
    return 'codex';
  }
  if (lowerTask.includes('use gemini') || lowerTask.includes('with gemini')) {
    return 'gemini';
  }
  if (lowerTask.includes('use claude') || lowerTask.includes('with claude')) {
    return 'claude';
  }

  // Default: let HokiPoki CLI handle tool selection
  return null;
}

/**
 * Execute hokipoki request command
 */
async function execHokipoki(options: {
  tool?: string | null;
  task: string;
  files?: string[];
  dir?: string[];
  all?: boolean;
  workspace?: string;
  json?: boolean;
  noInteractive?: boolean;
}): Promise<string> {
  const args: string[] = ['hokipoki', 'request'];

  // Add tool if specified
  if (options.tool) {
    args.push('--tool', options.tool);
  }

  // Add task description
  args.push('--task', `"${options.task.replace(/"/g, '\\"')}"`);

  // Add files
  if (options.files && options.files.length > 0) {
    args.push('--files', ...options.files);
  }

  // Add directories
  if (options.dir && options.dir.length > 0) {
    args.push('--dir', ...options.dir);
  }

  // Add all flag
  if (options.all) {
    args.push('--all');
  }

  // Add workspace
  if (options.workspace) {
    args.push('--workspace', options.workspace);
  }

  // Always use JSON mode for programmatic access
  if (options.json) {
    args.push('--json');
  }

  // Disable interactive mode for plugin
  if (options.noInteractive) {
    args.push('--no-interactive');
  }

  const command = args.join(' ');

  try {
    const { stdout, stderr } = await execAsync(command);

    if (stderr && stderr.trim()) {
      console.error('[HokiPoki Plugin] stderr:', stderr);
    }

    return stdout;
  } catch (error: any) {
    throw new Error(`Failed to execute hokipoki: ${error.message}`);
  }
}

/**
 * Main command executor
 */
export default {
  name: 'hokipoki',
  description: 'Request help from remote AI via HokiPoki P2P marketplace',

  async execute(args: string[], options: HokiPokiCommandOptions) {
    try {
      // 1. Parse task description from args
      const task = args.join(' ');

      if (!task || task.trim().length === 0) {
        return `❌ Error: Please provide a task description.

Usage: /hokipoki [options] <task description>

Examples:
  /hokipoki Fix the bug in authentication.ts
  /hokipoki --tool codex Optimize this algorithm
  /hokipoki --files src/main.ts Refactor this file

Options:
  --tool <claude|codex|gemini>  Specify AI tool to use
  --files <files...>            Include specific files
  --dir <directories...>        Include directories
  --all                         Include entire repository
  --workspace <name>            Route to specific workspace`;
      }

      // 2. Detect tool from natural language if not specified
      const detectedTool = detectToolFromTask(task);
      const tool = options.tool || detectedTool;

      // 3. Execute hokipoki request via child_process
      console.log(`🚀 Sending task to HokiPoki network${tool ? ` (${tool})` : ''}...`);

      const result = await execHokipoki({
        tool,
        task,
        files: options.files,
        dir: options.dir,
        all: options.all,
        workspace: options.workspace,
        json: true,  // Always use JSON mode for parsing
        noInteractive: true  // Never use interactive mode in plugin
      });

      // 4. Parse JSON result
      let parsed: HokiPokiResult;
      try {
        parsed = JSON.parse(result);
      } catch (parseError) {
        // If JSON parsing fails, return raw output
        return `⚠️  Received non-JSON response from HokiPoki:\n\n${result}`;
      }

      // 5. Check for errors
      if (!parsed.success || parsed.error) {
        return `❌ HokiPoki Error: ${parsed.error || 'Unknown error'}`;
      }

      // 6. Success! Return results
      const toolUsed = parsed.tool || tool || 'unknown AI';
      let response = `✅ Task completed by ${toolUsed}`;

      if (parsed.taskId) {
        response += ` (Task ID: ${parsed.taskId})`;
      }

      if (parsed.output) {
        response += `\n\n${parsed.output}`;
      }

      if (parsed.patch) {
        response += `\n\n📝 Changes have been applied to your repository.`;
        response += `\n   Run 'git status' to see the changes.`;
      }

      if (parsed.credits !== undefined) {
        response += `\n\n💰 Credits used: ${parsed.credits}`;
      }

      return response;

    } catch (error: any) {
      // Handle execution errors
      if (error.message.includes('hokipoki: command not found')) {
        return `❌ HokiPoki CLI not found.

Please install HokiPoki CLI first:
  npm install -g @next-halo/hokipoki-cli

Then authenticate:
  hokipoki login

Visit https://hoki-poki.ai for more information.`;
      }

      if (error.message.includes('Not authenticated') || error.message.includes('401')) {
        return `❌ Not authenticated with HokiPoki.

Please run:
  hokipoki login

Visit https://hoki-poki.ai to create an account if you don't have one.`;
      }

      return `❌ Error executing HokiPoki: ${error.message}

If this persists, try:
  1. Check 'hokipoki status' to verify your account
  2. Run 'hokipoki login' to re-authenticate
  3. Visit https://hoki-poki.ai/docs for troubleshooting`;
    }
  },

  // Autocomplete suggestions
  autocomplete: {
    '--tool': ['claude', 'codex', 'gemini'],
    '--workspace': async () => {
      try {
        // Try to fetch user workspaces from hokipoki CLI
        const { stdout } = await execAsync('hokipoki status --json');
        const status = JSON.parse(stdout);

        if (status.workspaces && Array.isArray(status.workspaces)) {
          return status.workspaces.map((w: any) => w.name || w.id);
        }
      } catch (error) {
        // If fetching workspaces fails, return empty array
        console.error('[HokiPoki Plugin] Failed to fetch workspaces for autocomplete:', error);
      }

      return [];
    }
  }
};
