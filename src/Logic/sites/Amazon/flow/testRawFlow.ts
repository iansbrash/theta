/* tslint:disable */

import Site from "../../../interfaces/enums/Site";
import testProfile from "../../../sensitive/testInterfaces/testProfile";
import Size from "../../../interfaces/enums/Size";
import testProxyList from "../../../sensitive/testInterfaces/testProxyList";
import testAccount from "../../../sensitive/testInterfaces/testAccount";
import { AmazonModes } from "../../../interfaces/site_task_config/AmazonTaskConfig";
import AmazonTaskConfig from "../../../interfaces/site_task_config/AmazonTaskConfig";
import Task from "../../../interfaces/Task";
import AmazonTask from "./AmazonTask";

(async () => {

    const t : Task = {
        identifier: 1,
        site: Site.Amazon,
        profile: testProfile,
        size: [Size.OS],
        proxyList: testProxyList
    }

    const c : AmazonTaskConfig = {
        mode: AmazonModes.Fast,
        account: testAccount
    }

    const res = await AmazonTask(t, c, () => null)
    console.log(res)


})();