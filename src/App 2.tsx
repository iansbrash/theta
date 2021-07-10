import React, {
    useState,
    useEffect
} from "react";
import {
    HashRouter,
    Route,
    Link,
    useLocation
} from "react-router-dom";

// screen components
import Home from './Components 2/Home/Home';
import Profiles from "./Components 2/Profiles/Profiles";
import Settings from "./Components 2/Settings/Settings";
import Tasks from "./Components 2/Tasks/Tasks";
import Accounts from "./Components 2/Accounts/Accounts";
import Proxies from "./Components 2/Proxies/Proxies";
import Login from './Components 2/Login/Login';

// redux
import { useDispatch, useSelector } from "react-redux";
import { populateProfiles } from "./redux/reducers/profilesSlice";
import { populateAccounts } from './redux/reducers/accountsSlice';
import { populateAccountGroups } from "./redux/reducers/accountsSlice";
import { populateSettings } from "./redux/reducers/settingsSlice";

import RightClickMenu from "./Components 2/Component Library/RightClickMenu";

// dunno y this is here
import TaskClass from "./Logic/sites/classes/TaskClass";

// tailwind
import "./App.global.css";

// electron
import electron from 'electron'
import ProfileObject from "./Logic/interfaces/ProfileObject";
import { populateProxies } from "./redux/reducers/proxiesSlice";
import ProxyList from "./Logic/interfaces/ProxyList";
import { beginSave, populateTasks, TaskGroup, TaskSaveState } from "./redux/reducers/tasksSlice";
import { RootState } from "./redux/store";



const ExitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
)

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
)

const TasksIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
    </svg>

const ProxiesIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
    </svg>

const ProfilesIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
    </svg>

const SettingsIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    </svg>

const AccountsIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
    </svg>

const TempLogo = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
</svg>



const AppTwo = () => {

    const iconsArray = [
        <HomeIcon />,
        <TasksIcon />,
        <ProfilesIcon />,
        <ProxiesIcon />,
        <AccountsIcon />,
        <SettingsIcon />
    ]

    const toArray = [
        '/home',
        // '/addtasks',
        '/tasks',
        '/profiles',
        '/proxies',
        '/accounts',
        '/settings'
    ]

    const [selectedRoute, setSelectedRoute] = useState<string>('/home')
    

    const exitApp = () => {
        electron.ipcRenderer.invoke('closeApp')
    }
    
    const dispatch = useDispatch()

    const [rightClickMenuActive, setRightClickMenuActive] = useState<boolean>(false);
    const [clientX, setClientX] = useState<number>(0);
    const [clientY, setClientY] = useState<number>(0);

    window.oncontextmenu = function(e) {

        console.log(e);

        setClientX(e.clientX)
        setClientY(e.clientY)


        // @ts-ignore
        let e2 : any = e.target;
        while (e2.id !== 'root') {
            if (e2.className.includes("taskGroup")) {
                // alert(':)');
                break;
            }
            else {
                console.log(e2.parent)
                console.log(e2.parentNode)
                e2 = e2.parentNode;
            }
        }
        // console.log(e.target.className)

        // if (e.target.)
        // alert(':)');
        return false; /* prevent context menu from popping up */
    };
    



    // runs once at the beginning of the app and loads everything into the redux store
    useEffect(() => {
        (async () => {
            console.log("Beginning store population on app open/restart")

            const toSetProfiles : ProfileObject[] = await electron.ipcRenderer.invoke("readjson", 'profiles.json');
            dispatch(populateProfiles(toSetProfiles))

            const toSetProxies : ProxyList[] = await electron.ipcRenderer.invoke("readjson", 'proxies.json');
            dispatch(populateProxies(toSetProxies))

            const toSetAccounts : object = await electron.ipcRenderer.invoke("readjson", 'accounts.json');
            dispatch(populateAccounts(toSetAccounts))

            const toSetAccountGroups : object = await electron.ipcRenderer.invoke("readjson", 'accountgroups.json');
            dispatch(populateAccountGroups(toSetAccountGroups))

            const toSetSettings : object = await electron.ipcRenderer.invoke("readjson", "settings.json");
            dispatch(populateSettings(toSetSettings))

            const toSetTasks : object = await electron.ipcRenderer.invoke("readjson", "tasks.json");
            dispatch(populateTasks(toSetTasks))
        })();
    }, [])






    return (
        <HashRouter>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/main">
                <div className="relative flex flex-col h-screen w-screen justify-start items-center">
                    <RightClickMenu 
                        clientX={clientX}
                        clientY={clientY}
                        type={0}
                    />

                    <div className="rounded-lg relative flex flex-row h-full w-screen justify-start items-center bg-gradient-to-r from-theta-bg-start to-theta-bg">
                        {/* Bar */}
                        <div className="rounded-l-lg relative  z-10 flex h-full w-14 bg-theta-sidebar shadow-2xl flex-col justify-between items-center">

                            {/* Icons */}
                            <div className="relative flex flex-col justify-between items-center h-full">
                                <div className="flex flex-col space-y-4 justify-between items-center">
                                    <div className="p-1 mt-2 mb-2 text-theta-logo rounded-lg">
                                        <TempLogo />
                                    </div>
                                    {iconsArray.map((icon, index : number) => (
                                        <Link to={"/main" + toArray[index]}>
                                            <button className={`transition transform hover:scale-110 duration-500 ease-in-out focus:outline-none p-1 rounded-lg ${toArray[index] === selectedRoute ? 'text-theta-sidebar-icon-selected shadow-md bg-theta-sidebar-dark' : 'text-theta-sidebar-icon'}`}
                                            onClick={() => setSelectedRoute(toArray[index])}
                                            >
                                                {icon}
                                            </button>
                                        </Link>
                                    ))}
                                </div>

                                {/* Draggable Region */}
                                <div className="w-full h-full"
                                id="dragRegion"
                                >

                                </div>

                                {/* Exit Button */}
                                <button className="text-theta-logo mb-4 focus:outline-none"
                                onClick={() => exitApp()}
                                >
                                    <ExitIcon />
                                </button>
                            </div>
                        </div>

                        {/* Actual Tasks */}
                        <div className="absolute left-14 right-0 top-0 bottom-0">
                            <Tasks />
                        </div>

                        {/* Home */}
                        <Route path="/main/home" exact>
                            <Home />
                        </Route>
                        
                        {/* Tasks */}
                        <Route path="/main/tasks">
                            {/* <Tasks /> */}
                        </Route>

                        {/* Home */}
                        <Route path="/main/profiles">
                            <Profiles />
                        </Route>

                        {/* Home */}
                        <Route path="/main/proxies">
                            <Proxies />
                        </Route>

                        {/* Home */}
                        <Route path="/main/accounts">
                            <Accounts />
                        </Route>

                        {/* Home */}
                        <Route path="/main/settings">
                            <Settings />
                        </Route>
                    </div>
                </div>
            </Route>
        </HashRouter> 
    );
}

export default AppTwo;
