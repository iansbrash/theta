import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export enum SessionStatus {
    Populated,
    Unpopulated
}

type SliceState = { session : string, license: string, status : SessionStatus };

export const sessionSlice = createSlice({
    name: 'counter',
    initialState: {
        session: '',
        license: '',
        status: SessionStatus.Unpopulated
    } as SliceState,
    reducers: {
        addSession: {
            reducer (state, action : PayloadAction<{session : string, license : string}>) {
                const {
                    session,
                    license
                } = action.payload;

                state.session = session;
                state.license = license;
                // axios.defaults.headers.license = license;
                // axios.defaults.headers['session'] = session;
                // axios.defaults.headers.common['license'] = license;
                // axios.defaults.headers.common['session'] = session;
                // we need: username, avatar, id, discriminator
            },
            prepare (session, license) {
                return {
                    payload: {
                        session,
                        license
                    }
                }
            }
        },
        removeSession: {
            reducer (state, action : PayloadAction<{}>) { 

                state.session = '';
                state.license = '';
            },
            prepare () {
                return {
                    payload: {

                    }
                }
            }
        },
        populateSession: {
            reducer (state, action : PayloadAction<{session : string, license: string}>) { 

                const {
                    session,
                    license
                } = action.payload;

                state.session = session;
                state.license = license;
                state.status = SessionStatus.Populated
            },
            prepare (session, license) {
                return {
                    payload: {
                        session,
                        license
                    }
                }
            }
        }
    },
})

export const { addSession, removeSession, populateSession } = sessionSlice.actions

export default sessionSlice.reducer