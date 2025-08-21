import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import sessionStorage from "redux-persist/es/storage/session";
import { AuthSlice } from "./AuthSlice";
import persistStore from "redux-persist/es/persistStore";
import { CarSlice } from "./CarSlice";


const userpersistconfig = {
    key:'Auth',
    storage:sessionStorage
}

const persistConfigUser = persistReducer(userpersistconfig,AuthSlice.reducer)

const rootReducer = combineReducers({
    Auth:persistConfigUser,
    Car: CarSlice.reducer
})

export const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})

export const persistor = persistStore(store)