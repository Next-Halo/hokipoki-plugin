# Contributing to HokiPoki Claude Code Plugin

Thank you for your interest in contributing! This document provides guidelines for contributing to the HokiPoki Claude Code plugin.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- HokiPoki CLI installed globally: `npm install -g @next-halo/hokipoki-cli`

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Next-Halo/hokipoki-plugin.git
   cd hokipoki-plugin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the plugin:**
   ```bash
   npm run build
   ```

4. **Install plugin in Claude Code:**
   ```bash
   # For local development
   /plugin install /path/to/hokipoki-plugin
   ```

## Development Workflow

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Edit TypeScript source:**
   - Source file: `commands/hokipoki.ts`
   - Make your changes to the `.ts` file only

3. **Build and test:**
   ```bash
   # Build once
   npm run build

   # Or use watch mode during development
   npm run watch
   ```

4. **Test in Claude Code:**
   - Reload the plugin in Claude Code
   - Test the `/hokipoki` command with various options
   - Verify error handling and edge cases

### Code Style

- Follow existing TypeScript patterns
- Use async/await for asynchronous operations
- Include JSDoc comments for exported functions
- Maintain strict TypeScript typing
- Keep error messages user-friendly

### Testing Checklist

Before submitting a PR, ensure:
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] Plugin loads in Claude Code without errors
- [ ] Basic command works: `/hokipoki test task`
- [ ] Tool selection works: `/hokipoki --tool claude test`
- [ ] File context works: `/hokipoki --files README.md test`
- [ ] Error messages are clear and actionable
- [ ] Help text is accurate

## Project Structure

```
hokipoki-plugin/
├── .claude-plugin/          # Plugin metadata
│   ├── plugin.json          # Plugin configuration
│   └── marketplace.json     # Marketplace registration
├── commands/                # Command handlers
│   ├── hokipoki.ts          # TypeScript source
│   └── hokipoki.js          # Compiled JavaScript
├── skills/                  # Bundled skills
│   └── hokipoki-context-switching/
│       └── SKILL.md         # Skill documentation
├── README.md                # User documentation
├── CONTRIBUTING.md          # This file
├── LICENSE                  # MIT license
├── package.json             # npm metadata
└── tsconfig.json            # TypeScript config
```

## Submitting Changes

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: Add your feature description"
   ```

   **Commit message format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `refactor:` Code refactoring
   - `test:` Test additions/changes
   - `chore:` Build process or tooling changes

2. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request:**
   - Go to GitHub and create a PR from your branch
   - Describe what changes you made and why
   - Reference any related issues
   - Wait for review from maintainers

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation if you change functionality
- Include examples for new features
- Respond to review feedback promptly
- Keep commit history clean (squash if needed)

## Reporting Issues

When reporting bugs, please include:
- Claude Code version
- Node.js version (`node --version`)
- HokiPoki CLI version (`hokipoki --version`)
- Steps to reproduce
- Expected behavior vs actual behavior
- Error messages or logs

## Feature Requests

For feature requests:
- Check existing issues first
- Describe the use case
- Explain why it's valuable
- Provide examples if possible

## Development Tips

### Watch Mode for Faster Development
```bash
npm run watch
```
This automatically recompiles when you save `.ts` files.

### Testing with Different AI Tools
```bash
/hokipoki --tool claude <task>
/hokipoki --tool codex <task>
/hokipoki --tool gemini <task>
```

### Debugging
- Use `console.error()` for debugging (appears in Claude Code console)
- Check stderr output in command execution results
- Test error paths explicitly

## Building for Distribution

The plugin is distributed via GitHub, not npm:

```bash
# Build the plugin
npm run build

# Verify files are ready
git status

# Commit and push
git add .
git commit -m "build: Compile TypeScript for release"
git push
```

Users install via:
```bash
/plugin marketplace add Next-Halo/hokipoki-plugin
/plugin install hokipoki@hokipoki-plugins
```

## Questions?

- Open an issue for bugs or feature requests
- Visit [hoki-poki.ai/docs](https://hoki-poki.ai/docs) for general documentation
- Check existing issues and PRs before creating new ones

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Follow the Golden Rule

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to HokiPoki!** 🚀

Your contributions help make AI context switching seamless for developers everywhere.
