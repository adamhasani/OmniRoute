#!/usr/bin/env node

/**
 * OmniRoute Lite — Lightweight AI Router CLI entry point.
 *
 * Runs OmniRoute in memory-optimized mode:
 * - V8 heap ceiling clamped to 512MB + active idle GC sweeper
 * - 15+ background sync pollers & cron jobs disabled
 * - Gamification writes bypassed on request hot path
 * - SQLite cache capped at 2MB with auto-purged call logs (max 500 rows)
 * - Pruned, clean dashboard sidebar navigation
 */

process.env.OMNIROUTE_LITE = "1";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";

if (!process.env.OMNIROUTE_MEMORY_MB) {
  process.env.OMNIROUTE_MEMORY_MB = "512";
}

// Automatically pass --lite to serve command
if (!process.argv.includes("--lite")) {
  if (process.argv.length <= 2) {
    process.argv.push("serve", "--lite");
  } else if (process.argv.includes("serve")) {
    process.argv.push("--lite");
  }
}

await import("./omniroute.mjs");
