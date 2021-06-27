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
import MenuBuilder from './menu';

import AmazonTaskConfig from './Logic/interfaces/site_task_config/AmazonTaskConfig';
import AmazonTaskClass from './Logic/sites/Amazon/classes/AmazonTaskClass';
import { AmazonModes } from './Logic/interfaces/site_task_config/AmazonTaskConfig';
import Site from './Logic/interfaces/enums/Site';
import Size from './Logic/interfaces/enums/Size';
import testAccount from './Logic/sensitive/testInterfaces/testAccount';
import testProfile from './Logic/sensitive/testInterfaces/testProfile';
import testProxyList from './Logic/sensitive/testInterfaces/testProxyList';
import electron from 'electron';
import AmazonTask from './Logic/sites/Amazon/flow/AmazonTask';
import Task from './Logic/interfaces/Task';
import SignIn from './Logic/sites/Amazon/flow/signin/signin';
import AddToCart from './Logic/sites/Amazon/flow/atc/atc';
import Checkout from './Logic/sites/Amazon/flow/checkout/checkout';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

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
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // open dev tools
  mainWindow.webContents.openDevTools({ mode: 'detach' });

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

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

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

app.whenReady().then(() => {

    
    // deprecated?
    electron.ipcMain.handle('StartAmazon', async (event, ...args) => {

        const amazonTaskConfig : AmazonTaskConfig = {
            mode: AmazonModes.Normal,
            account: testAccount
        }

        const as = (s : string) => {
            console.log("Status: " + s);
        }


        const testTask : Task = {
            identifier: 1,
            site: Site.Amazon,
            profile: testProfile,
            size: [Size.OS],
            proxyList: testProxyList,
            // as, // status watcher
            // amazonTaskConfig
        }

        console.log('main: auth', event, args)

        console.log('before testClass.start()')
        const res = await AmazonTask(testTask, amazonTaskConfig, as);
    
        return res;
    })

    electron.ipcMain.handle('AmazonSignIn', async (event, ...args) => {
        // args:
        // user, pass, proxy
        const user = args[0];
        const pass = args[1];
        const proxy = args[2];

       
        // res is cookies
        const res = await SignIn(user, pass, proxy);
    
        return res;
    });

    (() => {electron.ipcMain.handle('AmazonGETMainLoginPage', async (event, ...args) => {
        // args:
        // user, pass, proxy
        const user = args[0];
        const pass = args[1];
        const proxy = args[2];

       
        // res is cookies
        const res = await SignIn(user, pass, proxy);
    
        return res;
    })})();

    electron.ipcMain.handle('AmazonPOSTMainLoginPage', async (event, ...args) => {
        // args:
        // user, pass, proxy
        const user = args[0];
        const pass = args[1];
        const proxy = args[2];

       
        // res is cookies
        const res = await SignIn(user, pass, proxy);
    
        return res;
    })

    electron.ipcMain.handle('AmazonPOSTSubLoginPage', async (event, ...args) => {
        // args:
        // user, pass, proxy
        const user = args[0];
        const pass = args[1];
        const proxy = args[2];

       
        // res is cookies
        const res = await SignIn(user, pass, proxy);
    
        return res;
    })

    electron.ipcMain.handle('AmazonATC', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        const allCookies = args[0];
        const product = args[1];
        const proxy = args[2];

       
        // res is cookies
        const res = await AddToCart(allCookies, product, proxy);
    
        return res;
    })

    electron.ipcMain.handle('AmazonCheckout', async (event, ...args) => {
        // args:
        // allCookies, proxy
        const allCookies = args[0];
        const proxy = args[1];

       
        // res is cookies
        const res = await Checkout(allCookies, proxy);
    
        return res;
    })

    createWindow();

    
}).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();

  
    

});





