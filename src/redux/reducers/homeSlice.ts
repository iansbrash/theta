import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Update, Checkout } from '../../Components 2/Home/Home'
type SliceState = {
    updates : Update[];
    checkouts: Checkout[];
    basic: {
        checkouts : number,
        declines : number,
        totalSpent: number,
    }
};

export const homeSlice = createSlice({
    name: 'counter',
    initialState: {
        updates: [],
        checkouts: [],
        basic: {
            checkouts: -1,
            declines: -1,
            totalSpent: -1
        }
    } as SliceState,
    reducers: {
        addUpdates: {
            reducer (state, action : PayloadAction<{updates : Update[]}>) { //; anotherProp: string; uuid: string
                state.updates = [...state.updates, ...action.payload.updates]
            },
            prepare (updates) {
                return {
                    payload: {
                        updates,
                    }
                }
            }
        },
        addBasic: {
            reducer (state, action : PayloadAction<{basic : {checkouts: number, declines: number, totalSpent: number}}>) { //; anotherProp: string; uuid: string
                state.basic = action.payload.basic;
            },
            prepare (basic) {
                return {
                    payload: {
                        basic,
                    }
                }
            }
        },
        addCheckouts: {
            reducer (state, action : PayloadAction<{checkouts : Checkout[]}>) { //; anotherProp: string; uuid: string
                state.checkouts = [...state.checkouts, ...action.payload.checkouts]
            },
            prepare (checkouts) {
                return {
                    payload: {
                        checkouts,
                    }
                }
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addUpdates, addBasic, addCheckouts } = homeSlice.actions

export default homeSlice.reducer