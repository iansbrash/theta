import ProfileObject from './ProfileObject';
import Size from './enums/Size';
import Site from './enums/Site';
import ProxyList from './ProxyList';
import TaskConfig from './site_task_config/TaskConfig'

interface Task {
    identifier: string,
    site?: Site,
    siteConfig?: TaskConfig,
    profile: ProfileObject,
    size: Size[],
    proxyList: ProxyList
    // do we want an individual proxy attribute as well?
}

export default Task;