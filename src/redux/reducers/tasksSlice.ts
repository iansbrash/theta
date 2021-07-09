import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Site from '../../Logic/interfaces/enums/Site';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import { TaskHookProps } from '../../Components 2/Tasks/TaskGroupInterface'

type SliceState = { taskGroups : TaskGroup[] };

export interface TaskGroup {
    name: string,
    site: Site,
    tasks: TaskHookProps[],
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
        // saveTasks: {
        //     reducer (state, action : PayloadAction<{taskGroups : TaskGroup[]}>) { //; anotherProp: string; uuid: string
        //         const {
        //             taskGroups
        //         } = action.payload;

        //         state.taskGroups = taskGroups
        //     },
        //     prepare (taskGroups) {
        //         return {
        //             payload: {
        //                 taskGroups,
        //             }
        //         }
        //     }
        // },
        populateTasks: {
            reducer (state, action : PayloadAction<{taskGroups : TaskGroup[]}>) { //; anotherProp: string; uuid: string
                const {
                    taskGroups
                } = action.payload;   

                state.taskGroups = taskGroups
            },
            prepare (taskGroups) {
                return {
                    payload: {
                        taskGroups,
                    }
                }
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { populateTasks } = tasksSlice.actions

export default tasksSlice.reducer