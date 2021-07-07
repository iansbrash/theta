// import { ResizableBox, Resizable } from 'react-resizable';
import React, {
    FC,
    useState,
    useEffect
} from 'react';
import ScreenWrapper from '../Component Library/ScreenWrapper';
import ScreenWrapperModal from '../Component Library/ScreenWrapperModal';
import IndividualProfile from '../Profiles/IndividualProfile';
import TextInput from '../Component Library/TextInput';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import IndividualAccount, {
    IndividualAccountModal
} from './IndividualAccount';
// import AutoResizerProxyComponent from './AutoResizerProxyComponent';
import { AutoSizer, List } from 'react-virtualized'
import Site from '../../Logic/interfaces/enums/Site';
import Account, { AccountGroup } from '../../Logic/interfaces/Account';
import MultiLineTextInput from '../Component Library/MultiLineTextInput';
import DropdownSelect from '../Component Library/DropdownSelect';
import electron from 'electron'

// redux
import { useDispatch, useSelector } from 'react-redux';
import { addAccounts, addAccountGroup } from '../../redux/reducers/accountsSlice';
import { RootState } from '../../redux/store';

const stringToAccount = (s : string, site : Site) : Account => {

    let username = s.substring(0, s.indexOf(':'))

    const acc : Account = {
        site: site,
        username: username,
        password: s.substring(username.length + 1)
    }

    return acc;
}

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

    const dispatch = useDispatch();

    // search bars
    const [accountsSearch, setAccountsSearch] = useState<string>('');
    const [accountGroupsSearch, setAccountGroupsSearch] = useState<string>('');

    const [proxyGroupName, setProxyGroupName] = useState<string>('');
    const [selectedAccountGroupName, setSelectedAccountGroupName] = useState<string>('');



    const loadedAccounts = useSelector((state : RootState) => state.accounts.accountsObject)
    const loadedAccountGroups = useSelector((state : RootState) => state.accounts.accountGroupObject)

    const [selectedAccountGroup, setSelectedAccountGroup] = useState<AccountGroup | undefined>();
    const [addAccountGroupModalSelectedSite, setAddAccountGroupModalSelectedSite] = useState<Site>(Site.Amazon)


    // adds accounts from the modal in the far left accounts section
    const addAccountsModalAddAccounts = async () => {

        try {
            validateAddAccountsFromModal()
        }
        catch (err) {
            return console.error(err);
        }

        const accountsToAdd = addAccountsAccounts.split(/\r?\n/).map(stringAcc => {
            return stringToAccount(stringAcc, addAccountsSite)
        })

        dispatch(addAccounts( accountsToAdd ));

        // then save it to file
        let accountsCopy = {...loadedAccounts};

        // @ts-ignore
        accountsCopy[Site[addAccountsSite]] = [

            // @ts-ignore
            ...accountsCopy[Site[addAccountsSite]],
            ...accountsToAdd
        ]
        await electron.ipcRenderer.invoke("writejson", "accounts.json", accountsCopy)
        setAddAccountsModal(false)
        setAddAccountsAccounts('')
    }

    const validateAddAccountsFromModal = () => {
        if (addAccountsSite === null || addAccountsSite == undefined) {
            throw "Site selector is undefined or null";
        }
        else if (addAccountsAccounts === '') {
            throw "Account input is empty"
        }
        else {
            return;
        }
    }

    const createNewBlankAccountGroup = async () => {

        let newAccountGroupName = "Account Group"
        let iter = 1;
        // @ts-ignore
        while (loadedAccountGroups[Site[addAccountGroupModalSelectedSite]].findIndex(accGr => accGr.name === newAccountGroupName + " " + iter) !== -1) {
            iter += 1;
        }

        const newAccountGroup : AccountGroup = {
            name: newAccountGroupName + " " + iter,
            site: addAccountGroupModalSelectedSite,
            accounts: []
        }

        dispatch(addAccountGroup(newAccountGroup))

        let tempAccountGroupObject = {...loadedAccountGroups};
        // @ts-ignore
        tempAccountGroupObject[Site[addAccountGroupModalSelectedSite]] = [...tempAccountGroupObject[Site[addAccountGroupModalSelectedSite]], newAccountGroup];

        await electron.ipcRenderer.invoke("writejson", "accountgroups.json", tempAccountGroupObject)

        setAddAccountGroupsModal(false);
        setSelectedAccountGroup(newAccountGroup)
    }

    const [addAccountsModal, setAddAccountsModal] = useState<boolean>(false);
    const [addAccountGroupsModal, setAddAccountGroupsModal] = useState<boolean>(false);
    const [addAccountsInAccountGroupModal, setAddAccountsInAccountGroupModal] = useState<boolean>(false);
    const [addAccountsInAccountGroupSearch, setAddAccountsInAccountGroupSearch] = useState<string>('')
    const [addAccountsInAccountGroupSelectedAccounts, setAddAccountsInAccountGroupSelectedAccounts] = useState<Account[]>([])

    const [addAccountsAccounts, setAddAccountsAccounts] = useState<string>('');
    const [addAccountsSite, setAddAccountsSite] = useState<Site>(Site.Amazon);



    return (
        <div className="flex flex-1 h-full">
            <div className="w-full h-full flex flex-row">

                {/* Accounts */}
                <div className="w-1/4 h-full">
                    <ScreenWrapper>
                        <ScreenWrapperModal
                        isEnabled={addAccountsModal}
                        setIsEnabled={setAddAccountsModal}
                        >
                            <div className="w-full h-1/2 p-4"
                            onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 w-full h-full bg-theta-bg rounded-lg shadow-lg flex flex-col justify-start items-center">
                                    <div className="w-full flex flex-row justify-start items-center mb-2">
                                        <div className="text-theta-white w-full text-2xl font-medium">
                                            Add Accounts
                                        </div>
                                        <button className="focus:outline-none font-medium text-xl flex justify-center items-center w-8 h-8 rounded-md shadow-md bg-theta-logo text-theta-gray-2"
                                        onClick={() => addAccountsModalAddAccounts()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="w-full h-full">
                                        <MultiLineTextInput 
                                            placeholder={'user:pass'}
                                            input={addAccountsAccounts}
                                            onChange={setAddAccountsAccounts}
                                            bg={'bg-theta-sidebar'}
                                        />
                                    </div>
                                    <div className="w-full flex flex-row justify-start items-center mt-4 h-8">
                                        <DropdownSelect 
                                            setSelection={setAddAccountsSite}
                                            selectionArray={[Site.Amazon]}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select site'}
                                            itemToString={(site : Site) => Site[site]}
                                            offsetWidth={'-mr-2'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScreenWrapperModal>
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
                                onClick={() => setAddAccountsModal(true)}
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
                                input={accountsSearch}
                                onChange={setAccountsSearch}
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
                            {
                            // @ts-ignore
                            Object.keys(loadedAccounts).map(key =>  loadedAccounts[key].filter((acc : Account) => acc.username.toLowerCase().includes(accountsSearch.toLowerCase())).map((acc : Account) => {
                                return <AccountForMap 
                                username={acc.username} 
                                site={acc.site}
                                password={acc.password}
                                />
                            }))}
                        </div>
                    </ScreenWrapper>
                </div>

                {/* Account Groups */}
                <div className="w-1/4 h-full">
                    <ScreenWrapper>
                        <ScreenWrapperModal
                        isEnabled={addAccountGroupsModal}
                        setIsEnabled={setAddAccountGroupsModal}
                        >
                            <div className="w-full h-auto p-4"
                            onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 w-full h-full bg-theta-bg rounded-lg shadow-lg flex flex-col justify-start items-center">
                                    <div className="w-full flex flex-row justify-start items-center mb-2">
                                        <div className="text-theta-white w-full text-2xl font-medium">
                                            Add Account Group
                                        </div>
                                        <button className="focus:outline-none font-medium text-xl flex justify-center items-center w-8 h-8 rounded-md shadow-md bg-theta-logo text-theta-gray-2"
                                        onClick={() => createNewBlankAccountGroup()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="w-full flex flex-row justify-start items-center mt-4 h-8">
                                        <DropdownSelect 
                                            setSelection={setAddAccountGroupModalSelectedSite}
                                            selectionArray={[Site.Amazon]}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select site'}
                                            itemToString={(site : Site) => Site[site]}
                                            offsetWidth={'-mr-2'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScreenWrapperModal>
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
                                onClick={() => setAddAccountGroupsModal(true)}
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
                                input={accountGroupsSearch}
                                onChange={setAccountGroupsSearch}
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
                            {
                            // @ts-ignore
                            Object.keys(loadedAccountGroups).map(key =>  loadedAccountGroups[key].filter((acc : AccountGroup) => acc.name.toLowerCase().includes(accountGroupsSearch.toLowerCase())).map((acc : AccountGroup) => {
                                return <IndividualProfile 
                                    item={acc}
                                    selectedItem={selectedAccountGroup}
                                    setSelectedItem={setSelectedAccountGroup}
                                    itemToString={(acc : AccountGroup) => acc.name}
                                />
                            }))}
                        </div>
                    </ScreenWrapper>
                </div>


                {/* Account Group Screen */}
                <div className="w-1/2 h-full">
                    <ScreenWrapper>
                        <ScreenWrapperModal
                        isEnabled={addAccountsInAccountGroupModal}
                        setIsEnabled={setAddAccountsInAccountGroupModal}
                        >
                            <div className="w-full h-1/2 p-4"
                            onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 w-full h-full bg-theta-bg rounded-lg shadow-lg flex flex-col justify-start items-center">
                                    <div className="w-full flex flex-row justify-start items-center mb-2">
                                        <div className="text-theta-white w-full text-2xl font-medium">
                                            Add Accounts
                                        </div>
                                        <button className="focus:outline-none font-medium text-xl flex justify-center items-center w-8 h-8 rounded-md shadow-md bg-theta-logo text-theta-gray-2"
                                        onClick={() => addAccountsModalAddAccounts()}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="w-full h-10 mt-1 mb-2">
                                        <TextInput 
                                            placeholder={'Search for accounts'}
                                            input={addAccountsInAccountGroupSearch}
                                            onChange={setAddAccountsInAccountGroupSearch}
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
                                        {
                                        // @ts-ignore
                                        Object.keys(loadedAccounts).map(key =>  loadedAccounts[key].filter((acc : Account) => acc.username.toLowerCase().includes(addAccountsInAccountGroupSearch.toLowerCase())).map((acc : Account) => {
                                            return <IndividualAccountModal 
                                            key={acc.username + '###' + acc.password}
                                            account={acc}
                                            addAccountsInAccountGroupSelectedAccounts={addAccountsInAccountGroupSelectedAccounts}
                                            setAddAccountsInAccountGroupSelectedAccounts={setAddAccountsInAccountGroupSelectedAccounts}
                                            />
                                        }))}
                                    </div>
                                    <div className="w-full flex flex-row justify-start items-center mt-4 h-8">
                                        <DropdownSelect 
                                            setSelection={setAddAccountsSite}
                                            selectionArray={[Site.Amazon]}
                                            bg={'bg-theta-sidebar'}
                                            textSize={'text-xl'}
                                            placeholder={'Select site'}
                                            itemToString={(site : Site) => Site[site]}
                                            offsetWidth={'-mr-2'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScreenWrapperModal>
                        <div className="w-full h-full bg-theta-tasks-taskgroup rounded-lg shadow-lg flex flex-col justify-start items-center p-4">
                            <div className="w-full justify-start items-start flex flex-col space-y-2 h-full">
                                <div className="w-full flex flex-row justify-between items-center">
                                    <div className="w-96 h-12">
                                        <TextInput 
                                            input={selectedAccountGroupName}
                                            onChange={setSelectedAccountGroupName}
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
                                        <button className="focus:outline-none px-2 w-12 h-12 rounded-md shadow-md bg-theta-logo flex justify-center items-center text-theta-white"
                                        onClick={() => setAddAccountsInAccountGroupModal(true)}
                                        >
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
                                    {selectedAccountGroup?.accounts.map(acc => {

                                        return <IndividualAccount {...acc} />
                                    })}
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