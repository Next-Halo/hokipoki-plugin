# HokiPoki Claude Code Plugin

> **Switch AI models seamlessly.** When Claude gets stuck, hop to Codex, Gemini, or another Claude instance via P2P marketplace.

Share AI subscriptions with your team. Switch between models when one gets stuck on a problem.

## What is HokiPoki?

HokiPoki is a **P2P AI marketplace** that connects requesters (who need AI help) with providers (who have AI subscriptions). Use HokiPoki to switch between different AI models.

**Three Use Cases:**
1. **AI-to-AI**: Claude Code gets stuck → calls Gemini/Codex via HokiPoki
2. **Human Terminal**: Direct access to any AI from command line
3. **Team Workspace**: One person's Claude Max subscription serves entire team

## Features

- `/hokipoki` command in Claude Code for requesting help from remote AIs
- Auto-detection of AI tool from natural language
- Support for Claude, Codex, and Gemini
- Multi-file context support
- Auto-patch application to git repository
- Team workspace collaboration
- Bundled skill for intelligent context switching

## Installation

### Prerequisites

1. **Install HokiPoki CLI:**
   ```bash
   npm install -g @next-halo/hokipoki-cli
   ```

2. **Authenticate:**
   ```bash
   hokipoki login
   ```

   Visit [hoki-poki.ai](https://hoki-poki.ai) to create an account if you don't have one.

### Install Plugin in Claude Code

```bash
# Add HokiPoki marketplace
/plugin marketplace add next-halo/hokipoki-plugin

# Install the plugin
/plugin install hokipoki
```

Or for local development:
```bash
/plugin install /path/to/hokipoki-plugin
```

## Usage

### Basic Usage

```bash
/hokipoki <task description>
```

**Examples:**
```bash
/hokipoki Fix the authentication bug in login.ts
/hokipoki Explain this codebase architecture
/hokipoki Optimize the database query performance
```

### Specify AI Tool

```bash
/hokipoki --tool <claude|codex|gemini> <task>
```

**Examples:**
```bash
/hokipoki --tool codex Generate unit tests for auth module
/hokipoki --tool gemini Explain this complex algorithm
/hokipoki --tool claude Refactor to use dependency injection
```

### Multi-File Context

```bash
# Specific files
/hokipoki --files src/auth.ts src/user.ts Fix authentication flow

# Entire directory
/hokipoki --dir src/payments/ Refactor payment processing

# Entire repository
/hokipoki --all Document the entire codebase
```

### Team Workspaces

```bash
/hokipoki --workspace my-team Fix the production bug
```

## When to Use HokiPoki

The bundled `hokipoki-context-switching` skill helps Claude Code decide when to use HokiPoki:

1. **Stuck on a problem** - Current approach isn't working, try a different AI
2. **Need a fresh perspective** - Different AI models may approach problems differently
3. **Large context required** - Task involves many files or complex state
4. **Team collaboration** - Leverage teammate's AI subscription

## AI Tool Selection

You can specify which AI tool to use with the `--tool` option:

```bash
/hokipoki --tool codex Generate boilerplate for REST API
/hokipoki --tool gemini Analyze this large codebase
/hokipoki --tool claude Refactor this module
```

HokiPoki will route your request to a provider with the specified tool available.

## Configuration

### Check Status

```bash
hokipoki status
```

Shows:
- Authentication status
- Available workspaces
- Task history

### Become a Provider (Share Your AI)

Share your AI subscriptions with the community:

```bash
# Register as provider
hokipoki register --as-provider --tools claude codex gemini

# Start listening for tasks
hokipoki listen --tools claude gemini
```

Visit [hoki-poki.ai/provider](https://hoki-poki.ai/provider) for more information.

## Troubleshooting

### Plugin Not Found

```bash
# Verify HokiPoki CLI is installed
hokipoki --version

# If not installed
npm install -g @next-halo/hokipoki-cli
```

### Not Authenticated

```bash
# Re-authenticate
hokipoki login
```

### Task Timeout

If tasks are timing out, check:
1. Network connection
2. Provider availability: `hokipoki status`
3. Relay server status at [hoki-poki.ai/status](https://hoki-poki.ai/status)

### No Providers Available

If no providers are available for your requested tool:
1. Try a different tool with `--tool`
2. Become a provider yourself: `hokipoki register --as-provider`
3. Invite teammates to become providers

## Examples

### Stuck on Bug
```bash
# After debugging for 30 minutes with no progress
/hokipoki --tool codex Fix authentication flow in auth/login.ts
```

### Need Different Approach
```bash
# Stuck on complex regex, try a different AI
/hokipoki --tool gemini Generate regex for email validation
```

### Large Refactor
```bash
# Refactor entire module
/hokipoki --tool claude --dir src/payments/ Refactor to use strategy pattern
```

### Multi-AI Workflow
```bash
# You can use multiple AIs for different parts of a task
/hokipoki --tool claude Design architecture for new feature
/hokipoki --tool codex Implement the feature
/hokipoki --tool gemini Create comprehensive documentation
```

## Architecture

```
CLAUDE CODE                  HOKIPOKI NETWORK                PROVIDER
     │                            │                              │
     ├─ /hokipoki ────────────────┤                              │
     │  "fix bug"                 ├─ Match (has claude?) ───────→│
     │  --files src/main.ts       │                              │
     │                            │                              ├─ hokipoki listen
     │                            │                              │  --tools claude
     │                            │                              │
     │←─────── P2P Connection ────┴──────────────────────────────┤
     │                                                           │
     │←──────────── AI Results (patch) ─────────────────────────┤
     │                                                           │
     ├─ Auto-apply patch                                         │
     └─ Done!                                                    │
```

## Security

- **Encrypted P2P connections** - All task data is encrypted in transit
- **LUKS-encrypted containers** - Provider executes tasks in encrypted Docker containers
- **Ephemeral git servers** - Code is transferred via temporary git servers with one-time tokens
- **No code retention** - Providers cannot access code after task completion
- **Auto-wiped containers** - Container memory is wiped after each task

## Links

- **Website:** [hoki-poki.ai](https://hoki-poki.ai)
- **Documentation:** [hoki-poki.ai/docs](https://hoki-poki.ai/docs)
- **GitHub:** [github.com/next-halo/hokipoki-plugin](https://github.com/next-halo/hokipoki-plugin)
- **Support:** [github.com/next-halo/hokipoki-plugin/issues](https://github.com/next-halo/hokipoki-plugin/issues)

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Made with ❤️ by the HokiPoki Team**

Never get stuck again. Switch models, not tabs.
