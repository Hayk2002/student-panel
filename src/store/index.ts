import { configureStore } from "@reduxjs/toolkit";

import reducers from "./reducers";

const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== "production"
});

const { dispatch } = store;

export { store, dispatch };
