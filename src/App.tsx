import React, { useEffect } from 'react';

import AppRoutes from "./routes";
import { dispatch } from "./store";
import { setAuth } from "./store/reducers/auth";

const App = () => {
    useEffect(() => {
        const isUserAuthenticated = localStorage.getItem('isUserAuthenticated');

        dispatch(
            setAuth({
                user: JSON.parse(isUserAuthenticated as string)
            })
        )
    }, []);

    return (
        <AppRoutes/>
    );
};

export default App;
