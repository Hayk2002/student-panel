import {
    HeroSection,
    HeroSectionContent,
    HomePageWrapper,
    AlumniSection,
    SliderImage, HeroSectionTitle
} from "./styled";
import { Container } from "../shared/styled";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import StudentFront from 'assets/studentFront.webp';
import StudentAlumni from 'assets/studentAlumni.jpeg';
import MaleStudent from 'assets/maleStudent.jpg';
import StudentBack from "assets/studentBack.jpg";
import TwoStudents from "assets/twoStudents.jpg";
import StudentWithBackpack from "assets/studentWithBackpack.jpg";
import Campus from "assets/campus.jpg";
import Campus2 from "assets/campus2.jpg";

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};

const Home = () => {
    return (
        <HomePageWrapper>
            <HeroSection>
                <Container>
                    <HeroSectionContent>
                        <HeroSectionTitle>
                            Բարի գալուստ առցանց ուսանողական և
                            <br/>
                            ադմինիստրատիվ ղեկավարման հարթակ
                        </HeroSectionTitle>
                    </HeroSectionContent>
                </Container>
            </HeroSection>
            <AlumniSection>
                <Container>
                    <Slider {...sliderSettings}>
                        <SliderImage>
                            <img src={StudentFront} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <br/>
                            <img src={Campus} alt="image"/>
                            <br/>
                            <br/>
                            <img src={Campus2} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                        <img src={StudentAlumni} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={StudentBack} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={MaleStudent} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={TwoStudents} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={StudentWithBackpack} alt="image"/>
                        </SliderImage>
                    </Slider>
                </Container>
            </AlumniSection>
        </HomePageWrapper>
    );
}

export default Home;
