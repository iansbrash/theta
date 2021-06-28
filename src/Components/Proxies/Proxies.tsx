import React, { FC, useState, useEffect } from "react";
import {
    AbstractSelector
} from '../Add Tasks/AddTasks';
import electron from 'electron';
import ProxyList, { Proxy } from "../../Logic/interfaces/ProxyList";
import { program } from "@babel/types";

const stringToProxy = (s : string) : Proxy => {

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

const proxyToString = (p : Proxy) : string => {

    const front = p.ip + ':' + p.port;
    const back = p.username === '' && p.password === '' ? '' : ':' + p.username + ':' + p.password
    return front + back;
}

const Proxies : FC = () => {

    const [proxyGrp, setProxyGrp] = useState<string>('');
    const [newGrpName, setNewGrpName] = useState<string>('');
    const [proxyInput, setProxyInput] = useState<string>('');
    const [loadedProxies, setLoadedProxies] = useState<ProxyList[]>([]);

    const saveProxies = async () => {

        const newProxies : ProxyList = {
            name: newGrpName,
            favorite: false,
            proxies: proxyInput.split(/\r?\n/).map(pro => {
                return stringToProxy(pro)
            })
        }

        setLoadedProxies([...loadedProxies, newProxies])

        const res = await electron.ipcRenderer.invoke('writejson', 'proxies.json', [...loadedProxies, newProxies]);
    }

    useEffect(() => {
        (async () => {
            const pr = await electron.ipcRenderer.invoke('readjson', 'proxies.json')
            setLoadedProxies(pr)
        })();
    }, []);

    const handleGroupSelectionChange = (s : string) => {
        setProxyGrp(s);
        setNewGrpName(s);

        if (s === '') return setProxyInput('');

        // @ts-ignore
        setProxyInput( loadedProxies.find((prGr : ProxyList) => prGr.name === s).proxies.map(pro => proxyToString(pro)).join('\n') )
    }

    const handleProxyGrpChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setNewGrpName(e.target.value);
        // setProxyInput(e.target.value);
    } 

    const handleProxyInputChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setProxyInput(e.target.value);
    } 

    return (
        <div className="flex flex-col flex-1 justify-center items-center text-lg h-full shadow-lg bg-indigo-1000">
            <div className="w-full p-5 h-full flex flex-col">
                <div className="rounded-xl shadow-xl bg-indigo-950 w-full h-full flex flex-col justify-start items-center">
                    {/* Title */}
                    <div className="w-full p-4 flex justify-start items-center text-indigo-100 text-4xl font-medium">
                        Proxies
                    </div>

                    {/* Name Proxy Group */}
                    <div className="w-full flex justify-between px-5 py-1">
                        <input 
                            placeholder={'Residential Proxies'}
                            value={newGrpName}
                            onChange={(e) => handleProxyGrpChange(e)}
                            className={`focus:outline-none bg-indigo-975 ${newGrpName === '' ?  'placeholder-indigo-400' : 'text-indigo-100'} caret-indigo-100 rounded-md p-1 w-64 text-2xl`}                          
                        />
                        <button
                        onClick={() => saveProxies()}
                        >
                            <div className="p-1 bg-gradient-to-r from-indigo-600 to-indigo-400 w-64 rounded-lg flex justify-center items-center border">
                                <div className="text-2xl text-indigo-100">
                                    Save Proxies
                                </div>
                                <div className="text-indigo-100 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="h-2"></div>

                    {/* Proxies input */}
                    <div className="w-full flex-1 flex justify-start px-5">
                        <textarea 
                            placeholder={'123.45.67.89:12345:username:password'}
                            value={proxyInput}
                            onChange={(e) => handleProxyInputChange(e)}
                            className={`w-full resize-none focus:outline-none bg-indigo-975 ${proxyInput === '' ?  'placeholder-indigo-400' : 'text-indigo-100'} caret-indigo-100 rounded-md p-1 w-64 text-sm`}                          
                        />
                    </div>

                    {/* Select Proxies */}
                    <AbstractSelector 
                        width={'w-64'}
                        defaultText={'Select Proxy Group'}
                        selection={proxyGrp}
                        setSelection={handleGroupSelectionChange}
                        selectionOptions={loadedProxies.map((prGr : ProxyList) => prGr.name)}
                    />
                    <div className="h-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Proxies;