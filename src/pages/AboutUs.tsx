import {
    AboutUsContainer,
    AboutUsGallery,
    AboutUsGalleryImage,
    AboutUsInfoBlock,
    AboutUsText,
    AboutUsTitle,
    AboutUsWrapper
} from "./styled";

import src1 from "assets/about-img-1.png";
import src2 from "assets/about-img-2.png";
import src3 from "assets/about-img-3.png";
import src4 from "assets/about-img-4.png";

const AboutUsPage = () => {

    return (
        <AboutUsWrapper>
            <AboutUsContainer>
                <AboutUsTitle>Ընդհանուր տեղեկություն</AboutUsTitle>

                <AboutUsGallery>
                    <AboutUsGalleryImage>
                        <img src={src1} alt="image"/>
                    </AboutUsGalleryImage>
                    <AboutUsGalleryImage>
                        <img src={src2} alt="image"/>
                    </AboutUsGalleryImage>
                    <AboutUsGalleryImage>
                        <img src={src3} alt="image"/>
                    </AboutUsGalleryImage>
                    <AboutUsGalleryImage>
                        <img src={src4} alt="image"/>
                    </AboutUsGalleryImage>
                </AboutUsGallery>

                <AboutUsInfoBlock>
                    <AboutUsText>
                        Հայաստանի ազգային պոլիտեխնիկական համալսարանի Երևանի ավագ դպրոցը իրականացնում է միջնակարգ կրթության երրորդ աստիճանի
                        հանրակրթական ծրագրեր և ապահովում է սովորողների ուսուցումն ու դաստիարակությունը այդ ծրագրերի պահանջներին համապատասխան:
                        Դպրոցի գործունեության առարկան հանրակրթական հիմնական և լրացուցիչ ծրագրերի իրականացումն է: Ծրագրերը ներառում են հոսքային և առանձին առարկաների խորացված ուսուցում:
                    </AboutUsText>
                </AboutUsInfoBlock>
                <AboutUsInfoBlock>
                    <AboutUsText>
                        Դպրոցում իրականացվում է բնագիտամաթեմատիկական և տեխնիկական ուղղություններով խորացված հոսքային ուսուցում: Մասնավորապես,
                        դպրոցում գործում են հետևյալ ենթահոսքերը՝ ֆիզիկամաթեմատիկական, ինժեներական, տնտեսագիտական և դիզայն:
                    </AboutUsText>
                </AboutUsInfoBlock>
            </AboutUsContainer>
        </AboutUsWrapper>
    );
};

export default AboutUsPage;
