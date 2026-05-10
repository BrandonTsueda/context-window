const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const standaloneRoot = path.join(root, ".next", "standalone");
const standaloneNext = path.join(standaloneRoot, ".next");
const standaloneStatic = path.join(standaloneNext, "static");
const sourceStatic = path.join(root, ".next", "static");
const sourcePublic = path.join(root, "public");
const standalonePublic = path.join(standaloneRoot, "public");

function copyDirectory(source, destination) {
  if (!fs.existsSync(source)) {
    return;
  }

  fs.mkdirSync(destination, { recursive: true });
  fs.cpSync(source, destination, { recursive: true, force: true });
}

fs.mkdirSync(standaloneRoot, { recursive: true });
fs.mkdirSync(standaloneNext, { recursive: true });

copyDirectory(sourceStatic, standaloneStatic);
copyDirectory(sourcePublic, standalonePublic);

console.log("Prepared standalone assets for Electron packaging.");
