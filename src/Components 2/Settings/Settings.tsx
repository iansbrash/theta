import React, {
    FC,
    useState 
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';
import TextInput from '../Component Library/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateDefaultDelays, updateDefaultWebhooks } from '../../redux/reducers/settingsSlice';

const Settings = () => {

    const defaultMonitorDelay : number = useSelector((state : RootState)  => state.settings.defaults.delays.monitor)
    const defaultErrorDelay : number = useSelector((state : RootState)  => state.settings.defaults.delays.error)
    const defaultDiscordWebhook : string = useSelector((state : RootState)  => state.settings.defaults.webhooks.discord)


    const dispatch = useDispatch();

    const dMDOnChange = (s : string) => {
        dispatch(updateDefaultDelays("monitor", s === '' ? 0 : parseInt(s)))
    }

    const dEDOnChange = (s : string) => {
        dispatch(updateDefaultDelays("error", s === '' ? 0 : parseInt(s)))
    }

    const discordWebhookOnChange = (s : string) => {
        dispatch(updateDefaultWebhooks("discord", s))
    }

    return (
        <div className="flex flex-1 h-full">
            <div className="w-full h-full flex flex-row">
                <div className="w-1/2 h-full">
                    <ScreenWrapper>
                        <div className="px-4 mb-2 flex flex-row justify-start items-center w-full">
                            <div className="text-2xl font-medium text-theta-white">
                                Settings
                            </div>
                            <div className="text-theta-gray-2 ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-start items-start p-4 space-y-2">
                            <div className="font-medium text-theta-gray-2 text-xl ml-4">
                                Defaults
                            </div>

                            <div className="flex flex-row justify-center items-center space-x-20 w-full px-4">
                                {/* Monitor Delay */}
                                <div className="px-4 flex flex-col justify-start items-start w-1/2">
                                    <div className="ml-3 text-theta-gray-7 text-md">
                                        Monitor Delay
                                    </div>
                                    <div className="w-full h-8">
                                        <TextInput 
                                        placeholder={'3000'}
                                        input={defaultMonitorDelay.toString()}
                                        onChange={dMDOnChange}
                                        bg={'bg-theta-sidebar'}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        }
                                        offsetWidth={'w-9'}
                                        />
                                    </div>
                                </div>

                                {/* Error Delay */}
                                <div className="px-4 flex flex-col justify-start items-start w-1/2">
                                    <div className="ml-3 text-theta-gray-7 text-md">
                                        Error Delay
                                    </div>
                                    <div className="w-full h-8">
                                        <TextInput 
                                        placeholder={'3000'}
                                        input={defaultErrorDelay.toString()}
                                        onChange={dEDOnChange}
                                        bg={'bg-theta-sidebar'}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        }
                                        offsetWidth={'w-9'}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full px-8">
                                <div className="ml-3 text-theta-gray-7 text-md">
                                    Discord Webhook
                                </div>
                                <div className="w-full h-8">
                                    <TextInput 
                                        placeholder={'https://discord.com/api/webhooks/736390069473629573...'} //https://discord.com/api/webhooks/736390069473629573/Kau5912875o128574_b12W9ks01lZ04mSo284A9sgmz311K7HjB92105Ka8sS210c5S1
                                        input={defaultDiscordWebhook}
                                        onChange={discordWebhookOnChange}
                                        bg={'bg-theta-sidebar'}
                                        icon={
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        }
                                        offsetWidth={'w-9'}
                                    />
                                </div>
                               

                            </div>

                            <div className="h-10">

                            </div>

                            <div className="font-medium text-theta-gray-2 text-xl ml-4">
                                License
                            </div>

                            <div className="flex flex-row justify-center items-center space-x-2 w-full px-4">
                                <div className="px-4 flex flex-col justify-start items-start w-full">
                                    <div className="w-full bg-theta-tasks-taskgroup shadow-lg rounded-lg p-4">
                                        <div className="flex flex-row justify-start items-center w-full h-20 bg-theta-sidebar rounded-lg shadow-lg space-x-2">
                                            <div className="h-16 rounded-full bg-theta-bg m-2 w-16">

                                            </div>

                                            <div className="flex flex-col justify-center items-start">
                                                <div className="text-theta-white text-2xl font-medium leading-3">
                                                    iaen<span className="text-theta-gray-2 text-lg">#2317</span>
                                                </div>
                                                <div className="text-theta-gray-7 text-md leading-3">
                                                    Expires never
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Dashboard / Deactivate */}
                                        <div className="w-full flex flex-row mt-4">
                                            <div className="w-1/2 pr-4 h-10">
                                                <div className="w-full h-full flex flex-row border-2 border-theta-logo bg-theta-settings-dashboard rounded-lg shadow-lg justify-center items-center">
                                                    <div className="text-xl font-medium text-theta-settings-dashboard-text">
                                                        Dashboard
                                                    </div>
                                                    <div className="text-theta-settings-dashboard-text ml-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-1/2 pl-4 h-10">
                                                <div className="w-full h-full flex flex-row border-2 border-theta-settings-deactivate-border bg-theta-settings-deactivate rounded-lg shadow-lg justify-center items-center">
                                                    <div className="text-xl font-medium text-theta-settings-dashboard-text">
                                                        Deactivate
                                                    </div>
                                                    <div className="text-theta-settings-dashboard-text ml-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScreenWrapper>
                </div>

                <div className="w-1/2 h-full">
                    <ScreenWrapper>
                        <div className="rounded-lg p-2 shadow-lg w-full h-full bg-theta-tasks-taskgroup flex justify-center items-center">
                            <div className="text-4xl text-theta-gray-7 font-bold">
                                Coming soon 🤯
                            </div>
                        </div>
                    </ScreenWrapper>
                </div>
            </div>
        </div>
    )
}

export default Settings;