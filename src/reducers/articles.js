import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        isLoading: false
    },
    reducers: {
        setArticles(state, action) {
            state.articles = action.payload;
        }
    }
})

export const articleActions = articleSlice;