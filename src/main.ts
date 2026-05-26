import { web } from "./config/web";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./config/logger";

async function startServer() {
  try {
    if (
      !env.APP_SECRET ||
      env.APP_SECRET.trim() === "" ||
      !env.JWT_SECRET_ACCESS ||
      env.JWT_SECRET_ACCESS.trim() === "" ||
      !env.JWT_SECRET_REFRESH ||
      env.JWT_SECRET_REFRESH.trim() === ""
    ) {
      logger.error("❌ APP_SECRET or JWT_SECRET is missing in your .env file.");
      logger.error("👉 Please run `node craft key:generate` to create them.");
      process.exit(0);
    }
    await connectDatabase();
    web.listen(env.PORT, () => {
      logger.info(`🚀 Server is listening on: ${env.BASE_URL}`);
      logger.info(`🔗 API Docs available at: ${env.BASE_API_URL}/docs`);
    });
  } catch (error) {
    process.exit(0);
  }
}

startServer();
