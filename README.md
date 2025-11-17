# Aternos 24/7 Minecraft Bot (Mineflayer)

A small Mineflayer-based Minecraft bot that walks in a loop to help keep an Aternos server online 24/7. It includes a tiny Express server so it can be hosted on free platforms (Replit, Render, etc.) and will auto-reconnect if disconnected.

---

## 🚀 Features

- AFK prevention: walks in a circular pattern to avoid AFK kicks.
- Auto-reconnect: restarts the bot after disconnects or errors.
- Configurable via environment variables in `.env.local`.
- Lightweight and easy to customize (radius, interval, movement logic).

---

## 📁 Project files

- `index.js` — main bot script and small Express server.
- `package.json` — project metadata and dependencies.
- `.env.local` — environment variables (create this file, see sample below).

---

## Prerequisites

- Node.js 16+ installed
- Aternos Minecraft server address (IP/hostname) and port

---

## Setup

1. Install dependencies:

```powershell
npm install
```

2. Create a `.env.local` file in the project root and set the variables used by `index.js`:

```env
# Example .env.local
ServerIp=play.example.com
ServerPort=25565
BotName=AternosBot
```

Notes:
- The project uses `dotenv` with the path `.env.local` (see `index.js`).
- If you don't set `ServerPort`, the bot will use the default 25565.

---

## Run

Start the bot with Node:

```powershell
node index.js
```

Optional: add a start script to `package.json` for convenience:

```json
"scripts": {
	"start": "node index.js"
}
```

The Express server listens on port 3000 (configured in `index.js`) and responds to `/` with "Bot is running!" — this helps keep the process alive on some free hosts.

---

## Configuration details

- `ServerIp` — server hostname or IP (required).
- `ServerPort` — server port (optional, default 25565).
- `BotName` — Minecraft username for the bot (optional, default `AternosBot`).

The bot uses `mineflayer` and `mineflayer-pathfinder` to move in a loop and will attempt to restart itself 5 seconds after an `end` or `error` event.

---

## Troubleshooting

- If the bot fails to spawn, ensure the server address and port are correct and the server version is compatible with Mineflayer. Set `version` in `index.js` if needed.
- If the Express server isn't reachable on a host, check the host's required port/environment variable (some platforms provide a port via `PORT` env var).

---

## Contributing

Feel free to open issues or submit PRs. Small improvements:

- Add a `start` script to `package.json`.
- Make the Express port configurable from env (e.g., `process.env.PORT || 3000`).

---

## License

ISC
