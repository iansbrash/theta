import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import electron from 'electron'

type SliceState = { profilesArray : ProfileObject[] };

export const profilesSlice = createSlice({
    name: 'counter',
    initialState: {
        profilesArray: []
    } as SliceState,
    reducers: {
        addOrUpdateProfile: {
            reducer (state, action : PayloadAction<{profile : ProfileObject}>) { //; anotherProp: string; uuid: string
                const {
                    profile,
                } = action.payload;

                const toUpdateIndex = state.profilesArray.findIndex((prof : ProfileObject) => prof.information.name === profile.information.name)

                if (toUpdateIndex !== -1) {
                    console.log(`INFO: Profile already exists. Updating instead of adding.`)
                    state.profilesArray[toUpdateIndex] = profile; 
                }
                else {
                    state.profilesArray = [...state.profilesArray, profile];
                }

            },
            prepare (profile) {
                return {
                    payload: {
                        profile,
                    }
                }
            }
        },
        removeProfile: {
            reducer (state, action : PayloadAction<{profile : ProfileObject}>) { //; anotherProp: string; uuid: string
                const {
                    profile,
                } = action.payload;

                if (state.profilesArray.findIndex((p : ProfileObject) => p.information.name === profile.information.name) === -1) {
                    console.log(`ERROR: Profile does not exist. Not removing from store.`)
                    throw "Profile does not exist";
                }
                else {
                    state.profilesArray = state.profilesArray.filter(prof => prof.information.name !== profile.information.name);
                }
            },
            prepare (profile) {
                return {
                    payload: {
                        profile,
                    }
                }
            }
        },
        populateProfiles: {
            reducer (state, action : PayloadAction<{profiles : ProfileObject[]}>) { //; anotherProp: string; uuid: string
                const {
                    profiles,
                } = action.payload;

                state.profilesArray = profiles;
            },
            prepare (profiles) {
                return {
                    payload: {
                        profiles,
                    }
                }
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addOrUpdateProfile, removeProfile, populateProfiles } = profilesSlice.actions

export default profilesSlice.reducer