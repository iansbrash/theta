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
import IndividualAccount from './IndividualAccount';
// import AutoResizerProxyComponent from './AutoResizerProxyComponent';
import { AutoSizer, List } from 'react-virtualized'
import Site from '../../Logic/interfaces/enums/Site';
import Account from '../../Logic/interfaces/Account';

const AccountForMap : FC<Account>= ({
    username
}: Account) => {
    return (
        <div className={`transition duration-250 ease-in-out focus:outline-none w-full h-14 rounded-md shadow-md border border-theta-tasks-taskgroup bg-theta-profiles-individual flex flex-row justify-between items-center`}
        >
            {/* Left Side */}
            <div className="h-14 flex flex-row justify-start items-center">
                <div className=" w-10 h-10 rounded-md shadow-md bg-theta-bg ml-2"></div>
                <div className={`font-medium text-theta-gray-7 text-xl ml-2`}>
                    {username}
                </div>
            </div>

            {/* Right Side */}
            <div className="w-auto justify-end flex flex-row items-center space-x-2 mr-3">
                <button className={ `text-red-500 focus:outline-none`}
                // onClick={() => toggleFavorite()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
                {/* <button className="text-theta-gray-2 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button> */}
                {/* <button className="text-red-600 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button> */}
            </div>
        </div>
    )
}



const Accounts : FC = () => {

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

                {/* Accounts */}
                <div className="w-1/4 h-full">
                    <ScreenWrapper>
                        <div className="px-4 mb-2 flex flex-row justify-between items-center w-full">
                            <div className="flex flex-row justify-start items-center">
                                <div className="text-2xl font-medium text-theta-white">
                                    Accounts
                                </div>
                                <div className="text-theta-gray-2 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
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
                                placeholder={'Search for accounts'}
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
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `Account ${n}`).filter(p => p.toLowerCase().includes(proxyGroupSearch.toLowerCase())).map(n => (
                                <AccountForMap 
                                username={n} 
                                site={Site.Amazon}
                                password={'asd'}
                                />
                            ))}
                        </div>
                    </ScreenWrapper>
                </div>

                {/* Account Groups */}
                <div className="w-1/4 h-full">
                    <ScreenWrapper>
                        <div className="px-4 mb-2 flex flex-row justify-between items-center w-full">
                            <div className="flex flex-row justify-start items-center">
                                <div className="text-2xl font-medium text-theta-white">
                                    Account Groups
                                </div>
                                <div className="text-theta-gray-2 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
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
                                placeholder={'Search for account groups'}
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
                            {[1, 2, 3, 4, ].map(n => `Account Group ${n}`).filter(p => p.toLowerCase().includes(proxyGroupSearch.toLowerCase())).map(n => (
                                <IndividualProfile 
                                name={n} 
                                selectedProfile={selectedProxyGroup}
                                setSelectedProfile={setSelectedProxyGroup}
                                bg={'bg-theta-accounts-accountgroup-individual'}
                                />
                            ))}
                        </div>
                    </ScreenWrapper>
                </div>


                {/* Account Group Screen */}
                <div className="w-1/2 h-full">
                    <ScreenWrapper>
                        <div className="w-full h-full bg-theta-tasks-taskgroup rounded-lg shadow-lg flex flex-col justify-start items-center p-4">
                            <div className="w-full justify-start items-start flex flex-col space-y-2 h-full">
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="w-96 h-12">
                                        <TextInput 
                                            input={proxyGroupName}
                                            onChange={setProxyGroupName}
                                            placeholder={'Account Group'}
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
                                            Accounts
                                        </div>
                                        <div className="text-theta-gray-7 font-medium text-lg">
                                            (0 total)
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full px-2 flex flex-row justify-start items-center">
                                    <div className="text-lg text-theta-gray-4 w-1/2">
                                        Username
                                    </div>
                                    <div className="text-lg text-theta-gray-4 w-1/2">
                                        Password
                                    </div>
                                </div>


                                <div className="flex flex-col justify-start items-start w-full h-full">
                                    {[1, 2, 3, 4, 5].map(n => {
                                        
                                        const acc = {
                                            site: Site.Amazon,
                                            username: 'brash@usc.edu',
                                            password: '123456'
                                        }

                                        return <IndividualAccount {...acc} />
                                    })}
                                    {/* <AutoSizer>
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
                                    </AutoSizer> */}
                                </div>
                            </div>
                        </div>
                    </ScreenWrapper>
                </div>
            </div>
        </div>
    )
}

export default Accounts;