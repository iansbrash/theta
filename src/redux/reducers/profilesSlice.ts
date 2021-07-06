import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ProfileObject from '../../Logic/interfaces/ProfileObject';

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

                if (state.profilesArray.includes(profile) === false) {
                    console.log(`ERROR: Profile does not exist. Not removing from store.`)
                }
                else {
                    state.profilesArray = state.profilesArray.filter(prof => prof !== profile);
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
    },
})

// Action creators are generated for each case reducer function
export const { addOrUpdateProfile, removeProfile } = profilesSlice.actions

export default profilesSlice.reducer