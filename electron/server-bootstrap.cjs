const Module = require("node:module");
const path = require("node:path");

const standaloneDirectory = process.argv[2];
const port = process.argv[3];
const hostname = process.argv[4];
const nodeModulesDirectory = process.argv[5];

if (!standaloneDirectory || !port || !hostname || !nodeModulesDirectory) {
  throw new Error("Missing standalone server bootstrap arguments.");
}

process.env.PORT = port;
process.env.HOSTNAME = hostname;
process.chdir(standaloneDirectory);
const serverEntry = path.join(standaloneDirectory, "server.js");
const serverModule = new Module(serverEntry, module);

serverModule.filename = serverEntry;
serverModule.paths = [
  path.join(standaloneDirectory, "node_modules"),
  nodeModulesDirectory,
  ...Module._nodeModulePaths(standaloneDirectory),
  ...Module.globalPaths,
];

serverModule.load(serverEntry);
