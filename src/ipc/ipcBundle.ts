import electron from 'electron';
import amazonBundle from './amazon/amazonBundle';
import ioBundle from './io/io';
import walmartBundle from './walmart/walmartBundle';

const ipcBundle = () => {
    electron.ipcMain.handle('IPCTest', async (event, ...args) => {
        console.log('Testing IPC')
        return "Test Success";
    })

    ioBundle();
    amazonBundle();
    walmartBundle();
}


export default ipcBundle;