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



    return (
        <div className="flex flex-1 h-full">
            <div className="w-full h-full flex flex-row">
                <div className="w-1/3 h-full">
                    <ScreenWrapper>
                        <div className="ml-6 mb-2 text-2xl font-medium text-theta-white w-full justify-start items-center">
                            Profiles
                        </div>
                        <div className="w-full h-full overflow-y-scroll scrollbar-hide flex flex-col justify-start items-center space-y-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                <IndividualProfile 
                                name={`Real Profile ${n}`} 
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
                            <div className="w-full justify-start items-start flex flex-col space-y-2">

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

                                <div className="ml-2 text-theta-gray-2 font-medium text-2xl">
                                    Information
                                </div>
                                <div className="flex flex-row justify-start items-center w-full">
                                    <div className="w-1/2 pr-6 flex flex-col justify-start items-center">
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
                                    <div className="w-1/2 pr-6 flex flex-col justify-start items-center">
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
                            </div>

                            {/* Shipping */}
                            <div className="w-full justify-start items-start flex flex-col space-y-2">
                                <div className="ml-2 text-theta-gray-2 font-medium text-2xl">
                                    Shipping
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Information */}
                            <div className="w-full justify-start items-start flex flex-col space-y-2">
                                <div className="ml-2 text-theta-gray-2 font-medium text-2xl">
                                    Billing
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Information */}
                            <div className="w-full justify-start items-start flex flex-col space-y-2">
                                <div className="ml-2 text-theta-gray-2 font-medium text-2xl">
                                    Payment
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-start items-center space-x-2">
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={email}
                                            onChange={setEmail}
                                            placeholder={'ian@theta.io'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
                                    </div>
                                    <div className="w-64 h-10">
                                        <TextInput 
                                            input={phone}
                                            onChange={setPhone}
                                            placeholder={'+16154231105'}
                                            bg={'bg-theta-bg'}
                                            border={'border-theta-sidebar'}
                                            icon={
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            }
                                            textSize={'text-2xl'}
                                            offsetWidth={'w-7'}
                                        />
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