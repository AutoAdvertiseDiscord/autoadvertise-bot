import { connectMongoDB } from "./lib/mongodb";
import { startBot } from "./bot/index";

async function main() {
  console.log("[AutoAdvertise Bot] Starting…");
  await connectMongoDB();
  await startBot();
}

main().catch((err) => {
  console.error("[AutoAdvertise Bot] Fatal error:", err);
  process.exit(1);
});
