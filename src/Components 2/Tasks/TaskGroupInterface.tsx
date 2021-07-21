import React, {
    FC, useState,
    useEffect,
    ReactNode,
    useRef
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';
import AutoResizerTaskComponent from './AutoResizerTaskComponent'
import { AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css';
import ScreenWrapperModal from '../Component Library/ScreenWrapperModal'
import TextInputCL from '../Component Library/TextInput'
import DropdownSelect from '../Component Library/DropdownSelect';
import DropdownSelectMulti from '../Component Library/DropdownSelectMulti';
import { AmazonModes } from '../../Logic/interfaces/site_task_config/AmazonTaskConfig';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import ProxyList from '../../Logic/interfaces/ProxyList';
import Account, { AccountGroup } from '../../Logic/interfaces/Account';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import Site from '../../Logic/interfaces/enums/Site';
import Size from '../../Logic/interfaces/enums/Size';
import { TaskSaveState, saveTaskGroupOnAdd, activateNumberCommander } from '../../redux/reducers/tasksSlice'
import electron from 'electron';
import AmazonTaskClass from '../../Logic/sites/Amazon/classes/AmazonTaskClass';
import TaskClass from '../../Logic/sites/classes/TaskClass';
import store from '../../redux/store'


interface TextInputProps {
    placeholder: string,
    icon: ReactNode,
    input: number,
    setInput: (s : number) => void,
}

const TextInput : FC<TextInputProps> = ({
    placeholder,
    icon,
    input,
    setInput
}: TextInputProps) => {


    return (
        <button className={`relative focus:outline-none w-full h-full rounded-lg bg-transparent flex flex-col justify-start items-center`}
        onClick={() => null}
        >
            <div className="h-full flex flex-row justify-start items-center">
                <div className="w-8"></div>
                <input
                    value={input}
                    onChange={(e) => setInput(parseInt( e.target.value ))}
                    style={{WebkitAppearance: 'none'}}
                    placeholder={placeholder}
                    className={`rounded-lg h-full w-full bg-transparent focus:outline-none placeholder-theta-gray-7 text-theta-gray-2 text-xl`}
                />
            </div>
            <div className="text-theta-gray-7 absolute left-0 top-0 bottom-0 flex justify-center items-center">
                {icon}
            </div>
        </button>
    ) 
}



export interface TaskHookProps {
    taskConfig: {
        identifier: any,
        site: Site,
        size: Size[],
        profile: ProfileObject,
        proxies: ProxyList,
        input: string
    },
    siteConfig: any
}

interface TaskGroupInterfaceProps {
    hidden: boolean,
    taskGroupName: string
}

const TaskGroupInterface : FC<TaskGroupInterfaceProps> = ({
    hidden,
    taskGroupName
} : TaskGroupInterfaceProps) => {

    const [monitorDelay, setMonitorDelay] = useState<number>(3000);
    const [errorDelay, setErrorDelay] = useState<number>(3000);

    const dispatch = useDispatch(); 

    // Add Tasks hooks
    const allProfiles : ProfileObject[] = useSelector((state : RootState) => state.profiles.profilesArray)
    const allProxies : ProxyList[] = useSelector((state : RootState) => state.proxies.proxiesArray)

    // @ts-ignore
    const allAccounts : AccountGroup[] = useSelector((state : RootState) => state.accounts.accountsObject["Amazon"])
    // @ts-ignore
    const allAccountGroups : AccountGroup[] = useSelector((state : RootState) => state.accounts.accountGroupObject["Amazon"])

    // our actual tasks!    
    const [tasks, setTasks] = useState<TaskHookProps[]>([]);
    const [tasks2, setTasks2] = useState<AmazonTaskClass[]>([]);

    const taskGroupsSelector = useSelector((state : RootState) => state.tasks.taskGroups.find(tg => tg.name === taskGroupName))

    // @ts-ignore
    const [selectSiteInput, setSelectSiteInput] = useState<Site>(taskGroupsSelector ? Site[taskGroupsSelector.site] : undefined);
    
    useEffect(() => {
        setTasks(taskGroupsSelector ? taskGroupsSelector.tasks : [])
        setTasks2(taskGroupsSelector ? taskGroupsSelector.tasks.map((t : TaskHookProps) => 
            new AmazonTaskClass(t.taskConfig.identifier, t.taskConfig.site, t.taskConfig.profile, t.taskConfig.size, t.taskConfig.proxies, t.taskConfig.input, t.siteConfig)
        ) : [])
    }, [])

    // Modal Hooks (Add Tasks)
    const [addTasksEnabled, setAddTasksEnabled] = useState<boolean>(false);
    const [addTasksProfiles, setAddTasksProfiles] = useState<ProfileObject[]>([]);
    const [addTasksInput, setAddTasksInput] = useState<string>('');
    const [addTasksMode, setAddTasksMode] = useState<AmazonModes>();
    const [addTasksProxies, setAddTasksProxies] = useState<ProxyList>();
    const [addTasksAccount, setAddTasksAccount] = useState<Account[]>([]);
    const [addTasksAccountGroup, setAddTasksAccountGroup] = useState<AccountGroup>();

    const [taskIdentifierCount, setTaskIdentifierCount] = useState<number>(taskGroupsSelector ? Math.max.apply(Math, taskGroupsSelector.tasks.map(function(o) { return o.taskConfig.identifier; })) + 1 : 0 )

    // triggered from Add Task modal
    const addTasks = async () => {
        // validate inputs first... which we'll sort out later :D

        try {
            validateAddTasks();
        }
        catch (err) {
            return console.error(err);
        }

        let identifierStart = taskIdentifierCount;
        let toAddTasks : TaskHookProps[] = [];
        let toAddTasks2 : AmazonTaskClass[] = []

        console.log('Accounts and AccountGroups')
        console.log(addTasksAccount)
        console.log(addTasksAccountGroup)

        addTasksProfiles.forEach((profile : ProfileObject, i : number) => {
            const newTask : TaskHookProps = {
                taskConfig: {
                    identifier: identifierStart,
                    site: Site.Amazon,
                    size: [Size.OS], // completely forgot about this shit lmao will add
    
                    // @ts-ignore
                    proxies: addTasksProxies,
                    profile: profile,
                    input: addTasksInput
                },
                siteConfig: {
                    mode: addTasksMode,
                    account: addTasksAccount && addTasksAccount.length > 0 ? addTasksAccount[i % addTasksAccount.length] : addTasksAccountGroup?.accounts[i % addTasksAccountGroup.accounts.length]
                }
            }

            let newTaskClass : AmazonTaskClass = new AmazonTaskClass(
                identifierStart,
                Site.Amazon,
                profile,
                [Size.OS],
                addTasksProxies!,
                addTasksInput,
                {
                    mode: addTasksMode!, // @ts-ignore
                    account: addTasksAccount && addTasksAccount.length > 0 ? addTasksAccount[i % addTasksAccount.length] : addTasksAccountGroup?.accounts[i % addTasksAccountGroup.accounts.length]
                }
            )

            toAddTasks2.push(newTaskClass)

            identifierStart += 1;
            toAddTasks.push(newTask);

        })

        setTaskIdentifierCount(identifierStart)
        setTasks([...tasks, ...toAddTasks]);
        setTasks2([...tasks2, ...toAddTasks2])
        dispatch(saveTaskGroupOnAdd({
            name: taskGroupName,
            site: Site.Amazon,
            tasks: [...tasks, ...toAddTasks],
            delays: {
                error: 3000,
                monitor: 3000
            }
        }))

        let res = await electron.ipcRenderer.invoke('readjson', 'tasks.json')

        let index = res.findIndex((tg : any) => tg.name === taskGroupName)

        if (index === -1) {
            await electron.ipcRenderer.invoke('writejson', 'tasks.json', [...res, {
                name: taskGroupName,
                site: Site.Amazon,
                tasks: [...tasks, ...toAddTasks],
                delays: {
                    error: 3000, monitor: 3000
                }
            }])
        }
        else {
            res[index] = {
                name: taskGroupName,
                site: Site.Amazon,
                tasks: [...tasks, ...toAddTasks],
                delays: {
                    error: 3000, monitor: 3000
                }
            }

            await electron.ipcRenderer.invoke('writejson', 'tasks.json', res)
        }

    }

    const validateAddTasks = () => {
        if (addTasksInput === '') {
            throw "Input is blank"
        }
        else if (addTasksAccount.length === 0 && addTasksAccountGroup === undefined) {
            throw "No Account or Account Group selected";
        }
        else if (addTasksMode === undefined) {
            throw "No mode selected"
        }
        else if (addTasksProfiles.length === 0) {
            throw "No profiles selected"
        }
        else if (addTasksProxies === undefined) {
            throw "No proxies selected"
        }
        else {
            return;
        }
    }

    const stopAllTasks = () => {
        dispatch(activateNumberCommander(taskGroupName, "stopAll"))
    }

    const deleteAllTasks = () => {
        dispatch(activateNumberCommander(taskGroupName, "deleteAll"))
    }

    const startAllTasks = () => {
        dispatch(activateNumberCommander(taskGroupName, "startAll"))
    }



    return (
        <ScreenWrapper hidden={hidden}>
            <ScreenWrapperModal 
            isEnabled={addTasksEnabled}
            setIsEnabled={setAddTasksEnabled}>
                <div className="w-1/2 h-auto rounded-lg shadow-lg bg-theta-bg flex justify-start items-center flex-col focus:outline-none p-4"
                onClick={(e) => e.stopPropagation()}
                >
                        <div className="w-full text-2xl text-theta-white font-medium">
                            Add Tasks
                        </div>
                        <div className="w-full flex flex-col justify-start items-center my-2">
                            <div className="w-full flex flex-col justify-start items-center p-2">
                                <div className="w-full text-lg text-theta-gray-2 ml-4">
                                    Input
                                </div>
                                <div className="w-full h-8">
                                    <TextInputCL 
                                        placeholder={'https://amazon.com/dp/123456ASDFG'}
                                        input={addTasksInput}
                                        onChange={setAddTasksInput}
                                        bg={'bg-theta-sidebar'}
                                    />
                                </div>
                            </div>

                            <div className="z-20 w-full flex flex-row justify-start items-center p-2">
                                <div className="w-1/2 flex flex-col justify-start items-center pr-4">
                                    <div className="w-full text-lg text-theta-gray-2 ml-4">
                                        Mode
                                    </div>
                                    <div className="w-full h-8">
                                        <DropdownSelect 
                                            selection={addTasksMode}
                                            setSelection={setAddTasksMode}
                                            selectionArray={Object.keys(AmazonModes)}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select mode'}
                                            itemToString={(a : AmazonModes) => AmazonModes[a]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="z-10 w-full flex flex-row justify-start items-center p-2">
                                <div className="w-1/2 flex flex-col justify-start items-center pr-4">
                                    <div className="w-full text-lg text-theta-gray-2 ml-4">
                                        Account Group
                                    </div>
                                    <div className="w-full h-8">
                                        <DropdownSelect 
                                            selection={addTasksAccountGroup}
                                            setSelection={setAddTasksAccountGroup}
                                            selectionArray={allAccountGroups}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select account group'}
                                            itemToString={(a : AccountGroup) => a.name}
                                            disabled={addTasksAccount.length !== 0}
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col justify-start items-center pl-4">
                                    <div className="w-full text-lg text-theta-gray-2 ml-4">
                                        Account
                                    </div>
                                    <div className="w-full h-8">
                                        <DropdownSelectMulti 
                                            setSelection={setAddTasksAccount}
                                            selectionArray={allAccounts}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select account'}
                                            itemToString={(acc : Account) => acc.username}
                                            selection={addTasksAccount}
                                            placeholderPlural={'accounts'}
                                            disabled={addTasksAccountGroup !== undefined}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-row justify-start items-center p-2">
                                <div className="w-1/2 flex flex-col justify-start items-center pr-4">
                                    <div className="w-full text-lg text-theta-gray-2 ml-4">
                                        Profile
                                    </div>
                                    <div className="w-full h-8">
                                        <DropdownSelectMulti 
                                            setSelection={setAddTasksProfiles}
                                            selection={addTasksProfiles}
                                            selectionArray={allProfiles}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select profiles'}
                                            itemToString={(pr : ProfileObject) => pr.information.name}
                                            placeholderPlural={'profiles'}
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-col justify-start items-center pl-4">
                                    <div className="w-full text-lg text-theta-gray-2 ml-4">
                                        Proxies
                                    </div>
                                    <div className="w-full h-8">
                                        <DropdownSelect 
                                            selection={addTasksProxies}
                                            setSelection={setAddTasksProxies}
                                            selectionArray={allProxies}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select proxies'}
                                            itemToString={(p : ProxyList) => p.name}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-row justify-start items-center p-2 mt-4">
                                <button className="focus:outline-none font-medium text-xl flex justify-center items-center w-auto h-10 rounded-md shadow-md bg-theta-logo px-3 text-theta-gray-2"
                                onClick={() => addTasks()}
                                >
                                    Add Tasks
                                </button>
                            </div>
                        </div>
                    
                    
                </div>
            </ScreenWrapperModal>
            <div className={`h-auto w-full z-20`}>
                <div className="p-4 flex flex-col justify-start items-center rounded-lg shadow-lg bg-theta-sidebar w-full h-full">
                    <div className="flex flex-row w-full justify-between items-center h-full">
                        <div className="flex flex-row justify-start items-center space-x-2">
                            <div className="text-theta-gray-2 text-4xl font-medium">
                                {taskGroupName}
                            </div>
                            <div className="text-theta-gray-7 text-2xl">
                                ({tasks.length} tasks)
                            </div>
                        </div>
                        
                        <div className="h-full w-64 flex flex-col"
                        >

                            {/* Input part */}
                            <DropdownSelect
                                selection={selectSiteInput}
                                setSelection={setSelectSiteInput}
                                selectionArray={Object.keys(Site)}
                                bg={'bg-theta-bg'}
                                placeholder={'Select a site'}
                                itemToString={(s : Site) => Site[s]}
                                // offsetWidth={}
                                maxRowsBeforeOverflow={5}
                                border={'border-theta-gray-7'}
                                noShadow={true}
                            />

                            {/* Drop down part */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-4">

            </div>
            <div className="w-full flex flex-row justify-start items-center overflow-hidden px-4 h-12" id="sliderDiv">
                <div className="select-none text-theta-gray-7 text-xl w-full">
                    Product
                </div>
                <div className="select-none text-theta-gray-7 text-xl w-3/10">
                    Profile
                </div>
                <div className="select-none text-theta-gray-7 text-xl w-3/10">
                    Proxies
                </div>
                <div className="select-none text-theta-gray-7 text-xl w-4/10">
                    Status
                </div>
                <div className="select-none text-theta-gray-7 text-xl w-72">
                    Controls
                </div>
            </div>
            <div className="w-full h-full relative flex flex-col justify-start items-start"> 

                {/* Top Gradient */}
                <div className="z-10 absolute top-0 left-0 right-0 w-full h-4 bg-gradient-to-b from-theta-bg to-transparent"></div>

                {/* Bottom Grad */}
                <div className="z-10 absolute bottom-0 left-0 right-0 w-full h-4 bg-gradient-to-t from-theta-bg to-transparent"></div>

                {/* X All Buttons */}
                {/* <div className="z-20 absolute left-0 right-0 bottom-0 w-full flex flex-row justify-center items-center h-10">
                    <div className="rounded-full bg-theta-sidebar-dark shadow-lg text-green-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div> */}

                <AutoSizer>
                    {({height, width}) => (
                        <List 
                            rowCount={tasks2.length}
                            rowHeight={52}
                            width={width}
                            height={height}
                            rowRenderer={AutoResizerTaskComponent}
                            className="scrollbar-hide focus:outline-none"
                            data={tasks2}
                            data2={setTasks2}
                            data3={taskGroupsSelector?.name}
                            data4={setTasks}
                            data5={tasks}
                        >
                        </List>
                    )}
                </AutoSizer>
            </div>

            {/* Bottom Actions */}
            <div className={`${selectSiteInput ? 'flex' : 'hidden pointer-events-none'} h-20 w-full flex-row justify-between items-center mt-2`}>
                {/* Error and Mintor Delay */}
                <div className="flex flex-col justify-center items-start w-48 space-y-1">
                    <TextInput placeholder={'Error delay'}
                        input={errorDelay}
                        setInput={setErrorDelay} 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        }
                    />

                    <TextInput placeholder={'Monitor delay'}
                        input={monitorDelay}
                        setInput={setMonitorDelay} 
                        icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        }
                    />

                </div>
                <div className="flex flex-row justify-center items-center space-x-4">
                    <button className="transition transform duration-250 ease-in-out hover:scale-110 focus:outline-none rounded-full bg-theta-sidebar shadow-lg text-theta-tasks-taskcomponent-start flex flex-row justify-center items-center"
                    onClick={() => startAllTasks()}
                    >
                        <div className="ml-4 mr-2 text-theta-gray-2 font-medium text-2xl">
                            Start
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="transition transform duration-250 ease-in-out hover:scale-110 focus:outline-none rounded-full bg-theta-sidebar-dark shadow-lg text-theta-tasks-taskcomponent-stop flex flex-row justify-center items-center"
                    onClick={() => stopAllTasks()}
                    >
                        <div className="ml-4 mr-2 text-theta-gray-2 font-medium text-2xl">
                            Stop
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="transition transform duration-250 ease-in-out hover:scale-110 focus:outline-none rounded-full bg-theta-sidebar-dark shadow-lg text-theta-tasks-taskcomponent-delete flex flex-row justify-center items-center"
                    onClick={() => deleteAllTasks()}
                    >
                        <div className="ml-4 mr-2 text-theta-gray-2 font-medium text-2xl">
                            Delete
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* MLC. 48 because thats the monitor/error size */}
                <div className="flex flex-col justify-center items-end w-48 ">
                <button className={`transition transform duration-250 ease-in-out hover:scale-110 focus:outline-none rounded-full bg-theta-sidebar-dark shadow-lg text-blue-400 flex flex-row justify-center items-center`}
                onClick={() => setAddTasksEnabled(true)}
                >
                        <div className="ml-4 mr-2 text-theta-gray-2 font-medium text-2xl">
                            {'Add Tasks'}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </ScreenWrapper>
    )
}

export default TaskGroupInterface