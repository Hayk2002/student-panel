import { AboutUsContainer, AboutUsInfoBlock, AboutUsText, AboutUsTitle, AboutUsWrapper } from "./styled";

const AboutUsPage = () => {

    return (
        <AboutUsWrapper>
            <AboutUsContainer>
                <AboutUsTitle>Ընդհանուր տեղեկություն</AboutUsTitle>
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
