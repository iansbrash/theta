import React, { FC, useState } from "react";
import sendSuccess from '../../Logic/webhooks/discordsuccess';

interface SettingsInputProps {
    input: string,
    setInput: (s : string) => void,
    name: string,
    placeholder: string,
    width: string
}


const SettingsInput : FC<SettingsInputProps> = ({
    input,
    setInput,
    name,
    placeholder,
    width
} : SettingsInputProps) => {

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className="flex flex-col">
            <div className="text-indigo-100 font-medium text-xl ml-1">
                {name}
            </div>
            <input 
                placeholder={placeholder}
                value={input}
                onChange={(e) => handleChange(e)}
                className={`focus:outline-none bg-indigo-975 ${input === '' ?  'placeholder-indigo-400' : 'text-indigo-100'} caret-indigo-100 rounded-md p-1 ${width} text-2xl`}                          
            />
        </div>
        
    )
}

const Settings : FC = () => {

    const [monitorDelay, setMonitorDelay] = useState<string>("3000")
    const [errorDelay, setErrorDelay] = useState<string>("3000")
    const [discordWebhook, setDiscordWebhook] = useState<string>('')


    return (
        <div className="flex flex-col flex-1 justify-center items-center text-lg h-full shadow-lg bg-indigo-1000">
            <div className="w-full p-5 h-full">
                <div className="rounded-xl shadow-xl bg-indigo-950 w-full h-full flex flex-col justify-start items-center">
                    {/* Settings */}
                    <div className="w-full p-4 flex justify-start items-center text-indigo-100 text-4xl font-medium">
                        Settings
                    </div>

                    <div className="w-full px-5">
                        <SettingsInput 
                            input={monitorDelay}
                            setInput={setMonitorDelay}
                            name={'Monitor Delay'}
                            placeholder={monitorDelay}
                            width={'w-64'}
                        />
                        <SettingsInput 
                            input={errorDelay}
                            setInput={setErrorDelay}
                            name={'Error Delay'}
                            width={'w-64'}
                            placeholder={errorDelay}
                        />
                        <SettingsInput 
                            input={discordWebhook}
                            setInput={setDiscordWebhook}
                            name={'Discord Webhook'}
                            width={'w-full'}
                            placeholder={'https://discord.com/api/webhooks/1234567890/ABCDEFGHIJKLMNOPQRSTUVWXYZ'}
                        />
                    </div>

                    <div className="w-full justify-start px-5 mt-5">
                        <button>
                            <div className="p-1 bg-gradient-to-r from-indigo-600 to-indigo-400 w-64 rounded-lg flex justify-center items-center border">
                                <div className="text-2xl text-indigo-100">
                                    Save Settings
                                </div>
                                <div className="text-indigo-100 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                        <button
                        onClick={() => sendSuccess(discordWebhook)}
                        >
                            <div className="p-1 bg-gradient-to-r from-indigo-600 to-indigo-400 w-64 rounded-lg flex justify-center items-center border">
                                <div className="text-2xl text-indigo-100">
                                    Test Webhook
                                </div>
                                <div className="text-indigo-100 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


// settings:
// discord webhook
// delays
// log out / deactivate

export default Settings;