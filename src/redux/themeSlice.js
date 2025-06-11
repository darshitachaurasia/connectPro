
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    theme : 'light',
}

const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers : {
        lightMode: (state) => {
            state.theme = "light"; 
            
        },
        darkMode : (state) => {
            state.theme = "dark" ;
            
        },
    }
})

export const {lightMode,darkMode} = themeSlice.actions;

export default themeSlice.reducer;