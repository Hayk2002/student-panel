import dayjs from "dayjs";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { DatePicker, Select, Table, Tag} from "antd";
import { UserType } from "../shared/utils/enums";
import { FilterPanel, FilterPanelItem } from "../shared/components/styled";

const GradeBullet = styled.div`
    width: 24px;
    height: 24px;
    color: #ffffff;
    font-weight: 600;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ $bg }: any) => $bg};
`;

const Diary = () => {
    const user = useSelector((state: any) => state.auth.user);

    const [dataSource, setDataSource] = useState<any>([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [parentChildren, setParentChildren] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        if (user?.role === UserType.Parent) {
            const children = user?.children;

            const childrenList = children?.map((child: any) => ({ label: `${child.firstName} ${child.lastName}`, value: child.id }));
            setParentChildren(childrenList);
        }
    }, [user]);

    useEffect(() => {
        if (user?.role === UserType.Parent && selectedStudent) {
            const children = user.children;
            const child = children.find((student: any) => (student.id === selectedStudent));

            // This line is for removing the first grade object which is initially empty
            const gradesList = child.grades.filter((gradeData: any) => gradeData.subject.length);

            console.log(gradesList);

            let tableList = [];

            if (selectedDate) {
                tableList = gradesList
                    .filter((gradeData: any) => gradeData.date === selectedDate)
                        .map((gradeData: any, index: number) => ({
                            key: index,
                            name: gradeData.subject,
                            grade: gradeData.grade,
                            absence: gradeData.absence,
                            date: gradeData.date
                        }));
            } else {
                tableList = gradesList.map((gradeData: any, index: number) => ({
                    key: index,
                    name: gradeData.subject,
                    grade: gradeData.grade,
                    absence: gradeData.absence,
                    date: gradeData.date
                }));
            }

            setDataSource(tableList);
        }
    }, [selectedStudent, selectedDate]);

    useEffect(() => {
        if (user?.role === UserType.Student) {
            // This line is for removing the first grade object which is initially empty
            const gradesList = user.grades.filter((gradeData: any) => gradeData.subject.length);

            let tableList = [];

            if (selectedDate) {
                tableList = gradesList
                    .filter((gradeData: any) => gradeData.date === selectedDate)
                    .map((gradeData: any, index: number) => ({
                        key: index,
                        name: gradeData.subject,
                        grade: gradeData.grade,
                        absence: gradeData.absence,
                        date: gradeData.date
                    }));
            } else {
                tableList = gradesList.map((gradeData: any, index: number) => ({
                    key: index,
                    name: gradeData.subject,
                    grade: gradeData.grade,
                    absence: gradeData.absence,
                    date: gradeData.date
                }));
            }

            setDataSource(tableList);
        }
    }, [selectedDate]);

    const handleDateChange = (e: any) => {
        if (e === null) {
            setSelectedDate("");
        } else {
            setSelectedDate(dayjs(e).format("DD-MM-YYYY"));
        }
    };

    const drawRecordGrade = (grade: string) => {
        if (+grade < 5) return "red";
        if (+grade >= 5 && +grade <= 7) return "orange";

        return "green";
    };

    const columns = [
        {
            title: 'Աշակերտ',
            dataIndex: 'name',
        },
        {
            title: 'Գնահատական',
            dataIndex: 'grade',
            // @ts-ignore
            render: (_: any, record: any) => record.grade ? <GradeBullet $bg={drawRecordGrade(record.grade)}>{record.grade}</GradeBullet> : null
        },
        {
            title: 'Ներկայություն',
            dataIndex: 'absence',
            render: (_: any, record: any) => record.absence === "yes" ? <Tag color="green">Ներկա</Tag> : <Tag color="red">Բացակա</Tag>
        },
        {
            title: 'Ամիս/Ամսաթիվ',
            dataIndex: 'date'
        },
    ];

    return (
        <>
            <FilterPanel>
                {user.role === UserType.Parent && (
                    <FilterPanelItem>
                        <Select options={parentChildren} placeholder="Իմ Երեխաները" style={{ width: 150 }} onChange={(value) => setSelectedStudent(value)} />
                    </FilterPanelItem>
                )}
                <FilterPanelItem>
                    <DatePicker placeholder="Ամսաթիվ" format="DD-MM-YYYY" style={{ width: 150 }} onChange={handleDateChange} />
                </FilterPanelItem>
            </FilterPanel>

            <Table columns={columns} dataSource={dataSource} />
        </>
    );
};

export default Diary;
