import electron, { BrowserWindow } from 'electron';
const { platform, env } = process


const authBundle = (win : BrowserWindow) => {

    // Load our app when user is authenticated.
    electron.ipcMain.handle("authenticated", async event => {
    win.loadURL(`file://${__dirname}/index.html#/main/`)

    if (env.NODE_ENV === 'development') {
      return // Skip updates on development env
    }

    // Attempt to update the app after the user is authenticated
    // const { licenses } = await getLicenses()
    // if (!Object.values(licenses).some(l => Object.keys(l).length)) {
    //   return
    // }

    // // Use first available license key that's valid for updates
    // const [license] = Object.values(licenses).filter(l => l.meta && l.meta.valid)
    // if (!license) {
    //   return
    // }

    // if (lastUpdateAttemptAt != null && ((+new Date) - lastUpdateAttemptAt) < 43200000 /* every 12 hours */) {
    //   return
    // } else {
    //   lastUpdateAttemptAt = +new Date
    // }

    // const { key } = license.data.attributes
    // autoUpdater.setFeedURL(`https://dist.keygen.sh/v1/${accountId}/${productId}/update/${platform}/zip/${app.getVersion()}?key=${key}`)

    // autoUpdater.on('error', err => win.webContents.send('error', err))
    // autoUpdater.on('checking-for-update', () => win.webContents.send('log', 'checking-for-update', autoUpdater.getFeedURL()))
    // autoUpdater.on('update-available', () => win.webContents.send('log', 'update-available', autoUpdater.getFeedURL()))
    // autoUpdater.on('update-not-available', () => win.webContents.send('log', 'update-not-available', autoUpdater.getFeedURL()))
    // autoUpdater.on('update-downloaded', (...args) => {
    //   win.webContents.send('log', 'update-downloaded', autoUpdater.getFeedURL(), args)

    //   const choice = dialog.showMessageBox(win, {
    //     message: 'An update has been downloaded. Do you want to restart now to finish installing it?',
    //     title: 'Update is ready',
    //     type: 'question',
    //     buttons: [
    //       'Yes',
    //       'No'
    //     ]
    //   })

    //   if (choice === 0) {
    //     autoUpdater.quitAndInstall()
    //   }
    // })

    // autoUpdater.checkForUpdates()
  })
}

export default authBundle;