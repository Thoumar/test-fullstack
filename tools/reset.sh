#!/usr/bin/env bash

set -e

echo "🧹  ==> Resetting Nx cache and shutting down Nx Daemon..."
pnpm nx reset

echo "🗑️  ==> Removing all node_modules and pnpm lockfile..."
rm -rf node_modules
find . -type d -name "node_modules" -prune -exec rm -rf '{}' +
rm -f pnpm-lock.yaml

echo "🧺  ==> Pruning pnpm store (global cache)..."
pnpm store prune

echo "✂️  ==> Pruning unused dependencies in each workspace package..."
pnpm prune

echo "📦  ==> Reinstalling dependencies from scratch..."
pnpm install

echo "✅  ==> Monorepo has been fully reset and cleaned!"
