import electron from 'electron';
import amazonBundle from './amazon/amazonBundle';
import ioBundle from './io/io';

const ipcBundle = () => {

    electron.ipcMain.handle('IPCTest', async (event, ...args) => {
        console.log('Testing IPC')
        return "Test Success";
    })

    ioBundle();
    amazonBundle();
}


export default ipcBundle;