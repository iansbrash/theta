import { createSlice, PayloadAction } from '@reduxjs/toolkit'


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