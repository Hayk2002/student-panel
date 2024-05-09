import {classRooms, UserType} from "../shared/utils/enums";
import {CustomListItem, CustomListMeta, FilterPanel, FilterPanelItem} from "../shared/components/styled";
import {Avatar, DatePicker, List, Select} from "antd";
import dayjs from "dayjs";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {UserOutlined} from "@ant-design/icons";
import {dispatch} from "../store";
import {fetchAllUsers} from "../store/reducers/users";

const StudentsList = () => {
    const allUsers = useSelector((state: any) => state.users.allUsers);
    const isLoading = useSelector((state: any) => state.auth.loading);

    const [students, setStudents] = useState([]);
    const [selectedClassRoom, setSelectedClassRoom] = useState(null);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        if (allUsers?.length) {
            const data = allUsers.filter((user: any) => (user.role === UserType.Student));
            setStudents(data);
        }
    }, [allUsers, selectedClassRoom]);

    useEffect(() => {
        if (allUsers?.length && selectedClassRoom) {
            const data = allUsers.filter((user: any) => (user.role === UserType.Student && user.class === selectedClassRoom));
            setStudents(data);
        }
    }, [allUsers, selectedClassRoom]);

    return (
        <>
            <FilterPanel>
                <FilterPanelItem>
                    <Select allowClear options={classRooms} placeholder="Դասարան"  onChange={(value: any) => setSelectedClassRoom(value)} style={{ width: 150 }} />
                </FilterPanelItem>
            </FilterPanel>
            <List
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={students}
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
        </>
    );
};

export default StudentsList;
