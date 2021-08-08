// import { ResizableBox, Resizable } from 'react-resizable';
import React, {
    FC,
    useState,
    useEffect
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';
import IndividualProfile from './IndividualProfile';
import TextInput from '../Component Library/TextInput';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addOrUpdateProfile, removeProfile } from '../../redux/reducers/profilesSlice';
import DropdownSelect from '../Component Library/DropdownSelect';
import electron from 'electron';
import { Country, State, City }  from 'country-state-city';
import { ICountry, IState } from 'country-state-city/dist/lib/interface';
import CheckBox from '../Component Library/CheckBox';

const Profiles : FC = () => {

    const loadedProfiles : ProfileObject[] = useSelector((state : RootState) => state.profiles.profilesArray)

    const [profileName, setProfileName] = useState<string>('');
    const [selectedProfile, setSelectedProfile] = useState<ProfileObject | undefined>(loadedProfiles.length === 0 ? undefined : loadedProfiles[0]);

    const dispatch = useDispatch();
    // const [loadedProfiles, setLoadedProfiles] = useState<ProfileObject[]>([]);

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

    // updates side info when we select a profile
    useEffect(() => {

        if (!selectedProfile) return console.log("useEffect ERROR: No profiles to select.");

        (() => {
            const {
                email,
                phone,
                name
            } = selectedProfile.information

            setProfileName(name)
            setEmail(email);
            setPhone(phone);
        })();




        (() => {
            const {
                firstName,
                lastName,
                address1,
                address2,
                country,
                city,
                zip,
                state
            } = selectedProfile.shipping;

            setShipFname(firstName);
            setShipLname(lastName);
            setShipAddr1(address1);
            setShipAddr2(address2)
            setShipCountry(country);
            setShipCity(city);
            setShipZip(zip);
            setShipState(state);
        })();

        (() => {
            const {
                firstName,
                lastName,
                address1,
                address2,
                country,
                city,
                zip,
                state
            } = selectedProfile.billing;

            setBillFname(firstName);
            setBillLname(lastName);
            setBillAddr1(address1);
            setBillAddr2(address2)
            setBillCountry(country);
            setBillCity(city);
            setBillZip(zip);
            setBillState(state);
        })();

        const {
            number,
            cvv,
            expiryMonth,
            expiryYear,
            name
        } = selectedProfile.payment;

        setPaymentName(name)
        setPaymentCVV(cvv);
        setPaymentExpMonth(expiryMonth)
        setPaymentExpYear(expiryYear)
        setPaymentNumber(number)

        setSameBillingAsShip(selectedProfile.settings.sameBillingAsShip)

    }, [selectedProfile])


    enum SanitizationStatus {
        BlankError,
        UndefinedError,
        InvalidInformation,
        InvalidShip,
        InvalidBilling,
        InvalidPayment,
        Success
    }

    const ensureSanitizedProfile = () : SanitizationStatus => {

        console.log("Beginning profile sanitization.")

        let cantBeEmptyString : string[];
        
        if (sameBillingAsShip) {
            cantBeEmptyString = [
                profileName,
                email,
                phone,
                shipFname,
                shipLname,
                shipAddr1,
                shipCity,
                shipZip,
                paymentName,
                paymentNumber,
                paymentExpMonth,
                paymentExpYear,
                paymentCVV,
                shipCountry,
                shipState, 
            ]
        }
        else {
            cantBeEmptyString = [
                profileName,
                email,
                phone,
                shipFname,
                shipLname,
                shipAddr1,
                shipCity,
                shipZip,
                billFname,
                billLname,
                billAddr1,
                billCity,
                billZip,
                paymentName,
                paymentNumber,
                paymentExpMonth,
                paymentExpYear,
                paymentCVV,
                shipCountry,
                shipState,
                billCountry,
                billState,    
            ]
        }
        
        

        for (const i in cantBeEmptyString) {
            if (cantBeEmptyString[i] === '') {
                return SanitizationStatus.BlankError;
            }
        }
        return SanitizationStatus.Success;
    }

    const beginAddProfile = async () => {


        let newName = "Profile";
        let iter = 1;

        // while the name isnt unique
        while (loadedProfiles.findIndex(pro => pro.information.name === newName + " " + iter) !== -1) {
            iter += 1; 
        }

        const newProfile : ProfileObject = {
            information: {
                name: newName + " " + iter,
                email: '',
                phone: ''
            },
            shipping: {
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                zip: '',
                city: '',
                state: '',
                country: '',
            },
            billing: {
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                zip: '',
                city: '',
                state: '',
                country: '',
            },
            payment: {
                name: '',
                number: '',
                expiryMonth: '',
                expiryYear: '',
                cvv: ''
            },
            settings: {
                favorite: false,
                sameBillingAsShip: false
            }
        }


        dispatch(addOrUpdateProfile(newProfile))
        setSelectedProfile(newProfile);
        setSameBillingAsShip(false)
        await electron.ipcRenderer.invoke("writejson", "proxies.json", [...loadedProfiles, newProfile]);

        return;
        const toEmpty : ((s : string) => void)[] = [
            setProfileName,
            setEmail,
            setPhone,
            setShipFname,
            setShipLname,
            setShipAddr1,
            setShipAddr2,
            setShipCity,
            setShipZip,
            setBillFname,
            setBillLname,
            setBillAddr1,
            setBillAddr2,
            setBillCity,
            setBillZip,
            setPaymentName,
            setPaymentNumber,
            setPaymentExpMonth,
            setPaymentExpYear,
            setPaymentCVV,
            setBillCountry,
            setBillState,
            setShipCountry,
            setShipState,
        ]

        for (let i in toEmpty) {
            (toEmpty[i])('');
        }
    }

    const handleAddProfile = async () => {

        const res : SanitizationStatus = ensureSanitizedProfile();

        if (res !== SanitizationStatus.Success) return console.log(`ERROR ${SanitizationStatus[res]}: Profile is not sanitized correctly.`);

        // ensure no duplicate profile names
        if (loadedProfiles.findIndex(pr => pr.information.name === profileName) !== -1) {
            return console.error(`ERROR: Profile name ${profileName} already exists!`)
        }

        const newProfile : ProfileObject = {
            information: {
                name: profileName,
                email: email,
                phone: phone
            },
            shipping: {
                firstName: shipFname,
                lastName: shipLname,
                address1: shipAddr1,
                address2: shipAddr2,

                // @ts-ignore
                country: shipCountry,
                // @ts-ignore
                state: shipState,
                zip: shipZip,
                city: shipCity
            },
            billing: {
                firstName: billFname,
                lastName: billLname,
                address1: billAddr1,
                address2: billAddr2,
                // @ts-ignore
                country: billCountry,
                // @ts-ignore
                state: billState,
                zip: billZip,
                city: billCity
            },
            payment: {
                name: paymentName,
                number: paymentNumber,
                expiryMonth: paymentExpMonth,
                expiryYear: paymentExpYear,
                cvv: paymentCVV
            },
            settings: {
                favorite: false,
                sameBillingAsShip: sameBillingAsShip
            }
        }
        try {
            await electron.ipcRenderer.invoke('writejson', 'profiles.json', [...loadedProfiles, newProfile]);
            dispatch(addOrUpdateProfile(newProfile));
            setSelectedProfile(newProfile);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDeleteProfile = async () => {

        if (selectedProfile === undefined) return console.log(`ERROR: Profile selection is undefined, cannot delete.`)

        try {
            dispatch(removeProfile(selectedProfile));

            // @ts-ignore
            await electron.ipcRenderer.invoke('writejson', 'profiles.json', loadedProfiles.filter(prof => prof.information.name !== selectedProfile.information.name));
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDuplicateProfile = async () => {
        if (selectedProfile) {
            let dupProfileName = selectedProfile.information.name + " Copy"
            let iter = 1;

            while (loadedProfiles.findIndex((prof : ProfileObject) => prof.information.name === dupProfileName + " " + iter) !== -1) {
                iter += 1;
            }

            let newProfile : ProfileObject = {
                information: {
                    name: dupProfileName + " " + iter,
                    email: selectedProfile.information.email,
                    phone: selectedProfile.information.phone
                },
                shipping: selectedProfile.shipping,
                billing: selectedProfile.billing,
                payment: selectedProfile.payment,
                settings: selectedProfile.settings
            };

            dispatch(addOrUpdateProfile(newProfile));
            await electron.ipcRenderer.invoke('writejson', 'profiles.json', [...loadedProfiles, newProfile]);
        }
        else {
            console.log(`ERROR: Profile selection is undefined, cannot duplicate.`)
        }
    }

    // Gonna have to load this
    const [sameBillingAsShip, setSameBillingAsShip] = useState<boolean>(false);

    useEffect(() => {
        // Update all billing to shipping
        if (sameBillingAsShip) {
            setBillFname(shipFname)
            setBillLname(shipLname)
            setBillAddr1(shipAddr1)
            setBillAddr2(shipAddr2)
            setBillCountry(shipCountry)
            setBillState(shipState)
            setBillCity(shipCity)
            setBillZip(shipZip)
        }
    }, [sameBillingAsShip])
    useEffect(() => {sameBillingAsShip ? setBillFname(shipFname) : null}, [shipFname])
    useEffect(() => {sameBillingAsShip ? setBillLname(shipLname) : null}, [shipLname])
    useEffect(() => {sameBillingAsShip ? setBillAddr1(shipAddr1) : null}, [shipAddr1])
    useEffect(() => {sameBillingAsShip ? setBillAddr2(shipAddr2) : null}, [shipAddr2])
    useEffect(() => {sameBillingAsShip ? setBillCountry(shipCountry) : null}, [shipCountry])
    useEffect(() => {sameBillingAsShip ? setBillState(shipState) : null}, [shipState])
    useEffect(() => {sameBillingAsShip ? setBillCity(shipCity) : null}, [shipCity])
    useEffect(() => {sameBillingAsShip ? setBillZip(shipZip) : null}, [shipZip])


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
                                onClick={() => beginAddProfile()}
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
                            {loadedProfiles.filter((p : ProfileObject) => p.information.name.toLowerCase().includes(profileSearch.toLowerCase())).map((prof : ProfileObject) => (
                                <IndividualProfile 
                                    item={prof} 
                                    selectedItem={selectedProfile}
                                    setSelectedItem={setSelectedProfile}
                                    itemToString={(p : ProfileObject) => p.information.name}
                                />
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
                                        <button className="focus:outline-none px-2 w-12 h-12 rounded-md shadow-md bg-theta-logo flex justify-center items-center text-theta-white"
                                        onClick={() => handleAddProfile()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <button className="focus:outline-none h-12 w-12 rounded-md shadow-md bg-red-400 flex justify-center items-center text-theta-white"
                                        onClick={() => handleDuplicateProfile()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                                                <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                            </svg>
                                        </button>
                                        <button className="focus:outline-none h-12 w-12 rounded-md shadow-md bg-red-500 flex justify-center items-center text-theta-white"
                                        onClick={() => handleDeleteProfile()}
                                        >
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
                                                    placeholder={'3252295721'}
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
                                    <div className="z-20 flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Country
                                            </div>
                                            <div className="w-full h-10">
                                                <DropdownSelect 
                                                    selection={shipCountry}
                                                    setSelection={setShipCountry}
                                                    selectionArray={Country.getAllCountries()}
                                                    bg={'bg-theta-bg'}
                                                    textSize={'text-2xl'}
                                                    placeholder={'Select country'}
                                                    itemToString={(c : ICountry) => c.name}
                                                    maxRowsBeforeOverflow={5}
                                                    border={'border-theta-sidebar'}
                                                    noShadow={true}
                                                    transformBack={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                State
                                            </div>
                                            <div className="w-full h-10">
                                                <DropdownSelect
                                                    selection={shipState} 
                                                    setSelection={setShipState}
                                                    selectionArray={shipCountry === '' ? [] : State.getStatesOfCountry(Country.getAllCountries().find(cr => cr.name === shipCountry)!.isoCode)}
                                                    bg={'bg-theta-bg'}
                                                    textSize={'text-2xl'}
                                                    placeholder={'Select state'}
                                                    itemToString={(s : IState) => s.name}
                                                    maxRowsBeforeOverflow={5}
                                                    border={'border-theta-sidebar'}
                                                    noShadow={true}
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
                                                    placeholder={'90007'}
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
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <div className="ml-2 text-theta-gray-2 font-medium text-2xl mt-4">
                                            Billing
                                        </div>
                                        <div className="flex flex-row justify-center items-center mt-4">
                                            <div className="ml-2 text-theta-gray-7 font-medium text-xl mr-2">
                                                Same Billing as Shipping
                                            </div>
                                            <CheckBox 
                                                widthheight={'w-8 h-8'}
                                                checked={sameBillingAsShip}
                                                setChecked={setSameBillingAsShip}
                                                checkColorChecked={'text-theta-white'}
                                                checkColorUnchecked={'text-theta-gray-7'}
                                                bgChecked={'bg-theta-logo'}
                                                bgUnchecked={'bg-theta-sidebar'}
                                                borderColor={'border-theta-logo'}
                                            />
                                        </div>                                    

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
                                                    disabled={sameBillingAsShip}
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
                                                    disabled={sameBillingAsShip}
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
                                                    disabled={sameBillingAsShip}
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
                                                    disabled={sameBillingAsShip}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="z-10 flex flex-row justify-start items-center w-full">
                                        <div className="w-1/2 pr-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                Country
                                            </div>
                                            <div className="w-full h-10">
                                                <DropdownSelect 
                                                    selection={billCountry}
                                                    setSelection={setBillCountry}
                                                    selectionArray={Country.getAllCountries()}
                                                    bg={'bg-theta-bg'}
                                                    textSize={'text-2xl'}
                                                    placeholder={'Select country'}
                                                    itemToString={(c : ICountry) => c.name}
                                                    maxRowsBeforeOverflow={5}
                                                    border={'border-theta-sidebar'}
                                                    noShadow={true}
                                                    transformBack={true}
                                                    disabled={sameBillingAsShip}
                                                    disabledBg={'bg-theta-sidebar'}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-1/2 pl-3 flex flex-col justify-start items-center">
                                            <div className="text-theta-gray-4 text-lg w-full pl-4 -mt-2">
                                                State
                                            </div>
                                            <div className="w-full h-10">
                                                <DropdownSelect 
                                                    selection={billState}
                                                    setSelection={setBillState}
                                                    selectionArray={billCountry === '' ? [] : State.getStatesOfCountry(Country.getAllCountries().find(cr => cr.name === billCountry)!.isoCode)}
                                                    bg={'bg-theta-bg'}
                                                    textSize={'text-2xl'}
                                                    placeholder={'Select state'}
                                                    itemToString={(s : IState) => s.name}
                                                    maxRowsBeforeOverflow={5}
                                                    border={'border-theta-sidebar'}
                                                    noShadow={true}
                                                    disabled={sameBillingAsShip}
                                                    disabledBg={'bg-theta-sidebar'}
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
                                                    disabled={sameBillingAsShip}
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
                                                    placeholder={'90007'}
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
                                                    disabled={sameBillingAsShip}
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