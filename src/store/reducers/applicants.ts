import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase-config";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {logDOM} from "@testing-library/react";

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
            const snapshot = await addDoc(collection(firestore, 'applicants'), { ...applicant });
            callback(snapshot.id);
        } catch (error: any) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const uploadApplicantAvatar = (file: any, id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));
            const storage = getStorage();
            const fileRef = ref(storage, id);

            await uploadBytes(fileRef, file);
        } catch (error: any) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export const uploadApplicantPassport = (file: any, id: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(setLoading(true));
            const storage = getStorage();
            const fileRef = ref(storage, `passport-${id}`);

            await uploadBytes(fileRef, file);
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
            const storage = getStorage();
            const querySnapshot = await getDocs(collection(firestore, 'applicants'));

            const newData = querySnapshot.docs
                .map(async (doc) => {
                    const avatarFileRef = ref(storage, doc.id);
                    const passportFileRef = ref(storage, `passport-${doc.id}`);

                    let avatarPhotoUrl;
                    let passportPhotoUrl;

                    try {
                        avatarPhotoUrl = await getDownloadURL(avatarFileRef);
                        passportPhotoUrl = await getDownloadURL(passportFileRef);
                    } catch (error: any) {
                        avatarPhotoUrl = null;
                        passportPhotoUrl = null;
                    }

                    return {
                        ...doc.data(),
                        avatarPhotoUrl,
                        passportPhotoUrl,
                        id: doc.id
                    };
                });

            const data = await Promise.all(newData);

            dispatch(getApplicants(data));
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
