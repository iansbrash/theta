import React, {
    FC, useState
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';


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

const TaskGroupInterface = () => {

    const [dropdownDown, setDowndownDown] = useState<boolean>(false);
    const [selectSiteInput, setSelectSiteInput] = useState<string>('');

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

    const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
    const [mouseDown, setMouseDown] = useState(false);

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

    const tryMove = (ev : any) => {

        console.log('trying to move')
        
        // moveing left
        if (mousePosition.x === -1) {
            // first init
        }
        else if (mousePosition.x > ev.clientX) {
            setdivW(divW - (mousePosition.x - ev.clientX))
        }
        else {
            setdivW(divW - (mousePosition.x - ev.clientX))
        }
        setMousePosition({x: ev.clientX, y: ev.clientY})
    }

    const oMU = () => {
        setMouseDown(false);
        setMousePosition({x: -1, y: -1})
    }

    const siteMinW = 'min-w-1/10'
    const productMinW = 'min-w-3/10'
    const profileMinW = 'min-w-1/10'
    const buttonsMinW = 'min-w-1/10'
    const siteMaxW = 'max-w-4/10'



    return (
        <ScreenWrapper>
            <div className={`h-auto w-full`}>
                <div className="p-4 flex flex-col justify-start items-center rounded-lg shadow-lg bg-theta-sidebar w-full h-full">
                    <div className="flex flex-row w-full justify-between items-center h-full">
                        <div className="flex flex-row justify-start items-center space-x-2">
                            <div className="text-theta-gray-2 text-4xl font-medium">
                                Task Group 1
                            </div>
                            <div className="text-theta-gray-7 text-2xl">
                                (0 tasks)
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
            <div className="w-full flex flex-row justify-start items-center overflow-hidden"
            onMouseMove={(ev) => mouseDown ? tryMove(ev) : null}
            onMouseLeave={() => setMouseDown(false)}
            >
                <div className="h-8 w-full flex flex-row justify-start items-center bg-theta-sidebar"
                >
                    <div className={`${siteMinW} ${siteMaxW} select-none min-w-1/10 text-theta-gray-2 text-xl font-medium `}
                style={{width: `${divW}px`}}
                >
                        Site
                    </div>
                    <div className="h-5 w-2 bg-theta-gray-2"
                    onMouseDown={() => setMouseDown(true)}
                    onMouseUp={() => oMU()}
                    ></div>
                    <div className="flex flex-row justify-start items-center"
                    >
                        <div className="select-none min-w-1/10 text-theta-gray-2 text-xl font-medium ">
                            Product
                        </div>
                        <div className={`flex flex-row justify-start items-center`}
                        >
                            <div className="select-none min-w-1/10 text-theta-gray-2 text-xl font-medium ">
                                Profile
                            </div>
                            <div className={`flex flex-row justify-start items-center`}
                            >
                                <div className={`${buttonsMinW} select-none min-w-1/10 text-theta-gray-2 text-xl font-medium`}>
                                    Buttons
                                </div>
                        </div>
                        </div>
                    </div>
                    
                </div>
                {/* <div className="min-w-1/10 resize-x overflow-auto w-auto text-theta-gray-2 text-xl font-medium bg-theta-sidebar">
                    Site
                </div>
                <div className="min-w-1/10 resize-x overflow-auto w-auto text-theta-gray-2 text-xl font-medium bg-theta-sidebar">
                    Site
                </div> */}
                {/* <div className="min-w-1/10 resize-x overflow-auto w-auto text-theta-gray-2 text-xl font-medium bg-theta-sidebar">
                    Site
                </div>
                <div className="scrollbar-hide min-w-1/10 resize-x overflow-auto w-auto text-theta-gray-2 text-xl font-medium bg-theta-sidebar-dark">
                    Input
                </div>
                <div className="min-w-1/10 resize-x overflow-auto w-auto text-theta-gray-2 text-xl font-medium bg-theta-sidebar">
                    Profile
                </div>
                <div className="min-w-1/10 resize-x overflow-auto w-auto text-theta-gray-2 text-xl font-medium bg-theta-sidebar-dark">
                    Proxy
                </div>
                <div className="min-w-1/10 overflow-auto resize-x w-auto text-theta-gray-2 text-xl font-medium bg-theta-sidebar">
                    Status
                </div>
                <div className="text-theta-gray-2 text-xl font-medium bg-theta-sidebar">
                    Buttons 2
                </div> */}

            </div>
            {/* <div className={`${impliedPadding} bg-theta-tasks-taskgroup w-full h-full rounded-lg shadow-lg`}>
                
            </div> */}
        </ScreenWrapper>
    )
}

export default TaskGroupInterface