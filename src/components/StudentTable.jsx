import React from 'react';
import { Table, Form, Button, Badge } from 'react-bootstrap';

const StudentTable = ({
    students,
    selectedStudents,
    toggleSelect,
    deleteStudent,
    toggleActive
}) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Student Name</th>
                    <th>Student Code</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>
                            <Form.Check
                                type='checkbox'
                                checked={selectedStudents.includes(student.id)}
                                onChange={() => toggleSelect(student.id)}
                            />
                        </td>
                        <td>{student.name}</td>
                        <td>{student.code}</td>
                        <td>
                            <Badge
                                bg={student.active ? 'success' : 'danger'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => toggleActive(student.id)}
                            >
                                {student.active ? 'Active' : 'Inactive'}
                            </Badge>
                        </td>
                        <td>
                            <Button
                                variant='danger'
                                size='sm'
                                onClick={() => deleteStudent(student.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default StudentTable;
