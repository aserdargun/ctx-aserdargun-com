#!/bin/sh
set -eu

if [ "$(node -p 'process.versions.node.split(".")[0]' 2>/dev/null || true)" = "22" ]; then
  exec npm "$@"
fi

npm_path="$(command -v npm)"
node22_path="$(npx -y node@22 -p 'process.execPath')"
node22_bin="$(dirname "$node22_path")"
PATH="$node22_bin:$PATH"
export PATH
exec "$node22_path" "$npm_path" "$@"
