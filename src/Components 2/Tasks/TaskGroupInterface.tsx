import React, {
    FC, useState,
    useEffect,
    ReactNode
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';
import AutoResizerTaskComponent from './AutoResizerTaskComponent'
import { AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css';

interface TextInputProps {
    placeholder: string,
    icon: ReactNode,
    input: number,
    setInput: (s : number) => void
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

interface SliderContainerProps {
    siteMinW: string,
    siteMaxW: string,
    origDivW: number,
    children: React.ReactNode,
    pxMin: number,
    pxMax: number
}

const SliderContainer : FC<SliderContainerProps> = ({
    siteMaxW,
    siteMinW,
    origDivW,
    pxMin,
    pxMax,
    children
} : SliderContainerProps) => {

    const [divW, setDivW] = useState<number>(origDivW);
    const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        setDivW(origDivW)
    }, [origDivW])

    const tryMove = (ev : any) => {

        console.log('trying to move')
        
        // moveing left
        if (mousePosition.x === -1) {
            // first init
        }
        else if (mousePosition.x > ev.clientX) {
            console.log('first')
            let newW = divW - (mousePosition.x - ev.clientX)
            if (newW < pxMin) {
                setDivW(pxMin);
            }
            else {
                setDivW(newW)
            }
        }
        else {
            console.log('sec')

            let newW = divW - (mousePosition.x - ev.clientX)
            if (newW > pxMax) {
                setDivW(pxMax);
            }
            else {
                setDivW(newW)
            }
        }
        setMousePosition({x: ev.clientX, y: ev.clientY})
    }

    const oMU = () => {
        setMouseDown(false);
        setMousePosition({x: -1, y: -1})
    }


    return (
        <div className={`${siteMinW} ${siteMaxW} bg-theta-sidebar cursor-move`}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => oMU()}
        onMouseMove={(ev) => mouseDown ? tryMove(ev) : null}
        onMouseLeave={() => oMU()}
        style={{width: `${divW}px`}}
        >
            {children}
        </div>
    )
}


interface SiteOptionProps {
    name: string,
    handleSiteChange: (s : string) => void
}

const SiteOption : FC<SiteOptionProps> = ({
    name,
    handleSiteChange
} : SiteOptionProps) => {
    return (
        <button className="relative text-theta-gray-7 hover:text-theta-gray-2 focus:outline-none transition flex flex-row justify-start items-center w-full h-10"
            onClick={() => handleSiteChange(name)}
        >   
            {/* This is w-8 because we have a space in front of the placeholder in the input */}
            <div className="w-7"></div>
            <div className="text-2xl">
                {name}
            </div>
        </button>
    )
}


const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
)

interface TaskGroupInterfaceProps {
    hidden: boolean,
    taskGroupName: string
}

