import {Avatar, Card, Divider} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {ProfileBlock} from "../shared/components/styled";
import {UserType} from "../shared/utils/enums";
import styled from "styled-components";

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

const Profile = () => {
    const user = useSelector((state: any) => state.auth.user);

    return (
        <ProfilePageWrapper>
            <Card style={{ width: 300, marginTop: 16 }}>
                <Card.Meta
                    avatar={<Avatar size={50} icon={<UserOutlined />} />}
                    title={`${user?.firstName} ${user?.lastName}`}
                    description={returnUserRole(user?.role)}
                />
            </Card>
        </ProfilePageWrapper>
    );
};

export default Profile;
