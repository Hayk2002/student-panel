import styled from "styled-components";

import { Container } from "../shared/styled";

import HeroBg from 'assets/aboutUs.jpg';

const HeroSection = styled.section`
    height: 100%;
    padding: 150px 0;
    position: relative;
    background-image: url(${HeroBg});
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

const HeroSectionContainer = styled(Container)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const HeroTitle = styled.h2`
    color: #ffffff;
    font-size: 36px;
    line-height: 52px;
    font-weight: 600;
    position: relative;
    text-align: center;
    z-index: 9;
`;

const InfoSection = styled.section`
    height: 100%;
    padding: 150px 0;
`;

const InfoText = styled.p`
    font-size: 18px;
    color: cadetblue;
    font-weight: 600;
    line-height: 32px;
`;

const Diploma = () => {

    return (
        <div>
            <HeroSection>
                <HeroSectionContainer>
                    <HeroTitle>
                        ՀԱՊՀ Երևանի ավագ դպրոցը ՄիջազգայինԲակալավրիատի
                        <br/>
                        (IB) \ Դիպլոմային ծրագրի (DP) թեկնածու դպրոց է
                        <br/>
                        և հետամուտ է դառնալհամաշխարհային ՄԲ դպրոց:
                    </HeroTitle>
                </HeroSectionContainer>
            </HeroSection>
            <InfoSection>
                <Container>
                    <InfoText>
                        1,950,000 students- 1,950,000 ուսանողներ
                        <br/>
                        5700 – IB schools – 5700 ՄԲ դպրոցներ
                        <br/>
                        160 countries – 160 երկրներ
                    </InfoText>
                    <InfoText>
                        ՄԲԴԾ-ի (IB DP) և նրա ծրագրերի մասին լրացուցիչտեղեկությունների համար այցելեք
                        <a href="http://www.ibo.org" target="_blank" style={{ marginLeft: 10 }}>www.ibo.org</a>
                    </InfoText>
                </Container>
            </InfoSection>
        </div>
    );
};

export default Diploma;
