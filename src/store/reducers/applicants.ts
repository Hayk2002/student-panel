import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase-config";

const initialState = {
    loading: false,
    applicantsList: null
};

const applicantsSlice = createSlice({
    name: "applicantsSlice",
    initialState,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload;
        },
        setApplicants(state, { payload }) {
            state.applicantsList = payload;
        },
    }
});

export default applicantsSlice.reducer;

export const { setLoading, setApplicants } = applicantsSlice.actions;

export const createApplicant = (applicant: any, callback: any) => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));
            await addDoc(collection(firestore, 'applicants'), { ...applicant });
            callback();
        } catch (error: any) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const getApplicants = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));
            const querySnapshot = await getDocs(collection(firestore, 'applicants'));
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));

            dispatch(setApplicants(newData));
        } catch (error: any) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}
