import React, { 
    FC, useState
} from "react";
import Task from '../../Logic/interfaces/Task';
import Size from '../../Logic/interfaces/enums/Size'
import Site from '../../Logic/interfaces/enums/Site'
import testProfile from '../../Logic/sensitive/testInterfaces/testProfile';
import testProxyList from '../../Logic/sensitive/testInterfaces/testProxyList';
import testAccount from '../../Logic/sensitive/testInterfaces/testAccount';
import { AmazonModes } from '../../Logic/interfaces/site_task_config/AmazonTaskConfig';
import AmazonTaskConfig from '../../Logic/interfaces/site_task_config/AmazonTaskConfig'
import TaskClass from "../../Logic/sites/classes/TaskClass";
import AmazonTaskClass from "../../Logic/sites/Amazon/classes/AmazonTaskClass";


interface AbstractSelectorProps {
    width: string,
    defaultText: string,
    selection: string,
    setSelection: (x : string) => void,
    selectionOptions: string[]
}

export const AbstractSelector : FC<AbstractSelectorProps> = ({
    width,
    defaultText,
    selection,
    setSelection,
    selectionOptions
} : AbstractSelectorProps) => {

    
    const handleChange = (e : any) => {
        if (e.target.value === defaultText){
            setSelection('');
        }
        else {
            setSelection(e.target.value)
        }
    }


    return (
        <div className="w-full flex justify-start px-5 py-1">
            <select value={selection} onChange={(e) => handleChange(e)} className={`${selection === '' ? 'text-indigo-400' : 'text-indigo-100'} ${width} text-2xl mt-2 p-1 rounded-md appearance-none bg-indigo-975 focus:outline-none`}>
                <option className="text-indigo-400" value={defaultText}>{defaultText}</option>
                {selectionOptions.map(item => <option className="text-indigo-100" value={item}>{item}</option>)}
            </select>
        </div>
    )
}

interface SpecificSiteConfigProps {
    site: string
}


const SpecificSiteConfig : FC<SpecificSiteConfigProps> = ({
    site
} : SpecificSiteConfigProps) => {

    const SelectASite = () => (
        <div className="w-full px-6 text-indigo-100 text-2xl">
            Select a site!
        </div>
    )
    
    switch (site) {
        // Im fucked
        case "Select Site":
            return <SelectASite />
        case "":
            return <SelectASite />

        case "Amazon":
            return (
                <AmazonSiteConfig />
            )
        default:
            return <div className="font-bold text-2xl">Error!</div>;
    }
}


// account, mode
const AmazonSiteConfig = () => {

    const [account, setAccount] = useState<string>('');
    const [mode, setMode] = useState<string>('');



    return (
        <div className="w-full">
            <div className="text-indigo-100 font-medium text-3xl ml-4">
                Amazon Config
            </div>
            <div className="h-full flex flex-row w-full p-1 grid-cols-2 mb-4">
                {/* Account */}
                <div className="w-1/2 flex flex-col">
                    <AbstractSelector 
                        width={'w-64'}
                        defaultText={'Select Account'}
                        selection={account}
                        setSelection={setAccount}
                        selectionOptions={['brash@usc.edu', 'iansbrash@gmail.com']}
                    />
                </div>
                {/* Mode */}
                <div className="w-1/2 flex flex-col">
                    <AbstractSelector 
                        width={'w-64'}
                        defaultText={'Select Mode'}
                        selection={mode}
                        setSelection={setMode}
                        selectionOptions={Object.values(AmazonModes)}
                    />
                </div>
            </div>
        </div>
    )
}


interface AddTasksProps {
    tasks: TaskClass[]
    setTasks: (tasks : TaskClass[]) => void
}

