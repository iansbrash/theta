import React, { FC, useState, useMemo } from "react";
import {
    AbstractSelector
} from '../Add Tasks/AddTasks';


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
            <div className={`shadow-md px-3 py-1 rounded-md ${profilePartSelected === profilePart[part] ? 'bg-indigo-500 border-2' : 'bg-indigo-900'}`}>
                {part}
            </div>
        </button>
    )
}

const Profiles : FC = () => {

    const [profileName, setProfileName] = useState<string>('');
    const [profileSelection, setProfileSelection] = useState<string>('');

    const [profilePartSelected, setProfilePartSelected] = useState<profilePart>(profilePart.Shipping);

    const handleProfileNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setProfileName(e.target.value);
    }

    const handleProfileSelectionChange = (s : string) => {
        setProfileSelection(s);
        setProfileName(s);
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
                        <button>
                            <div className="p-1 bg-indigo-500 w-64 rounded-lg flex justify-center items-center border-2">
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

                    <div className="w-full flex-1 p-5 flex-col space-y-4">
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

                    {/* Select Proxies */}
                    <AbstractSelector 
                        width={'w-64'}
                        defaultText={'Select Profile Group'}
                        selection={profileSelection}
                        setSelection={handleProfileSelectionChange}
                        selectionOptions={['List 1', 'List 2', 'ISPs', 'Leaf Resi']}
                    />
                    <div className="h-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Profiles;