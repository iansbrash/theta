import ProfileObject from './ProfileObject';
import Size from './enums/Size';
import Site from './enums/Site';
import ProxyList from './ProxyList';

interface Task {
    identifier: number,
    site: Site,
    // siteConfig: TaskConfig,
    profile: ProfileObject,
    size: Size[],
    proxyList: ProxyList
    // do we want an individual proxy attribute as well?
}

export default Task;