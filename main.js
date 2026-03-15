const { app, BrowserWindow } = require("electron")

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
  })

  win.loadURL("https://sangamkunwar.com.np")
}

app.whenReady().then(createWindow)