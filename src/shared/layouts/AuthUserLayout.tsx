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
import { Link, useNavigate } from "react-router-dom";
import { CustomSider, SiderLogoutButton } from "./styled";
import { useSelector } from "react-redux";
import { UserType } from "../utils/enums";
import SpinLoader from "../components/SpinLoader";

const { Header, Content } = Layout;

const adminControlPanel = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <Link to="/profile">Անձնական էջ</Link>
        )
    },
    {
        key: '2',
        icon: <EyeOutlined />,
        label: (
            <Link to="/teachers">Ուսուցիչներ</Link>
        )
    },
    {
        key: '3',
        icon: <EyeOutlined />,
        label: (
            <Link to="/parents">Ծնողներ</Link>
        )
    },
    {
        key: '4',
        icon: <SmileOutlined />,
        label: (
            <Link to="/students">Աշակերտներ</Link>
        )
    },
    {
        key: '5',
        icon: <FileSearchOutlined />,
        label: (
            <Link to="/applicants">Դիմորդներ</Link>
        )
    },
];

const teacherControlPanel = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <Link to="/profile">Անձնական էջ</Link>
        )
    },
    {
        key: '3',
        icon: <FolderOpenOutlined />,
        label: (
            <Link to="/gradeBook">Մատյան</Link>
        )
    }
];

const studentControlPanel = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <Link to="/profile">Անձնական էջ</Link>
        )
    },
    {
        key: '2',
        icon: <FolderOpenOutlined />,
        label: (
            <Link to="/diary">Օրագիր</Link>
        )
    }
];

const parentControlPanel = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: (
            <Link to="/profile">Անձնական էջ</Link>
        )
    },
    {
        key: '2',
        icon: <FolderOpenOutlined />,
        label: (
            <Link to="/diary">Օրագիր</Link>
        )
    }
];

const getControlPanelByUserType = (userType: string) => {
    switch (userType) {
        case UserType.Admin:
            return adminControlPanel;
        case UserType.Teacher:
            return teacherControlPanel;
        case UserType.Student:
            return studentControlPanel;
        case UserType.Parent:
            return parentControlPanel;
        default:
            break
    }
};

const AuthUserLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.auth.user);

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [menuItems, setMenuItems] = useState<any>([]);

    const handleSignOut = async () => {
        dispatch(authSignOut(() => navigate('/')));
    };

    useEffect(() => {
        if (user) {
            setMenuItems(getControlPanelByUserType(user?.role));
        }
    }, [user]);

    return !user ? <SpinLoader /> : (
        <Layout>
            <CustomSider trigger={null} collapsible collapsed={collapsed} style={{ display: "flex", flexDirection: 'column' }}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
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
                        onClick={() => navigate('/')}
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
