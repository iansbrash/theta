// import { ResizableBox, Resizable } from 'react-resizable';
import React, {
    FC,
    useState,
    useEffect
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';
import IndividualProfile from '../Profiles/IndividualProfile';
import TextInput from '../Component Library/TextInput';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import IndividualProxy from './IndividualProxy';
import AutoResizerProxyComponent from './AutoResizerProxyComponent';
import { AutoSizer, List } from 'react-virtualized'



const Proxies : FC = () => {

    const [proxyGroupName, setProxyGroupName] = useState<string>('');
    const [selectedProxyGroup, setSelectedProxyGroup] = useState<string>('');

    const [loadedProfiles, setLoadedProfiles] = useState<ProfileObject[]>([]);


    const [proxyGroupSearch, setProxyGroupSearch] = useState<string>('');

    const [curProx, setCurProx] = useState<number[]>([]);

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < 1000; i++){
            arr.push(i)
        }
        setCurProx(arr)
    }, [])



    return (
        <div className="flex flex-1 h-full">
            <div className="w-full h-full flex flex-row">
                <div className="w-1/3 h-full">
                    <ScreenWrapper>
                        <div className="px-4 mb-2 flex flex-row justify-between items-center w-full">
                            <div className="flex flex-row justify-start items-center">
                                <div className="text-2xl font-medium text-theta-white">
                                    Proxies
                                </div>
                                <div className="ml-2 text-theta-gray-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-row justify-end items-center">
                                <button className="focus:outline-none w-8 h-8 rounded-md shadow-md bg-theta-logo flex justify-center items-center text-theta-white"
                                onClick={() => null}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-10 mt-1 mb-2">
                            <TextInput 
                                placeholder={'Search for proxy groups'}
                                input={proxyGroupSearch}
                                onChange={setProxyGroupSearch}
                                bg={''}
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                }
                                offsetWidth={'w-7'}
                            />
                        </div>
                        <div className="w-full h-full overflow-y-scroll scrollbar-hide flex flex-col justify-start items-center space-y-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `Proxy List ${n}`).filter(p => p.toLowerCase().includes(proxyGroupSearch.toLowerCase())).map(n => (
                                <IndividualProfile 
                                name={n} 
                                selectedProfile={selectedProxyGroup}
                                setSelectedProfile={setSelectedProxyGroup}/>
                            ))}
                        </div>
                    </ScreenWrapper>
                </div>

                <div className="w-2/3 h-full">
                    <ScreenWrapper>
                        <div className="w-full h-full bg-theta-tasks-taskgroup rounded-lg shadow-lg flex flex-col justify-start items-center p-4">
                            <div className="w-full justify-start items-start flex flex-col space-y-2 h-full">
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="w-96 h-12">
                                        <TextInput 
                                            input={proxyGroupName}
                                            onChange={setProxyGroupName}
                                            placeholder={'Proxy Group'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-4xl'}
                                            offsetWidth={'w-10'}
                                        />
                                    </div>
                                    <div className="flex flex-row justify-end items-center space-x-4">
                                        <button className="focus:outline-none px-2 w-12 h-12 rounded-md shadow-md bg-theta-logo flex justify-center items-center text-theta-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </button>
                                        <button className="focus:outline-none px-2 w-12 h-12 rounded-md shadow-md bg-blue-500 flex justify-center items-center text-theta-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <button className="focus:outline-none h-12 w-12 rounded-md shadow-md bg-red-400 flex justify-center items-center text-theta-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                                                <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                            </svg>
                                        </button>
                                        <button className="focus:outline-none h-12 w-12 rounded-md shadow-md bg-red-500 flex justify-center items-center text-theta-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                </div>
                                
                                <div className="w-full justify-start items-start flex flex-col space-y-2 overflow-y-scroll scrollbar-hide h-auto">
                                    <div className="flex flex-row justify-start items-center space-x-2">
                                        <div className="ml-2 text-theta-gray-2 font-medium text-2xl">
                                            Proxies
                                        </div>
                                        <div className="text-theta-gray-7 font-medium text-lg">
                                            (0 total)
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full px-2 flex flex-row justify-between items-center">
                                    <div className="text-lg text-theta-gray-4 w-6/12">
                                        Host
                                    </div>

                                    <div className="text-lg text-theta-gray-4 w-1/12">
                                        Port
                                    </div>

                                    <div className="text-lg text-theta-gray-4 w-2/12">
                                        Username
                                    </div>

                                    <div className="text-lg text-theta-gray-4 w-2/12">
                                        Password
                                    </div>

                                    {/* To space everything evenly */}
                                    <div className="w-1/12"></div>
                                </div>


                                <div className="flex flex-col justify-start items-start w-full h-full">
                                    <AutoSizer>
                                        {({height, width}) => (
                                            <List 
                                                rowCount={curProx.length}
                                                rowHeight={44}
                                                width={width}
                                                height={height}
                                                rowRenderer={AutoResizerProxyComponent}
                                                className="scrollbar-hide focus:outline-none"
                                            ></List>
                                        )}
                                    </AutoSizer>
                                </div>
                            </div>
                        </div>
                    </ScreenWrapper>
                </div>
            </div>
        </div>
    )
}

export default Proxies;