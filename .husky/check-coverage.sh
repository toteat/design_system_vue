#!/bin/sh

# Get staged files
STAGED_FILES=$(git diff --staged --name-only)

# Filter for relevant files
CODE_FILES=$(echo "$STAGED_FILES" | grep -E '\.(vue|js|ts|jsx|tsx)$' | \
  grep -v -E '(config|eslint|prettier|vitest)\.(js|ts)$' | \
  grep -v '\.gitignore$' | \
  grep -v '\.json$' | \
  grep -v '^\.storybook/' | \
  grep -v '^\.vscode/' | \
  grep -v '^\.husky/' | \
  grep -v '^\.github/' | \
  grep -v '^dist/' | \
  grep -v '\.stories\.(ts|js)$')

# If no code files, exit successfully
if [ -z "$CODE_FILES" ]; then
  echo "No code files to test"
  exit 0
fi

# Convert code files to their test file names
TEST_FILES=$(echo "$CODE_FILES" | sed \
  -e 's/\.vue$/.test.ts/' \
  -e 's/\.ts$/.test.ts/' \
  -e 's/\.js$/.test.js/' \
  -e 's/\.jsx$/.test.jsx/' \
  -e 's/\.tsx$/.test.tsx/')

# Check if any test files exist
for test_file in $TEST_FILES; do
  if [ -f "$test_file" ]; then
    # Run coverage if at least one test file exists
    vitest run --coverage $CODE_FILES
    exit $?
  fi
done

# No test files found, exit successfully
echo "No test files found for staged files"
exit 0
