const { spawnSync } = require("child_process");
const chalk = require("chalk");
function Build() {
  console.log(chalk.blue("📦 Building project..."));

  const result = spawnSync("npx", ["tsc"], {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.error(chalk.red("❌ Build failed."));
    process.exit(result.status ?? 1);
  } else {
    console.log(chalk.green("✅ Build completed successfully."));
  }
}
module.exports = Build;
