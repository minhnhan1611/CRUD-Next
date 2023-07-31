import { configureStore } from "@reduxjs/toolkit";
import Reducer from './Reducer';
import listenerMiddleware from "./Listener";

export default configureStore({
    reducer: {
        app: Reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})