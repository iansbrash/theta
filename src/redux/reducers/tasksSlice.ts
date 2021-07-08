import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Site from '../../Logic/interfaces/enums/Site';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import TaskClass from '../../Logic/sites/classes/TaskClass';

type SliceState = { taskGroups : TaskGroup[] };

export interface TaskGroup {
    name: string,
    site: Site,
    tasks: TaskClass[],
    delays: {
        monitor: number,
        error: number
    }
}

// load tasks
// unload tasks

export const tasksSlice = createSlice({
    name: 'counter',
    initialState: {
        taskGroups: []
    } as SliceState,
    reducers: {
        addOrUpdateProfile: {
            reducer (state, action : PayloadAction<{profile : ProfileObject}>) { //; anotherProp: string; uuid: string
                

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
export const { addOrUpdateProfile, removeProfile, populateProfiles } = tasksSlice.actions

export default tasksSlice.reducer