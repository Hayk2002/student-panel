import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import {Avatar, Button, Modal, Typography} from "antd";

import { dispatch } from "../store";
import { editApplicantStatus, fetchApplicants } from "../store/reducers/applicants";
import { CustomList, CustomListItem, CustomListMeta } from "../shared/components/styled";

enum ApplicantStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
}

const ApplicantsList = () => {
    const applicants = useSelector((state: any) => state.applicants.applicantsList);
    const isLoading = useSelector((state: any) => state.applicants.loading);

    const [modal, setModal] = useState<any>({
        isOpen: false,
        src: ""
    });

    useEffect(() => {
        dispatch(fetchApplicants());
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
        <>
            <CustomList
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={applicants}
                renderItem={(item: any) => (
                    <CustomListItem
                        actions={getActionsByUserStatus(item?.id, item?.status)}
                    >
                        <CustomListMeta
                            avatar={item?.avatarPhotoUrl ? <Avatar size={44} src={<img src={item?.avatarPhotoUrl} alt="avatar"/>} /> : <Avatar size={44} icon={<UserOutlined />} />}
                            title={`${item?.firstName} ${item?.lastName}`}
                            description={item?.email}
                        />
                        {item?.passportPhotoUrl && <Button type="dashed" onClick={() => setModal({ isOpen: true, src: item?.passportPhotoUrl })}>Անձնագիր</Button>}
                    </CustomListItem>
                )}
            />
            <Modal footer={false} open={modal.isOpen} onCancel={() => setModal({ isOpen: false, src: "" })}>
                <img
                    alt="passport"
                    src={modal.src}
                    style={{
                        width: "100%",
                        height: "500px",
                        objectFit: "contain",
                    }}/>
            </Modal>
        </>
    );
};

export default ApplicantsList;
