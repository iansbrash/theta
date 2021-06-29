import React, { FC, useState, useEffect } from "react";
import TaskClass from "../../Logic/sites/classes/TaskClass";
import AmazonTaskClass from '../../Logic/sites/Amazon/classes/AmazonTaskClass';
import electron from 'electron';
import { AmazonStatus } from '../../Logic/sites/Amazon/classes/AmazonTaskClass'
import sendSuccess from "../../Logic/webhooks/discordsuccess";

const delay = (ms : number) => new Promise(res => setTimeout(res, ms));

interface TaskFunctionProps {
    task: TaskClass,
    deleteFunction: (t : TaskClass) => void
}

const Task : FC<TaskFunctionProps> = ({
    task,
    deleteFunction
} : TaskFunctionProps) => {

    const [statusWatcher, setStatusWatcher] = useState<string>('Idle');
    const [productTitle, setProductTitle] = useState<string>(task.input)

    const [taskState, setTaskState] = useState<boolean>(false);

    const stopTask = () => {
        // electron.ipcRenderer.invoke("writefile", 'asd');
        setStatusWatcher("Stopped")
        task.status = "Stopped";
    }

    const startTask = async () => {

        
        setStatusWatcher('Signing in (1)')
        await (task as AmazonTaskClass).GETMainLoginPage();

        setStatusWatcher('Signing in (2)')
        await (task as AmazonTaskClass).POSTMainLoginPage();

        setStatusWatcher('Signing in (3)')
        await (task as AmazonTaskClass).POSTSubLoginPage();

        // setStatusWatcher('signing')
        // await (task as AmazonTaskClass).signIn();


        setStatusWatcher('Getting product')
        const productTitleRes = await (task as AmazonTaskClass).AmazonGETProduct();
        setProductTitle(productTitleRes)

        setStatusWatcher('Adding to cart')
        let ATCStatus = await (task as AmazonTaskClass).AmazonPOSTAddToCart();

        console.log(`ATCStatus: ${ATCStatus}`)
        console.log(`taskState: ${taskState}`)

        if (ATCStatus !== 'Success') {
            while (task.status === "Active" && ATCStatus !== "Success") {
                setStatusWatcher(ATCStatus)
                await delay(3500);
                console.log('retrying')
                ATCStatus = await (task as AmazonTaskClass).AmazonPOSTAddToCart();
            }
        }

        if (!taskState) return;

        // setStatusWatcher('Getting product')
        // await (task as AmazonTaskClass).GETProduct();

        // setStatusWatcher('Adding to cart')
        // await (task as AmazonTaskClass).POSTAddToCart();

        // return;
        setStatusWatcher('Getting checkout screen')
        await (task as AmazonTaskClass).GETCheckoutScreen();

        setStatusWatcher('Adding shipping')
        await (task as AmazonTaskClass).POSTAddShippingAddressFormHandler();

        setStatusWatcher('Selecting shipping')
        await (task as AmazonTaskClass).POSTSelectShippingAddress();

        setStatusWatcher('Adding payment (1)')
        await (task as AmazonTaskClass).GETAddPaymentPage();

        setStatusWatcher('Adding payment (2)')
        await (task as AmazonTaskClass).POSTRegister();

        setStatusWatcher('Adding payment (2)')
        await (task as AmazonTaskClass).POSTAddPaymentMethod();

        setStatusWatcher('Selecting payment')
        await (task as AmazonTaskClass).POSTSelectPaymentMethod();

        setStatusWatcher('Getting submit order screen')
        await (task as AmazonTaskClass).POSTAsyncContinueAfterSelection();

        setStatusWatcher('Submitting order...')
        const submitSuccess : AmazonStatus = await (task as AmazonTaskClass).POSTSubmitOrder();

        if (submitSuccess === AmazonStatus.CheckoutSuccess) {
            setStatusWatcher('Checked out')
        }
        else {
            setStatusWatcher('Error, retrying')

            await delay(3000)

            setStatusWatcher('Submitting order...')

            const submitSuccess : AmazonStatus = await (task as AmazonTaskClass).POSTSubmitOrder();
            if (submitSuccess === AmazonStatus.CheckoutSuccess) {
                setStatusWatcher('Checked out')
                // sendSuccess()
            }
            else {
                setStatusWatcher('Two errors, stopping')
            }
            
        }
    }

    return (
        <div className="w-full px-2 flex flex-row justify-between items-center">

            {/* Icon */}
            <div className="text-indigo-100 font-bold text-md  min-w-0">
                <div className={`h-10 w-10 rounded-full bg-indigo-100 my-2`}>

                </div>
            </div>
            <div className="flex-1 mx-4 h-12 flex min-w-0">
                <div className="flex-1 min-w-0 flex flex-row justify-center items-center space-x-2">
                    {/* Product */}
                    <div className="w-1/2 text-indigo-100 truncate">
                        {productTitle}
                    </div>

                    <div className="w-1/4 text-indigo-100 h-10 flex flex-row justify-left items-center">
                        <div className="w-1/2 text-indigo-100 truncate">
                            {task.profile.information.name}
                        </div>
                        <div className="w-1/2 text-indigo-100 truncate">
                            {task.proxyList.name}
                        </div>

                    </div>
                    <div className="w-1/4 text-indigo-100 flex flex-row justify-left items-center  min-w-0">
                        <div className="text-indigo-100 truncate"
                        // style={{
                        //     overflow: 'hidden',
                        //     minWidth: 0,
                        //     whiteSpace: 'nowrap'
                        // }}
                        >
                            {/* Waiting for product... */}
                            
                            {statusWatcher}
                        </div>
                    </div>

                </div>
            </div>

           

            {/* Start, Stop, Edit */}
            <div className="flex flex-row justify-center items-center space-x-1">
                <button
                onClick={() => {setTaskState(true); startTask();}}
                >
                    <div className="text-green-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </button>
                <button
                onClick={() => stopTask()}
                >
                    <div className="text-yellow-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                        </svg>
                    </div>
                </button>
                <button
                onClick={() => deleteFunction(task)}
                >
                    <div className="text-red-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    )
}

interface TaskScreenProps {
    tasks: TaskClass[]
    setTasks: (ta : TaskClass[]) => void
}

const Tasks : FC<TaskScreenProps> = ({
    tasks,
    setTasks
} : TaskScreenProps) => {


    const deleteFunction = (t : TaskClass) => {
        setTasks(tasks.filter((tc : TaskClass) => tc.getId() !== t.getId()))
    }


    const dummyTask = {
        identifier: 1,
        site: "Amazon",
        profile: "Test Profile",
        size: "OS",
        proxyList: "proxies",
        siteConfig: "Amazon Config"
    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center text-lg h-full shadow-lg bg-indigo-1000">
            <div className="w-full p-5 h-full">
                <div className="rounded-xl shadow-xl bg-indigo-950 w-full h-full flex flex-col justify-start items-center">
                    <div className="w-full px-4 pt-4 flex justify-start items-center text-indigo-100 text-4xl font-medium">
                        Tasks
                    </div>

                    {/* Divding line */}
                    <div className="w-full flex justify-start">
                        <div className="h-0.5 w-full bg-indigo-500 mx-3 mt-2"></div>
                    </div>

                    <div className="w-full h-full px-4 flex flex-col overflow-y-scroll scrollbar-hide">
                        {tasks.map(task => (
                            <>
                                <Task task={task} deleteFunction={deleteFunction}/>
                                <div className="h-0.25 w-full bg-indigo-900"></div>
                            </>
                        ))}
                    </div>

                    {/* Divding line */}
                    <div className="w-full flex justify-start">
                        <div className="h-0.5 w-full bg-indigo-500 mx-3 mb-2"></div>
                    </div>
                    <div className="w-full px-4 pb-2 flex flex-row justify-center items-center text-indigo-100 text-4xl font-medium space-x-16">
                        <button className="z-10 absolute left-28 focus:outline-none">
                            <div className="ml-3 bg-indigo-900 shadow-md p-1 rounded-md border-green-200 border-2  text-xl text-indigo-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                        </button>
                        <button>
                            <div className="bg-indigo-900 shadow-md px-2 py-1 rounded-md border-green-200 border-2  text-xl text-indigo-100">
                                Start Tasks
                            </div>
                        </button>

                        <button>
                            <div className="bg-indigo-900 shadow-md px-2 py-1 rounded-md border-yellow-200 border-2 text-xl ">
                                Stop Tasks
                            </div>
                        </button>

                        <button>
                            <div className="bg-indigo-900 shadow-md px-2 py-1 rounded-md border-red-200 border-2 text-xl ">
                                Delete Tasks
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks;