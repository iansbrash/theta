import electron from 'electron';
import amazonBundle from './amazon/amazonBundle';

const ipcBundle = () => {

    electron.ipcMain.handle('IPCTest', async (event, ...args) => {
        console.log('Testing IPC')
        return "Test Success";
    })


    amazonBundle();
}


export default ipcBundle;