import {useEffect, useState} from "react";
import {dispatch} from "../store";
import {editApplicantStatus, fetchApplicants} from "../store/reducers/applicants";
import {useSelector} from "react-redux";
import SpinLoader from "../shared/components/SpinLoader";
import {Avatar, Button, List, Skeleton, Typography} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {CustomList, CustomListItem, CustomListMeta} from "../shared/components/styled";
import applicant from "./Applicant";

enum ApplicantStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
}

const ApplicantsList = () => {
    const applicants = useSelector((state: any) => state.applicants.applicantsList);
    const isLoading = useSelector((state: any) => state.applicants.loading);

    useEffect(() => {
        dispatch(fetchApplicants());
        console.log(applicants);
    }, []);

    const updateApplicantStatus = (id: string, status: string) => {
        dispatch(editApplicantStatus(id, status));
    }

    const getActionsByUserStatus = (id: string, status: string) => {
        switch (status) {
            case ApplicantStatus.Pending:
                return [
                    <Button
                        type="primary"
                        onClick={() => updateApplicantStatus(id, ApplicantStatus.Approved)}
                    >
                        Հաստատել
                    </Button>,
                    <Button
                        danger
                        type="primary"
                        onClick={() => updateApplicantStatus(id, ApplicantStatus.Rejected)}
                    >
                        Մերժել
                    </Button>
                ];
            case ApplicantStatus.Approved:
                return [<Typography.Text type="success">Հաստատված</Typography.Text>]
            case ApplicantStatus.Rejected:
                return [<Typography.Text type="danger">Մերժված</Typography.Text>];
            default:
                break;
        }
    }

    return (
        <CustomList
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={applicants}
            renderItem={(item: any) => (
                <CustomListItem
                    actions={getActionsByUserStatus(item?.id, item?.status)}
                >
                    <CustomListMeta
                        avatar={item?.photoUrl ? <Avatar size={44} src={<img src={item?.photoUrl} alt="avatar"/>} /> : <Avatar size={44} icon={<UserOutlined />} />}
                        title={`${item?.firstName} ${item?.lastName}`}
                        description={item?.email}
                    />
                </CustomListItem>
            )}
        />
    );
};

export default ApplicantsList;
