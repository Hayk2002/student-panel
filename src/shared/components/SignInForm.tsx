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
                label="Էլ․ հասցե"
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'Մուտքագրված հասցեն սխալ է'
                    },
                    {
                        required: true,
                        message: 'Մուտքագրեք Էլ․ հասցեն'
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

export default SignInForm;
