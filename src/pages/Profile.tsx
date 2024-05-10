import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, message, Tag, Typography} from "antd";

import { CustomList, CustomListItem, CustomListMeta, ListWrapper } from "../shared/components/styled";
import { UserType } from "../shared/utils/enums";
import styled from "styled-components";
import SignUpForm from "../shared/components/SignUpForm";
import CustomModal from "../shared/components/CustomModal";
import { deleteUser, fetchAllUsers } from "../store/reducers/users";
import { dispatch } from "../store";

const returnUserRole = (role: string) => {
    switch (role) {
        case UserType.Admin:
            return "Ադմինիստրատոր";
        case UserType.Teacher:
            return "Ուսուցիչ";
        case UserType.Parent:
            return "Ծնող";
        case UserType.Student:
            return "Աշակերտ";
        default:
            break;
    }
};

const ProfilePageBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Profile = () => {
    const user = useSelector((state: any) => state.auth.user);
    const isLoading = useSelector((state: any) => state.users.loading);
    const allUsers = useSelector((state: any) => state.users.allUsers);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState({
        userId: "",
        open: false
    });

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    const handleUserDelete = () => {
        dispatch(deleteUser(deleteModal.userId, () => {
            message.success('Օգտատերը հաջողությամբ ջնջված է');
            setDeleteModal({ ...deleteModal, open: false });
        }));
    };

    return (
        <ListWrapper>
            <ProfilePageBlock>
                <Card style={{ width: 300 }}>
                    <Card.Meta
                        avatar={<Avatar size={50} icon={<UserOutlined />} />}
                        title={`${user?.firstName} ${user?.lastName}`}
                        description={returnUserRole(user?.role)}
                    />
                </Card>
                {user?.role === UserType.Admin && (
                    <>
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>Ավելացնել օգտատեր</Button>
                        <CustomModal title="Օգտատերի գրանցում" isVisible={isModalOpen} onCancel={() => setIsModalOpen(false)}>
                            <SignUpForm closeModal={() => setIsModalOpen(false)}/>
                        </CustomModal>
                    </>
                )}
            </ProfilePageBlock>
            {user?.role === UserType.Admin && (
                <>
                    <Typography.Title level={2} style={{ color: "rgb(54 90 124)" }}>Բոլոր օգտատերերը</Typography.Title>
                    <CustomList
                        loading={isLoading}
                        itemLayout="horizontal"
                        dataSource={allUsers?.filter((record: any) => record?.id !== user?.id)}
                        renderItem={(item: any) => (
                            <CustomListItem
                                actions={[
                                    <Tag color="blue">{returnUserRole(item.role)}</Tag>,
                                    <Button
                                        danger
                                        type="primary"
                                        onClick={() => setDeleteModal({ userId: item.id, open: true })}
                                    >
                                        Ջնջել
                                    </Button>
                                ]}
                            >
                                <CustomListMeta
                                    avatar={<Avatar icon={<UserOutlined />} />}
                                    title={`${item?.firstName} ${item?.lastName}`}
                                />
                            </CustomListItem>
                        )}
                    />
                </>
            )}
            <CustomModal title="Ջնջել օգտատերի հաշիվը" onCancel={() => setDeleteModal({...deleteModal, open: false})} isVisible={deleteModal.open}>
                <Typography.Text style={{ display: "block", textAlign: "center" }}>
                    Տվյալ օգտատերը այլևս չի կարողանա ստեղծել հաշիվ նույն էլեկտրոնային հասցեյով։
                </Typography.Text>
                <br/>
                <Button
                    danger
                    type="primary"
                    loading={isLoading}
                    style={{ display: "block", margin: "0 auto" }}
                    onClick={handleUserDelete}>Ջնջել</Button>
            </CustomModal>
        </ListWrapper>
    );
};

export default Profile;
