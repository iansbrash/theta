// import { ResizableBox, Resizable } from 'react-resizable';
import React, {
    FC,
    useState
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';
import IndividualProfile from './IndividualProfile';
import TextInput from '../Component Library/TextInput';
import ProfileObject from '../../Logic/interfaces/ProfileObject';


const Profiles : FC = () => {

    const [profileName, setProfileName] = useState<string>('');
    const [selectedProfile, setSelectedProfile] = useState<string>('');

    const [loadedProfiles, setLoadedProfiles] = useState<ProfileObject[]>([]);

    // info
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    // shipping
    const [shipFname, setShipFname] = useState<string>('');
    const [shipLname, setShipLname] = useState<string>('');
    const [shipAddr1, setShipAddr1] = useState<string>('');
    const [shipAddr2, setShipAddr2] = useState<string>('');
    const [shipCountry, setShipCountry] = useState<string>('');
    const [shipState, setShipState] = useState<string>('');
    const [shipZip, setShipZip] = useState<string>('');
    const [shipCity, setShipCity] = useState<string>('');

    // billing
    const [billFname, setBillFname] = useState<string>('');
    const [billLname, setBillLname] = useState<string>('');
    const [billAddr1, setBillAddr1] = useState<string>('');
    const [billAddr2, setBillAddr2] = useState<string>('');
    const [billCountry, setBillCountry] = useState<string>('');
    const [billState, setBillState] = useState<string>('');
    const [billZip, setBillZip] = useState<string>('');
    const [billCity, setBillCity] = useState<string>('');

    // payment
    const [paymentName, setPaymentName] = useState<string>('');
    const [paymentNumber, setPaymentNumber] = useState<string>('');
    const [paymentExpMonth, setPaymentExpMonth] = useState<string>('');
    const [paymentExpYear, setPaymentExpYear] = useState<string>('');
    const [paymentCVV, setPaymentCVV] = useState<string>('');

    const [profileSearch, setProfileSearch] = useState<string>('');



    return (
        <div className="flex flex-1 h-full">
            <div className="w-full h-full flex flex-row">
                <div className="w-1/3 h-full">
                    <ScreenWrapper>
                        <div className="px-4 mb-2 flex flex-row justify-between items-center w-full">
                            <div className="flex flex-row justify-start items-center">
                                <div className="text-2xl font-medium text-theta-white">
                                    Profiles
                                </div>
                                <div className="ml-2 text-theta-gray-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
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
                                placeholder={'Search for profiles'}
                                input={profileSearch}
                                onChange={setProfileSearch}
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
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => `Real Profile ${n}`).filter(p => p.toLowerCase().includes(profileSearch.toLowerCase())).map(n => (
                                <IndividualProfile 
                                name={n} 
                                selectedProfile={selectedProfile}
                                setSelectedProfile={setSelectedProfile}/>
                            ))}
                        </div>
                    </ScreenWrapper>
                </div>

                <div className="w-2/3 h-full">
                    <ScreenWrapper>
                        <div className="w-full h-full bg-theta-tasks-taskgroup rounded-lg shadow-lg flex flex-col justify-start items-center p-4">
                            {/* Information */}
                            <div className="w-full justify-start items-start flex flex-col space-y-2 h-full">
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="w-96 h-12">
                                        <TextInput 
                                            input={profileName}
                                            onChange={setProfileName}
                                            placeholder={'Profile Name'}
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

                                    <div className="ml-2 text-theta-gray-2 font-medium text-2xl">
                                        Information
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Email
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={email}
                                                    onChange={setEmail}
                                                    placeholder={'ian@theta.io'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Phone Number
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={phone}
                                                    onChange={setPhone}
                                                    placeholder={'+13252295721'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* Shipping */}
                                <div className="w-full justify-start items-start flex flex-col space-y-2">
                                    <div className="ml-2 text-theta-gray-2 font-medium text-2xl mt-4">
                                        Shipping
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                First Name
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={shipFname}
                                                    onChange={setShipFname}
                                                    placeholder={'John'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Last Name
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={shipLname}
                                                    onChange={setShipLname}
                                                    placeholder={'Smith'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Address 1
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={shipAddr1}
                                                    onChange={setShipAddr1}
                                                    placeholder={'123 Theta Lane'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Address 2
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={shipAddr2}
                                                    onChange={setShipAddr2}
                                                    placeholder={'Suite 9'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Country
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={shipCountry}
                                                    onChange={setShipCountry}
                                                    placeholder={'United States'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                State
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={shipState}
                                                    onChange={setShipState}
                                                    placeholder={'California'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                City
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={shipCity}
                                                    onChange={setShipCity}
                                                    placeholder={'Los Angeles'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Zip Code
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={shipZip}
                                                    onChange={setShipZip}
                                                    placeholder={'California'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Information */}
                                <div className="w-full justify-start items-start flex flex-col space-y-2">
                                    <div className="ml-2 text-theta-gray-2 font-medium text-2xl mt-4">
                                        Billing
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                First Name
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={billFname}
                                                    onChange={setBillFname}
                                                    placeholder={'John'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Last Name
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={billLname}
                                                    onChange={setBillLname}
                                                    placeholder={'Smith'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Address 1
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={billAddr1}
                                                    onChange={setBillAddr1}
                                                    placeholder={'123 Theta Lane'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Address 2
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={billAddr2}
                                                    onChange={setBillAddr2}
                                                    placeholder={'Suite 9'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Country
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={billCountry}
                                                    onChange={setBillCountry}
                                                    placeholder={'United States'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                State
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={billState}
                                                    onChange={setBillState}
                                                    placeholder={'California'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                City
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={billCity}
                                                    onChange={setBillCity}
                                                    placeholder={'Los Angeles'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Zip Code
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={billZip}
                                                    onChange={setBillZip}
                                                    placeholder={'California'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Information */}
                                <div className="w-full justify-start items-start flex flex-col space-y-2">
                                    <div className="ml-2 text-theta-gray-2 font-medium text-2xl mt-4">
                                        Payment
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Card Owner
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={paymentName}
                                                    onChange={setPaymentName}
                                                    placeholder={'John Smith'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="flex flex-row justify-start items-center">
                                                <div className="flex flex-col justify-start items-center pr-3">
                                                    <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                        Card Number
                                                    </div>
                                                    <div className="w-full h-10">
                                                        <TextInput 
                                                            input={paymentNumber}
                                                            onChange={setPaymentNumber}
                                                            placeholder={'1234123412341234'}
                                                            bg={'bg-theta-bg'}
                                                            border={'border-theta-sidebar'}
                                                            icon={
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            }
                                                            textSize={'text-2xl'}
                                                            offsetWidth={'w-7'}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-start items-center w-32">
                                                    <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                        CVV
                                                    </div>
                                                    <div className="w-full h-10">
                                                        <TextInput 
                                                            input={paymentCVV}
                                                            onChange={setPaymentCVV}
                                                            placeholder={'010'}
                                                            bg={'bg-theta-bg'}
                                                            border={'border-theta-sidebar'}
                                                            icon={
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            }
                                                            textSize={'text-2xl'}
                                                            offsetWidth={'w-8'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-start items-center w-1/2">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Expiration Month
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={paymentExpMonth}
                                                    onChange={setPaymentExpMonth}
                                                    placeholder={'11'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Expiration Year
                                            </div>
                                            <div className="w-full h-10">
                                                <TextInput 
                                                    input={paymentExpYear}
                                                    onChange={setPaymentExpYear}
                                                    placeholder={'26'}
                                                    bg={'bg-theta-bg'}
                                                    border={'border-theta-sidebar'}
                                                    icon={
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    }
                                                    textSize={'text-2xl'}
                                                    offsetWidth={'w-7'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>

                                
                            </div>
                        </div>
                    </ScreenWrapper>
                </div>
            </div>
        </div>
    )
}

export default Profiles;