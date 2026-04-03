#!/usr/bin/env bash
# Concatenate all tracked project files into one .txt for search, LLM context, or backup.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/project-full-dump.txt}"

{
  echo "=== Project full dump ==="
  echo "=== Generated: $(date -Iseconds) ==="
  echo "=== Root: $ROOT ==="
  echo

  if git -C "$ROOT" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git -C "$ROOT" ls-files -z | while IFS= read -r -d '' f; do
      [ -f "$ROOT/$f" ] || continue
      echo ""
      echo "========== FILE: $f =========="
      echo ""
      cat "$ROOT/$f"
    done
  else
    echo "Not a git repository; dumping text files (excluding common junk)." >&2
    find "$ROOT" \
      -path "$ROOT/.git" -prune -o \
      -path "$ROOT/node_modules" -prune -o \
      -path "$ROOT/.next" -prune -o \
      -path "$ROOT/out" -prune -o \
      -type f \
      \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" -o -name "*.ico" -o -name "*.woff" -o -name "*.woff2" \) -prune -o \
      -print0 | sort -z | while IFS= read -r -d '' f; do
      rel="${f#$ROOT/}"
      echo ""
      echo "========== FILE: $rel =========="
      echo ""
      cat "$f"
    done
  fi
} > "$OUT"

echo "Wrote: $OUT"
wc -l "$OUT" | awk '{print "Lines:", $1}'
