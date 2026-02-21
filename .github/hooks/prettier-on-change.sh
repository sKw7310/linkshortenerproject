#!/bin/bash

TOOL_NAME=$(cat /dev/stdin | python3 -c "import sys, json; print(json.load(sys.stdin).get('toolName', ''))")

if [[ "$TOOL_NAME" == "create" || "$TOOL_NAME" == "edit" ]]; then
  npx prettier --write .
fi
