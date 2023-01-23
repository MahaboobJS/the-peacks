import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: false
    },
    reducers: {
        togggle(state, action) {
            state.isLoading = action.payload;
        }
    }
})

export const loaderActions = loaderSlice;