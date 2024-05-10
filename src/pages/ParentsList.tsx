import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {dispatch} from "../store";
import {addParentChildren, fetchAllUsers} from "../store/reducers/users";
import {subjectsList, UserType} from "../shared/utils/enums";
import {CustomList, CustomListItem, CustomListMeta, FilterPanel, FilterPanelItem} from "../shared/components/styled";
import {Avatar, Button, Divider, Form, List, message, Modal, Select} from "antd";
import {UserOutlined} from "@ant-design/icons";

const ParentsList = () => {
    const allUsers = useSelector((state: any) => state.users.allUsers);
    const isLoading = useSelector((state: any) => state.users.loading);

    const [parents, setParents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState<any>([]);
    const [selectedParent, setSelectedParent] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        if (allUsers?.length) {
            const parents = allUsers.filter((user: any) => (user.role === UserType.Parent));
            const students = allUsers.filter((user: any) => (user.role === UserType.Student));

            const studentsList = students.map((student: any) => ({ label: `${student.firstName} ${student.lastName}`, value: JSON.stringify(student) }));

            setParents(parents);
            setStudents(studentsList);
        }
    }, [allUsers]);

    const handleStudentSelect = (value: any) => {
        const data = value.map((item: any) => JSON.parse(item));
        setSelectedStudents(data);
    };

    const handleSubmit = () => {
        dispatch(addParentChildren(selectedParent, selectedStudents, () => {
            message.success("Երեխաների կցումը հաստատված է");
            setIsModalOpen(false);
        }))
    };

    return (
        <>
            <CustomList
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={parents}
                renderItem={(item: any) => (
                    <CustomListItem
                        actions={[
                            <Button
                                type="primary"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setSelectedParent(item);
                                }}
                            >
                                Կցել Երեխաների
                            </Button>
                        ]}
                    >
                        <CustomListMeta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={`${item?.firstName} ${item?.lastName}`}
                            description={item?.email}
                        />
                    </CustomListItem>
                )}
            />
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={<Button loading={isLoading} onClick={handleSubmit} type="primary" htmlType="submit">Հաստատել</Button>}
            >
                <Form
                    colon={false}
                    requiredMark={false}
                    labelCol={{ span: 24 }}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="children"
                        label="Ընտրեք երեխաներին"
                    >
                        <Select allowClear mode="multiple" options={students} onChange={(value: any) => handleStudentSelect(value)} />
                    </Form.Item>
                    {selectedParent && (
                        <ul>
                            {selectedParent?.children?.map((item: any) => (
                                <li key={item.id}>{item?.firstName}{" "}{item?.lastName}</li>
                            ))}
                        </ul>
                    )}
                </Form>
            </Modal>
        </>
    );
};

export default ParentsList;
