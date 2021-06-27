import electron from 'electron'
import Checkout from '../../Logic/sites/Amazon/flow/checkout/checkout';

const checkoutIpc = () => {

    electron.ipcMain.handle('AmazonCheckout', async (event, ...args) => {
        // args:
        // allCookies, proxy
        const allCookies = args[0];
        const proxy = args[1];

    
        // res is cookies
        const res = await Checkout(allCookies, proxy);

        return res;
    })
}

export default checkoutIpc;