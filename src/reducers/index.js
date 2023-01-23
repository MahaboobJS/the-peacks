import { configureStore } from "@reduxjs/toolkit";
import { articleActions } from "./articles";
import { loaderActions } from "./loader";

const store = configureStore({
    reducer: {
        loader: loaderActions.reducer,
        articles: articleActions.reducer
    }

})

export default store;