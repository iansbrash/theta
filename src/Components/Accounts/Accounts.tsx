import React, { FC, useState, useEffect } from "react";
import {
    AbstractSelector
} from '../Add Tasks/AddTasks';
import electron from 'electron';
import Account from "../../Logic/interfaces/Account";
import Site from "../../Logic/interfaces/enums/Site";

const accountToString = (a : Account) : string => {
    return a.username + ':' + a.password;
}

const Accounts : FC = () => {


    const [accountSiteSelection, setAccountSiteSelection] = useState<string>('')
    const [accounts, setAccounts] = useState<string>('');
    const [loadedAccounts, setLoadedAccounts] = useState<Account[]>([])

    useEffect(() => {
        (async () => {
            const res : Account[] = await electron.ipcRenderer.invoke('readjson', 'accounts.json');

            setLoadedAccounts(res);
        })();
    }, []);

    const handleSiteSelectionChange = async (s : string) => {
        setAccountSiteSelection(s)

        if (s === '') return setAccounts('');

        // @ts-ignore
        setAccounts(loadedAccounts.filter((acc : Account) => acc.site !== Site[Site[accountSiteSelection]]).map((acc : Account) => accountToString(acc)).join('\n') )
    }

    const saveAccounts = async () => {
        const newAccounts : Account[] = accounts.split(/\r?\n/).map(acc => {
            return {
                // @ts-ignore
                site: Site[Site[accountSiteSelection]],
                username: acc.substring(0, acc.indexOf(':')),
                password: acc.substring(acc.indexOf(':') + 1)
            }
        })

        // @ts-ignore
        setLoadedAccounts([...loadedAccounts.filter((acc : Account) => acc.site !== Site[Site[accountSiteSelection]]), ...newAccounts])

        const res = await electron.ipcRenderer.invoke('writejson', 'accounts.json', newAccounts)
    }

    

    return (
        <div className="flex flex-col flex-1 justify-center items-center text-lg h-full shadow-lg bg-indigo-1000">
            <div className="w-full p-5 h-full">
                <div className="rounded-xl shadow-xl bg-indigo-950 w-full h-full flex flex-col justify-start items-center">
                    {/* Accounts */}
                    <div className="w-full p-4 flex justify-start items-center text-indigo-100 text-4xl font-medium">
                        Accounts
                    </div>

                    {/* Name Proxy Group */}
                    <div className="w-full flex justify-between items-center py-1">
                        <div className="-mt-3">
                            <AbstractSelector 
                                width={'w-64'}
                                defaultText={'Select Site'}
                                selection={accountSiteSelection}
                                setSelection={handleSiteSelectionChange}
                                selectionOptions={["Amazon"]}
                            />
                        </div>
                        <button className="mr-5"
                        onClick={() => saveAccounts()}
                        >
                            <div className="p-1 bg-gradient-to-r from-indigo-600 to-indigo-400 w-64 rounded-lg flex justify-center items-center border">
                                <div className="text-2xl text-indigo-100">
                                    Save Accounts
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

                    {/* Accounts input */}
                    <div className="w-full flex-1 flex justify-start px-5 -mt-1">
                        <textarea 
                            placeholder={'user1234@gmail.com:mysafepassword1234'}
                            value={accounts}
                            onChange={(e) => setAccounts(e.target.value)}
                            className={`w-full resize-none focus:outline-none bg-indigo-975 ${accounts === '' ?  'placeholder-indigo-400' : 'text-indigo-100'} caret-indigo-100 rounded-md p-1 w-64 text-lg`}                          
                        />
                    </div>

                    {/* Select Proxies */}
                    
                    <div className="h-4"></div>
                </div>
            </div>
        </div>
    )
}

export default Accounts;