import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
    name: 'counter',
    initialState: {
        defaults: {
            delays: {
                error: 3000,
                monitor: 3000
            },
            webhooks: {
                discord: '',
                slack: ''
            }
        }
    },
    reducers: {
        updateDefaultDelays: {
            reducer (state, action : PayloadAction<{delayType : "error" | "monitor"; value : number}>) { //; anotherProp: string; uuid: string
                const {
                    delayType,
                    value
                } = action.payload;

                state.defaults.delays[delayType] = value;
            },
            prepare (delayType, value) {
                return {
                    payload: {
                        delayType,
                        value
                    }
                }
            }
        },
        updateDefaultWebhooks: {
            reducer (state, action : PayloadAction<{webhookType : "discord" | "slack"; value : string}>) { //; anotherProp: string; uuid: string
                const {
                    webhookType,
                    value
                } = action.payload;

                state.defaults.webhooks[webhookType] = value;
            },
            prepare (webhookType, value) {
                return {
                    payload: {
                        webhookType,
                        value
                    }
                }
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateDefaultDelays, updateDefaultWebhooks } = settingsSlice.actions

export default settingsSlice.reducer