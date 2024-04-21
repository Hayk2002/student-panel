import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import { Button, Layout, Menu } from 'antd';
import { dispatch } from "../../store";
import { authSignOut, setAuth} from "../../store/reducers/auth";
import { useNavigate } from "react-router-dom";
import {CustomSider, SiderLogoutButton} from "./styled";

const { Header, Sider, Content } = Layout;

const AuthUserLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleSignOut = async () => {
        dispatch(authSignOut(() => navigate('/')));
    };

    return (
        <Layout>
            <CustomSider trigger={null} collapsible collapsed={collapsed} style={{display: "flex", flexDirection: 'column'}}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
                <SiderLogoutButton type="primary" onClick={handleSignOut}>
                    Logout
                </SiderLogoutButton>
            </CustomSider>
            <Layout>
                <Header style={{ padding: 0, background: 'rgb(255, 255, 255)' }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
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
