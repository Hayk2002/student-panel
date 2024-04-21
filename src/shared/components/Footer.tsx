import { Link } from 'react-router-dom';
import { FooterLink, FooterBottomText, FooterWrapper, FooterListTitle, FooterList, FooterListItem } from "./styled";
import { Container } from "../styled";

const Footer = () => {

    return (
        <FooterWrapper>
            <Container>
                <FooterList>
                    <FooterListTitle>Քարտեզ</FooterListTitle>
                    <FooterListItem>
                        <Link to={"/about-us"}>մեր մասին</Link>
                    </FooterListItem>
                    <FooterListItem>
                        <Link to={"/events"}>իրադարձություններ</Link>
                    </FooterListItem>
                    <FooterListItem>
                        <Link to={"/diploma"}>IB Դիպլոմա ծրագիր</Link>
                    </FooterListItem>
                    <FooterListItem>
                        <Link to={"/applicant"}>դիմորդ</Link>
                    </FooterListItem>
                </FooterList>
                <FooterBottomText>Copyright © 2024 Student Panel | Բոլոր իրավունքները պաշտպանված են: <FooterLink href='#'>Օգտագործման պայմաններ</FooterLink></FooterBottomText>
            </Container>
        </FooterWrapper>
    );
};

export default Footer;
