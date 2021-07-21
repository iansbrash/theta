import electron, { app } from 'electron';
import fse from 'fs-extra';
import path from 'path';
import testProfile from '../../Logic/sensitive/testInterfaces/testProfile';

export const getAppDataFolder = () : string => {
    return path.join( (electron.app || electron.remote.app).getPath('appData'), 'Thaeta' )
}

const ioBundle = () => {

    electron.ipcMain.handle('addfile', async (event, ...args) => {
        // args:
        // allCookies, product, proxy
        // const allCookies = args[0];
        // const product = args[1];
        // const proxy = args[2];
        const response = await electron.dialog.showOpenDialog({properties: ['openFile']});
        // contains canceled boolean, filePaths string[], bookmarks

        if (response.canceled) {
            console.log("File dialog was cancelled")
        }
        else {
            console.log(`Paths: ${response.filePaths}`)
            console.log('app.getAppPath: ' + app.getPath('appData'))

            // const writeRes = await fse.writeJSON(path.join( app.getPath('appData'), 'test,json' ), {
            //     name: 'wtf-extra'
            // } )
        }
    })

    electron.ipcMain.handle('writejson', async (event, ...args) => {

        const toWritePath = args[0]
        const content = args[1]

        if (!fse.existsSync(getAppDataFolder())){
            fse.mkdirSync(getAppDataFolder());
        }

        try {
            const writeRes = await fse.writeJSON(path.join( getAppDataFolder(), toWritePath ), content )
            console.log(content);
            console.log('Write success!')
        }
        catch (err) {
            throw err;
        }
    })

    electron.ipcMain.handle('readjson', async (event, ...args) => {

        const toWritePath = args[0];

        try {
            const packageObj = await fse.readJson(path.join( getAppDataFolder(), toWritePath ) );
            console.log(packageObj);
            return packageObj;

        }
        catch (err) {
            throw err;
        }
    })
}

export default ioBundle;