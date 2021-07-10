import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Site from '../../Logic/interfaces/enums/Site';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import TaskGroupInterface, { TaskHookProps } from '../../Components 2/Tasks/TaskGroupInterface'

type SliceState = { taskGroups : TaskGroup[], savingOptions : { saveState: TaskSaveState; numberToSave: number } };

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

export enum TaskSaveState {
    Unsaved,
    Saving,
    Saved
}

export const tasksSlice = createSlice({
    name: 'counter',
    initialState: {
        taskGroups: [],
        savingOptions: {
            saveState: TaskSaveState.Unsaved,
            numberToSave: 0
        },
    } as SliceState,
    reducers: {
        saveTaskGroup: {
            reducer (state, action : PayloadAction<{taskGroup : TaskGroup}>) { //; anotherProp: string; uuid: string
                const {
                    taskGroup
                } = action.payload;

                state.taskGroups = [...state.taskGroups, taskGroup]
                if (state.taskGroups.length === state.savingOptions.numberToSave) {
                    state.savingOptions.saveState = TaskSaveState.Saved
                }
            },
            prepare (taskGroup) {
                return {
                    payload: {
                        taskGroup,
                    }
                }
            }
        },
        beginSave: {
            reducer (state, action : PayloadAction<{numOfTaskGroup : number}>) {
                state.savingOptions.saveState = TaskSaveState.Saving
                state.savingOptions.numberToSave = action.payload.numOfTaskGroup

            },
            prepare (numOfTaskGroup) {
                return {
                    payload: {
                        numOfTaskGroup
                    }
                }
            }
            
        },
        saveTaskGroupOnAdd: {
            reducer (state, action : PayloadAction<{taskGroup : TaskGroup}>) {

                const {
                    taskGroup
                } = action.payload
                

                const index = state.taskGroups.findIndex(tg => tg.name === taskGroup.name)

                if (index === -1) {
                    state.taskGroups = [...state.taskGroups, taskGroup]
                }
                else {
                    state.taskGroups[index] = taskGroup
                }

            },
            prepare (taskGroup) {
                return {
                    payload: {
                        taskGroup
                    }
                }
            }
        },
        populateTasks: {
            reducer (state, action : PayloadAction<{taskGroups : TaskGroup[]}>) { //; anotherProp: string; uuid: string
                const {
                    taskGroups
                } = action.payload;   

                state.taskGroups = taskGroups
                state.savingOptions.saveState = TaskSaveState.Unsaved;
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
export const { populateTasks, saveTaskGroup, beginSave, saveTaskGroupOnAdd } = tasksSlice.actions

export default tasksSlice.reducer