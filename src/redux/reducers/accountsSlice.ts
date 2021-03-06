import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Account, { AccountGroup } from '../../Logic/interfaces/Account';
import Site from '../../Logic/interfaces/enums/Site';

type SliceState = { accountsObject : object, accountGroupObject : object  };

export const accountsSlice = createSlice({
    name: 'counter',
    initialState: {
        // object because we're going to store by site
        accountsObject: {
            "Amazon": []
        },
        accountGroupObject: {
            "Amazon": []
        }
    } as SliceState,
    reducers: {
        addAccounts: {
            reducer (state, action : PayloadAction<{accounts : Account[]}>) { //; anotherProp: string; uuid: string
                const {
                    accounts,
                } = action.payload;

                // @ts-ignore
                const mergedAccounts = new Set([...state.accountsObject[Site[ accounts[0].site ]], ...accounts])
                
                // @ts-ignore
                state.accountsObject[Site[accounts[0].site]] = [...mergedAccounts];

            },
            prepare (accounts) {
                return {
                    payload: {
                        accounts,
                    }
                }
            }
        },
        deleteAccount: {
            reducer (state, action : PayloadAction<{account : Account}>) { //; anotherProp: string; uuid: string
                const {
                    account,
                } = action.payload;

                
                // @ts-ignore
                state.accountsObject[Site[account.site]] = state.accountsObject[Site[account.site]].filter(acc => acc.username !== account.username);

            },
            prepare (account) {
                return {
                    payload: {
                        account,
                    }
                }
            }
        },
        populateAccounts: {
            reducer (state, action : PayloadAction<{accountsObject : object}>) { //; anotherProp: string; uuid: string
                const {
                    accountsObject,
                } = action.payload;
                
                state.accountsObject = accountsObject

            },
            prepare (accountsObject) {
                return {
                    payload: {
                        accountsObject,
                    }
                }
            }
        },
        addAccountGroup: {
            reducer (state, action : PayloadAction<{accountGroup : AccountGroup}>) { //; anotherProp: string; uuid: string
                const {
                    accountGroup,
                } = action.payload;

                // @ts-ignore
                state.accountGroupObject[Site[accountGroup.site]] = [...state.accountGroupObject[Site[accountGroup.site]], accountGroup];
            },
            prepare (accountGroup) {
                return {
                    payload: {
                        accountGroup,
                    }
                }
            }
        },
        deleteAccountGroup: {
            reducer (state, action : PayloadAction<{accountGroup : AccountGroup}>) { //; anotherProp: string; uuid: string
                const {
                    accountGroup,
                } = action.payload;

                if (accountGroup === undefined || accountGroup === null) throw "AccountGroup does not exist."

                // @ts-ignore
                state.accountGroupObject[Site[accountGroup.site]] = state.accountGroupObject[Site[accountGroup.site]].filter(accG => accG.name !== accountGroup.name);
            },
            prepare (accountGroup) {
                return {
                    payload: {
                        accountGroup,
                    }
                }
            }
        },
        addAccountsToAccountGroup: {
            reducer (state, action : PayloadAction<{accountGroup : AccountGroup, accounts : Account[]}>) { //; anotherProp: string; uuid: string
                const {
                    accountGroup,
                    accounts
                } = action.payload;

                // @ts-ignore
                const indexOfAccG = state.accountGroupObject["Amazon"].findIndex(accGr => accGr.name === accountGroup.name);

                if (indexOfAccG === -1) {
                    throw "Account group does not exist";
                }
                else {
                    // @ts-ignore
                    state.accountGroupObject["Amazon"][indexOfAccG].accounts = [...state.accountGroupObject["Amazon"][indexOfAccG].accounts, ...accounts]
                }

            },
            prepare (accountGroup, accounts) {
                return {
                    payload: {
                        accountGroup,
                        accounts
                    }
                }
            }
        },
        deleteAccountFromAccountGroup: {
            reducer (state, action : PayloadAction<{accountGroup : AccountGroup, account : Account}>) { //; anotherProp: string; uuid: string
                const {
                    accountGroup,
                    account
                } = action.payload;

                // @ts-ignore
                const indexOfAccG = state.accountGroupObject["Amazon"].findIndex(accGr => accGr.name === accountGroup.name);

                if (indexOfAccG === -1) {
                    throw "Account group does not exist";
                }
                else {
                    // @ts-ignore
                    state.accountGroupObject["Amazon"][indexOfAccG].accounts = state.accountGroupObject["Amazon"][indexOfAccG].accounts.filter((acc : Account) => acc.username !== account.username)
                }

            },
            prepare (accountGroup, account) {
                return {
                    payload: {
                        accountGroup,
                        account
                    }
                }
            }
        },
        strictlyUpdateAccountGroup: {
            reducer (state, action : PayloadAction<{accountGroup : AccountGroup, oldName : string}>) { //; anotherProp: string; uuid: string
                const {
                    accountGroup,
                    oldName
                } = action.payload;

                // @ts-ignore
                if (state.accountGroupObject[Site[accountGroup.site]].findIndex((accGr : AccountGroup) => accGr.name === oldName) === -1) {
                    console.log(`ERROR: AccountGroup does not exist. Not removing from store.`)
                    throw "AccountGroup does not exist";
                }
                else {
                    // @ts-ignore
                    const toUpdateIndex = state.accountGroupObject[Site[accountGroup.site]].findIndex((accGr : AccountGroup) => accGr.name === oldName); 
                    // @ts-ignore
                    state.accountGroupObject[Site[accountGroup.site]][toUpdateIndex] = accountGroup;
                }

            },
            prepare (accountGroup, oldName) {
                return {
                    payload: {
                        accountGroup,
                        oldName
                    }
                }
            }
        },
        populateAccountGroups: {
            reducer (state, action : PayloadAction<{accountGroupsObject : object}>) { //; anotherProp: string; uuid: string
                const {
                    accountGroupsObject,
                } = action.payload;
                
                state.accountGroupObject = accountGroupsObject
            },
            prepare (accountGroupsObject) {
                return {
                    payload: {
                        accountGroupsObject,
                    }
                }
            }
        },

    },
})

export const { 
    addAccounts, 
    deleteAccount,
    populateAccounts, 
    addAccountGroup, 
    deleteAccountGroup,
    populateAccountGroups, 
    addAccountsToAccountGroup,
    deleteAccountFromAccountGroup,
    strictlyUpdateAccountGroup
} = accountsSlice.actions

export default accountsSlice.reducer