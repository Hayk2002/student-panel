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
import { setAuth } from "../../store/reducers/auth";
import { onAuthStateChanged, signOut } from 'firebase/auth';

const dbref = ref(db);

const Header = () => {
    const [isModalVisible, setIsModalVisible] = useState({
        form: '',
        isOpen: false
    });

    const user = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser: any) => {
            if (currentUser) {
                const snapshot = await get(child(dbref, `UsersAuthList/${currentUser.uid}`));

                if (snapshot.exists()) {
                    dispatch(
                        setAuth({
                            user: {
                                firstName: snapshot.val().firstName,
                                lastName: snapshot.val().lastName
                            }
                        })
                    )
                }
            }
        })
    }, []);

    const toggleModal = (form: string = '') => {
        setIsModalVisible({
            form,
            isOpen: !isModalVisible.isOpen
        });
    };

    const handleSignOut = async () => {
        await signOut(auth);
        dispatch(setAuth({}));
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
                                <HeaderProfile>
                                    <Avatar icon={<UserOutlined />} />
                                    <p>
                                        {user.firstName}
                                        {" "}
                                        {user.lastName}
                                    </p>
                                    <HeaderNavListItem onClick={handleSignOut}>Sign Out</HeaderNavListItem>
                                </HeaderProfile>
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
