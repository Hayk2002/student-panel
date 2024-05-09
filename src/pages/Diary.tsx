import {FilterPanel, FilterPanelItem} from "../shared/components/styled";
import {DatePicker, Radio, Select, Table} from "antd";
import {classRooms, UserType} from "../shared/utils/enums";
import dayjs from "dayjs";
import React, {useEffect, useState} from "react";
import {dispatch} from "../store";
import {fetchAllUsers} from "../store/reducers/users";
import {useSelector} from "react-redux";

const Diary = () => {
    const user = useSelector((state: any) => state.auth.user);
    const allUsers = useSelector((state: any) => state.users.allUsers);

    const [dataSource, setDataSource] = useState<any>([]);
    const [gradesData, setGradesData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [parentStudents, setParentStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        if (allUsers?.length) {
            const data = allUsers.filter((user: any) => (user.role === UserType.Student));

            const studentsList = data.map((student: any) => ({ label: `${student.firstName} ${student.lastName}`, value: student.id }));
            setParentStudents(studentsList);
        }
    }, [allUsers]);

    useEffect(() => {
        if (allUsers?.length && selectedStudent) {
            const data = allUsers.filter((user: any) => (user.role === UserType.Student));

            const student = data?.find((student: any) => (student.id === selectedStudent));

            const tableList = student.grades.map((gradeData: any, index: number) => ({
                key: index,
                name: gradeData.subject,
                grade: gradeData.grade,
                absence: gradeData.absence
            }));

            setDataSource(tableList);
        }
    }, [allUsers, selectedStudent, selectedDate]);

    const columns = [
        {
            title: 'Աշակերտ',
            dataIndex: 'name',
        },
        {
            title: 'Գնահատական',
            dataIndex: 'grade',
            width: '30%',
        },
        {
            title: 'Ներկայություն',
            dataIndex: 'absence',
        },
    ];

    return (
        <>
            <FilterPanel>
                {user.role === UserType.Parent && (
                    <FilterPanelItem>
                        <Select options={parentStudents} placeholder="Իմ Երեխաները" style={{ width: 150 }} />
                    </FilterPanelItem>
                )}
                <FilterPanelItem>
                    <DatePicker placeholder="Ամսաթիվ" format="DD-MM-YYYY" style={{ width: 150 }} onChange={(e: any) => setSelectedDate(dayjs(e).format("DD-MM-YYYY"))} />
                </FilterPanelItem>
            </FilterPanel>

            <Table columns={columns} dataSource={dataSource} />
        </>
    );
};

export default Diary;
