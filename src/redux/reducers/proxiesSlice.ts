import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ProxyList from '../../Logic/interfaces/ProxyList';

type SliceState = { proxiesArray : ProxyList[] };

export const proxiesSlice = createSlice({
    name: 'counter',
    initialState: {
        proxiesArray: []
    } as SliceState,
    reducers: {
        addOrUpdateProxies: {
            reducer (state, action : PayloadAction<{proxies : ProxyList}>) { //; anotherProp: string; uuid: string
                const {
                    proxies,
                } = action.payload;

                const toUpdateIndex = state.proxiesArray.findIndex((prox : ProxyList) => prox.name === proxies.name)

                if (toUpdateIndex !== -1) {
                    console.log(`INFO: Proxy list already exists. Updating instead of adding.`)
                    state.proxiesArray[toUpdateIndex] = proxies; 
                }
                else {
                    state.proxiesArray = [...state.proxiesArray, proxies];
                }

            },
            prepare (proxies) {
                return {
                    payload: {
                        proxies,
                    }
                }
            }
        },
        removeProxies: {
            reducer (state, action : PayloadAction<{proxies : ProxyList}>) { //; anotherProp: string; uuid: string
                const {
                    proxies,
                } = action.payload;

                if (state.proxiesArray.findIndex((p : ProxyList) => p.name === proxies.name) === -1) {
                    console.log(`ERROR: Profile does not exist. Not removing from store.`)
                    throw "Profile does not exist";
                }
                else {
                    state.proxiesArray = state.proxiesArray.filter(prox => prox.name !== proxies.name);
                }
            },
            prepare (proxies) {
                return {
                    payload: {
                        proxies,
                    }
                }
            }
        },
        strictlyUpdateProxies: {
            reducer (state, action : PayloadAction<{name : string; proxies : ProxyList}>) { //; anotherProp: string; uuid: string
                const {
                    name,
                    proxies,
                } = action.payload;

                if (state.proxiesArray.findIndex((p : ProxyList) => p.name === name) === -1) {
                    console.log(`ERROR: ProxyGroup does not exist. Not removing from store.`)
                    throw "ProxyGroup does not exist";
                }
                else {
                    const toUpdateIndex = state.proxiesArray.findIndex(pr => pr.name === name); 
                    state.proxiesArray[toUpdateIndex] = proxies;
                }
            },
            prepare (name, proxies) {
                return {
                    payload: {
                        name,
                        proxies
                    }
                }
            }
        },
        populateProxies: {
            reducer (state, action : PayloadAction<{proxies : ProxyList[]}>) { //; anotherProp: string; uuid: string
                const {
                    proxies,
                } = action.payload;

                state.proxiesArray = proxies;
            },
            prepare (proxies) {
                return {
                    payload: {
                        proxies,
                    }
                }
            }
        },
    },
})

export const { addOrUpdateProxies, removeProxies, populateProxies, strictlyUpdateProxies } = proxiesSlice.actions

export default proxiesSlice.reducer