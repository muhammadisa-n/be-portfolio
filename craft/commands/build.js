const { execSync } = require("child_process");
const chalk = require("chalk");
function Build() {
  console.log(chalk.blue("📦 Building project..."));

  try {
    execSync("npx tsc && cp -r src/views dist/views", { stdio: "inherit" });
    console.log(chalk.green("✅ Build completed successfully."));
  } catch (error) {
    console.error(chalk.red("❌ Build failed."));
    process.exit(1);
  }
}

module.exports = Build;
