import React, {
    FC, useState, ReactNode, useEffect, useRef
} from 'react';
import TaskClass, { cycleStatus } from '../../Logic/sites/classes/TaskClass';
import sendSuccess from '../../Logic/webhooks/discordsuccess';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import AmazonTaskClass from '../../Logic/sites/Amazon/classes/AmazonTaskClass';
import { AmazonModes } from '../../Logic/interfaces/site_task_config/AmazonTaskConfig';
import axios from 'axios';
import api from '../../Logic/api';
import { TaskHookProps } from './TaskGroupInterface';
import Site from '../../Logic/interfaces/enums/Site';
import electron from 'electron'
import qs from 'qs'
import primes from './index'
import { Worker } from 'worker_threads';

// import {Worker, isMainThread, parentPort} from 'worker_threads'
interface InterestingWrapperProps {
    children: ReactNode,
    width: string,
    bg: string,
    textColor?: string
}

const InterestingWrapperProps : FC<InterestingWrapperProps> = ({
    children,
    width,
    bg,
    textColor
} : InterestingWrapperProps) => {
    return (
        <div className={`h-full flex justify-start items-center relative z-10 select-none ${textColor ? textColor : 'text-theta-gray-2'} text-xl ${width} ${bg}`}>
            {children}
            <div className={`absolute w-2 ${bg} h-full top-0 bottom-0 -left-2`}></div>
        </div>  
    )
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
)

const StopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
    </svg>
)

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>  
)

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>  
)

const delay = (ms : number) => new Promise(res => setTimeout(res, ms));

interface TaskComponentProps {
    task: TaskClass,
    tasks: TaskHookProps[],
    tasks2: TaskClass[],
    setTasks: (t : any[]) => void,
    setTasks2: (t : any[]) => void,
    tgName: string
}

