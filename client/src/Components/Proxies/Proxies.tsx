import React, { FC, useState } from "react";
import {
    AbstractSelector
} from '../Add Tasks/AddTasks';

const Proxies : FC = () => {

    const [proxyGrp, setProxyGrp] = useState<string>('');
    const [newGrpName, setNewGrpName] = useState<string>('');
    const [proxyInput, setProxyInput] = useState<string>('');

    const handleGroupSelectionChange = (s : string) => {
        setProxyGrp(s);
        setNewGrpName(s);
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
                        <button>
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
                        selectionOptions={['List 1', 'List 2', 'ISPs', 'Leaf Resi']}
                    />
                    <div className="h-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Proxies;