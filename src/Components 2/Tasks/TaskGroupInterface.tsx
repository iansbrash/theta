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

import AddTasksModalRenderer from './AddTasksModalRenderer';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import Site from '../../Logic/interfaces/enums/Site';
import Size from '../../Logic/interfaces/enums/Size';
import { saveTaskGroupOnAdd, activateNumberCommander, updateTaskGroupDelay } from '../../redux/reducers/tasksSlice'
import electron from 'electron';
import AmazonTaskClass from '../../Logic/sites/Amazon/classes/AmazonTaskClass';
import TaskClass from '../../Logic/sites/classes/TaskClass';


interface TextInputProps {
    placeholder: string,
    icon: ReactNode,
    input: number,
    // setInput: (s : number) => void,
    type : "error" | "monitor",
    tgName : string
}

const TextInput : FC<TextInputProps> = ({
    placeholder,
    icon,
    input,
    type,
    tgName
}: TextInputProps) => {

    const dispatch = useDispatch()


    return (
        <button className={`relative focus:outline-none w-full h-full rounded-lg bg-transparent flex flex-col justify-start items-center`}
        onClick={() => null}
        >
            <div className="h-full flex flex-row justify-start items-center">
                <div className="w-8"></div>
                <input
                    value={input}
                    onChange={(e) => e.target.value === '' ? dispatch(updateTaskGroupDelay(tgName, type, 0)) : (e.target.value.match(/^[0-9]*$/g) ? dispatch(updateTaskGroupDelay(tgName, type, parseInt( e.target.value ))) : null)}
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
    const taskGroupsSelector = useSelector((state : RootState) => state.tasks.taskGroups.find(tg => tg.name === taskGroupName))

    const defaultDelays = useSelector((state : RootState) => state.settings.defaults.delays)

    // const [monitorDelay, setMonitorDelay] = useState<number>(taskGroupsSelector ? taskGroupsSelector.delays.monitor : defaultDelays.monitor);
    // const [errorDelay, setErrorDelay] = useState<number>(taskGroupsSelector ? taskGroupsSelector.delays.error : defaultDelays.error);

    const monitorDelay = taskGroupsSelector ? useSelector((state : RootState) => state.tasks.taskGroups.find(tg => tg.name === taskGroupName)?.delays.monitor) : defaultDelays.monitor
    const errorDelay = taskGroupsSelector ? useSelector((state : RootState) => state.tasks.taskGroups.find(tg => tg.name === taskGroupName)?.delays.error) : defaultDelays.error

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
    const [tasks2, setTasks2] = useState<TaskClass[]>([]);


    // @ts-ignore
    const [selectSiteInput, setSelectSiteInput] = useState<Site>(taskGroupsSelector ? Site[taskGroupsSelector.site] : undefined);
    
    useEffect(() => {
        setTasks(taskGroupsSelector ? taskGroupsSelector.tasks : [])
        setTasks2(taskGroupsSelector ? taskGroupsSelector.tasks.map((t : TaskHookProps) => 
            new AmazonTaskClass(t.taskConfig.identifier, t.taskConfig.site, t.taskConfig.profile, t.taskConfig.size, t.taskConfig.proxies, t.taskConfig.input, t.siteConfig, taskGroupsSelector.delays.monitor, taskGroupsSelector.delays.error)
        ) : [])
    }, [])

    // Controls add tasks modal
    const [addTasksEnabled, setAddTasksEnabled] = useState<boolean>(false);


    const stopAllTasks = () => {
        dispatch(activateNumberCommander(taskGroupName, "stopAll"))
    }

    const deleteAllTasks = () => {
        dispatch(activateNumberCommander(taskGroupName, "deleteAll"))
    }

    const startAllTasks = () => {
        dispatch(activateNumberCommander(taskGroupName, "startAll"))
    }

    const [confirmChangeSiteModal, setConfirmChangeSiteModal] = useState<boolean>(false);
    const [attemptChangeValue, setAttemptChangeValue] = useState<Site>(Site.Amazon)

    const setSiteOnChange = async (s : Site) => {
        if (s === selectSiteInput) {
            return;
        }
        else if (tasks2.length > 0) {
            setConfirmChangeSiteModal(true)
            setAttemptChangeValue(s)
        }
        else {
            setSelectSiteInput(s);
        }

    }

    const changeSiteModalYes = async () => {
        setSelectSiteInput(attemptChangeValue)
        setConfirmChangeSiteModal(false)

        // Delete tasks
        setTasks([])
        setTasks2([])

        // Redux
        dispatch(saveTaskGroupOnAdd({
            name: taskGroupName,
            site: attemptChangeValue,
            tasks: [],
            delays: {
                error: errorDelay,
                monitor: monitorDelay
            }
        }))

        // Storage
        let t = await electron.ipcRenderer.invoke("readjson", 'tasks.json')
        let removeIndex = t.findIndex((tg : any) => tg.name === taskGroupName)
        t[removeIndex].tasks = [];
        t[removeIndex].site = Site[attemptChangeValue]
        await electron.ipcRenderer.invoke('writejson', 'tasks.json', t)
    }

    const changeSiteModalCancel = () => {
        setSelectSiteInput(selectSiteInput)
        setConfirmChangeSiteModal(false)
    }



    return (
        <ScreenWrapper hidden={hidden}>
            <AddTasksModalRenderer 
                selectedSite={selectSiteInput}
                addTasksEnabled={addTasksEnabled}
                setAddTasksEnabled={setAddTasksEnabled}
                tasks={tasks}
                setTasks={setTasks}
                tasks2={tasks2}
                setTasks2={setTasks2}
                errorDelay={errorDelay!}
                monitorDelay={monitorDelay!}
                taskGroupName={taskGroupName}
            />
            <ScreenWrapperModal 
            isEnabled={confirmChangeSiteModal}
            setIsEnabled={setConfirmChangeSiteModal}>
                <div className="w-auto h-auto rounded-lg shadow-lg bg-theta-bg flex justify-start items-center flex-col focus:outline-none p-4"
                onClick={(e) => e.stopPropagation()}
                >
                        <div className="w-full text-2xl text-theta-white font-medium">
                            Change site to {attemptChangeValue}?
                        </div>
                        <div className="w-full text-xl text-theta-gray-2 leading-5">
                            Your tasks will be deleted.
                        </div>
                        <div className="flex flex-row justify-center items-center space-x-4 mt-2">
                            <button className="focus:outline-none shadow-md w-32 h-8 rounded-md bg-theta-sidebar-dark border-2 border-theta-tasks-taskcomponent-delete flex justify-center items-center text-xl font-medium text-theta-gray-2"
                            onClick={() => changeSiteModalCancel()}
                            >
                                Cancel
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg> */}
                            </button>
                            <button className="focus:outline-none shadow-md w-32 h-8 rounded-md bg-theta-sidebar-dark border-2 border-theta-tasks-taskcomponent-start flex justify-center items-center text-xl font-medium text-theta-gray-2"
                            onClick={() => changeSiteModalYes()}
                            >
                                Yes
                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg> */}
                            </button>

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
                                // setSelection={setSelectSiteInput}
                                onlySetSelection={true}
                                setSelection={setSiteOnChange}
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
                        input={errorDelay!}
                        type={"error"} 
                        tgName={taskGroupName}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        }
                    />

                    <TextInput placeholder={'Monitor delay'}
                        input={monitorDelay!}
                        type={"monitor"} 
                        tgName={taskGroupName}
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