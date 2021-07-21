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
            },
        },
        discord: {
            id: '',
            username: '',
            discriminator: '',
            avatar: ''
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
        populateSettings: {
            reducer (state, action : PayloadAction<{settings : any}>) { //; anotherProp: string; uuid: string
                const {
                    settings,
                } = action.payload;

                console.log('settings in popset')
                console.log(settings)

                state.defaults = settings.defaults;
            },
            prepare (settings) {
                return {
                    payload: {
                        settings,
                    }
                }
            }
        },
        updateDiscordInfo: {
            reducer (state, action : PayloadAction<{discord : {id: string, username: string, discriminator: string, avatar: string}}>) { //; anotherProp: string; uuid: string
                state.discord = action.payload.discord;
            },
            prepare (discord) {
                return {
                    payload: {
                        discord,
                    }
                }
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateDefaultDelays, updateDefaultWebhooks, populateSettings, updateDiscordInfo } = settingsSlice.actions

export default settingsSlice.reducer