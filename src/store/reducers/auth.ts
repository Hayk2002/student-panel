import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, child, db, get, ref, set } from "../../firebase-config";
import {UserType} from "../../shared/utils/enums";
import {fetchAllUsers} from "./users";

const dbref = ref(db);

const initialState = {
    loading: false,
    user: null
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload;
        },
        setAuth(state, { payload }) {
            state.user = payload?.user;
        }
    }
});

export default authSlice.reducer;

export const { setLoading, setAuth } = authSlice.actions;

export const authSignUp = ({ email, password, role, ...rest }: any, successCallback: (msg: string) => void, failureCallback: (msg: string) => void) => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));

            const credentials = await createUserWithEmailAndPassword(auth, email, password);

            if (role === UserType.Student) {
                await set(ref(db, `UsersAuthList/${credentials.user.uid}`), {
                    ...rest,
                    role,
                    grades: [{ subject: "", grade: "", absence: "", date: "" }]
                });
            } else {
                await set(ref(db, `UsersAuthList/${credentials.user.uid}`), {
                    ...rest,
                    role
                });
            }

            dispatch(fetchAllUsers());

            successCallback("Հաշիվը ստեղծված է։");
        } catch (error: any) {
            console.log(error);
            failureCallback(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
};

export const authSignIn = ({ email, password }: any, successCallback: () => void, failureCallback: (msg: string) => void) => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));

            const credentials = await signInWithEmailAndPassword(auth, email, password);
            const snapshot = await get(child(dbref, `UsersAuthList/${credentials.user.uid}`));

            if (snapshot.exists()) {
                const userData = {
                    ...snapshot.val(),
                    id: credentials.user.uid
                };

                dispatch(
                    setAuth({
                        user: userData
                    })
                );

                localStorage.setItem('isUserAuthenticated', JSON.stringify(userData));
            }

            successCallback();
        } catch (error: any) {
            console.log(error);
            failureCallback(error.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
};

export const authSignOut = (callback: () => void) => {
    return async (dispatch: any) => {
        await signOut(auth);
        dispatch(setAuth(null));
        localStorage.removeItem('isUserAuthenticated');
        callback()
    }
}
