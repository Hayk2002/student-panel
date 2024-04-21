import {Avatar, Divider} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {ProfileBlock} from "../shared/components/styled";

const Profile = () => {
    const user = useSelector((state: any) => state.auth.user);

    return (
        <div>
            <ProfileBlock>
                <Avatar icon={<UserOutlined />} />
                <p>{user?.firstName}{" "}{user?.lastName}</p>
            </ProfileBlock>
            <Divider/>
            <div>
                users list
            </div>
        </div>
    );
};

export default Profile;
