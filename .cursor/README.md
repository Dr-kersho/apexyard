# Cursor project config (apexyard ops)

- **`mcp.json`** — intentionally empty. This repo is markdown + shell; no project MCP servers. Disable global/plugin MCP in Cursor Settings when working here (see `docs/cursor-agent-performance.md`).
- **`rules/agent-performance.mdc`** — lean agent behaviour (no gratuitous subagent spawns).

Parent repo also ships **`.cursorignore`** at the fork root to keep `workspace/` clones out of the index.
