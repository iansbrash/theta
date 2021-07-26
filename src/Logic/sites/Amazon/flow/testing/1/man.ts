/* tslint:disable */

import Site from "../../../../../interfaces/enums/Site";
import testProfile from "../../../../../sensitive/testInterfaces/testProfile";
import Size from "../../../../../interfaces/enums/Size";
import testProxyList from "../../../../../sensitive/testInterfaces/testProxyList";
import testAccount from "../../../../../sensitive/testInterfaces/testAccount";
import { AmazonModes } from "../../../../../interfaces/site_task_config/AmazonTaskConfig";
import AmazonTaskConfig from "../../../../../interfaces/site_task_config/AmazonTaskConfig";
import Task from "../../../../../interfaces/Task";
import AmazonTask from "./AmazonTask";
const workerTs = (file: string, wkOpts: WorkerOptions) => {

    // @ts-ignore
    wkOpts.eval = true;
    // @ts-ignore
    if (!wkOpts.workerData) {
    // @ts-ignore
        wkOpts.workerData = {};
    }
    // @ts-ignore
    wkOpts.workerData.__filename = file;
    return new Worker(`
            const wk = require('worker_threads');
            require('ts-node').register();
            let file = wk.workerData.__filename;
            delete wk.workerData.__filename;
            require(file);
        `,
        wkOpts
    );
}

const { Worker, isMainThread, parentPort } = require('worker_threads');
if (isMainThread) {
  // This code is executed in the main thread and not in the worker.
  
  // Create the worker.
  const worker = workerTs(__filename, {});
  // Listen for messages from the worker and print them.
  worker.on('message', async () => { 
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
    });
} else {
  // This code is executed in the worker and not in the main thread.
  
  // Send a message to the main thread.
  parentPort.postMessage('Hello world!');
}
