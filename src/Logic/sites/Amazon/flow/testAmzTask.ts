import AmazonTask from './AmazonTask';
import testProfile from '../../../sensitive/testInterfaces/testProfile';
import testAccount from '../../../sensitive/testInterfaces/testAccount';
import testProxyList from '../../../sensitive/testInterfaces/testProxyList';
import Site from '../../../interfaces/enums/Site';
import Size from '../../../interfaces/enums/Size';
import { AmazonModes } from '../../../interfaces/site_task_config/AmazonTaskConfig';


(async () => {

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    // console.log(process.env.https_proxy)
// return;
    const task = {
        identifier: 1,
        site: Site.Amazon,
        profile: testProfile,
        size: [Size.OS],
        proxyList: testProxyList
    }

    const amazonTaskConfig = {
        mode: AmazonModes.Normal,
        account: testAccount
    }

    const res = await AmazonTask(task, amazonTaskConfig)


})();