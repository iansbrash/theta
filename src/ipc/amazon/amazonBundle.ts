import signinIpc from './signinIpc';
import atcIpc from './atcIpc';
import checkoutIpc from './checkoutIpc';

const amazonBundle = () => {
    signinIpc();
    atcIpc();
    checkoutIpc();
}

export default amazonBundle;