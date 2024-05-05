import {
    ApplicantButton, ApplicantContentInfo,
    ApplicantContentText, ApplicantImage,
    ApplicantPageContainer,
    ApplicantPageContent,
    ApplicantPageWrapper
} from "./styled";

// @ts-ignore
import PDF from "../assets/dimum-hayt.pdf";
import CustomModal from "../shared/components/CustomModal";
import {useState} from "react";
import {Button, DatePicker, Form, Input, message, Select} from "antd";
import {dispatch} from "../store";
import {createApplicant} from "../store/reducers/applicants";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

const ApplicantPage = () => {
    const isLoading = useSelector((state: any) => state.applicants.loading);
    const [isVisible, setIsVisible] = useState(false);

    const handleSubmit = (data: any) => {
        const applicant = {
            ...data,
            dob: dayjs(data.dob).format("YYYY-MM-DD"),
            status: "pending"
        }
        console.log(applicant);
        dispatch(createApplicant(applicant, () => message.success("Ձեր դիմումն ընդւնված է!")));
    };

    return (
        <>
            <ApplicantPageWrapper>
                <ApplicantPageContainer>
                    <ApplicantPageContent>
                        <ApplicantContentInfo>
                            <ApplicantContentText>
                                Պոլիտեխնիկի ավագ դպրոցի 2023-2024 ուսումնական տարվա 10-րդ դասարանում սովորել ցանկացող
                                աշակերտների դիմում-հայտերի ընդունելությունը իրականացվելու է հուլիսի 3-ից 15-ը
                            </ApplicantContentText>
                            <ApplicantButton type="primary" onClick={() => setIsVisible(true)}>Դիմել</ApplicantButton>
                        </ApplicantContentInfo>
                        <ApplicantImage>
                            <ApplicantContentText>
                                <a href={PDF} target="_blank" rel='noopener noreferrer'>Ծանոթանալ դիմում հայտի հետ</a>
                            </ApplicantContentText>
                        </ApplicantImage>
                    </ApplicantPageContent>
                </ApplicantPageContainer>
            </ApplicantPageWrapper>
            <CustomModal title="Դիմում հայտ" isVisible={isVisible} onCancel={() => setIsVisible(false)}>
                <Form
                    colon={false}
                    requiredMark={false}
                    labelCol={{span: 24}}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Անուն"
                        name="firstName"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Ազգանուն"
                        name="lastName"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Հայրանուն"
                        name="parentName"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Էլ․ հասցե"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: 'Մուտքագրված հասցեն սխալ է'
                            },
                            {
                                required: true,
                                message: 'Էլ․ հասցեն պարտադիր է'
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Անձը հաստատող փաստաթղթի տվյալներ"
                        name="social_id"
                    >
                        <Input/>
                    </Form.Item>

                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "20px"}}>
                        <Form.Item
                            label="Ծննդյան տարեթիվ"
                            name="dob"
                        >
                            <DatePicker style={{ width: "100%" }}/>
                        </Form.Item>
                        <Form.Item
                            label="Սեռ"
                            name="gender"
                        >
                            <Select options={[{label: "Արական", value: "male"}, {label: "Իգական", value: "female"}]}/>
                        </Form.Item>
                    </div>

                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "20px"}}>
                        <Form.Item
                            label="Հեռ. 1"
                            name="phone1"
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Հեռ. 2"
                            name="phone2"
                        >
                            <Input/>
                        </Form.Item>
                    </div>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading} style={{ display: "flex", margin: "10px auto 0" }}>
                            Հաստատել
                        </Button>
                    </Form.Item>
                </Form>
            </CustomModal>
        </>
    );
};

export default ApplicantPage;
