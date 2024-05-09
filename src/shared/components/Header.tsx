import { Avatar } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

import {
    HeaderLogo,
    HeaderNav,
    HeaderNavList,
    HeaderNavListItem,
    HeaderWrapper,
    HeaderContainer,
    HeaderProfile
} from "./styled";
import SignInForm from "./SignInForm";
import { dispatch } from "../../store";
import LogoImg from 'assets/high_school_logo.svg';
import CustomModal from "shared/components/CustomModal";
import { authSignOut } from "../../store/reducers/auth";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.auth.user);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const handleSignOut = async () => {
        dispatch(authSignOut(() => {}));
    };

    return (
        <>
            <HeaderWrapper>
                <HeaderContainer>
                    <HeaderLogo to="/">
                        <img src={LogoImg} alt="logo"/>
                    </HeaderLogo>
                    <HeaderNav>
                        <HeaderNavList>
                            {user?.firstName ? (
                                <>
                                    <HeaderProfile onClick={() => navigate('/profile')}>
                                        <Avatar icon={<UserOutlined />} />
                                        <p>
                                            {user.firstName}
                                            {" "}
                                            {user.lastName}
                                        </p>
                                    </HeaderProfile>
                                    <HeaderNavListItem onClick={handleSignOut}>Դուրս գալ</HeaderNavListItem>
                                </>
                            ) : (
                                <>
                                    <HeaderNavListItem onClick={toggleModal}>Մուտք</HeaderNavListItem>
                                </>
                            )}
                        </HeaderNavList>
                    </HeaderNav>
                </HeaderContainer>
            </HeaderWrapper>
            <CustomModal title="Մուտք" isVisible={isModalVisible} onCancel={toggleModal}>
                <SignInForm closeModal={toggleModal} />
            </CustomModal>
        </>
    );
};

export default Header;
