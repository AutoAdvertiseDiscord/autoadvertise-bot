import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Collection,
  type ChatInputCommandInteraction,
  type SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import genkeyCommand from "./commands/genkey";
import revokekeyCommand from "./commands/revokekey";
import keyinfoCommand from "./commands/keyinfo";
import listkeysCommand from "./commands/listkeys";
import extendkeyCommand from "./commands/extendkey";
import resetkeyCommand from "./commands/resetkey";
import deletekeyCommand from "./commands/deletekey";

export interface BotCommand {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

const ADMIN_IDS = (process.env.ADMIN_DISCORD_IDS || "")
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID!;

const commands = new Collection<string, BotCommand>();
const allCommands: BotCommand[] = [
  genkeyCommand,
  revokekeyCommand,
  keyinfoCommand,
  listkeysCommand,
  extendkeyCommand,
  resetkeyCommand,
  deletekeyCommand,
];

for (const cmd of allCommands) {
  commands.set((cmd.data as SlashCommandBuilder).name, cmd);
}

export async function startBot(): Promise<void> {
  if (!BOT_TOKEN) {
    console.error("[Bot] DISCORD_BOT_TOKEN not set — exiting");
    process.exit(1);
  }

  // Register slash commands globally
  const rest = new REST().setToken(BOT_TOKEN);
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: allCommands.map((cmd) => (cmd.data as SlashCommandBuilder).toJSON()),
    });
    console.log("[Bot] Registered slash commands");
  } catch (err) {
    console.error("[Bot] Failed to register slash commands:", err);
  }

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once("clientReady", (c) => {
    console.log(`[Bot] Ready — logged in as ${c.user.tag}`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (!ADMIN_IDS.includes(interaction.user.id)) {
      await interaction.reply({
        content: "❌ You don't have permission to use this command.",
        ephemeral: true,
      });
      return;
    }

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(`[Bot] Command error (${interaction.commandName}):`, err);
      const msg = { content: "An error occurred while executing this command.", ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(msg);
      } else {
        await interaction.reply(msg);
      }
    }
  });

  await client.login(BOT_TOKEN);
}
