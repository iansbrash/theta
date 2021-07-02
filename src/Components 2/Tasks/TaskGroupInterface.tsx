import React, {
    FC, useState,
    useRef,
    useEffect
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';
import TaskComponent from './TaskComponent'
import { AutoSizer, List } from 'react-virtualized'
import 'react-virtualized/styles.css';

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
            t.push(Math.random() * 1000 + '')
        }

        setTasks(t)
    }, [])





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

    // @ts-ignore
    function rowRenderer({key, index, style}) {
        return (
          <div key={key} style={style}>
              {tasks[index]}
          </div>
        );
      }

    return (
        <ScreenWrapper>
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
            <div className="w-full h-full relative flex flex-col justify-start items-center  overflow-scroll scrollbar-hide"> 

                {/* Top Gradient */}
                <div className="z-10 absolute top-0 left-0 right-0 w-full h-4 bg-gradient-to-b from-theta-bg to-transparent"></div>

                {/* <div className="z-0 w-full space-y-2 flex flex-col justify-start items-center px-2 overflow-scroll scrollbar-hide" id="sliderDiv">
                    <div className="h-4"></div> */}
                    {/* {
                        tasks.map(t => (
                            <TaskComponent />
                        ))
                    } */}
                   
                    
                {/* </div> */}

                {/* Bottom Grad */}
                <div className="z-10 absolute bottom-0 left-0 right-0 w-full h-4 bg-gradient-to-t from-theta-bg to-transparent"></div>
                <AutoSizer>
                {({height, width}) => (
                    <List 
                        rowCount={tasks.length}
                        rowHeight={() => 14}
                        width={width}
                        height={height}
                        rowRenderer={TaskComponent}
                    >
                        
                    </List>
                )}
                </AutoSizer>
            </div>
            
        </ScreenWrapper>
    )
}

export default TaskGroupInterface