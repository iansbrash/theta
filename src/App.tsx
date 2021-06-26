import React, {
    FC,
    useState
} from "react";
import {
    HashRouter,
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import AddTasks from "./Components/Add Tasks/AddTasks";
import Profiles from "./Components/Profiles/Profiles";
import Settings from "./Components/Settings/Settings";
import Tasks from "./Components/Tasks/Tasks";
import Accounts from "./Components/Accounts/Accounts";
import Proxies from "./Components/Proxies/Proxies";

import Task from "./Logic/interfaces/Task";


const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
)

const TasksIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>


const AddTasksIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>


const ProxiesIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>


const ProfilesIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>


const SettingsIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>


const AccountsIcon = () => 
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>



const App = () => {

    const iconsArray = [
        <HomeIcon />,
        <AddTasksIcon />,
        <TasksIcon />,
        <ProfilesIcon />,
        <ProxiesIcon />,
        <AccountsIcon />,
        <SettingsIcon />
    ]

    const toArray = [
        '/',
        '/addtasks',
        '/tasks',
        '/profiles',
        '/proxies',
        '/accounts',
        '/settings'
    ]

    const [tasks, setTasks] = useState<Task[]>([]);


    return (
        <HashRouter>
            <div className="relative flex flex-row h-screen w-screen justify-start items-center bg-pink-100">
                {/* Bar */}
                <div className="relative text-indigo-300 z-10 flex h-screen w-20 bg-gradient-to-b from-indigo-950 to-indigo-975 shadow-2xl flex-col justify-between items-center">
                    {/* Logo */}
                    <div className="w-14 h-14 rounded-full bg-white mt-4 flex justify-center items-center">
                        Logo
                    </div>

                    {/* Icons */}
                    <div className="flex flex-col space-y-6">
                        {iconsArray.map((icon, index : number) => (
                            <Link to={toArray[index]}>
                                <div className="shadow-xl p-1 bg-indigo-900 rounded-lg">
                                    {icon}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Discord Icon */}
                    <div className="w-14 h-14 rounded-full bg-white mb-4 flex justify-center items-center">
                        Discord
                    </div>
                </div>
                {/* Home */}
                <Route path="/" exact>
                    <Home />
                </Route>

                {/* AddTasks */}
                <Route path="/addtasks">
                    <AddTasks 
                        setTasks={setTasks}
                    />
                </Route>
                
                {/* Tasks */}
                <Route path="/tasks">
                    <Tasks 
                        tasks={tasks}
                    />
                </Route>

                {/* Home */}
                <Route path="/profiles">
                    <Profiles />
                </Route>

                {/* Home */}
                <Route path="/proxies">
                    <Proxies />
                </Route>

                {/* Home */}
                <Route path="/accounts">
                    <Accounts />
                </Route>

                {/* Home */}
                <Route path="/settings">
                    <Settings />
                </Route>
            </div>
        </HashRouter> 
    );
}

export default App;
