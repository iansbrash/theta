import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import settingsSlice from './reducers/settingsSlice'
import profilesSlice from './reducers/profilesSlice'
import proxiesSlice from './reducers/proxiesSlice'
import accountsSlice from './reducers/accountsSlice'
import tasksSlice from './reducers/tasksSlice'

const rootReducer = combineReducers({
    settings: settingsSlice,
    profiles: profilesSlice,
    proxies: proxiesSlice,
    accounts: accountsSlice,
    tasks: tasksSlice
})

const store = configureStore({
    reducer: rootReducer,
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// on load:
// read from file IO, update store, then use store for the remainder of the session (while writing to IO simultaneously)
// we don't need a persisted reducer which accounts for if we manually edit profiles / proxies via txt file