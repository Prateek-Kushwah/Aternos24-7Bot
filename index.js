const mineflayer = require("mineflayer");
const { pathfinder, Movements, goals } = require("mineflayer-pathfinder");
const express = require("express");

const app = express();
const port = 3000;

// Web server to keep Replit alive
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(port, () => console.log(`Web server started on port ${port}`));

// Function to start the bot
function startBot() {
    const bot = mineflayer.createBot({
        host: "WebPlayz_.aternos.me",
        port: 63504,
        username: "CircularBot",
        version: false, // Auto-detect Minecraft version
    });

    bot.loadPlugin(pathfinder);

    bot.once("spawn", () => {
        console.log("Bot has spawned! Moving in a circular path.");
        const mcData = require("minecraft-data")(bot.version);
        const defaultMovements = new Movements(bot, mcData);
        bot.pathfinder.setMovements(defaultMovements);

        let angle = 0;
        const radius = 2; // Circle size
        const speed = 2000; // Move every 2 seconds

        setInterval(() => {
            if (!bot.entity) return;
            const x = bot.entity.position.x + radius * Math.cos(angle);
            const z = bot.entity.position.z + radius * Math.sin(angle);

            const goal = new goals.GoalBlock(
                Math.floor(x),
                bot.entity.position.y,
                Math.floor(z),
            );
            bot.pathfinder.setGoal(goal); // Move the bot

            angle += Math.PI / 4;
        }, speed);
    });

    bot.on("end", (reason) => {
        console.log(`Bot disconnected: ${reason}. Restarting in 5 seconds...`);
        setTimeout(startBot, 5000); // Auto-reconnect
    });

    bot.on("error", (err) => {
        console.log(`Bot error: ${err.message}. Restarting in 5 seconds...`);
        setTimeout(startBot, 5000); // Restart on error
    });
}

// Start the bot
startBot();
