import React, {useEffect, useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SmileOutlined,
    UserOutlined,
    EyeOutlined,
    FileSearchOutlined,
    FolderOpenOutlined,
    HomeOutlined
} from '@ant-design/icons';

import { Button, Layout, Menu } from 'antd';
import { dispatch } from "../../store";
import { authSignOut } from "../../store/reducers/auth";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import { CustomSider, SiderLogoutButton } from "./styled";
import { useSelector } from "react-redux";
import { UserType } from "../utils/enums";
import SpinLoader from "../components/SpinLoader";

const { Header, Content } = Layout;

const SidebarLink = ({ route, text, handleClick }: any) => (
    <NavLink to={route} onClick={handleClick}>{text}</NavLink>
);

const adminControlPanel = (handleClick: any) => ([
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <SidebarLink
                route="/profile"
                text="Անձնական էջ"
                handleClick={() => handleClick("1")}
            />
        )
    },
    {
        key: '2',
        icon: <EyeOutlined />,
        label: (
            <SidebarLink
                route="/teachers"
                text="Ուսուցիչներ"
                handleClick={() => handleClick("2")}
            />
        )
    },
    {
        key: '3',
        icon: <EyeOutlined />,
        label: (
            <SidebarLink
                route="/parents"
                text="Ծնողներ"
                handleClick={() => handleClick("3")}
            />
        )
    },
    {
        key: '4',
        icon: <SmileOutlined />,
        label: (
            <SidebarLink
                route="/students"
                text="Աշակերտներ"
                handleClick={() => handleClick("4")}
            />
        )
    },
    {
        key: '5',
        icon: <FileSearchOutlined />,
        label: (
            <SidebarLink
                route="/applicants"
                text="Դիմորդներ"
                handleClick={() => handleClick("5")}
            />
        )
    },
]);

const teacherControlPanel= (handleClick: any) => ([
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <SidebarLink
                route="/profile"
                text="Անձնական էջ"
                handleClick={() => handleClick("1")}
            />
        )
    },
    {
        key: '2',
        icon: <FolderOpenOutlined />,
        label: (
            <SidebarLink
                route="/gradeBook"
                text="Մատյան"
                handleClick={() => handleClick("2")}
            />
        )
    }
]);

const studentControlPanel = (handleClick: any) => ([
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <SidebarLink
                route="/profile"
                text="Անձնական էջ"
                handleClick={() => handleClick("1")}
            />
        )
    },
    {
        key: '2',
        icon: <FolderOpenOutlined />,
        label: (
            <SidebarLink
                route="/diary"
                text="Օրագիր"
                handleClick={() => handleClick("2")}
            />
        )
    }
]);

const parentControlPanel = (handleClick: any) => ([
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <SidebarLink
                route="/profile"
                text="Անձնական էջ"
                onClick={() => handleClick("1")}
            />
        )
    },
    {
        key: '2',
        icon: <FolderOpenOutlined />,
        label: (
            <SidebarLink
                route="/diary"
                text="Օրագիր"
                onClick={() => handleClick("2")}
            />
        )
    }
]);

const getControlPanelByUserType = (userType: string, handleClick: any) => {
    switch (userType) {
        case UserType.Admin:
            return adminControlPanel(handleClick);
        case UserType.Teacher:
            return teacherControlPanel(handleClick);
        case UserType.Student:
            return studentControlPanel(handleClick);
        case UserType.Parent:
            return parentControlPanel(handleClick);
        default:
            break
    }
};

const AuthUserLayout = ({ children }: { children: React.ReactNode }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state: any) => state.auth.user);

    const [menuItems, setMenuItems] = useState<any>([]);
    const [selectedKeys, setSelectedKeys] = useState(["1"]);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const handleSignOut = async () => {
        dispatch(authSignOut(() => navigate('/')));
    };

    useEffect(() => {
        if (pathname === "/profile") {
            setSelectedKeys(["1"]);
        } else if (pathname === "/teachers" || pathname === "/gradeBook" || pathname === "/diary") {
            setSelectedKeys(["2"]);
        } else if (pathname === "/parents") {
            setSelectedKeys(["3"]);
        } else if (pathname === "/students") {
            setSelectedKeys(["4"]);
        } else if (pathname === "/applicants") {
            setSelectedKeys(["5"]);
        }
    }, [pathname]);

    useEffect(() => {
        if (user) {
            setMenuItems(getControlPanelByUserType(user?.role, (key: string) => setSelectedKeys([key])));
        }
    }, [user]);

    return !user ? <SpinLoader /> : (
        <Layout>
            <CustomSider trigger={null} collapsible collapsed={collapsed} style={{ display: "flex", flexDirection: 'column' }}>
                <Menu
                    theme="dark"
                    mode="inline"
                    items={menuItems}
                    selectedKeys={selectedKeys}
                    activeKey={pathname}
                />
                <SiderLogoutButton type="primary" onClick={handleSignOut}>
                    Դուրս գալ
                </SiderLogoutButton>
            </CustomSider>
            <Layout style={{ backgroundColor: "#d7d7d7" }}>
                <Header style={{ padding: 0, background: 'rgb(255, 255, 255)' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ margin: "0 8px" }}
                    />
                    <Button
                        type="text"
                        icon={<HomeOutlined />}
                        onClick={handleSignOut}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: 'rgb(255, 255, 255)',
                        borderRadius: 8,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AuthUserLayout;
