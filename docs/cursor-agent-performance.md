# Cursor agent performance — ops fork

Slow switches between agents are usually **cold context rebuild** (rules + skills + MCP tool schemas + cache miss), not slow git hooks. SessionStart hooks in this fork typically finish in under one second.

## Fixed in this repo (no action needed)

| Change | Effect |
|--------|--------|
| `.cursor/mcp.json` with empty `mcpServers` | Project declares no extra MCP servers; reduces merge noise with global config |
| `.cursorignore` | Excludes `workspace/` clones (~70MB), hook tests, and `site/llms-full.txt` from indexing |
| `.cursor/rules/agent-performance.mdc` | Tells agents to avoid gratuitous subagent spawns and MCP use in the ops repo |
| Audit / gate skills use `disable-model-invocation: true` | Shrinks auto-invokable skill surface (explicit `/skill` only) |

## Your side (Cursor UI / global config)

These dominate switch latency and must be toggled in Cursor:

1. **Disable unused MCP plugins** for this workspace — Settings → Features → MCP: turn off Supabase, Neon, AWS Knowledge, and Browser unless you are actively using them on a managed app in `workspace/`.
2. **Trim global skills** — gstack skills under `~/.claude/skills` and `~/.cursor/skills` are loaded into every agent; disable or relocate skills you do not use for ops work.
3. **Limit multitask tabs** — each tab is a separate agent context; prefer one thread per task.
4. **Same model per workspace** when possible — improves prompt-prefix cache hits across turns.
5. **Short threads** — start a new chat for a new task instead of carrying a 100+ message history across agent switches.
6. **Reload after MCP changes** — Command Palette → Developer: Reload Window after editing MCP or rules.

## When slowness is expected

- Spawning a subagent (`Task`, `/fan-out`, isolated role from AgDR-0050) — by design; isolated context + handoff.
- First message after enabling a new MCP plugin — server cold start.
- Switching to a different model tier — cache miss on the system prompt.

## Reference

AgDR-0050 documents sub-agent cache-miss latency: `docs/agdr/AgDR-0050-agent-runtime-overhaul.md`.
