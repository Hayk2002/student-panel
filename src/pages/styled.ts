import { styled } from 'styled-components';
import HeroBg from 'assets/bg.gif'

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