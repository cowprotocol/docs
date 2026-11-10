#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
check_dir=$(mktemp -d)
trap 'rm -rf "$check_dir"' EXIT

# Check the downloadable sources with their own Node dependencies, outside the site build.
cp static/code-examples/x402/*.mts static/code-examples/x402/*.mjs "$check_dir/"
cd "$check_dir"
npm init --yes >/dev/null
# Match the quickstart's SDK pins and unpinned viem dependency.
npm install --ignore-scripts --no-audit --no-fund --package-lock=false \
  @x402/fetch@2.26.0 @x402/evm@2.26.0 @x402/core@2.26.0 viem \
  typescript@5.9.3 @types/node@22

./node_modules/.bin/tsc --noEmit --strict --skipLibCheck \
  --target ES2022 --module NodeNext --moduleResolution NodeNext --types node ./*.mts
for example in ./*.mjs; do
  node --check "$example"
done
