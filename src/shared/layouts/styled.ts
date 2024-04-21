import styled from "styled-components";
import { Button, Layout, Menu } from 'antd';


export const CustomSider = styled(Layout.Sider)`
    
    .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
    }
`;

export const SiderLogoutButton = styled(Button)`
    margin: auto 16px 24px;
`;