const path = require("node:path");
const { spawn } = require("node:child_process");
const { app, BrowserWindow, dialog } = require("electron");

const PORT = 3020;
const HOSTNAME = "127.0.0.1";
let mainWindow = null;
let serverProcess = null;

function resolveStandaloneDirectory() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "standalone");
  }

  return path.join(app.getAppPath(), ".next", "standalone");
}

function resolveNodeModulesDirectory() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "app.asar.unpacked", "node_modules");
  }

  return path.join(app.getAppPath(), "node_modules");
}

function waitForServer(timeoutMs = 15000) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const attempt = () => {
      fetch(`http://127.0.0.1:${PORT}`)
        .then((response) => {
          if (response.ok) {
            resolve();
            return;
          }

          if (Date.now() - startedAt >= timeoutMs) {
            reject(new Error(`Server responded with status ${response.status}.`));
            return;
          }

          setTimeout(attempt, 250);
        })
        .catch(() => {
          if (Date.now() - startedAt >= timeoutMs) {
            reject(new Error("Timed out waiting for the embedded server to start."));
            return;
          }

          setTimeout(attempt, 250);
        });
    };

    attempt();
  });
}

async function startNextServer() {
  const standaloneDirectory = resolveStandaloneDirectory();
  const nodeModulesDirectory = resolveNodeModulesDirectory();
  const bootstrapEntry = path.join(app.getAppPath(), "electron", "server-bootstrap.cjs");

  serverProcess = spawn(
    process.execPath,
    [bootstrapEntry, standaloneDirectory, String(PORT), HOSTNAME, nodeModulesDirectory],
    {
    cwd: standaloneDirectory,
    env: {
      ...process.env,
      ELECTRON_RUN_AS_NODE: "1",
    },
    stdio: "ignore",
    windowsHide: true,
    },
  );

  serverProcess.once("exit", (code, signal) => {
    if (!app.isQuiting) {
      dialog.showErrorBox(
        "Context Window could not start",
        `The embedded server exited before the app loaded. Code: ${code ?? "unknown"}, signal: ${signal ?? "none"}.`,
      );
      app.quit();
    }
  });

  await waitForServer();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 960,
    minWidth: 1100,
    minHeight: 760,
    backgroundColor: "#efe4d2",
    autoHideMenuBar: true,
    title: "Context Window",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL(`http://127.0.0.1:${PORT}`);
}

app.whenReady().then(async () => {
  try {
    await startNextServer();
    createWindow();
  } catch (error) {
    dialog.showErrorBox(
      "Context Window could not start",
      error instanceof Error ? error.message : "Unknown startup error.",
    );
    app.quit();
    return;
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  app.isQuiting = true;

  if (serverProcess && !serverProcess.killed) {
    serverProcess.kill();
  }
});
