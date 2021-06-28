import AmazonTask from './AmazonTask';
import testProfile from '../../../sensitive/testInterfaces/testProfile';
import testAccount from '../../../sensitive/testInterfaces/testAccount';
import testProxyList from '../../../sensitive/testInterfaces/testProxyList';
import Site from '../../../interfaces/enums/Site';
import Size from '../../../interfaces/enums/Size';
import AmazonTaskConfig, { AmazonModes } from '../../../interfaces/site_task_config/AmazonTaskConfig';
import Task from '../../../interfaces/Task';
import AmazonTaskClass from '../classes/AmazonTaskClass';

(async () => {


    const as = (s : string) => {

    }

    const amazonTaskConfig : AmazonTaskConfig = {
        mode: AmazonModes.Normal,
        account: testAccount
    }

    const testClass = new AmazonTaskClass(
        1,
        Site.Amazon,
        testProfile,
        [Size.OS],
        testProxyList,
        'https://www.amazon.com/Mkeke-Compatible-iPhone-11-Clear/dp/B07W4FMQ5Y/',
        amazonTaskConfig
    )

    await testClass.start();

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    // console.log(process.env.https_proxy)
// return;

    

    // const task : Task = {
    //     identifier: 1,
    //     site: Site.Amazon,
    //     profile: testProfile,
    //     size: [Size.OS],
    //     proxyList: testProxyList,
    //     siteConfig: amazonTaskConfig
    // }

    

    // const res = await AmazonTask(task)


})();

export default 1;