const TaskGroupInterface : FC<TaskGroupInterfaceProps> = ({
    hidden,
    taskGroupName
} : TaskGroupInterfaceProps) => {

    const [dropdownDown, setDowndownDown] = useState<boolean>(false);
    const [selectSiteInput, setSelectSiteInput] = useState<string>('');
    const [monitorDelay, setMonitorDelay] = useState<number>(3000);
    const [errorDelay, setErrorDelay] = useState<number>(3000);

    const [tasks, setTasks] = useState<string[]>([]);

    const onInputFocus = () => {
        setDowndownDown(true)
    }

    const onInputBlur = () => {
        setDowndownDown(false)
    }
    const impliedPadding = 'p-2'

    const [currentSite, setCurrentSite] = useState<string>('');

    const sites = ['Amazon', 'Target'];

    const [siteSelectionArray, setSiteSelectionArray] = useState<string[]>(sites);


    const [cW, setCW ] = useState<number>(0);

    useEffect(() => {
        // @ts-ignore
        setCW(document.getElementById('sliderDiv')?.clientWidth)

        let t = []

        for (let i = 0; i < 1000; i++){
            t.push(i + '')
        }

        setTasks(t)
    }, [])

    // @ts-ignore
    


    const [divW, setdivW] = useState(10);

    
    const handleSiteChange = (s : string) => {
        setCurrentSite(s);
        setSelectSiteInput(s);
        onInputBlur();
    }

    const tableHeaders = [
        "Items",
        "Order #",
        "Amount",
        "Status",
        "Delivery Driver"
    ];

   

    const siteMinW = 'min-w-1/10'
    const productMinW = 'min-w-3/10'
    const profileMinW = 'min-w-1/10'
    const buttonsMinW = 'min-w-1/10'
    const siteMaxW = 'max-w-4/10'

    return (
        <ScreenWrapper hidden={hidden}>
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
                            <button className={`border-t border-l border-r border-theta-gray-7 relative focus:outline-none w-full h-full rounded-t-lg ${dropdownDown ? '' : 'rounded-b-lg border-b'} shadow-md bg-theta-bg flex flex-col justify-start items-center`}
                            onClick={() => null}
                            >
                                <div className="h-full flex flex-row justify-start items-center">
                                    <div className="w-7"></div>
                                    <input
                                        value={selectSiteInput}
                                        onChange={(e) => setSelectSiteInput(e.target.value)}
                                        onFocus={() => onInputFocus()}
                                        // onBlur={() => onInputBlur()}
                                        placeholder={'Select a site'}
                                        className="rounded-xl h-full w-full bg-theta-bg focus:outline-none placeholder-theta-gray-2 text-theta-gray-2 text-2xl"
                                    />
                                </div>
                                <div className="text-theta-gray-7 absolute left-0 top-0 bottom-0 flex justify-center items-center">
                                    <ChevronRight />
                                </div>
                            </button>

                            {/* Drop down part */}
                            <div className="relative w-full">
                                <div className={`${dropdownDown ? '' : 'hidden'} border-b border-l border-r border-theta-gray-7 rounded-bl-lg rounded-br-lg bg-theta-bg absolute top-0 left-0 right-0 flex flex-col justify-start items-center`}
                                onBlur={() => onInputBlur()}
                                >
                                    
                                    {siteSelectionArray.filter(s => s.toLowerCase().includes(selectSiteInput.toLowerCase())).map(site => (
                                        <SiteOption 
                                            name={site}
                                            handleSiteChange={handleSiteChange}
                                        />
                                    ))}
                                    {/* Adding this adds the ones that don't match the criteria below */}
                                    {siteSelectionArray.filter(s => !s.toLowerCase().includes(selectSiteInput.toLowerCase())).map(site => (
                                        <SiteOption 
                                            name={site}
                                            handleSiteChange={handleSiteChange}
                                        />
                                    ))}
                                </div>
                            </div>
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
                        rowCount={tasks.length}
                        rowHeight={52}
                        width={width}
                        height={height}
                        rowRenderer={AutoResizerTaskComponent}
                        className="scrollbar-hide focus:outline-none"
                    >
                        
                    </List>
                )}
                </AutoSizer>
            </div>
            <div className="h-20 w-full flex flex-row justify-between items-center mt-2">
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
                    <button className="transition transform duration-250 ease-in-out hover:scale-110 focus:outline-none rounded-full bg-theta-sidebar shadow-lg text-theta-tasks-taskcomponent-start flex flex-row justify-center items-center">
                        <div className="ml-4 mr-2 text-theta-gray-2 font-medium text-2xl">
                            Start
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="transition transform duration-250 ease-in-out hover:scale-110 focus:outline-none rounded-full bg-theta-sidebar-dark shadow-lg text-theta-tasks-taskcomponent-stop flex flex-row justify-center items-center">
                        <div className="ml-4 mr-2 text-theta-gray-2 font-medium text-2xl">
                            Stop
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="transition transform duration-250 ease-in-out hover:scale-110 focus:outline-none rounded-full bg-theta-sidebar-dark shadow-lg text-theta-tasks-taskcomponent-delete flex flex-row justify-center items-center">
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
                <button className="transition transform duration-250 ease-in-out hover:scale-110 focus:outline-none rounded-full bg-theta-sidebar-dark shadow-lg text-blue-400 flex flex-row justify-center items-center">
                        <div className="ml-4 mr-2 text-theta-gray-2 font-medium text-2xl">
                            Add Tasks
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