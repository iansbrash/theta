interface ProxyGroup {
    name: string,
    favorite: boolean,
    proxies: Proxy[]
}

// parse proxies on add, rather than in-task
export interface Proxy {
    ip: string,
    port: string,
    username: string,
    password: string
}

export default ProxyGroup;