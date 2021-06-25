import React, { FC } from "react";


interface TaskProps {
    identifier: number,
    site: string,
    // siteConfig: TaskConfig,
    profile: string,
    size: string,
    proxyList: string,
    siteConfig: string
}

const Task : FC<TaskProps> = ({
    identifier,
    site,
    profile,
    size,
    proxyList,
    siteConfig
} : TaskProps) => {

    const product = 'https://amazon.com/asdasdasdasdasdasdasd/dp/DPPRODID';



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
                        {product.substring(product.indexOf('dp/') + 3)}
                    </div>

                    <div className="w-1/4 text-indigo-100 h-10 flex flex-row justify-left items-center">
                        <div className="w-1/2 text-indigo-100 truncate">
                            {profile}
                        </div>
                        <div className="w-1/2 text-indigo-100 truncate">
                            {proxyList}
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
                            Waiting for product...
                        </div>
                    </div>

                </div>
            </div>

           

            {/* Start, Stop, Edit */}
            <div className="flex flex-row justify-center items-center space-x-1">
                <button>
                    <div className="text-green-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </button>

                <button>
                    <div className="text-yellow-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                        </svg>
                    </div>
                </button>
                
                <button>
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

const Tasks : FC = () => {

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
                    <div className="w-full flex ustify-start">
                        <div className="h-0.5 w-full bg-indigo-500 mx-3 my-2"></div>
                    </div>

                    <div className="w-full h-full px-4 flex flex-col">
                        {[dummyTask, dummyTask, dummyTask, dummyTask].map(task => (
                            <>
                                <Task {...task}/>
                                <div className="h-0.25 w-full bg-indigo-900"></div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks;