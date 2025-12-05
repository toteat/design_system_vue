#!/bin/bash
# Fix files and re-stage them for pre-commit hooks
# Usage: fix-and-check.sh <tool> <files...>
# Example: fix-and-check.sh prettier file1.ts file2.ts

set -e

TOOL="$1"
shift
FILES="$@"

if [ -z "$FILES" ]; then
  exit 0
fi

case "$TOOL" in
  prettier)
    prettier --write "$@"
    TOOL_NAME="Prettier"
    ;;
  eslint)
    eslint --fix "$@"
    TOOL_NAME="ESLint"
    ;;
  stylelint)
    stylelint --fix "$@"
    TOOL_NAME="Stylelint"
    ;;
  *)
    echo "Unknown tool: $TOOL"
    exit 1
    ;;
esac

# Re-stage fixed files (lint-staged handles this automatically in v10+)
# The files passed to this script are already staged, so after fixing
# we need to re-add them to include the fixes in the commit
git add "$@" 2>/dev/null || true
