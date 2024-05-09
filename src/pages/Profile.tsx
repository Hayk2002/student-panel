import {Avatar, Button, Card, Divider, Modal} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {ProfileBlock} from "../shared/components/styled";
import {UserType} from "../shared/utils/enums";
import styled from "styled-components";
import SignUpForm from "../shared/components/SignUpForm";
import {useState} from "react";
import CustomModal from "../shared/components/CustomModal";

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

const ProfilePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProfilePageBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Profile = () => {
    const user = useSelector((state: any) => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ProfilePageWrapper>
            <ProfilePageBlock>
                <Card style={{ width: 300, marginTop: 16 }}>
                    <Card.Meta
                        avatar={<Avatar size={50} icon={<UserOutlined />} />}
                        title={`${user?.firstName} ${user?.lastName}`}
                        description={returnUserRole(user?.role)}
                    />
                </Card>
                {user?.role === UserType.Admin && (
                    <>
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>Ավելացնել օգտատերի</Button>
                        <CustomModal title="Օգտատերի գրանցում" isVisible={isModalOpen} onCancel={() => setIsModalOpen(false)}>
                            <SignUpForm closeModal={() => setIsModalOpen(false)}/>
                        </CustomModal>
                    </>
                )}
            </ProfilePageBlock>
        </ProfilePageWrapper>
    );
};

export default Profile;
