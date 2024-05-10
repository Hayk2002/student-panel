import { Link } from 'react-router-dom';
import {Button, Form, Input, message} from "antd";

import { Container } from "../styled";
import { dispatch } from "../../store";
import {
    FooterLink,
    FooterBottomText,
    FooterWrapper,
    FooterListTitle,
    FooterList,
    FooterListItem,
    FooterContent, FooterFormItem
} from "./styled";
import { contactWithSupport } from "../../store/reducers/applicants";
import {useSelector} from "react-redux";

const Footer = () => {
    const isLoading = useSelector((state: any) => state.applicants.loading);

    const [form] = Form.useForm();

    const handleContactSubmit = (values: any) => {
        dispatch(contactWithSupport(values, () => {
            form.resetFields();
            message.success("Շնորհակալություն մեզ հետ կապնվելու համար");
        }));
    };

    return (
        <FooterWrapper id='footer'>
            <Container>
                <FooterContent>
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
                    <FooterList>
                        <FooterListTitle>կապ մեզ հետ</FooterListTitle>
                        <Form
                            form={form}
                            colon={false}
                            requiredMark={false}
                            labelCol={{span: 24}}
                            onFinish={handleContactSubmit}
                        >
                            <FooterFormItem
                                name="email"
                                label="Էլ․ հասցե"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Մուտքագրված հասցեն սխալ է'
                                    },
                                    {
                                        required: true,
                                        message: "Մուտքագրեք Էլ․ հասցեն"
                                    }
                                ]}
                            >
                                <Input/>
                            </FooterFormItem>
                            <FooterFormItem
                                name="phone"
                                label="Հեռախոս"
                            >
                                <Input/>
                            </FooterFormItem>
                            <FooterFormItem
                                name="questions"
                                label="Ձեր հարցերը"
                                rules={[
                                    {
                                        required: true,
                                        message: "Մուտքագրեք ձեր հարցերը"
                                    }
                                ]}
                            >
                                <Input.TextArea/>
                            </FooterFormItem>
                            <FooterFormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isLoading}
                                    style={{ display: "block", marginLeft: "auto" }}
                                >
                                    Կապնվել
                                </Button>
                            </FooterFormItem>
                        </Form>
                    </FooterList>
                </FooterContent>
                <FooterBottomText>Copyright © 2024 Student Panel | Բոլոր իրավունքները պաշտպանված են: <FooterLink href='#'>Օգտագործման պայմաններ</FooterLink></FooterBottomText>
            </Container>
        </FooterWrapper>
    );
};

export default Footer;
