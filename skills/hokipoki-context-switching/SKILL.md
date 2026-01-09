---
name: hokipoki-context-switching
description: Use HokiPoki to switch AI models when stuck, optimize for different AI strengths
---

# HokiPoki Context Switching Skill

## When to Use HokiPoki

Use `/hokipoki` when:
1. **Stuck on a problem** - Current approach isn't working, try a different AI
2. **Need a fresh perspective** - Different AI models may approach problems differently
3. **Large context required** - Task involves many files or complex state
4. **Team collaboration** - Leverage teammate's AI subscription

## How to Use

### Basic Usage
```
/hokipoki <task description>
```
Example: `/hokipoki Fix the authentication bug in login.ts`

### Specify AI Tool
```
/hokipoki --tool <claude|codex|gemini> <task>
```
Example: `/hokipoki --tool codex Optimize database query performance`

### Multi-File Context
```
/hokipoki --files file1.ts file2.ts <task>
/hokipoki --dir src/auth/ <task>
/hokipoki --all <task>  # Entire repo
```

## Best Practices

1. **Be specific:** "Fix null pointer in line 42" > "Fix bugs"
2. **Include context:** Use `--files` to send relevant files
3. **Trust auto-detection:** HokiPoki can detect tool from natural language
4. **Check workspaces:** Use `--workspace <name>` for team tasks

## Examples

### Stuck on Bug
```
Current: Debugging authentication for 30 minutes
Action: /hokipoki --tool codex Fix authentication flow in auth/login.ts
Result: Fresh perspective finds issue in 2 minutes
```

### Need Different Approach
```
Current: Stuck on complex regex pattern
Action: /hokipoki --tool gemini Generate regex for email validation
Result: Fresh perspective solves the problem
```

### Large Refactor
```
Current: Need to refactor entire module
Action: /hokipoki --tool claude --dir src/payments/ Refactor to use strategy pattern
Result: Different AI provides architectural insights
```

## Integration with Claude Code

This skill helps Claude Code decide when to:
1. Continue working independently
2. Request help via HokiPoki
3. Choose the right AI for the job
4. Switch context effectively
