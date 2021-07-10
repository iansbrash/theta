import React, {
    FC, useState, ReactNode
} from 'react';
import TaskClass, { cycleStatus } from '../../Logic/sites/classes/TaskClass';
import sendSuccess from '../../Logic/webhooks/discordsuccess';
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import AmazonTaskClass from '../../Logic/sites/Amazon/classes/AmazonTaskClass';
import { AmazonModes } from '../../Logic/interfaces/site_task_config/AmazonTaskConfig';

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
    task: TaskClass
}

const TaskComponent : FC<TaskComponentProps> = ({
    task
} : TaskComponentProps) => {

    console.log('RENDERING A TASK!')

    const taskBg = 'bg-theta-tasks-taskgroup' // or taskgroup-individual

    const discordWebhook = useSelector((state : RootState) => state.settings.defaults.webhooks.discord)

    const [status, setStatus] = useState<string>('Idle')
    const [statusColor, setStatusColor] = useState<string>('');
    const [productTitle, setProductTitle] = useState<string>(task.input)
    const [productImage, setProductImage] = useState<string>('');

    const startTask = async () => {
        task.start();
        setStatusColor('text-blue-200');
        setStatus('Signing in (1)')

        let res : cycleStatus = {message: 'Starting...', status: 'Success'};

        while (task.status === 'Active') {
            setStatusColor('text-blue-100');
            res = await task.cycle();
            console.error(res);
            setStatus(res.message);

            if (res.extraData !== undefined) {
                setProductTitle(res.extraData.productTitle)
                setProductImage(res.extraData.productImage)
            }

            if (res.status === "Error") {
                setStatusColor('text-red-400');
                await delay(7500);
                setStatus(res.message);
            }
        }

        if (res.message === "Checked Out") {
            setStatusColor('text-green-400')
            
            try {
                sendSuccess(
                    discordWebhook,
                    productTitle,
                    "Amazon",
                    task.profile.information.name,
                    "Random",
                    task.proxyList.name,
                    "brash@usc.edu",
                    "Normal",
                    productImage
                )
            }
            catch (err) {
                console.error (`Couldn't send success to discord webhook`)
            }
        }
    }

    const deleteTask = () => {
        // let requestApi = {
        //     method: 'POST',
        //     headers: {
        //     //   'Content-Type': 'custom complex media type here',
        //     //   'Authorization': 'Bearer ' + accessToken // if api is secured
        //     },
        //     protocol: 'https:',
        //     hostname: 'amazon.com',
        //     port: 443,
        //     path: '/'
        // };

        // const request = electron.net.request(requestApi)

        // request.on('response', (response) => {
        //     console.log(`STATUS: ${response.statusCode}`);
        //     // resolve(response);
        
        //     response.on('error', (error : any) => {
        //       console.log(`ERROR: ${JSON.stringify(error)}`);
        //     //   reject(error);
        //     })
        //   });
        
        // request.end(JSON.stringify(usageData));
    }

    const editTask = () => {

    }

    const stopTask = () => {
        setStatusColor('text-theta-gray-2');
        setStatus("Stopped")
        task.stop()
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
                    <button className="text-green-200 focus:outline-none"
                    onClick={() => startTask()}
                    >
                        <PlayIcon />
                    </button>
                    <button className="text-blue-200 focus:outline-none"
                    onClick={() => editTask()}
                    >
                        <EditIcon />
                    </button>
                    <button className="text-yellow-200 focus:outline-none"
                    onClick={() => stopTask()}
                    >
                        <StopIcon />
                    </button>
                    <button className="text-red-200 focus:outline-none"
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