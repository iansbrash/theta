/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import ipcBundle from './ipc/ipcBundle';
import electron from 'electron';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let loginWindow: BrowserWindow | null = null;


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};


// SSL/TSL: this is the self signed certificate support
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    // On certificate error we disable default behaviour (stop loading the page)
    // and we then say "it is all fine - true" to the callback
    console.log("GOT A CERTIFICATE ERROR")
    event.preventDefault();
    callback(true);
});



const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');


    const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
    };


  mainWindow = new BrowserWindow({
    show: false,
    width: 500,
    height: 250,
    icon: getAssetPath('icon.png'),
    frame: false, // removes menu,
    transparent: true, // lets us have rounded window 
    webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        nodeIntegrationInWorker: true,
    },
  });

//   mainWindow.webContents.on('context-menu', () => {
//       contextMenu.popup();
//   })

//   loginWindow.loadURL(`file://${__dirname}/index.html?login`);

  

// while designing new UI
//   mainWindow.loadURL(`file://${__dirname}/index.html#/login`);
  mainWindow.loadURL(`file://${__dirname}/index.html#/login`);


    electron.ipcMain.handle("authenticated", async event => {

        //@ts-ignore
        mainWindow.setSize(1500, 900)
        //@ts-ignore
        mainWindow.center();

        // @ts-ignore
        // @ts-ignore
        mainWindow.loadURL(`file://${__dirname}/index.html#/main/home`)

        // if (env.NODE_ENV === 'development') {
        //   return // Skip updates on development env
        // }
    });

    electron.ipcMain.handle('closeApp', async (event, ...args) => {
        // mainWindow?.webContents.send('startSave',123);
        mainWindow?.close();
    })

    electron.ipcMain.handle('minimizeApp', async (event, ...args) => {
        mainWindow?.minimize();
    })

  // open dev tools
//   if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
//   }

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });



  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // i disabled this so i could make context window
//   const menuBuilder = new MenuBuilder(mainWindow);
//   menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

//   authBundle(mainWindow);


  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
// app.commandLine.appendSwitch('allow-insecure-localhost', 'true')
// // SSL/TSL: this is the self signed certificate support
// app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
//     // On certificate error we disable default behaviour (stop loading the page)
//     // and we then say "it is all fine - true" to the callback
//     event.preventDefault();
//     callback(true);
// });
// if (process.env.NODE_ENV === 'DEV') {

//     // @ts-ignore
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
//   }
app.whenReady().then(() => {

    
    ipcBundle();

    createWindow();



    
}).catch(console.log);



app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});