const AddTasks : FC<AddTasksProps> = ({
    tasks,
    setTasks
} : AddTasksProps) => {

    const [site, setSite] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [profile, setProfile] = useState<string>('');
    const [proxies, setProxies] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [taskIdCounter, setTaskIdCounter] = useState<number>(0);

    const handleUrlChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    } 


    // const amazonTaskConfig : AmazonTaskConfig = {
    //     mode: AmazonModes.Normal,
    //     account: testAccount
    // }

    // const task : AmazonTaskClass  = new AmazonTaskClass(
    //     1,
    //     Site.Amazon,
    //     testProfile,
    //     [Size.OS],
    //     testProxyList, 
    //     undefined,
    //     amazonTaskConfig,
    // )
    
    const AddTaskHandler = () => {
        const toAddTaskClass : AmazonTaskClass = new AmazonTaskClass (
            taskIdCounter,
            // @ts-ignore
            Site[Site[site]],
            testProfile,

            // @ts-ignore
            [Size[Size[size]]],
            testProxyList,
            url,
            {
                mode: AmazonModes.Normal,
                account: testAccount
            }
        )

        setTasks([...tasks, toAddTaskClass])
        setTaskIdCounter(taskIdCounter + 1);
    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center text-lg h-full shadow-lg bg-indigo-1000">
            <div className="w-full p-5 h-full">
                <div className="rounded-xl shadow-xl bg-indigo-950 w-full h-full flex flex-col justify-start items-center">
                    {/* Add Tasks text */}
                    <div className="w-full p-4 flex justify-start items-center text-indigo-100 text-4xl font-medium">
                        Create tasks
                    </div>

                    {/* Site selector */}
                    <div className="w-full p-1">
                        <AbstractSelector 
                            width={'w-64'}
                            defaultText={'Select Site'}
                            selection={site}
                            setSelection={setSite}
                            selectionOptions={Object.values(Site)}
                        />
                    </div>

                    {/* URL input */}
                    <div className="w-full p-1">
                        <div className="w-full flex justify-start px-5 py-1">
                            <input 
                                placeholder={'https://amazon.com/dp/B07W4FMQ5Y'}
                                value={url}
                                onChange={(e) => handleUrlChange(e)}
                                className={`focus:outline-none bg-indigo-975 ${url === '' ?  'placeholder-indigo-400' : 'text-indigo-100'} caret-indigo-100 rounded-md p-1 w-full text-2xl`}                          
                            />
                        </div>
                    </div>
                        
                    <div className="h-10"></div>
                    {/* Specific site config goes under here */}

                    <SpecificSiteConfig 
                        site={site}
                    />

                    {/* Specific site config goes above here */}
                    <div className="h-10"></div>

                    {/* Task Config */}
                    <div className="w-full px-2 text-indigo-100 font-medium text-3xl ml-4">
                        Task Config
                    </div>
                    <div className="h-full flex flex-row w-full p-1 grid-cols-2 mb-4">
                        {/* Col1 */}
                        <div className="w-1/2 flex flex-col">
                            {/* Size selector */}
                            <AbstractSelector 
                                width={'w-64'}
                                defaultText={'Select Size'}
                                selection={size}
                                setSelection={setSize}
                                selectionOptions={Object.values(Size)}
                            />
                            {/* Proxies selector */}
                            <AbstractSelector 
                                width={'w-64'}
                                defaultText={'Select Proxies'}
                                selection={proxies}
                                setSelection={setProxies}
                                selectionOptions={['List1', 'List2']}
                            />
                        </div>

                        {/* Col2 */}
                        <div className="w-1/2 flex flex-col">
                            {/* Profile selector */}
                            <AbstractSelector 
                                width={'w-64'}
                                defaultText={'Select Profile'}
                                selection={profile}
                                setSelection={setProfile}
                                selectionOptions={['Profile 1', 'Real Card', 'Mom Cardasdasdasdasdasdasd']}
                            />
                            <div className="w-full flex justify-start px-5 py-1">
                                <button
                                className="focus:outline-none"
                                onClick={() => AddTaskHandler()}
                                >
                                    <div className="p-1 bg-gradient-to-r from-indigo-600 to-indigo-400 w-64 mt-2 rounded-lg flex justify-center items-center border">
                                        <div className="text-2xl text-indigo-100">
                                            Add Task
                                        </div>
                                        <div className="text-indigo-100 ml-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


// store selector
// options for store pop up on select
// default options:
//      size, profile, proxies, url/input
// amazon option:
//      account, mode

export default AddTasks;