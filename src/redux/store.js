import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import mentorReducer from "./mentorSlice";
import bookingReducer from "./bookingSlice";
import adminReducer from "./adminSlice";
import themeReducer from "./themeSlice";

 const store = configureStore({
    reducer: {
     auth :  authReducer,
     user : userReducer,
     mentor: mentorReducer,
     booking : bookingReducer,
     admin : adminReducer,
     theme : themeReducer,
    
    }
})

export default store;