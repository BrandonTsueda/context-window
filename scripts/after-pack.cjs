const fs = require("node:fs");
const path = require("node:path");

exports.default = async function afterPack(context) {
  const projectDir = path.join(__dirname, "..");
  const sourceNodeModules = path.join(projectDir, ".next", "standalone", "node_modules");
  const targetNodeModules = path.join(context.appOutDir, "resources", "standalone", "node_modules");

  if (!fs.existsSync(sourceNodeModules)) {
    throw new Error(`Standalone node_modules not found at ${sourceNodeModules}`);
  }

  fs.mkdirSync(path.dirname(targetNodeModules), { recursive: true });
  fs.rmSync(targetNodeModules, { recursive: true, force: true });
  fs.cpSync(sourceNodeModules, targetNodeModules, { recursive: true, force: true });
};
