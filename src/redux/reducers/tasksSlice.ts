import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Site from '../../Logic/interfaces/enums/Site';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import TaskGroupInterface, { TaskHookProps } from '../../Components 2/Tasks/TaskGroupInterface'

type SliceState = { taskGroups : TaskGroup[], savingOptions : { saveState: TaskSaveState; numberToSave: number }, taskGroupCommanders : {[key : string] : TaskGroupCommanderProps} };

interface TaskGroupCommanderProps {
    startAll: number,
    stopAll: number,
    massLink: string
}

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
        taskGroupCommanders: {},
        savingOptions: {
            saveState: TaskSaveState.Unsaved,
            numberToSave: 0
        },
    } as SliceState,
    reducers: {

        // When we initially create a task group
        // It also adds to taskGroupCommanders
        saveTaskGroup: {
            reducer (state, action : PayloadAction<{taskGroup : TaskGroup}>) { //; anotherProp: string; uuid: string
                const {
                    taskGroup
                } = action.payload;

                state.taskGroups = [...state.taskGroups, taskGroup]
                state.taskGroupCommanders[taskGroup.name] = {startAll: 0, stopAll: 0, massLink: ''}

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
        activateNumberCommander: {
            reducer (state, action : PayloadAction<{tgName : string, commanderName : "startAll" | "stopAll" | "massLink"}>) { //; anotherProp: string; uuid: string
                const {
                    tgName,
                    commanderName
                } = action.payload;   


                // @ts-ignore
                state.taskGroupCommanders[tgName][commanderName] = state.taskGroupCommanders[tgName][commanderName] + 1;

            },
            prepare (tgName : string, commanderName : "startAll" | "stopAll" | "massLink") {
                return {
                    payload: {
                        tgName,
                        commanderName
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

                taskGroups.forEach(tg => state.taskGroupCommanders[tg.name] = {startAll: 0, stopAll: 0, massLink: ''})
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
export const { populateTasks, saveTaskGroup, beginSave, saveTaskGroupOnAdd, activateNumberCommander } = tasksSlice.actions

export default tasksSlice.reducer