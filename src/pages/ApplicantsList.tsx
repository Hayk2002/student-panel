import {useEffect, useState} from "react";
import {dispatch} from "../store";
import {getApplicants} from "../store/reducers/applicants";
import {useSelector} from "react-redux";

const ApplicantsList = () => {
    const applicants = useSelector((state: any) => state.applicants.applicantsList)

    useEffect(() => {
        dispatch(getApplicants());
    }, []);

    return (
        <>
            <ul>
                {applicants.map((item: any) => (
                    <li key={item.id}>{item.id}</li>
                ))}
            </ul>
        </>
    );
};

export default ApplicantsList;
