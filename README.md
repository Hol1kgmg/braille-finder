# braille-finder

Visual braille Unicode search tool with 256-character pattern matching

## Prerequisites

- [mise](https://mise.jit.su/) - Development tools version management

  ```bash
  # Install mise (if not already installed)
  curl https://mise.run | sh
  # or on macOS
  brew install mise

  # Shell integration (if not already configured)
  echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
  source ~/.zshrc
  ```

## Setup

```bash
# Clone repository
git clone https://github.com/Hol1kgmg/braille-finder.git
cd braille-finder

# Install development tools (Node.js, oxlint) via mise
mise install

# Install dependencies
cd frontend
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:3000/

## Development

### Linting

```bash
cd frontend

# Run linter
oxlint

# Auto-fix issues
oxlint --fix
```

### Tools managed by mise

- **Node.js 20** - JavaScript runtime
- **oxlint** - Fast JavaScript/TypeScript linter

### Project Structure

```
frontend/
├── src/
│   └── app/          # Next.js App Router
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
└── public/           # Static assets
```
