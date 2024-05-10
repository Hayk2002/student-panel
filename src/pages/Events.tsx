import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Container } from "../shared/styled";

import src1 from "../assets/instImg1.jpg";
import src2 from "../assets/instImg2.jpg";
import src3 from "../assets/instImg3.jpg";
import src4 from "../assets/instImg4.jpg";

const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const EventCardWrapper = styled.div`
    cursor: pointer;
    border-radius: 12px;
    
    img {
        object-fit: cover;
        border-radius: 12px;
        width: 100%;
        height: 500px;
    }
`;

const EventCardLink = styled.a`
    padding: 0 10px;
    width: 300px;
    height: 500px;
`;

const EventPageWrapper = styled.div`
    background-color: cadetblue;
    padding: 50px;
`;

const EventPageContainer = styled(Container)`
    margin: 30px auto;
    
    .slick-dots {
        bottom: -45px;
    }
`;

const Events = () => {
    return (
        <EventPageWrapper>
            <EventPageContainer>
                <Slider {...sliderSettings}>
                    <EventCardLink href="https://www.instagram.com/p/C3k9ozQtRJW/?igsh=MW9udWVvYXpocmNmNA%3D%3D" target="_blank">
                        <EventCardWrapper>
                            <img crossOrigin="anonymous" src={src1} alt="image"/>
                        </EventCardWrapper>
                    </EventCardLink>
                    <EventCardLink href="https://www.instagram.com/p/CxN116nIfmR/?igsh=c3dsZmRjZGViYXdk" target="_blank">
                        <EventCardWrapper>
                            <img src={src2} alt="image"/>
                        </EventCardWrapper>
                    </EventCardLink>
                    <EventCardLink href="https://www.instagram.com/p/C5NOrW7oM1C/?igsh=MXVnbG5hYWNzb2k2eQ%3D%3D" target="_blank">
                        <EventCardWrapper>
                            <img src={src3} alt="image"/>
                        </EventCardWrapper>
                    </EventCardLink>
                    <EventCardLink href="https://www.instagram.com/p/Cu3iBBzItVh/?igsh=MXJ1bnRvZXdtaGN2dw%3D%3D" target="_blank">
                        <EventCardWrapper>
                            <img src={src4} alt="image"/>
                        </EventCardWrapper>
                    </EventCardLink>
                </Slider>
            </EventPageContainer>
        </EventPageWrapper>
    );
};

export default Events;
