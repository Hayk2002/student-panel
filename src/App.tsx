import React, { useEffect } from 'react';
import AppRoutes from "./routes";
import {onAuthStateChanged} from "firebase/auth";
import {auth, child, db, get, ref} from "./firebase-config";
import {dispatch} from "./store";
import {setAuth} from "./store/reducers/auth";

const dbref = ref(db);

const App = () => {
    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser: any) => {
            if (currentUser) {
                const snapshot = await get(child(dbref, `UsersAuthList/${currentUser.uid}`));

                if (snapshot.exists()) {
                    dispatch(
                        setAuth({
                            user: {
                                firstName: snapshot.val().firstName,
                                lastName: snapshot.val().lastName,
                                role: snapshot.val().role,
                            }
                        })
                    )
                }
            }
        })
    }, []);


    return (
        <AppRoutes/>
    );
};

export default App;
