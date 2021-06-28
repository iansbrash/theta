/* tslint:disable */

const AmazonTask = require( "./AmazonTask");
const Task = require( "../../../interfaces/Task");
const Site = require( "../../../interfaces/enums/Site");
const testProfile = require( "../../../sensitive/testInterfaces/testProfile");
const Size = require( "../../../interfaces/enums/Size");
const testProxyList = require( "../../../sensitive/testInterfaces/testProxyList");
const AmazonTaskConfig = require( "../../../interfaces/site_task_config/AmazonTaskConfig");
const testAccount = require( "../../../sensitive/testInterfaces/testAccount");



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

    // @ts-ignore
    const res = await AmazonTask(t, c, (s) => null)


})();