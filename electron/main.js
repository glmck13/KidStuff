const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    width: 800,
    height: 480
  })

  win.loadURL('https://mckspot.net:8443/app/?7001,789889,music,games,videos,phone');
  win.maximize();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
