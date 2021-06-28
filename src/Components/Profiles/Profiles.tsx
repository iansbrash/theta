import React, { FC, useState, useEffect } from "react";
import {
    AbstractSelector
} from '../Add Tasks/AddTasks';
import electron from 'electron'
import ProfileObject from "../../Logic/interfaces/ProfileObject";


interface ProfileInput {
    input: string,
    setInput: (s : string) => void,
    name: string,
    placeholder: string
}

const ProfileInput : FC<ProfileInput> = ({
    input,
    setInput,
    name,
    placeholder
} : ProfileInput) => {

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className="flex flex-col">
            <div className="text-indigo-100 font-medium text-xl ml-1">
                {name}
            </div>
            <input 
                placeholder={placeholder}
                value={input}
                onChange={(e) => handleChange(e)}
                className={`focus:outline-none bg-indigo-975 ${input === '' ?  'placeholder-indigo-400' : 'text-indigo-100'} caret-indigo-100 rounded-md p-1 w-64 text-2xl`}                          
            />
        </div>
        
    )
}

enum profilePart {
    "Info",
    "Shipping",
    "Billing",
    "Payment"
}

interface ProfilePartButtonProps {
    profilePartSelected: profilePart,
    setProfilePartSelected: (p : profilePart) => void,
    part: "Info" | "Shipping" | "Billing" | "Payment"
}

const ProfilePartButton : FC<ProfilePartButtonProps> = ({
    setProfilePartSelected,
    profilePartSelected,
    part
} : ProfilePartButtonProps) => {
    return (
        <button
        onClick={() => setProfilePartSelected(profilePart[part])}
        >
            <div className={`shadow-md px-3 py-1 rounded-md ${profilePartSelected === profilePart[part] ? 'bg-gradient-to-r from-indigo-600 to-indigo-400 border' : 'bg-indigo-900'}`}>
                {part}
            </div>
        </button>
    )
}

