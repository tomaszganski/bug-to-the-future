# Bug to the Future - Justfile
# Run `just` to see available commands

# Default recipe - show help
default:
    @just --list

# Install dependencies
install:
    pnpm install

# Start development server
dev:
    pnpm dev

# Build for production
build:
    pnpm build

# Preview production build locally
preview:
    pnpm preview

# Run linter
lint:
    pnpm lint

# Deploy to GitHub Pages
deploy: build
    pnpm exec gh-pages -d dist

# Deploy to GitHub Pages with custom message
deploy-msg message: build
    pnpm exec gh-pages -d dist -m "{{message}}"

# Clean build artifacts
clean:
    rm -rf dist node_modules/.vite

# Full clean (including node_modules)
clean-all:
    rm -rf dist node_modules

# Reinstall dependencies
reinstall: clean-all install

# Check if gh-pages is installed
check-deps:
    @pnpm list gh-pages || echo "gh-pages not installed. Run 'just install' first."
