import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase-config";

type Applicant = {
    id: number;
    status: string;
}

interface ApplicantsState {
    loading: boolean;
    applicantsList: Applicant[];
    supportQuestions: any,
}

const initialState: ApplicantsState = {
    loading: false,
    applicantsList: [],
    supportQuestions: [],
};

const applicantsSlice = createSlice({
    name: "applicantsSlice",
    initialState,
    reducers: {
        setLoading(state, { payload }) {
            state.loading = payload;
        },
        getApplicants(state, { payload }) {
            state.applicantsList = payload;
        },
        editApplicant(state, { payload }) {
            state.applicantsList = state.applicantsList.map((item: any) => {
                if (payload.id === item.id) {
                    return {
                        ...item,
                        status: payload.status,
                    }
                }

                return item;
            });
        },
        getSupportQuestions(state, { payload }) {
            state.supportQuestions = payload;
        }
    }
});

export default applicantsSlice.reducer;

export const { setLoading, getApplicants, editApplicant, getSupportQuestions } = applicantsSlice.actions;

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

export const fetchApplicants = () => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));
            const querySnapshot = await getDocs(collection(firestore, 'applicants'));
            const newData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));

            dispatch(getApplicants(newData));
        } catch (error: any) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const editApplicantStatus = (id: string, status: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));

            const docRef = doc(firestore, 'applicants', id);
            await updateDoc(docRef, {
                status
            });

            dispatch(editApplicant({ id, status }));
        } catch (error: any) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const contactWithSupport = (values: any, callback: any) => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));

        await addDoc(collection(firestore, 'supportQuestions'), { ...values });

        callback();
    } catch (error: any) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchSupportQuestions = () => async (dispatch: any) => {
    try {
        dispatch(setLoading(true));
        const querySnapshot = await getDocs(collection(firestore, 'supportQuestions'));
        const newData = querySnapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }));

        dispatch(getSupportQuestions(newData));
    } catch (error: any) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
}
