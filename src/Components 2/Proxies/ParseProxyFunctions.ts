import { Proxy } from "../../Logic/interfaces/ProxyList";

export const stringToProxy = (s : string) : Proxy => {

    const ip = s.substring(0, s.indexOf(':'));
    s = s.substring(ip.length + 1);
    let port, user, pass;
    if (s.indexOf(':') === -1) {

        port = parseInt(s);

        return {
            ip,
            port,
            username: '',
            password: ''
        }
    }
    else {
        port = s.substring(0, s.indexOf(':'))
        s = s.substring(port.length + 1)
        user = s.substring(0, s.indexOf(':'));
        s = s.substring(user.length + 1);
        pass = s;

        return {
            ip,
            port: parseInt(port),
            username: user,
            password: pass
        }
    }
}

export const proxyToString = (p : Proxy) : string => {

    const front = p.ip + ':' + p.port;
    const back = p.username === '' && p.password === '' ? '' : ':' + p.username + ':' + p.password
    return front + back;
}