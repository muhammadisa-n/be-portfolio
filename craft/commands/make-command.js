const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const toPascalCase = (str) =>
  str.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());

function makeCommand(name) {
  if (!name) {
    console.log(chalk.red("❌ Please provide a command name."));
    return;
  }

  const fileName = `${name.toLowerCase()}.js`;
  const targetDir = path.resolve("craft", "commands");

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);
  if (fs.existsSync(filePath)) {
    console.log(chalk.yellow("⚠️ Command already exists."));
    return;
  }

  const content = `const fs = require("fs");
  const path = require("path");
  const chalk = require("chalk");

  function make${name}(name) {

  }

  module.exports = make${name};
`;

  fs.writeFileSync(filePath, content);
  console.log(chalk.green(`✅ Command created at ${filePath}`));
}
module.exports = makeCommand;
