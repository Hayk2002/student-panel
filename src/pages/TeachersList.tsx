import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {dispatch} from "../store";
import {fetchAllUsers} from "../store/reducers/users";
import {subjectsList, UserType} from "../shared/utils/enums";
import {
    CustomList,
    CustomListItem,
    CustomListMeta,
    FilterPanel,
    FilterPanelItem,
    ListWrapper
} from "../shared/components/styled";
import {Avatar, List, Select} from "antd";
import {UserOutlined} from "@ant-design/icons";

const TeachersList = () => {
    const allUsers = useSelector((state: any) => state.users.allUsers);
    const isLoading = useSelector((state: any) => state.auth.loading);

    const [teachers, setTeachers] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        if (allUsers?.length) {
            const data = allUsers.filter((user: any) => (user.role === UserType.Teacher));
            setTeachers(data);
        }
    }, [allUsers, selectedSubject]);

    useEffect(() => {
        if (allUsers?.length && selectedSubject) {
            const data = allUsers.filter((user: any) => (user.role === UserType.Teacher && user.subject === selectedSubject));
            setTeachers(data);
        }
    }, [allUsers, selectedSubject]);

    return (
        <ListWrapper>
            <FilterPanel>
                <FilterPanelItem>
                    <Select allowClear options={subjectsList} placeholder="Առարկա"  onChange={(value: any) => setSelectedSubject(value)} style={{ width: 150 }} />
                </FilterPanelItem>
            </FilterPanel>
            <CustomList
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={teachers}
                renderItem={(item: any) => (
                    <CustomListItem>
                        <CustomListMeta
                            avatar={<Avatar icon={<UserOutlined />} />}
                            title={`${item?.firstName} ${item?.lastName}`}
                            description={item?.email}
                        />
                    </CustomListItem>
                )}
            />
        </ListWrapper>
    );
};

export default TeachersList;
