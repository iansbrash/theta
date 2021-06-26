interface ProxyList {
    name: string,
    favorite: boolean,
    proxies: Proxy[]
}

// parse proxies on add, rather than in-task
export interface Proxy {
    ip: string,
    port: number,
    username: string,
    password: string
}

export default ProxyList;