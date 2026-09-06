<div align="center">

<img src="./docs/screenshots/omliteroute-main.png" alt="OmliteRoute Dashboard" width="880"/>

<br/>
<br/>

# 🪶 OmliteRoute

### The Ultra-Lightweight, Low-RAM AI Gateway & Smart Model Router

**356+ Providers · Auto-Fallback · RTK Compression · Low-RAM (~120MB) · Zero-Bloat**

<br/>

[![GitHub Stars](https://img.shields.io/github/stars/adamhasani/omliteroute?style=for-the-badge&logo=github&color=059669)](https://github.com/adamhasani/omliteroute/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![RAM Usage](https://img.shields.io/badge/RAM_Idle-~120MB-34d399?style=for-the-badge)](README.md)
[![Node Version](https://img.shields.io/badge/Node.js-≥18.0.0-blue?style=for-the-badge&logo=node.js)](package.json)
[![Platform](https://img.shields.io/badge/Platform-Linux%20|%20macOS%20|%20Windows-818cf8?style=for-the-badge)](README.md)

</div>

<br/>

---

## 💡 What is OmliteRoute?

**OmliteRoute** is an independent, hyper-optimized fork and evolution of OmniRoute engineered specifically for **laptops, low-resource VPSs, and developer workstations**.

Standard AI proxy routers frequently consume **1.5 to 3.0 GB of RAM** and drain battery with background scraping, unmanaged caches, and heavy WebGL animations. **OmliteRoute strips away all non-routing bloatware** while preserving **100% of the core AI routing engine**:

* **One Endpoint for Everything:** Point Claude Code, Codex, Cursor, Cline, OpenCode, Hermes, or standard OpenAI SDKs to `http://localhost:20128/v1`.
* **Zero-Downtime Resilience:** Automatic fallback and account rotation across **356 AI providers** (Claude, GPT, Gemini, DeepSeek, Grok, Kimi, Mistral, Ollama, etc.) whenever rate-limits (HTTP 429) or quota errors occur.
* **Token Compression Built-in:** Native RTK and Caveman prompt compression to save **15% to 85% on token costs**.
* **Featherlight Footprint:** Runs comfortably in **~120–160 MB of RAM** with <1% idle CPU usage.

---

## 📊 Performance Benchmark: Standard Gateway vs. OmliteRoute

| Metric | Standard Gateway | OmliteRoute 🪶 | Efficiency Gain |
| :--- | :---: | :---: | :---: |
| **Server RAM (Idle)** | 600 MB – 1.2 GB | **~120 – 160 MB** | **~75% RAM Reduction** |
| **Server RAM (Under Load)** | 1.5 GB – 3.0 GB | **~250 – 400 MB** | **~85% RAM Reduction** |
| **Browser CPU (Dashboard Tab)** | 15% – 25% *(WebGL canvas)* | **< 1%** *(CSS-only grid)* | **Zero GPU / battery drain** |
| **Database Disk Growth** | Unbounded (100–500+ MB) | **< 10 MB** *(auto-purged)* | **Permanent lean storage** |
| **i18n Payload** | 37.0 MB (42 languages) | **1.5 MB** *(en & id)* | **35.5 MB freed** |
| **Cold Boot Time** | 7 – 12 seconds | **~1.5 seconds** | **5x faster startup** |

---

## ✨ Key Features

### 1. 🚀 Memory-First Architecture
* **Clamped V8 Heap:** Dynamic heap ceiling clamped to **512 MB** (instead of 35% of total system RAM).
* **Active Idle Garbage Collector:** Background watcher triggers `global.gc()` every 60 seconds if memory exceeds 350 MB during idle periods.
* **Lean SQLite Storage:** SQLite cache size clamped from 64 MB down to **2 MB** (`cache_size = -2048`) with 16 MB memory-mapped I/O.
* **Rolling Call Logs:** `call_logs` table automatically caps itself at the **latest 500 records**, preventing database bloat.

### 2. 🌐 356+ Providers & Multi-Account Fallback
* Support for major frontier providers (Anthropic Claude, OpenAI, Google Gemini, DeepSeek, xAI Grok, Moonshot Kimi, Mistral) and local models (Ollama, vLLM, LM Studio).
* **Account Pools:** Add multiple accounts for the same provider; OmliteRoute rotates keys, balances quota, and auto-cools rate-limited accounts.
* **Combos:** Chain multiple models into a single virtual identifier (e.g. `fast-coder` -> Gemini 2.5 Flash -> DeepSeek V3 -> Claude 3.5 Sonnet).

### 3. 🗜️ In-Flight Token Compression
* **RTK Compression:** Prunes tool outputs, terminal logs, and redundant JSON whitespace in agentic loops.
* **Caveman Compaction:** Semantic prompt compaction preserving core reasoning directives while dropping filler tokens.

### 4. 📱 Clean Haute Luxury Dashboard & Telegram WebApp (TWA)
* Minimalist matte dark design (`#130e1b`, cards `#181324`, accents emerald `#059669`).
* **Zero WebGL Canvas:** Home provider topology replaced with a responsive, instant-loading CSS card grid with status pills (`READY`, `ROUTING`, `RECENT`, `ERR`).
* **Telegram-Ready:** Pre-configured CSP and iframe headers allowing the dashboard to open directly as a Telegram WebApp (TWA) without "Internal Server Error" blocks.

---

## 📸 Dashboard & Feature Preview

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <b>⚡ Providers & Accounts Management</b><br/>
      <sub>Grid of 356+ active AI providers, key test statuses, and account rotation</sub><br/><br/>
      <img src="./docs/screenshots/omliteroute-providers.png" alt="OmliteRoute Providers Management" width="100%"/>
    </td>
    <td width="50%" align="center">
      <b>🎯 Model Combos & Smart Routing</b><br/>
      <sub>Multi-model fallback chains and auto-routing pipelines</sub><br/><br/>
      <img src="./docs/screenshots/omliteroute-combos.png" alt="OmliteRoute Model Combos" width="100%"/>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>⚙️ Lean Storage & Maintenance Settings</b><br/>
      <sub>Clamped SQLite cache, 500-record rolling call log, and vacuum tools</sub><br/><br/>
      <img src="./docs/screenshots/omliteroute-settings.png" alt="OmliteRoute Settings" width="100%"/>
    </td>
    <td width="50%" align="center">
      <b>📱 Mobile View (Telegram WebApp / TWA)</b><br/>
      <sub>Native mobile-responsive layout for Telegram in-app browsing without iframe errors</sub><br/><br/>
      <img src="./docs/screenshots/omliteroute-mobile.png" alt="OmliteRoute Mobile View" width="55%"/>
    </td>
  </tr>
</table>

---

## ✂️ What Was Pruned to Make it "Lite"?

OmliteRoute discards all non-essential features that cause memory leaks and CPU thrashing:

1. **Gamification Bypassed:** Zero XP calculations, level-ups, or streak writes on request hot-paths.
2. **15+ Background Pollers Disabled:** No Chatbot Arena ELO sync, live pricing scrapers, models.dev pollers, or live WebSocket daemons waking the CPU.
3. **Monaco Editor Dropped:** Replaced the ~20 MB bundled VS Code editor with a lightweight dark-luxury monospace editor.
4. **Stripped 40 Foreign Languages:** Removed 35.5 MB of unneeded JSON dictionaries, keeping clean English (`en`) and Indonesian (`id`).
5. **Pruned 53 Sidebar Items:** Eliminated unbuilt, dead, or bloated menu items, leaving a tight 7-section core navigation.

---

## 🚀 Quick Start

### 1. Installation

Clone the repository:
```bash
git clone https://github.com/adamhasani/omliteroute.git
cd omliteroute
npm install
```

### 2. Running OmliteRoute

You can run OmliteRoute using any of the following methods:

```bash
# Option 1: Direct executable command
./bin/omliteroute.mjs

# Option 2: Standard CLI with --lite flag
node bin/omniroute.mjs serve --lite

# Option 3: Via environment variable
OMNIROUTE_LITE=1 node bin/omniroute.mjs serve
```

The web dashboard will be live at:
👉 **`http://localhost:20128`**

Default initial login password: **`CHANGEME`** *(or configure via `INITIAL_PASSWORD`)*.

---

## 💻 Connecting Your Tools

OmliteRoute is 100% drop-in compatible with standard OpenAI and Anthropic SDKs.

### cURL
```bash
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "auto",
    "messages": [{"role": "user", "content": "Hello world!"}]
  }'
```

### Python (OpenAI SDK)
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:20128/v1",
    api_key="YOUR_API_KEY"
)

response = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Write a Python script to sort a list."}]
)
print(response.choices[0].message.content)
```

### Claude Code CLI
```bash
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_API_KEY="YOUR_API_KEY"
claude
```

---

## ⚙️ Environment Variables

| Variable | Description | Default |
| :--- | :--- | :---: |
| `PORT` | Web dashboard & API port | `20128` |
| `HOSTNAME` | Host address to bind | `0.0.0.0` |
| `OMNIROUTE_LITE` | Enables memory-optimized Lite mode | `1` |
| `OMNIROUTE_MEMORY_MB` | V8 heap ceiling in MB | `512` |
| `INITIAL_PASSWORD` | Default dashboard password | `CHANGEME` |
| `DATA_DIR` | Directory for SQLite database | `~/.omniroute` |

---

## 📜 License & Acknowledgments

* **Creator & Maintainer:** [Adam Hasani](https://github.com/adamhasani) (`@adamhasani`)
* **License:** [MIT License](LICENSE)
* Based on the routing primitives of OmniRoute, completely restructured and optimized for lightweight personal and production use.

<div align="center">

⭐ **Star this repository if OmliteRoute saved your laptop RAM and money!**

</div>
