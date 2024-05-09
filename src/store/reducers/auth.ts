import { createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, child, db, get, ref, set } from "../../firebase-config";

const dbref = ref(db);

const initialState = {
    loading: false,
    user: null,
    allUsers: null
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
        },
        getUsers(state, { payload }) {
            state.allUsers = payload?.allUsers;
        }
    }
});

export default authSlice.reducer;

export const { setLoading, setAuth, getUsers } = authSlice.actions;

export const authSignUp = ({ email, password, ...rest }: any, successCallback: (msg: string) => void, failureCallback: (msg: string) => void) => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            await set(ref(db, `UsersAuthList/${credentials.user.uid}`), {
                ...rest
            });

            successCallback("Ձեր հաշիվը ստեղծված է։");
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
                dispatch(
                    setAuth({
                        user: snapshot.val()
                    })
                )
            }

            localStorage.setItem('isUserAuthenticated', 'true');

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
