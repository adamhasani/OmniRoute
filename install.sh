#!/usr/bin/env bash
# ==============================================================================
# 🪶 OmliteRoute — 1-Line Universal Installer Script
# Created by Adam Hasani (https://github.com/adamhasani/omliteroute)
# ==============================================================================

set -e

# Color definitions
BOLD='\033[1m'
EMERALD='\033[38;2;5;150;105m'
PURPLE='\033[38;2;168;85;247m'
ROSE='\033[38;2;244;114;182m'
GRAY='\033[38;2;148;163;184m'
RED='\033[38;2;239;68;68m'
NC='\033[0m' # No Color

clear 2>/dev/null || true

echo -e "${EMERALD}"
cat << "EOF"
   ____            _ _ _       ____             _       
  / __ \          | (_) |     |  _ \           | |      
 | |  | |_ __ ___ | |_| |_ ___| |_) |___  _   _| |_ ___ 
 | |  | | '_ ` _ \| | | __/ _ \  _ < / _ \| | | | __/ _ \
 | |__| | | | | | | | | ||  __/ |_) | (_) | |_| | ||  __/
  \____/|_| |_| |_|_|_|\__\___|____/ \___/ \__,_|\__\___|
EOF
echo -e "${NC}"
echo -e "${BOLD}🪶 OmliteRoute — Ultra-Lightweight AI Gateway Installer${NC}"
echo -e "${GRAY}Low-RAM (~120MB) · 356+ Providers · Auto-Fallback · Zero-Bloat${NC}"
echo -e "${GRAY}-------------------------------------------------------------${NC}\n"

# 1. System checks
echo -e "${BOLD}[1/4] Checking environment dependencies...${NC}"

if ! command -v git &> /dev/null; then
    echo -e "${RED}✖ Git is required but not installed.${NC}"
    echo -e "  Install it via: sudo apt install -y git (Ubuntu/Debian) or brew install git (macOS)"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}✖ Node.js is required but not installed.${NC}"
    echo -e "  Install Node.js 18+ via https://nodejs.org or run: curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs"
    exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
    echo -e "${RED}✖ Node.js version must be >= 18. (Detected: $(node -v))${NC}"
    exit 1
fi
echo -e "  ${EMERALD}✔ Node.js $(node -v) and Git detected.${NC}"

# 2. Target Directory
INSTALL_DIR="${HOME}/.omliteroute"
echo -e "\n${BOLD}[2/4] Downloading OmliteRoute to ${INSTALL_DIR}...${NC}"

if [ -d "$INSTALL_DIR" ]; then
    echo -e "  ${GRAY}Updating existing installation...${NC}"
    cd "$INSTALL_DIR"
    git fetch origin main --quiet
    git reset --hard origin/main --quiet
else
    git clone --depth 1 https://github.com/adamhasani/omliteroute.git "$INSTALL_DIR" --quiet
    cd "$INSTALL_DIR"
fi
echo -e "  ${EMERALD}✔ Repository synced.${NC}"

# 3. Setup dependencies & binaries
echo -e "\n${BOLD}[3/4] Configuring runtime & dependencies...${NC}"
chmod +x "$INSTALL_DIR/bin/omliteroute.mjs" "$INSTALL_DIR/bin/omniroute-lite.mjs" 2>/dev/null || true

# Symlink to global bin if writable, else ~/.local/bin
BIN_TARGET="/usr/local/bin/omliteroute"
if [ -w "/usr/local/bin" ] || [ "$EUID" -eq 0 ]; then
    ln -sf "$INSTALL_DIR/bin/omliteroute.mjs" /usr/local/bin/omliteroute
    ln -sf "$INSTALL_DIR/bin/omliteroute.mjs" /usr/local/bin/omni-lite
    echo -e "  ${EMERALD}✔ Symlinked globally to /usr/local/bin/omliteroute${NC}"
else
    mkdir -p "${HOME}/.local/bin"
    ln -sf "$INSTALL_DIR/bin/omliteroute.mjs" "${HOME}/.local/bin/omliteroute"
    ln -sf "$INSTALL_DIR/bin/omliteroute.mjs" "${HOME}/.local/bin/omni-lite"
    echo -e "  ${EMERALD}✔ Symlinked to ~/.local/bin/omliteroute${NC}"
    echo -e "  ${GRAY}Note: Make sure ~/.local/bin is in your PATH.${NC}"
fi

# 4. Finish
echo -e "\n${BOLD}[4/4] Installation Complete! 🚀${NC}\n"
echo -e "${EMERALD}=============================================================${NC}"
echo -e "${BOLD}OmliteRoute is ready to run!${NC}"
echo -e "${EMERALD}=============================================================${NC}"
echo -e "Start the gateway now:"
echo -e "  ${BOLD}${PURPLE}omliteroute${NC}                ${GRAY}(Starts the gateway on port 20128)${NC}"
echo -e "  ${BOLD}${PURPLE}omliteroute top${NC}            ${GRAY}(Terminal live monitoring dashboard)${NC}"
echo -e "  ${BOLD}${PURPLE}omliteroute --port 3000${NC}    ${GRAY}(Custom port)${NC}\n"
echo -e "Dashboard URL: ${BOLD}http://localhost:20128${NC}"
echo -e "API Base URL:  ${BOLD}http://localhost:20128/v1${NC}\n"
