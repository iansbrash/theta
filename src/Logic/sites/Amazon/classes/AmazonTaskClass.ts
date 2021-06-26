import Site from "../../../interfaces/enums/Site";
import Size from "../../../interfaces/enums/Size";
import ProfileObject from "../../../interfaces/ProfileObject";
import ProxyList from "../../../interfaces/ProxyList";
import TaskClass, { internalStatus } from "../../classes/TaskClass";
import AmazonTaskConfig from "../../../interfaces/site_task_config/AmazonTaskConfig";
import AmazonTask from '../flow/AmazonTask';

class AmazonTaskClass extends TaskClass {

    config : AmazonTaskConfig;

    constructor (
        identifier : number, 
        site : Site, 
        profile : ProfileObject, 
        size : Size[], 
        proxyList : ProxyList, 
        statusWatcher : undefined | ((s : string) => void), 
        config : AmazonTaskConfig) {

        super(identifier, site, profile, size, proxyList, statusWatcher);
        this.config = config;
    }

    async start() : Promise<void> {
        if (this.setStatusWatcher !== undefined && this.internalStatus === internalStatus.Idle){

            // @ts-ignore
            this.statusWatcher('Starting...');

            this.internalStatus = internalStatus.Active;

            const t = {
                identifier: this.identifier,
                site: this.site,
                // siteConfig: TaskConfig,
                profile: this.profile,
                size: this.size,
                proxyList: this.proxyList
            }

            // @ts-ignore
            AmazonTask(t, this.config, this.statusWatcher);
        }
        else {
            throw "StatusWatcher is undefined"
        }
    }

    stop() : void {
        if (this.setStatusWatcher !== undefined){

            // @ts-ignore
            this.statusWatcher('Stopped');
        }
        else {
            throw "StatusWatcher is undefined"
        }
    }
}

export default AmazonTaskClass;