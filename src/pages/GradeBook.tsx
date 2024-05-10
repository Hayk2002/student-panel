import dayjs from "dayjs";
import { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {DatePicker, Select, Table, Form, Input, Radio, message, Button} from "antd";

import { dispatch } from "../store";
import {classRooms, UserType} from "../shared/utils/enums";
import { addStudentGrade, fetchAllUsers } from "../store/reducers/users";
import {FilterPanel, FilterPanelItem} from "../shared/components/styled";

const GradeBook = () => {
    const user = useSelector((state: any) => state.auth.user);
    const allUsers = useSelector((state: any) => state.users.allUsers);
    const isLoading = useSelector((state: any) => state.users.loading);

    const [dataSource, setDataSource] = useState<any>([]);
    const [selectedClassRoom, setSelectedClassRoom] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [studentGrade, setStudentGrade] = useState<any>(null);
    const [studentAbsence, setStudentAbsence] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        if (allUsers?.length) {
            const data = allUsers.filter((user: any) => (user.role === UserType.Student && user.class === selectedClassRoom));

            const tableList = data.map((student: any) => ({
                key: student.id,
                name: `${student.firstName} ${student.lastName}`,
                grade: studentGrade,
                absence: studentAbsence,
                studentData: student
            }));

            setDataSource(tableList);
        }
    }, [allUsers, selectedClassRoom, studentGrade, studentAbsence]);

    const handleUpdate = (record: any) => {
        const studentData = record.studentData;

        const newGrade = {
            subject: user?.subject,
            grade: studentGrade,
            absence: studentAbsence,
            date: selectedDate,
        };

        dispatch(addStudentGrade(studentData, newGrade, () => message.success('Մատյանը թարմացված է')));
    }

    const columns = [
        {
            title: 'Աշակերտ',
            dataIndex: 'name',
        },
        {
            title: 'Գնահատական',
            dataIndex: 'grade',
            width: '30%',
            render: () => (
                <Input style={{ width: "300px" }} onChange={(e) => setStudentGrade(e.target.value)} />
            )
        },
        {
            title: 'Ներկայություն',
            dataIndex: 'absence',
            render: () => (
                <Radio.Group onChange={(e) => setStudentAbsence(e.target.value)}>
                    <Radio value="yes">Ներկա</Radio>
                    <Radio value="no">Բացակա</Radio>
                </Radio.Group>
            )
        },
        {
            title: 'Հաստատնել փոփոխությունը',
            dataIndex: 'actions',
            render: (_: any, record: any) => (
                <Button type="primary" loading={isLoading} disabled={!record.grade && !record.absence} onClick={() => handleUpdate(record)}>Թարմացնել</Button>
            )
        },
    ];

    return (
        <>
            <FilterPanel>
                <FilterPanelItem>
                    <Select options={classRooms} placeholder="Դասարան"  onChange={(value: any) => setSelectedClassRoom(value)} style={{ width: 150 }} />
                </FilterPanelItem>
                <FilterPanelItem>
                    <DatePicker placeholder="Ամսաթիվ" format="DD-MM-YYYY" style={{ width: 150 }} onChange={(e: any) => setSelectedDate(dayjs(e).format("DD-MM-YYYY"))} />
                </FilterPanelItem>
            </FilterPanel>

            <Table
                columns={columns}
                dataSource={dataSource}
            />
        </>
    );
};

export default GradeBook;
