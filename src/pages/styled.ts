import { styled } from 'styled-components';
import { Container } from "../shared/styled";
import HeroBg from 'assets/bg.gif';
import AboutUsBg from 'assets/aboutUs.jpg'
import ApplicantBg from 'assets/applicant.jpg';
import {Button} from "antd";

// HOME PAGE STYLES

export const HomePageWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

export const HeroSection = styled.section`
    position: relative;
    width: 100%;
    background-image: url(${HeroBg});
    background-repeat: no-repeat;
    background-size: cover;
    padding: 200px 0;

    &:after {
        z-index: 1;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgb(63 48 48 / 87%);
    }
`

export const HeroSectionContent = styled.div`
    height: 100%;
    position: relative;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HeroSectionTitle = styled.h1`
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
`;

export const AlumniSection = styled.section`
    background-color: cadetblue;
    padding: 50px;
`;

export const SliderImage = styled.div`
    max-height: 600px;
    border-radius: 12px;
    padding: 0 20px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 12px;
    }
`;

// ABOUT US PAGE

export const AboutUsWrapper = styled.div`
    position: relative;
    padding: 40px 0;
    height: 100%;
    background-image: url(${AboutUsBg});
    background-repeat: no-repeat;
    background-size: cover;
    
    &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #21212178;
    }
`;

export const AboutUsContainer = styled(Container)`
    position: relative;
    z-index: 1;
`;

export const AboutUsInfoBlock = styled.div`
    display: flex;
    align-items: center;
    background-color: #5f9ea0a8;
    padding: 20px;
    border-radius: 12px;
    margin: 40px 0;
`;


export const AboutUsTitle = styled.h3`
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    margin-bottom: 60px;
`;

export const AboutUsText = styled.p`
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    margin: 0;
`;

// APPLICANT US PAGE

export const ApplicantPageWrapper = styled.div`
    padding: 40px 0;
    height: 100%;
`;

export const ApplicantPageContainer = styled(Container)`
    display: flex;
    align-items: center;
    height: 100%;
`;

export const ApplicantPageContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 30px;
    height: 100%;
`;

export const ApplicantImage = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    height: 100%;
    background-image: url(${ApplicantBg});
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px;
    
    &:hover {
        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #21212178;
            border-radius: 20px;
        }
    }
`;

export const ApplicantContentInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: #21212117;
    border-radius: 20px;
    padding: 20px;
`;

export const ApplicantContentText = styled.p`
    z-index: 9;
    position: relative;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
    color: #212121;
    line-height: 32px;
    letter-spacing: 2px;
    margin-bottom: 0;
    
    a {
        color: #ffffff;
        
        &:hover {
            color: #04898a;
        }
    }
`;

export const ApplicantButton = styled(Button)`
    width: 40%;
    background-color: cadetblue;

    &:hover {
        background: #04898a !important;
    }
`;
