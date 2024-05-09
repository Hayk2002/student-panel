import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Input, message, Select } from "antd";

import { dispatch } from "../../store";
import { authSignUp } from "../../store/reducers/auth";
import { classRooms, subjectsList, UserType } from "../utils/enums";

const SignUpForm = ({ closeModal }: { closeModal: () => void }) => {
    const isLoading = useSelector((state: any) => state.auth.loading);

    const [selectedRole, setSelectedRole] = useState(null);

    const handleSignUp = ({ email, password, ...rest }: any) => {
        dispatch(authSignUp({ email, password, ...rest }, (msg: string) => {
            message.success(msg);
            closeModal();
        }, (msg: string) => {
            message.error(msg);
        } ));
    }

    return (
        <Form
            colon={false}
            requiredMark={false}
            labelCol={{ span: 24 }}
            onFinish={handleSignUp}
        >
            <Form.Item
                label="Անուն"
                name="firstName"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Ազգանուն"
                name="lastName"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Դերը"
                name="role"
            >
                <Select
                    options={[
                        { label: "Ադմինիստրատոր", value: "admin" },
                        { label: "Ուսուցիչ", value: "teacher" },
                        { label: "Աշակերտ", value: "student" },
                        { label: "Ծնող", value: "parent" },
                    ]}
                    onChange={(value) => setSelectedRole(value)}
                />
            </Form.Item>

            {selectedRole === UserType.Student && (
                <Form.Item
                    label="Դասարան"
                    name="class"
                >
                    <Select
                        options={classRooms}
                    />
                </Form.Item>
            )}

            {selectedRole === UserType.Teacher && (
                <Form.Item
                    label="Առարկա"
                    name="subject"
                >
                    <Select
                        options={subjectsList}
                    />
                </Form.Item>
            )}

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
                <Input />
            </Form.Item>

            <Form.Item
                label="Գաղտնաբառ"
                name="password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} style={{ display: "flex", margin: "10px auto 0" }}>
                    Հաստատել
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignUpForm;
