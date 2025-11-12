.PHONY: help dev build storybook build-storybook clean test lint format

# Default target
help:
	@echo "Available commands:"
	@echo "  make dev              - Start development server with Vite"
	@echo "  make build            - Build the library for production"
	@echo "  make storybook        - Start Storybook development server"
	@echo "  make build-storybook  - Build Storybook for production"
	@echo "  make clean            - Remove dist directory"
	@echo "  make test             - Run tests"
	@echo "  make test-watch       - Run tests in watch mode"
	@echo "  make test-coverage    - Run tests with coverage"
	@echo "  make lint             - Run linters (JS and style)"
	@echo "  make lint-fix         - Run linters with auto-fix"
	@echo "  make format           - Format code with Prettier"
	@echo "  make typecheck        - Run TypeScript type checking"

# Development
dev:
	npm run dev

# Build
build:
	npm run build

# Storybook
storybook:
	npm run storybook

build-storybook:
	npm run build-storybook

# Clean
clean:
	npm run clean

# Testing
test:
	npm run test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

test-ui:
	npm run test:ui

# Linting and formatting
lint:
	npm run lint

lint-fix:
	npm run lint-fix

format:
	npm run format

# Type checking
typecheck:
	npm run typecheck

# Install dependencies
install:
	npm install

# Generate icons
generate-icons:
	npm run generate-icons
