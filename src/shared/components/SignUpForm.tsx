import {Button, Form, Input, message, Select} from "antd";
import { authSignUp, authSignIn } from "../../store/reducers/auth";
import { dispatch } from "../../store";
import {useSelector} from "react-redux";

const SignUpForm = ({ closeModal }: { closeModal: () => void }) => {
    const isLoading = useSelector((state: any) => state.auth.loading);

    const handleSignUp = ({ firstName, lastName, email, role, password }: any) => {
        dispatch(authSignUp({ firstName, lastName, role, email, password }, (msg: string) => {
            dispatch(authSignIn({ email, password }, () => {}, (msg: string) => message.error(msg)));
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
                />
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
