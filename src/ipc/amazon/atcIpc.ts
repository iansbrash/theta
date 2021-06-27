import electron from 'electron'
import AddToCart from '../../Logic/sites/Amazon/flow/atc/atc';

const atcIpc = () => {
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
}

export default atcIpc;