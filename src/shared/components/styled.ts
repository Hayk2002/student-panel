import styled from "styled-components";
import {Container} from "../styled";
import {Link} from "react-router-dom";
import {List} from "antd";

// PROFILE BLOCK STYLES

export const ProfileBlock = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 8px;

    p {
        margin: 0;
        padding: 0 10px;
    }
`;

// HEADER STYLES

export const HeaderWrapper = styled.header`
    padding: 20px 0;
    background-color: rgb(249, 247, 245);
`;

export const HeaderContainer = styled(Container)`
    display: flex;
    align-items: center;
`;

export const HeaderLogo = styled(Link)`
    max-width: 60px;
    
    img {
        width: 100%;
        height: 100%;
    }
`;

export const HeaderProfile = styled(ProfileBlock)`
    cursor: pointer;
    
    &:hover {
        border-radius: 8px;
        border: none;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        transition: 0.3s ease-in-out;
    }
`;

export const HeaderNav = styled.nav`
    margin-left: auto;
`;

export const HeaderNavList = styled.ul`
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style-type: none;
`;

export const HeaderNavListItem = styled.li`
    font-size: 18px;
    font-weight: 600;
    font-style: oblique;
    padding: 0 10px;
    color: #2557a7;
    cursor: pointer;

    &:first-child {
        border-right: 1px solid #878686;
    }

    &:hover {
        color: #07357a;
    }
`;

// FOOTER STYLES

export const FooterWrapper = styled.footer`
    background-color: rgb(36, 38, 48);
    padding: 20px 0;
`;

export const FooterList = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
`;

export const FooterListItem = styled.li`
    width: 100%;
    margin-bottom: 13px;

    a {
        font-size: 16px;
        color: rgba(232, 232, 232, 0.58);
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 500;

        &:hover {
            color: #ea482b;
        }
    }

    span {
        font-size: 16px;
        line-height: 24px;
        color: rgba(232, 232, 232, 0.58);
    }
`;

export const FooterListTitle = styled.h2`
    width: 100%;
    text-transform: uppercase;
    position: relative;
    padding: 18px 0;
    font-weight: 600;
    font-size: 22px;
    line-height: 32px;
    margin-bottom: 17px;
    color: #ffffff;

    &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1px;
        width: 55px;
        border-bottom: 4px solid #ff745b;
        border-radius: 6px 6px 0 0;
    }
`;

export const FooterBottomText = styled.p`
    width: 100%;
    color: rgba(232, 232, 232, 0.56);
    font-size: 14px;
    line-height: 26px;
    border-top: 1px solid rgb(255, 255, 255);
    padding: 12px 22px;
    margin: 0;
`;

export const FooterLink = styled.a`
    color: rgb(255, 255, 255);
`;

// CUSTOM MODAL STYLES

export const ModalTitle = styled.h5`
    font-size: 24px;
    text-align: center;
`;

// CUSTOM LIST STYLES

export const CustomListItem = styled(List.Item)`
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid #d3d3d3;
    border-block-end: 1px solid #d3d3d3 !important;
    transition: ease-in-out 0.2s;
    margin-bottom: 20px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
`

export const CustomListMeta = styled(List.Item.Meta)`
    padding-left: 8px;
    align-items: center !important;
`;

// FILTER PANEL STYLES

export const FilterPanel = styled.div`
    display: flex;
    margin-bottom: 40px;
    align-items: center;
    justify-content: center;
`;

export const FilterPanelItem = styled.div`
    margin: 0 10px;
`;
