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

import {Worker, isMainThread, parentPort} from 'worker_threads'
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

        if (isMainThread) {
            // This code is executed in the main thread and not in the worker.
            
            // Create the worker.
            const worker = new Worker(__filename);
            // Listen for messages from the worker and print them.
            worker.on('message', (msg) => { console.log(msg); });
         } else {
            // This code is executed in the worker and not in the main thread.
            
            // Send a message to the main thread.
            parentPort!.postMessage('Hello world!');
          }

        // let data = qs.stringify({
        //     appActionToken: 'hl8P4d0jZkUj2FENVajhZ2CpPzzYcj3D', 
        //     appAction: 'SIGNIN_PWD_COLLECT',           
        //     metadata1: 'ECdITeCs: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',
        //     prevRID: 'ape:RkRXRjQ4Slk5WlRNN0UyODhLR1g=',
        //     workflowState: 'eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.-4taYQMfQE-jcmDtAopEbmgrIlpaAzxVcgcw_oC2LiOSQn-tZ_sQjA.GW18Xsbrdsmu8GdR.QuK3_Gv99xq8gsxrlFNaCny_Thl9vxX-DaorWz0LqAnb7B3sniF2oL8Y_PdFDBpZWsD84sG9-MZOXVOnhbMn9CjQUH5g7av_DQzjR3W832-57Kt_YOfODJBu0Tk0gzuWuEkK1Q9xZgSumEPq2V5PxRUH1Y3ZnJKgC_DMkOI30-3T_GpKEuCVjz6e_tWdG0xKv9aCypsq-Py1pMIhG_EYkq2XT6cwsc7LCYAfWIvnj2jrJT411HqXdj9OespALr48jZqP1q4K2cFilVpCg5pzdE_wIMprOwiZ0dMeaZ_YpU9f9TnUgKKLBXJrvQc3GWOOqNEDnl8q2WJzOXLMNJ5bHgmPUXcShstohFmjRajp192HaIedINok10NTwoPtkvrsiPAZ6f9xN4E7tUjeusFUNLXLFq_4QKMBZel4xoi2-ijQUC1R3Zj8Qe4nnZB0eqkRDUTnSA.zJqWhevLF-EJMRUT8U9avQ', 
        //     email: 'brash@usc.edu', 
        //     password: 'ZxZ6%Mx2^1Ue&Vch'
        // })

        // let res = await axios({
        //     method: 'post',
        //     'url': 'https://www.amazon.com/ap/signin',
        //     headers: {
        //         'authority': 'www.amazon.com', 
        //         'pragma': 'no-cache', 
        //         'cache-control': 'no-cache', 
        //         'rtt': '50', 
        //         'downlink': '10', 
        //         'ect': '4g', 
        //         'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"', 
        //         'sec-ch-ua-mobile': '?0', 
        //         'origin': 'https://www.amazon.com', 
        //         'upgrade-insecure-requests': '1', 
        //         'dnt': '1', 
        //         'content-type': 'application/x-www-form-urlencoded', 
        //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36', 
        //         'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 
        //         'sec-fetch-site': 'same-origin', 
        //         'sec-fetch-mode': 'navigate', 
        //         'sec-fetch-user': '?1', 
        //         'sec-fetch-dest': 'document', 
        //         'referer': 'https://www.amazon.com/ap/signin', 
        //         'accept-language': 'en-US,en;q=0.9', 
        //         cookie: 'session-id-time=2257994371l; session-id=131-1339692-2864366; ubid-main=134-5846070-6472912'
        //     },
        //     data : data,
        //     validateStatus: () => true
        // })

        // console.log(res.data)
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