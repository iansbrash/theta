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
                state.accountsObject[Site[accounts[0].site]] = mergedAccounts;

            },
            prepare (accounts) {
                return {
                    payload: {
                        accounts,
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

export const { addAccounts, populateAccounts, addAccountGroup, populateAccountGroups } = accountsSlice.actions

export default accountsSlice.reducer