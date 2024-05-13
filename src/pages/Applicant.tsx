import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Select, Upload } from "antd";

import {
    ApplicantButton, ApplicantContentInfo,
    ApplicantContentText, ApplicantFormGroup, ApplicantImage,
    ApplicantPageContainer,
    ApplicantPageContent,
    ApplicantPageWrapper
} from "./styled";
// @ts-ignore
import PDF from "../assets/dimum-hayt.pdf";
import { dispatch } from "../store";
import CustomModal from "../shared/components/CustomModal";
import {createApplicant, uploadApplicantAvatar} from "../store/reducers/applicants";

const ApplicantPage = () => {
    const isLoading = useSelector((state: any) => state.applicants.loading);
    const [form] = Form.useForm();

    const [isVisible, setIsVisible] = useState(false);
    const [avatarFileList, setAvatarFileList] = useState<any>([]);
    const [passportFileList, setPassportFileList] = useState<any>([]);

    const handleSubmit = (data: any) => {
        const applicant = {
            ...data,
            status: "pending",
            dob: dayjs(data.dob).format("YYYY-MM-DD")
        }

        dispatch(createApplicant(applicant, (userId: string) => {
            message.success("Ձեր դիմումն ընդունված է:");
            avatarFileList.length && dispatch(uploadApplicantAvatar(avatarFileList[0].originFileObj, userId));
            setIsVisible(false);
            form.resetFields();
        }));
    };

    const handleAvatarUpload = ({ fileList } : any) => {
        setAvatarFileList(fileList);
    };

    const handlePassportUpload = ({ fileList } : any) => {
        console.log(fileList);
        setPassportFileList(fileList);
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
                    form={form}
                    colon={false}
                    requiredMark={false}
                    labelCol={{span: 24}}
                    onFinish={handleSubmit}
                >
                    <ApplicantFormGroup>
                        <Form.Item
                            label="Լուսանկար"
                        >
                            <Upload
                                maxCount={1}
                                listType="picture-circle"
                                    onChange={handleAvatarUpload}
                            >
                                {avatarFileList.length ? <EditOutlined/> : <PlusOutlined />}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Անձնագրի լուսանկար"
                            rules={[
                                {
                                    required: true,
                                    message: "Կցեք ձեր աննձնագիրը"
                                }
                            ]}
                        >
                            <Upload
                                maxCount={1}
                                listType="picture-card"
                                onChange={handlePassportUpload}
                            >
                                {passportFileList.length ? <EditOutlined/> : <PlusOutlined />}
                            </Upload>
                        </Form.Item>
                    </ApplicantFormGroup>
                    <ApplicantFormGroup>
                        <Form.Item
                            label="Անուն"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Գրեք ձեր անունը"
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Ազգանուն"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Գրեք ձեր ազգանունը"
                                }
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </ApplicantFormGroup>

                    <ApplicantFormGroup>
                        <Form.Item
                            label="Հայրանուն"
                            name="parentName"
                            rules={[
                                {
                                    required: true,
                                    message: "Գրեք ձեր հայրանունը"
                                }
                            ]}
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
                    </ApplicantFormGroup>

                    <ApplicantFormGroup>
                        <Form.Item
                            label="Ծննդյան տարեթիվ"
                            name="dob"
                            rules={[
                                {
                                    required: true,
                                    message: "Նշեք ձեր ծննդյան ամսաթիվը"
                                }
                            ]}
                        >
                            <DatePicker style={{ width: "100%" }}/>
                        </Form.Item>
                        <Form.Item
                            label="Սեռ"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Նշեք ձեր սեռը"
                                }
                            ]}
                        >
                            <Select options={[{ label: "Արական", value: "male" }, { label: "Իգական", value: "female" }]}/>
                        </Form.Item>
                    </ApplicantFormGroup>

                    <ApplicantFormGroup>
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
                    </ApplicantFormGroup>

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
