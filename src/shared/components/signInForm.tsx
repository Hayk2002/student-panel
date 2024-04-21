import {Button, Form, Input, message} from "antd";
import { authSignIn } from "../../store/reducers/auth";
import { dispatch } from "../../store";
import { useSelector } from "react-redux";

const SignInForm = ({ closeModal }: { closeModal: () => void }) => {
    const isLoading = useSelector((state: any) => state.auth.loading);

    const handleSignIn = ({email, password}: any) => {
        dispatch(authSignIn({ email, password }, () => {
            closeModal();
        }, (msg: string) => message.error(msg)));
    };

    return (
        <Form
            colon={false}
            requiredMark={false}
            labelCol={{ span: 24 }}
            onFinish={handleSignIn}
        >
            <Form.Item
                label="Email"
                name="email"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
}

export default SignInForm;
