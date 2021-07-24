import signinIpc from './signinIpc';
import atcIpc from './atcIpc';
import checkoutIpc from './checkoutIpc';
import FAST_checkoutIpc from './FAST/FAST_checkoutIpc';

const amazonBundle = () => {
    signinIpc();
    atcIpc();
    checkoutIpc();
    FAST_checkoutIpc()
}

export default amazonBundle;