const TaskComponent : FC<TaskComponentProps> = ({
    task,
    tasks,
    tasks2,
    setTasks,
    setTasks2,
    tgName
} : TaskComponentProps) => {

    console.log('RENDERING A TASK!')

    const taskBg = 'bg-theta-tasks-taskgroup' // or taskgroup-individual

    const discordWebhook = useSelector((state : RootState) => state.settings.defaults.webhooks.discord)

    const [status, setStatus] = useState<string>('Idle')
    const [statusColor, setStatusColor] = useState<string>('');
    const [productTitle, setProductTitle] = useState<string>(task.input)
    const [productImage, setProductImage] = useState<string>('');

    const taskGroupDelaysSelector = useSelector((state : RootState) => state.tasks.taskGroups.find(tg => tg.name === tgName)?.delays)

    // updates the task's delays on update
    useEffect(() => {
        // call task.updateDelays() or someshiot
        console.log("Task group delayus updated!" + taskGroupDelaysSelector?.error + ' ' + taskGroupDelaysSelector?.monitor)

        if (taskGroupDelaysSelector) {
            task.setDelays(taskGroupDelaysSelector.monitor, taskGroupDelaysSelector.monitor)
        }
    }, [taskGroupDelaysSelector])


    const sessionObject = useSelector((state: RootState) => state.session);

    const startAllCommander = useSelector((state : RootState) => state.tasks.taskGroupCommanders[tgName]?.startAll)
    const stopAllCommander = useSelector((state : RootState) => state.tasks.taskGroupCommanders[tgName]?.stopAll)
    const massLinkCommander = useSelector((state : RootState) => state.tasks.taskGroupCommanders[tgName]?.massLink)
    const deleteAllCommander = useSelector((state : RootState) => state.tasks.taskGroupCommanders[tgName]?.deleteAll)

    let initialRender1 = useRef(true);
    let initialRender2 = useRef(true);
    let initialRender3 = useRef(true);
    useEffect(() => { !initialRender1.current && startAllCommander ? startTask() : initialRender1.current = false }, [startAllCommander])
    useEffect(() => { !initialRender2.current && stopAllCommander ? stopTask() : initialRender2.current = false }, [stopAllCommander])
    useEffect(() => { !initialRender3.current && deleteAllCommander ? deleteAll() : initialRender3.current = false }, [deleteAllCommander])
    

    const startTask = async () => {
        task.start();
        setStatusColor('text-blue-200');
        setStatus('Signing in (1)')

        let res : cycleStatus = {message: 'Starting...', status: 'Success'};

        let prTitle = productTitle;
        let prImage = '';

        let lastStatus = 'Signing in (1)';

        let prPrice = 0;

        // await (task as AmazonTaskClass).BIGTEST()
        // await (task as AmazonTaskClass).addToCart()
        // await (task as AmazonTaskClass).checkout()
        // return;

        // return;
        while (task.status === 'Active') {
            setStatusColor('text-blue-100');
            res = await task.cycle();

            if (task.getStatus() === "Stopped") {
                setStatus("Stopped")
                return;
            }
            else if (res.status === "Error") {
                console.log('got an error!')
                console.log(res)
                // setStatus(res.message);
                setStatus("Error"); // Guess we're doing this :|

                setStatusColor('text-red-400');
                await delay(task.delays.error);

                if (task.getStatus() === "Stopped") {
                    break;
                }
                setStatus(lastStatus);
                continue;
            }
            else if (res.extraData !== undefined) {
                prTitle = res.extraData.productTitle;
                setProductTitle(prTitle)
                prImage = res.extraData.productImage
                setProductImage(prImage)
                prPrice = res.extraData.productPrice
            }
            setStatus(res.message);
            lastStatus = res.message;
        }

        if (res.message === "Checked Out") {
            setStatusColor('text-green-400')
            console.log(productImage)
            
            try {
                sendSuccess(
                    discordWebhook,
                    prTitle,
                    task.site,
                    task.profile.information.name,
                    "OS",
                    task.proxyList.name,
                    (task as AmazonTaskClass).config.account.username,
                    AmazonModes[(task as AmazonTaskClass).config.mode],
                    prImage
                )
            }
            catch (err) {
                console.error (`Couldn't send success to discord webhook`)
            }

            try {
                await axios({
                    method: 'post',
                    url: `${api}/log/user/checkout`,
                    headers: {
                        license: sessionObject.license,
                        session: sessionObject.session,
                        orderNumber: 'N/A',
                        product: prTitle,
                        profile: task.profile.information.name,
                        site: task.site,
                        size: task.size,
                        price: prPrice,
                        image: prImage,
                        mode: AmazonModes[(task as AmazonTaskClass).config.mode]   
                    }
                })
            }
            catch (err) {
                console.error("Error logging checkout to api")
            }
        }
    }

    const deleteTask = () => {

        stopTask();
        // task = null;

        setTasks2(tasks2.filter(t => t.identifier !== task.identifier));
        setTasks(tasks.filter(t => t.taskConfig.identifier !== task.identifier));
    }

    const deleteAll = () => {
        console.log('deleteAll triggered')
        console.log(deleteAllCommander)

        stopTask()
        setTasks2([])
        setTasks([])
    }

    // COMING SOON!
    const editTask = async () => {
        // await electron.ipcRenderer.invoke('gettest', {
        //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36', 
        // })

        // primes.getPrimes(100).then(primes => {
        //     console.log('The first 100 prime numbers are:');
        //     console.log(JSON.parse(primes));
        // });

        const worker = new Worker("./worker.js")
        worker.postMessage("do work")

        
    }

    const stopTask = () => {
        setStatusColor('text-theta-gray-2');
        setStatus("Stopped")
        task.stop()
        // throw "stopped"
    }

    return (
        <div className={`z-0 w-full flex flex-row justify-start items-center px-2 ${taskBg} h-12 rounded-md shadow-md`}>
            <div className="relative select-none text-theta-gray-2 text-xl w-full">
                <div className="z-10 absolute left-0 top-0 bottom-0 w-auto h-full flex justify-start items-center whitespace-nowrap">
                    {productTitle}
                </div>
            </div>
            <InterestingWrapperProps width={'w-3/10'} bg={taskBg}>
                {task.profile.information.name}
            </InterestingWrapperProps>
            <InterestingWrapperProps width={'w-3/10'} bg={taskBg}>
                {task.proxyList.name}
            </InterestingWrapperProps>
            <InterestingWrapperProps width={'w-4/10'} bg={taskBg} textColor={statusColor}>
                {status}
            </InterestingWrapperProps>
            <InterestingWrapperProps width={'w-72'} bg={taskBg}>
                <div className="h-full w-full flex flex-row justify-between items-center">
                    <button className="text-theta-tasks-taskcomponent-start focus:outline-none"
                    onClick={() => startTask()}
                    >
                        <PlayIcon />
                    </button>
                    <button className="text-blue-400 focus:outline-none"
                    onClick={() => editTask()}
                    >
                        <EditIcon />
                    </button>
                    <button className="text-theta-tasks-taskcomponent-stop focus:outline-none"
                    onClick={() => stopTask()}
                    >
                        <StopIcon />
                    </button>
                    <button className="text-theta-tasks-taskcomponent-delete focus:outline-none"
                    onClick={() => deleteTask()}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </InterestingWrapperProps>
        </div>
    )
}

export default TaskComponent;