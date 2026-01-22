# braille-finder

Visual braille Unicode search tool with 256-character pattern matching

## Prerequisites

- [mise](https://mise.jdx.dev/) - Polyglot tool version manager

  ```bash
  # Install mise (macOS)
  brew install mise

  # Or using curl
  curl https://mise.run | sh

  # Activate mise in your shell
  echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
  ```

## Setup

```bash
# Clone repository
git clone https://github.com/Hol1kgmg/braille-finder.git
cd braille-finder

# Install tools (Node.js 24, pnpm, gitleaks)
mise install

# Install dependencies
cd frontend
pnpm install

# Install git hooks
pnpm lefthook install

# Start development server
pnpm dev
```

The app will be available at http://localhost:3000/

## Development

### Scripts

```bash
cd frontend

# Development server
pnpm dev

# Build for production
pnpm build

# Linting
pnpm lint          # Run all linters
pnpm lint:code     # oxlint + eslint
pnpm lint:markup   # markuplint

# Formatting
pnpm format        # Format with oxfmt
pnpm format:check  # Check formatting

# Run all checks
pnpm check
```

### Pre-commit Hooks

This project uses [lefthook](https://lefthook.dev/) for automated pre-commit hooks:

- **oxfmt** - Code formatting
- **oxlint** - JavaScript/TypeScript linting
- **gitleaks** - Secret detection

Hooks are installed via `pnpm lefthook install`.

### Tools managed by mise

- **Node.js 24** - JavaScript runtime
- **pnpm** - Package manager
- **gitleaks** - Secret detection

### Project Structure

```
frontend/
├── src/
│   ├── app/          # Next.js App Router
│   ├── atoms/        # Jotai state management
│   ├── components/   # React components
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utilities
│   └── types/        # TypeScript types
└── public/           # Static assets
```
