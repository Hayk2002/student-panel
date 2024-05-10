import {Avatar, Button, Dropdown, message} from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import {Link, NavLink, useNavigate} from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';

import {
    HeaderLogo,
    HeaderNav,
    HeaderNavList,
    HeaderNavListItem,
    HeaderWrapper,
    HeaderContainer,
    HeaderProfile, HeaderLogOut
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

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (<Link to="/profile">Իմ հաշիվը</Link>)
        },
        {
            key: "2",
            label: (
                <HeaderLogOut onClick={handleSignOut}>Դուրս գալ</HeaderLogOut>
            )
        }
    ];

    return (
        <>
            <HeaderWrapper>
                <HeaderContainer>
                    <HeaderLogo to="/">
                        <img src={LogoImg} alt="logo"/>
                    </HeaderLogo>
                    <HeaderNav>
                        <HeaderNavList>
                            <HeaderNavListItem>
                                <NavLink to={"/about-us"} className={({ isActive }: any) => isActive && "active"}>Մեր մասին</NavLink>
                            </HeaderNavListItem>
                            <HeaderNavListItem>
                                <NavLink to={"/events"} className={({ isActive }: any) => isActive && "active"}>Իրադարձություններ</NavLink>
                            </HeaderNavListItem>
                            <HeaderNavListItem>
                                <NavLink to={"/diploma"} className={({ isActive }: any) => isActive && "active"}>IB Դիպլոմա ծրագիր</NavLink>
                            </HeaderNavListItem>
                            <HeaderNavListItem>
                                <NavLink to={"/applicant"} className={({ isActive }: any) => isActive && "active"}>Դիմորդ</NavLink>
                            </HeaderNavListItem>
                            <HeaderNavListItem>
                                <a href="#footer" className="contact-link">Կապ</a>
                            </HeaderNavListItem>
                            {user?.firstName ? (
                                <Dropdown
                                    menu={{ items }}
                                    placement="bottomLeft"
                                >
                                    <HeaderProfile>
                                        <Avatar icon={<UserOutlined />} />
                                        <p>
                                            {user.firstName}
                                            {" "}
                                            {user.lastName}
                                        </p>
                                    </HeaderProfile>
                                </Dropdown>
                            ) : (
                                <HeaderNavListItem onClick={toggleModal}>
                                    <Button type="primary">Մուտք</Button>
                                </HeaderNavListItem>
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
