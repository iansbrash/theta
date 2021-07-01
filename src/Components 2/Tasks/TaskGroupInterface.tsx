import React, {
    FC, useState
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';


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
    
    const handleSiteChange = (s : string) => {
        setCurrentSite(s);
        setSelectSiteInput(s);
        onInputBlur();
    }

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
                                    <button className="relative text-theta-gray-7 hover:text-theta-gray-2 focus:outline-none transition flex flex-row justify-start items-center w-full h-10"
                                    onClick={() => handleSiteChange('Amazon')}
                                    >
                                        {/* This is w-8 because we have a space in front of the placeholder in the input */}
                                        <div className="w-7"></div>
                                        <div className="text-2xl">
                                            Amazon
                                        </div>
                                    </button>
                                    <button className="relative text-theta-gray-7 hover:text-theta-gray-2 focus:outline-none transition flex flex-row justify-start items-center w-full h-10"
                                    onClick={() => handleSiteChange('Target')}
                                    >
                                        {/* This is w-8 because we have a space in front of the placeholder in the input */}
                                        <div className="w-8"></div>
                                        <div className="text-2xl">
                                            Target
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-4">

            </div>
            {/* <div className={`${impliedPadding} bg-theta-tasks-taskgroup w-full h-full rounded-lg shadow-lg`}>
                
            </div> */}
        </ScreenWrapper>
    )
}

export default TaskGroupInterface