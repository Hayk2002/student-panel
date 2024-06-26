import { createSlice } from "@reduxjs/toolkit";
import { child, db, get, ref, set, remove } from "../../firebase-config";

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

export const deleteUser = (id: string, callback: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));

        await remove(ref(db, `UsersAuthList/${id}`));

        dispatch(fetchAllUsers());

        callback();
    } catch (error: any) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const addParentChildren = (parent: any, children: any, callback: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));

        await set(ref(db, 'UsersAuthList/' + parent.id), {
            ...parent,
            children
        });

        dispatch(fetchAllUsers());

        callback();
    } catch (error: any) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const addStudentGrade = (student: any, newGrade: any, callback: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));

        let shouldBeAdded = true;

        const requestData = student?.grades.map((grade: any) => {
            if (grade.date === newGrade.date && grade.subject === newGrade.subject) {
                shouldBeAdded = false;
                return newGrade;
            }

            return grade;
        });

        await set(ref(db, 'UsersAuthList/' + student.id), {
            ...student,
            grades: [...requestData, shouldBeAdded ? newGrade : null]
        });

        dispatch(fetchAllUsers());

        callback();
    } catch (error: any) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
};
