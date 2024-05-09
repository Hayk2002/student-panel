import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import {dispatch} from "../store";
import {addStudentGrades, fetchAllUsers} from "../store/reducers/users";
import {useSelector} from "react-redux";
import {classRooms, UserType} from "../shared/utils/enums";
import {DatePicker, Select, Table, Form, Input, Radio, message} from "antd";
import dayjs from "dayjs";
import {FilterPanel, FilterPanelItem} from "../shared/components/styled";

const EditableContext = createContext<any | null>(null);

interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
    firstName: string;
    lastName: string;
    role: string;
    grades: any;
    id: string;
    absence: number;
}

interface EditableRowProps {
    index: number;
}

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableRow = ({ index, ...props }: EditableRowProps) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps}: EditableCellProps) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<any>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            // const studentData = {
            //     firstName: record.firstName,
            //     lastName: record.lastName,
            //     id: record.id,
            //     role: record.role,
            //     grades: []
            // }
            //
            // const newGrades = [ { subject: "", grade: values.grade, absence: record.absence }];
            //
            // dispatch(addStudentGrades(studentData, newGrades, () => message.success("Մատյանը փոփոխված է")));

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} style={{ width: "300px" }} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24, width: 300 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const components = {
    body: {
        row: EditableRow,
        cell: EditableCell,
    },
};

const GradeBook = () => {
    const allUsers = useSelector((state: any) => state.users.allUsers);

    const [dataSource, setDataSource] = useState<any>([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedClassRoom, setSelectedClassRoom] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    useEffect(() => {
        if (allUsers?.length) {
            const data = allUsers.filter((user: any) => (user.role === UserType.Student && user.class === selectedClassRoom));

            const tableList = data.map((student: any, index: number) => ({
                id: student.id,
                key: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                name: `${student.firstName} ${student.lastName}`,
                grade: student.grade,
                absence: student.absence
            }));

            setDataSource(tableList);
        }
    }, [allUsers, selectedClassRoom]);

    const onAbsenceChange = (e: any) => {
        // const requestData = {
        //     ...selectedRecord,
        //     absence: e.target.value,
        // };
        //
        // const newGrades = [ { subject: "", grade: values.grade, absence: record.absence }];
        //
        // dispatch(addStudentGrades(requestData, newGrades, () => message.success("Մատյանը փոփոխված է")));

    };

    const handleSave = (row: any) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const defaultColumns = [
        {
            title: 'Աշակերտ',
            dataIndex: 'name',
        },
        {
            title: 'Գնահատական',
            dataIndex: 'grade',
            editable: true,
            width: '30%',
        },
        {
            title: 'Ներկայություն',
            dataIndex: 'absence',
            render: () => (
                <Radio.Group onChange={onAbsenceChange}>
                    <Radio value={1}>Ներկա</Radio>
                    <Radio value={0}>Բացակա</Radio>
                </Radio.Group>
            )
        },
    ];

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: any) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

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
                bordered
                columns={columns}
                components={components}
                dataSource={dataSource}
                rowClassName={() => 'editable-row'}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => setSelectedRecord(record), // click row
                    };
                }}
            />
        </>
    );
};

export default GradeBook;
