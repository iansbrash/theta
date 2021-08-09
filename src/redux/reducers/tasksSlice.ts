import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Site from '../../Logic/interfaces/enums/Site';
import ProfileObject from '../../Logic/interfaces/ProfileObject';
import TaskGroupInterface, { TaskHookProps } from '../../Components 2/Tasks/TaskGroupInterface'

type SliceState = { taskGroups : TaskGroup[], savingOptions : { saveState: TaskSaveState; numberToSave: number }, taskGroupCommanders : {[key : string] : TaskGroupCommanderProps} };

export interface TaskGroupCommanderProps {
    startAll: number,
    stopAll: number,
    massLink: string,
    deleteAll: number
}

export interface TaskGroup {
    name: string,
    site: Site,
    tasks: TaskHookProps[],
    delays: {
        monitor: number,
        error: number,
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
                state.taskGroupCommanders[taskGroup.name] = {
                    startAll: 0, 
                    stopAll: 0, 
                    massLink: '', 
                    deleteAll: 0
                }

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
        deleteTaskGroup: {
            reducer (state, action : PayloadAction<{tgName : string}>) { //; anotherProp: string; uuid: string
                const {
                    tgName
                } = action.payload;

                // this causes the 'Should have a queue' error
                // let temp = state.taskGroups.filter(tg => tg.name !== tgName)
                // state.taskGroups = temp
                // delete state.taskGroupCommanders[tgName]
                state.taskGroupCommanders[tgName].deleteAll = state.taskGroupCommanders[tgName].deleteAll + 1;
            },
            prepare (tgName) {
                return {
                    payload: {
                        tgName,
                    }
                }
            }
        },
        deleteTaskGroup2: {
            reducer (state, action : PayloadAction<{tgName : string}>) { //; anotherProp: string; uuid: string
                const {
                    tgName
                } = action.payload;

                // this causes the 'Should have a queue' error
                let temp = state.taskGroups.filter(tg => tg.name !== tgName)
                state.taskGroups = temp
                delete state.taskGroupCommanders[tgName]
                // state.taskGroupCommanders[tgName].deleteAll = state.taskGroupCommanders[tgName].deleteAll + 1;
            },
            prepare (tgName) {
                return {
                    payload: {
                        tgName,
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
            reducer (state, action : PayloadAction<{tgName : string, commanderName : "startAll" | "stopAll" | "deleteAll"}>) { //; anotherProp: string; uuid: string
                const {
                    tgName,
                    commanderName
                } = action.payload;   

                console.log(`tgName: ${tgName}`)
                // @ts-ignore
                state.taskGroupCommanders[tgName][commanderName] = state.taskGroupCommanders[tgName][commanderName] + 1;

            },
            prepare (tgName : string, commanderName : "startAll" | "stopAll" | "deleteAll") {
                return {
                    payload: {
                        tgName,
                        commanderName
                    }
                }
            }
        },
        activateStringCommander: {
            reducer (state, action : PayloadAction<{tgName : string, commanderName : "massLink", value : string}>) { //; anotherProp: string; uuid: string
                const {
                    tgName,
                    commanderName,
                    value
                } = action.payload;   

                console.log(`tgName: ${tgName}`)
                // @ts-ignore
                state.taskGroupCommanders[tgName][commanderName] = value

            },
            prepare (tgName : string, commanderName : "massLink", value : string) {
                return {
                    payload: {
                        tgName,
                        commanderName,
                        value
                    }
                }
            }
        },
        updateTaskGroupDelay: {
            reducer (state, action : PayloadAction<{tgName : string, delayType : "monitor" | "error", value : number}>) { //; anotherProp: string; uuid: string
                const {
                    tgName,
                    delayType,
                    value
                } = action.payload;   

                console.log(`tgName: ${tgName}`)
                // @ts-ignore

                
                state.taskGroups.find(tg => tg.name === tgName).delays[delayType] = value;

            },
            prepare (tgName : string, delayType : "monitor" | "error", value : number) {
                return {
                    payload: {
                        tgName,
                        delayType,
                        value
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

                taskGroups.forEach(tg => state.taskGroupCommanders[tg.name] = {
                    startAll: 0, 
                    stopAll: 0, 
                    massLink: '', 
                    deleteAll: 0
                })
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
export const { 
    deleteTaskGroup, 
    deleteTaskGroup2,
    populateTasks, 
    saveTaskGroup, 
    beginSave, 
    saveTaskGroupOnAdd, 
    activateNumberCommander, 
    activateStringCommander, 
    updateTaskGroupDelay 
} = tasksSlice.actions

export default tasksSlice.reducer