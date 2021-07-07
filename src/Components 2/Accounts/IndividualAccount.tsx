import React, {
    FC,
    useState,
    useEffect
} from 'react';
import Account, { AccountGroup } from '../../Logic/interfaces/Account';
import Site from '../../Logic/interfaces/enums/Site';
import { useDispatch } from 'react-redux'
import { deleteAccountFromAccountGroup } from '../../redux/reducers/accountsSlice'
import electron from 'electron';

interface IndividualAccountProps {
    account: Account,
    accountGroup?: AccountGroup,
    setSelectedAccountGroup: ( ag : AccountGroup) => void
}

const IndividualAccount : FC<IndividualAccountProps> = ({
    account,
    accountGroup,
    setSelectedAccountGroup
} : IndividualAccountProps) => {

    const dispatch = useDispatch();

    const [passHidden, setPassHidden] = useState<boolean>(true);

    const deleteSelf = async () => {
        try {
            dispatch(deleteAccountFromAccountGroup(accountGroup, account))

            let accGrCopyaccGrCopy = {...accountGroup};

            // @ts-ignore
            accGrCopyaccGrCopy.accounts = accGrCopyaccGrCopy.accounts.filter((acc : Account) => acc.username !== account.username)

            // @ts-ignore
            setSelectedAccountGroup(accGrCopyaccGrCopy)
            let loadedACCG = await electron.ipcRenderer.invoke("readjson", "accountgroups.json")

            // @ts-ignore
            let index = loadedACCG[Site[accountGroup.site]].findIndex(accG => accG.name === accountGroup.name);
            // @ts-ignore
            loadedACCG[Site[accountGroup.site]][index] = accGrCopyaccGrCopy;

            await electron.ipcRenderer.invoke("writejson", "accountgroups.json", loadedACCG)
        }
        catch (err) {
            console.error(err)
        }

    }

    return (
        <div className="w-full h-10 my-0.5 px-2 bg-theta-bg rounded-md shadow-md flex flex-row justify-start items-center">
            <div className="text-theta-gray-2 text-xl w-6/12">
                {account.username}
            </div>
            <div className="relative h-full">
                <button className="h-8 w-8 m-1 p-1 text-theta-gray-7 absolute right-0 top-0 bottom-0 flex justify-center items-center focus:outline-none"
                onClick={() => setPassHidden(!passHidden)}
                >
                    {passHidden ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg> 
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    }
                </button>
            </div>
            <div className="text-theta-gray-2 text-xl w-5/12">
                {passHidden ? <div className="ml-0.5">{"•".repeat(account.password.length)}</div> : account.password}
            </div>
            <div className="flex flex-row justify-end items-center space-x-2 w-1/12">
                <button className="h-8 w-8 p-1 rounded-md shadow-md bg-red-500 flex justify-center items-center text-theta-gray-2 focus:outline-none"
                onClick={() => deleteSelf()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

interface IndividualAccountModalProps {
    account: Account,
    addAccountsInAccountGroupSelectedAccounts: Account[],
    setAddAccountsInAccountGroupSelectedAccounts: (a : Account[]) => void
}

export const IndividualAccountModal : FC<IndividualAccountModalProps> = ({
    account,
    addAccountsInAccountGroupSelectedAccounts,
    setAddAccountsInAccountGroupSelectedAccounts
} : IndividualAccountModalProps) => {

    const [passHidden, setPassHidden] = useState<boolean>(true);

    const [isSelected, setIsSelected] = useState<boolean>(addAccountsInAccountGroupSelectedAccounts.includes(account));

    const onClickHandler = () => {
        if (isSelected) {
            setIsSelected(false);
            setAddAccountsInAccountGroupSelectedAccounts(addAccountsInAccountGroupSelectedAccounts.filter(acc => acc !== account))
        }
        else {
            setIsSelected(true);
            setAddAccountsInAccountGroupSelectedAccounts([...addAccountsInAccountGroupSelectedAccounts, account])
        }
    }

    useEffect(() => {
        console.log('in useEffect i IndivAcc')
        setIsSelected(addAccountsInAccountGroupSelectedAccounts.includes(account));
    }, [])

    return (
        <button className="w-full focus:outline-none"
        onClick={() => onClickHandler()}
        >
            <div className={`transition duration-250 ease-in-out w-full h-10 border px-2 ${isSelected ? 'bg-theta-profiles-individual-selected border-theta-gray-7' : 'bg-theta-profiles-individual border-theta-bg'} rounded-md shadow-md flex flex-row justify-between items-center`}>
                <div className="text-theta-gray-2 text-xl">
                    {account.username}
                </div>
                <div className="flex flex-row justify-end items-center">
                    <div className="text-theta-gray-2 text-xl ">
                        {passHidden ? <div className="ml-0.5">{"•".repeat(account.password.length)}</div> : account.password}
                    </div>
                    <button className="h-8 w-8 m-1 p-1 text-theta-gray-7 flex justify-center items-center focus:outline-none"
                    onClick={() => setPassHidden(!passHidden)}
                    >
                        {passHidden ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg> 
                        : 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                        }
                    </button>
                </div>
            </div>
        </button>
    )
}

export default IndividualAccount;