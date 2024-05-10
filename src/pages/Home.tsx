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

import img1 from "assets/main-img-1.png";
import img2 from "assets/main-img-2.png";
import img3 from "assets/main-img-3.png";
import img4 from "assets/main-img-4.png";
import img5 from "assets/main-img-5.png";
import img6 from "assets/main-img-6.png";
import img7 from "assets/main-img-7.png";
import img8 from "assets/main-img-8.png";
import img9 from "assets/main-img-9.png";
import img10 from "assets/main-img-10.png";
import img11 from "assets/main-img-11.png";

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
                            Բարի գալուստ Հայաստանի ազգային պոլիտեխնիկական համալսարանի
                            <br/>
                            Երևանի Ավագ դպրոցի առցանց հարթակ
                        </HeroSectionTitle>
                    </HeroSectionContent>
                </Container>
            </HeroSection>
            <AlumniSection>
                <Container>
                    <Slider {...sliderSettings} className="slider-wrapper">
                        <SliderImage>
                            <img src={img1} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img2} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img3} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img4} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img5} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img6} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img7} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img8} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img9} alt="image"/>
                        </SliderImage>
                        <SliderImage>
                            <img src={img11} alt="image"/>
                        </SliderImage>
                    </Slider>
                </Container>
            </AlumniSection>
        </HomePageWrapper>
    );
}

export default Home;
