import React, {
    useState
} from "react";
import {
    HashRouter,
    Route,
    Link
} from "react-router-dom";

import Home from './Components 2/Home/Home';
import AddTasks from "./Components/Add Tasks/AddTasks";
import Profiles from "./Components 2/Profiles/Profiles";
import Settings from "./Components/Settings/Settings";
import Tasks from "./Components 2/Tasks/Tasks";
import Accounts from "./Components 2/Accounts/Accounts";
import Proxies from "./Components 2/Proxies/Proxies";
import TaskClass from "./Logic/sites/classes/TaskClass";
import "./App.global.css";
import Login from './Components/Login/Login';
import electron from 'electron'

const ExitIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
)

const MoveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
)

const MinimizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
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


const AddTasksIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
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
        // <AddTasksIcon />,
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

    const [tasks, setTasks] = useState<TaskClass[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<string>('/home')

    const exitApp = () => {
        electron.ipcRenderer.invoke('closeApp')
    }


    return (
        <HashRouter>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/main">
                <div className="relative flex flex-col h-screen w-screen justify-start items-center">

                    {/* <div className="z-30 rounded-lg absolute right-0 top-0 w-auto h-8">
                        <div className="rounded-tr-lg  rounded-bl-lg bg-theta-sidebar flex flex-row h-full justify-end items-center space-x-2 px-2">
                            <div className="text-theta-gray-2">
                                <MoveIcon />
                            </div>     
                            <div className="text-theta-gray-2">
                                <MinimizeIcon />
                            </div>
                            <div className="text-theta-gray-2">
                                <ExitIcon />
                            </div>
                        </div>
                    </div> */}

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

                        {/* Home */}
                        <Route path="/main/home" exact>
                            <Home />
                        </Route>

                        {/* AddTasks */}
                        {/* <Route path="/main/addtasks"> */}
                            {/* <AddTasks 
                                tasks={tasks}
                                setTasks={setTasks}
                            /> */}
                        {/* </Route> */}
                        
                        {/* Tasks */}
                        <Route path="/main/tasks">
                            <Tasks />
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
                            {/* <Settings /> */}
                        </Route>
                    </div>
                </div>
            </Route>
        </HashRouter> 
    );
}

export default AppTwo;