const Profiles : FC = () => {

    const [profileName, setProfileName] = useState<string>('');
    const [profileSelection, setProfileSelection] = useState<string>('');

    const [loadedProfiles, setLoadedProfiles] = useState<ProfileObject[]>([]);

    const [profilePartSelected, setProfilePartSelected] = useState<profilePart>(profilePart.Shipping);

    useEffect(() => {

        (async () => {
            const toSetProfiles = await electron.ipcRenderer.invoke("readjson", 'profiles.json');

            setLoadedProfiles(toSetProfiles);

        })();
        
    }, [])

    const handleProfileNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setProfileName(e.target.value);
    }

    const deleteSelectedProfile = async () => {
        const newProfiles = loadedProfiles.filter((prof : ProfileObject) => prof.information.name !== profileSelection)
        setLoadedProfiles(newProfiles)
        setProfileSelection('');

        const res = await electron.ipcRenderer.invoke('writejson', 'profiles.json', newProfiles);

    }

    // add info on profile select
    // useEffect(() => {
        
    // }, [profileSelection])

    const saveProfile = async () => {
        const newProfile : ProfileObject = {
            information: {
                name: profileName,
                email: email,
                phone: phone,
            },
            shipping: {
                firstName: shipFname,
                lastName: shipLname,
                address1: shipAddr1,
                address2: shipAddr2,
                zip: shipZip,
                city: shipCity,
                state: shipState, // TN
                country: shipCountry, // USA, US
            },
            billing: {
                firstName: billFname,
                lastName: billLname,
                address1: billAddr1,
                address2: billAddr2,
                zip: billZip,
                city: billCity,
                state: billState, // TN
                country: billCountry, // USA, US
            },
            payment: {
                name: paymentName,
                number: paymentNumber,
                expiryMonth: paymentExpMonth,
                expiryYear: paymentExpYear,
                cvv: paymentCVV
            },
            settings: {
                
            }
        }

        setLoadedProfiles([...loadedProfiles, newProfile]);
        const setRes = await electron.ipcRenderer.invoke('writejson', 'profiles.json', [...loadedProfiles, newProfile]);

        console.log(`setRes: ${setRes}`)
    }

    const handleProfileSelectionChange = (s : string) => {
        setProfileSelection(s);
        setProfileName(s);
        populateProfile(s)
    }

    const populateProfile = (profileName : string) => {

        // @ts-ignore
        const newProfile : ProfileObject = loadedProfiles.find(prof => prof.information.name === profileName)

        if (newProfile) {
            const {
                email,
                phone
            } = newProfile.information

            setEmail(email);
            setPhone(phone);

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
                } = newProfile.shipping;
    
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
                } = newProfile.billing;
    
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
                expiryYear
            } = newProfile.payment;

            setPaymentCVV(cvv);
            setPaymentExpMonth(expiryMonth)
            setPaymentExpYear(expiryYear)
            setPaymentNumber(number)
        }
        

    }

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



    // info
    //      profile name, email, phone

    // fname, lname, address, address2, country, state, zip code, city, phone number

    // email, card holder, card number, month, year, cvv


    return (
        <div className="flex flex-col flex-1 justify-center items-center text-lg h-full shadow-lg bg-indigo-1000">
            <div className="w-full p-5 h-full">
                <div className="rounded-xl shadow-xl bg-indigo-950 w-full h-full flex flex-col justify-start items-center">
                    {/* Title */}
                    <div className="w-full p-4 flex justify-start items-center text-indigo-100 text-4xl font-medium">
                        Profiles
                    </div>
                    {/* Name Proxy Group */}
                    <div className="w-full flex justify-between px-5 py-1">
                        <input 
                            placeholder={'Main Debit Card'}
                            value={profileName}
                            onChange={(e) => handleProfileNameChange(e)}
                            className={`focus:outline-none bg-indigo-975 ${profileName === '' ?  'placeholder-indigo-400' : 'text-indigo-100'} caret-indigo-100 rounded-md p-1 w-64 text-2xl`}                          
                        />
                        <button
                        onClick={() => saveProfile()}
                        >
                            <div className="p-1 bg-gradient-to-r from-indigo-600 to-indigo-400 w-64 rounded-lg flex justify-center items-center border">
                                <div className="text-2xl text-indigo-100">
                                    Save Profile
                                </div>
                                <div className="text-indigo-100 ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </div>

                    <div className="h-2"></div>

                    <div className="w-full p-4 flex justify-start items-center text-indigo-100 text-3xl font-medium space-x-8">
                        <ProfilePartButton 
                            part={'Info'}
                            profilePartSelected={profilePartSelected}
                            setProfilePartSelected={setProfilePartSelected}
                        />
                        <ProfilePartButton 
                            part={'Shipping'}
                            profilePartSelected={profilePartSelected}
                            setProfilePartSelected={setProfilePartSelected}
                        />
                        <ProfilePartButton 
                            part={'Billing'}
                            setProfilePartSelected={setProfilePartSelected}
                            profilePartSelected={profilePartSelected}
                        />
                        <ProfilePartButton 
                            part={'Payment'}
                            setProfilePartSelected={setProfilePartSelected}
                            profilePartSelected={profilePartSelected}
                        />
                    </div>

                    <div className="relative w-full flex-1 p-5 flex-col space-y-4">
                        <button
                        onClick={() => deleteSelectedProfile()}
                        className="absolute focus:outline-none -bottom-5 right-6"
                        >
                            <div className="h-12 w-12 bg-gradient-to-r from-red-400 to-red-500 border rounded-md text-indigo-100 flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </button>

                        {profilePartSelected === profilePart.Info ?  <>
                            <ProfileInput 
                                input={email}
                                setInput={setEmail}
                                name={'Email'}
                                placeholder={'user1234@gmail.com'}
                            />
                            <ProfileInput 
                                input={phone}
                                setInput={setPhone}
                                name={'Phone Number'}
                                placeholder={'9153342854'}
                            />
                        </> : null}
                        {profilePartSelected === profilePart.Shipping ?  <>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={shipFname}
                                        setInput={setShipFname}
                                        name={'First Name'}
                                        placeholder={'Da'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={shipLname}
                                        setInput={setShipLname}
                                        name={'Last Name'}
                                        placeholder={'Baby'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={shipAddr1}
                                        setInput={setShipAddr1}
                                        name={'Address 1'}
                                        placeholder={'1234 Oak Lane'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={shipAddr2}
                                        setInput={setShipAddr2}
                                        name={'Address 2'}
                                        placeholder={'Suite 2'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={shipCountry}
                                        setInput={setShipCountry}
                                        name={'Country'}
                                        placeholder={'United States'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={shipState}
                                        setInput={setShipState}
                                        name={'State'}
                                        placeholder={'California'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={shipZip}
                                        setInput={setShipZip}
                                        name={'Zip Code'}
                                        placeholder={'90007'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={shipCity}
                                        setInput={setShipCity}
                                        name={'City'}
                                        placeholder={'Los Angeles'}
                                    />
                                </div>
                            </div>
                        </> : null}
                        {profilePartSelected === profilePart.Billing ?  <>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={billFname}
                                        setInput={setBillFname}
                                        name={'First Name'}
                                        placeholder={'Da'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={billLname}
                                        setInput={setBillLname}
                                        name={'Last Name'}
                                        placeholder={'Baby'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={billAddr1}
                                        setInput={setBillAddr1}
                                        name={'Address 1'}
                                        placeholder={'1234 Oak Lane'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={billAddr2}
                                        setInput={setBillAddr2}
                                        name={'Address 2'}
                                        placeholder={'Suite 2'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={billCountry}
                                        setInput={setBillCountry}
                                        name={'Country'}
                                        placeholder={'United States'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={billState}
                                        setInput={setBillState}
                                        name={'State'}
                                        placeholder={'California'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={billZip}
                                        setInput={setBillZip}
                                        name={'Zip Code'}
                                        placeholder={'90007'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={billCity}
                                        setInput={setBillCity}
                                        name={'City'}
                                        placeholder={'Los Angeles'}
                                    />
                                </div>
                            </div>
                        </> : null}
                        {profilePartSelected === profilePart.Payment ?  <>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={paymentName}
                                        setInput={setPaymentName}
                                        name={'Card Owner'}
                                        placeholder={'DaBaby'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={paymentNumber}
                                        setInput={setPaymentNumber}
                                        name={'Card Number'}
                                        placeholder={'1234123412341234'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={paymentCVV}
                                        setInput={setPaymentCVV}
                                        name={'CVV'}
                                        placeholder={'010'}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-start items-center">
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={paymentExpMonth}
                                        setInput={setPaymentExpMonth}
                                        name={'Expiry Month'}
                                        placeholder={'11'}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <ProfileInput 
                                        input={paymentExpYear}
                                        setInput={setPaymentExpYear}
                                        name={'Expiry year'}
                                        placeholder={'23'}
                                    />
                                </div>
                            </div>
                        </> : null}
                    </div>

                    {/* Select Profile*/}
                    <div className="-mt-5 w-full">
                        <AbstractSelector 
                            width={'w-64'}
                            defaultText={'Select Profile'}
                            selection={profileSelection}
                            setSelection={handleProfileSelectionChange}
                            selectionOptions={loadedProfiles.map(profile => profile.information.name)}
                        />
                    </div>
                    
                    <div className="h-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Profiles;