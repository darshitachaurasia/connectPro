import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

import bookingReducer from "./bookingSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        
        booking: bookingReducer,
        admin: adminReducer,
    },
});

export default store;
