import {
    HeaderLogo,
    HeaderNav,
    HeaderNavList,
    HeaderNavListItem,
    HeaderWrapper,
    HeaderContainer,
    HeaderProfile
} from "./styled";
import LogoImg from 'assets/high_school_logo.svg';
import {useEffect, useState} from "react";
import CustomModal from "shared/components/CustomModal";
import SignInForm from "./signInForm";
import SignUpForm from "./signUpForm";
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import {auth, child, db, get, ref} from "../../firebase-config";
import { useSelector } from "react-redux";
import { dispatch } from "../../store";
import { authSignOut } from "../../store/reducers/auth";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.auth.user);

    const [isModalVisible, setIsModalVisible] = useState({
        form: '',
        isOpen: false
    });

    const toggleModal = (form: string = '') => {
        setIsModalVisible({
            form,
            isOpen: !isModalVisible.isOpen
        });
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
                                    <HeaderNavListItem onClick={handleSignOut}>Sign Out</HeaderNavListItem>
                                </>
                            ) : (
                                <>
                                    <HeaderNavListItem onClick={() => toggleModal('signIn')}>Sign In</HeaderNavListItem>
                                    <HeaderNavListItem onClick={() => toggleModal('signUp')}>Sign Up</HeaderNavListItem>
                                </>
                            )}
                        </HeaderNavList>
                    </HeaderNav>
                </HeaderContainer>
            </HeaderWrapper>
            <CustomModal title={isModalVisible.form === "signUp" ? "Sign Up" : "Sign In"} isVisible={isModalVisible.isOpen} onCancel={toggleModal}>
                {isModalVisible.form === "signIn" && <SignInForm closeModal={toggleModal} />}
                {isModalVisible.form === "signUp" && <SignUpForm closeModal={toggleModal} />}
            </CustomModal>
        </>
    );
};

export default Header;
