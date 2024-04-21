import { Modal } from "antd";
import {ModalTitle} from "./styled";

interface CustomModalProps {
    title: string
    isVisible: boolean
    onCancel: () => void
    children?: React.ReactNode
}

const CustomModal = ({ title, isVisible, children, onCancel }: CustomModalProps) => {
    return (
        <Modal open={isVisible} onCancel={onCancel} footer={false}>
            <ModalTitle>
                {title}
            </ModalTitle>
            {children}
        </Modal>
    );
};

export default CustomModal;
