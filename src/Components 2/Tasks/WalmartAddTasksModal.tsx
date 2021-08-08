import React, {
    FC, useState
} from 'react';
import ScreenWrapperModal from '../Component Library/ScreenWrapperModal';
import TextInputCL from '../Component Library/TextInput'
import { TaskHookProps } from './TaskGroupInterface';
import electron from 'electron';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import ProxyList from '../../Logic/interfaces/ProxyList';
import Account, { AccountGroup } from '../../Logic/interfaces/Account';
import { useSelector, useDispatch } from 'react-redux'
import Size from '../../Logic/interfaces/enums/Size';
import Site from '../../Logic/interfaces/enums/Site';
import { saveTaskGroupOnAdd, TaskGroup } from '../../redux/reducers/tasksSlice';
import { RootState } from '../../redux/store';
import DropdownSelect from '../Component Library/DropdownSelect';
import DropdownSelectMulti from '../Component Library/DropdownSelectMulti';
import WalmartTaskClass from '../../Logic/sites/Walmart/classes/WalmartTaskClass';
import { WalmartModes } from '../../Logic/interfaces/site_task_config/WalmartTaskConfig';

interface WalmartAddTasksModalProps {
    addTasksEnabled: boolean,
    setAddTasksEnabled: (b : boolean) => void,
    tasks: TaskHookProps[],
    setTasks: (t : TaskHookProps[]) => void,
    tasks2: WalmartTaskClass[],
    setTasks2: (t : WalmartTaskClass[]) => void,
    errorDelay: number,
    monitorDelay: number,
    taskGroupName: string
}
 
const WalmartAddTasksModal : FC<WalmartAddTasksModalProps> = ({
    addTasksEnabled,
    setAddTasksEnabled,
    tasks,
    setTasks,
    tasks2,
    setTasks2,
    errorDelay,
    monitorDelay,
    taskGroupName
} : WalmartAddTasksModalProps) => {


    // tgSelector
    const taskGroupsSelector = useSelector((state : RootState) => state.tasks.taskGroups.find((tg : TaskGroup) => tg.name === taskGroupName))

    const [taskIdentifierCount, setTaskIdentifierCount] = useState<number>(taskGroupsSelector ? taskGroupsSelector.tasks.reduce((accumulator : number, currentValue : TaskHookProps) => accumulator < currentValue.taskConfig.identifier ? currentValue.taskConfig.identifier : accumulator, 0) + 1 : 0 )

    const dispatch = useDispatch()

    // Modal Hooks (Add Tasks)
    const [addTasksProfiles, setAddTasksProfiles] = useState<ProfileObject[]>([]);
    const [addTasksInput, setAddTasksInput] = useState<string>('');
    const [addTasksMode, setAddTasksMode] = useState<WalmartModes>();
    const [addTasksProxies, setAddTasksProxies] = useState<ProxyList>();
    const [addTasksAccount, setAddTasksAccount] = useState<Account[]>([]);
    const [addTasksAccountGroup, setAddTasksAccountGroup] = useState<AccountGroup>();


    // Add Tasks hooks
    const allProfiles : ProfileObject[] = useSelector((state : RootState) => state.profiles.profilesArray)
    const allProxies : ProxyList[] = useSelector((state : RootState) => state.proxies.proxiesArray)

    // @ts-ignore
    const allAccounts : AccountGroup[] = useSelector((state : RootState) => state.accounts.accountsObject["Walmart"])
    // @ts-ignore
    const allAccountGroups : AccountGroup[] = useSelector((state : RootState) => state.accounts.accountGroupObject["Walmart"])

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
        let toAddTasks2 : WalmartTaskClass[] = []

        // console.log('Accounts and AccountGroups')
        // console.log(addTasksAccount)
        // console.log(addTasksAccountGroup)

        addTasksProfiles.forEach((profile : ProfileObject, i : number) => {
            const newTask : TaskHookProps = {
                taskConfig: {
                    identifier: identifierStart,
                    site: Site.Walmart,
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

            let newTaskClass : WalmartTaskClass = new WalmartTaskClass(
                identifierStart,
                Site.Walmart,
                profile,
                [Size.OS],
                addTasksProxies!,
                addTasksInput,
                {
                    mode: addTasksMode!, // @ts-ignore
                    account: addTasksAccount && addTasksAccount.length > 0 ? addTasksAccount[i % addTasksAccount.length] : addTasksAccountGroup?.accounts[i % addTasksAccountGroup.accounts.length]
                },
                monitorDelay,
                errorDelay
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
            site: Site.Walmart,
            tasks: [...tasks, ...toAddTasks],
            delays: {
                error: errorDelay,
                monitor: monitorDelay
            }
        }))

        let res = await electron.ipcRenderer.invoke('readjson', 'tasks.json')

        let index = res.findIndex((tg : any) => tg.name === taskGroupName)

        if (index === -1) {
            await electron.ipcRenderer.invoke('writejson', 'tasks.json', [...res, {
                name: taskGroupName,
                site: Site.Walmart,
                tasks: [...tasks, ...toAddTasks],
                delays: {
                    error: errorDelay, monitor: monitorDelay
                }
            }])
        }
        else {
            res[index] = {
                name: taskGroupName,
                site: Site.Walmart,
                tasks: [...tasks, ...toAddTasks],
                delays: {
                    error: errorDelay, monitor: monitorDelay
                }
            }

            await electron.ipcRenderer.invoke('writejson', 'tasks.json', res)
        }

    }

    const validateAddTasks = () => {
        if (addTasksInput === '') {
            throw "Input is blank"
        }
        // else if (addTasksAccount.length === 0 && addTasksAccountGroup === undefined) {
        //     throw "No Account or Account Group selected";
        // }
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


    return (
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
                                        placeholder={'https://www.walmart.com/ip/20709874'}
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
                                            selectionArray={Object.keys(WalmartModes)}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select mode'}
                                            itemToString={(a : WalmartModes) => WalmartModes[a]}
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
                                            // placeholder={'Select account group'}
                                            placeholder={'Coming soon'}
                                            itemToString={(a : AccountGroup) => a.name}
                                            disabled={true}
                                            // disabled={addTasksAccount.length !== 0}
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
                                            // placeholder={'Select account'}
                                            placeholder={'Coming soon'}
                                            itemToString={(acc : Account) => acc.username}
                                            selection={addTasksAccount}
                                            placeholderPlural={'accounts'}
                                            // disabled={addTasksAccountGroup !== undefined}
                                            disabled={true}
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
    )
}

export default WalmartAddTasksModal;