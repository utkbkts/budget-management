import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import AuthReducer from "../features/Authslice"
import İslemReducer from "../features/IslemSlice"
export const store = configureStore({
    reducer:{
        auth:AuthReducer,
        islem:İslemReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false
    })
})