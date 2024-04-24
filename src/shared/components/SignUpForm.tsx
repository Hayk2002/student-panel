import {Button, Form, Input, message} from "antd";
import { authSignUp, authSignIn } from "../../store/reducers/auth";
import { dispatch } from "../../store";
import {useSelector} from "react-redux";

const SignUpForm = ({ closeModal }: { closeModal: () => void }) => {
    const isLoading = useSelector((state: any) => state.auth.loading);

    const handleSignUp = ({ firstName, lastName, email, password }: any) => {
        dispatch(authSignUp({firstName, lastName, email, password}, (msg: string) => {
            dispatch(authSignIn({firstName, lastName, email, password}, () => {}, (msg: string) => message.error(msg)));
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
                label="Էլ․ հասցե"
                name="email"
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
