import {child, db, get, ref} from "../../firebase-config";
import {createSlice} from "@reduxjs/toolkit";

const dbref = ref(db);

const initialState = {
    loading: false,
    allUsers: null
};

const usersSlice = createSlice({
    name: "usersSlice",
    initialState,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload;
        },
        getUsers(state, { payload }) {
            state.allUsers = payload?.allUsers;
        }
    }
});

export default usersSlice.reducer;

export const { setLoading, getUsers } = usersSlice.actions;

export const fetchAllUsers = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const snapshot = await get(child(dbref, "UsersAuthList"));

        if (snapshot.exists()) {
            const data = snapshot.val();
            const usersList = [];

            for (let record in data) {
                const newRecord = {
                    ...data[record],
                    id: record
                };

                usersList.push(newRecord);
            }

            dispatch(getUsers({ allUsers: usersList }));
        }
    } catch (error: any) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
};
