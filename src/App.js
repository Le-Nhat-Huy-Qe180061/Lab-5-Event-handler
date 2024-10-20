import React, { useReducer, useState, useEffect } from 'react';
import { Table, Form, Button, Badge, Alert } from 'react-bootstrap';

import './App.css';

// Action types
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const TOGGLE_SELECT = 'TOGGLE_SELECT';
const CLEAR_ALL = 'CLEAR_ALL';
const SET_ALERT = 'SET_ALERT';
const CLEAR_ALERT = 'CLEAR_ALERT';

// Reducer function
const studentReducer = (state, action) => {
    switch (action.type) {
        case ADD_STUDENT:
            return {
                ...state,
                students: [
                    { id: Date.now(), ...action.payload },
                    ...state.students
                ]
            };
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(
                    (student) => student.id !== action.payload
                ),
                selectedStudents: state.selectedStudents.filter(
                    (id) => id !== action.payload
                )
            };
        case TOGGLE_SELECT:
            return {
                ...state,
                selectedStudents: state.selectedStudents.includes(
                    action.payload
                )
                    ? state.selectedStudents.filter(
                          (id) => id !== action.payload
                      )
                    : [...state.selectedStudents, action.payload]
            };
        case CLEAR_ALL:
            return {
                ...state,
                students: [],
                selectedStudents: []
            };
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            };
        case CLEAR_ALERT:
            return {
                ...state,
                alert: null
            };
        default:
            return state;
    }
};

function App() {
    const initialState = {
        students: [
            { id: 1, name: 'Nguyen Van A', code: 'CODE12345', active: true },
            { id: 2, name: 'Tran Van B', code: 'CODE67890', active: false }
        ],
        selectedStudents: [],
        alert: null
    };

    const [state, dispatch] = useReducer(studentReducer, initialState);
    const [newStudent, setNewStudent] = useState({
        name: '',
        code: '',
        active: true
    });

    useEffect(() => {
        updateTotalSelected();
    }, [state.selectedStudents]);

    const setAlert = (message, variant) => {
        dispatch({ type: SET_ALERT, payload: { message, variant } });
        setTimeout(() => dispatch({ type: CLEAR_ALERT }), 3000); // Clear alert after 3 seconds
    };

    const addStudent = () => {
        const namePattern = /^[A-Za-z\s]+$/; // Only letters and spaces allowed

        if (!newStudent.name || !newStudent.code) {
            setAlert('Please fill in all fields', 'warning');
        } else if (!namePattern.test(newStudent.name)) {
            setAlert(
                'Invalid name. Only letters and spaces are allowed.',
                'danger'
            );
        } else {
            dispatch({ type: ADD_STUDENT, payload: newStudent });
            setNewStudent({ name: '', code: '', active: true });
            setAlert('Student added successfully', 'success');
        }
    };

    const deleteStudent = (id) => {
        dispatch({ type: DELETE_STUDENT, payload: id });
        setAlert('Student deleted successfully', 'info');
    };

    const toggleSelect = (id) => {
        dispatch({ type: TOGGLE_SELECT, payload: id });
    };

    const updateTotalSelected = () => {
        document.getElementById('totalSelected').textContent =
            state.selectedStudents.length;
    };

    const clearAll = () => {
        dispatch({ type: CLEAR_ALL });
        setAlert('All students cleared', 'info');
    };

    return (
        <div className='container mt-4'>
            {state.alert && (
                <Alert variant={state.alert.variant}>
                    {state.alert.message}
                </Alert>
            )}
            <div
                className='d-flex justify-content-between align-items-center'
                style={{
                    width: '745px',
                    marginBottom: '30px'
                }}
            >
                <h2>
                    Total Selected Student: <span id='totalSelected'>0</span>
                </h2>
                <Button variant='primary' className='mb-3' onClick={clearAll}>
                    Clear
                </Button>
            </div>

            <Form className='mb-5'>
                <Form.Group
                    className='mb-2 d-flex '
                    style={{
                        width: '740px',
                        justifyContent: 'space-between'
                    }}
                >
                    <Form.Control
                        style={{
                            width: '660px'
                        }}
                        type='text'
                        placeholder='Student Name'
                        value={newStudent.name}
                        onChange={(e) =>
                            setNewStudent({
                                ...newStudent,
                                name: e.target.value
                            })
                        }
                    />

                    <Button
                        variant='primary'
                        onClick={addStudent}
                        className='ml-120'
                    >
                        Add
                    </Button>
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Control
                        type='text'
                        style={{
                            width: '660px'
                        }}
                        placeholder='Student Code'
                        value={newStudent.code}
                        onChange={(e) =>
                            setNewStudent({
                                ...newStudent,
                                code: e.target.value
                            })
                        }
                    />
                </Form.Group>
                <Form.Check
                    type='checkbox'
                    id='active-switch'
                    label='Still Active'
                    checked={newStudent.active}
                    onChange={(e) =>
                        setNewStudent({
                            ...newStudent,
                            active: e.target.checked
                        })
                    }
                />
            </Form>

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
                    {state.students.map((student) => (
                        <tr key={student.id}>
                            <td>
                                <Form.Check
                                    type='checkbox'
                                    checked={state.selectedStudents.includes(
                                        student.id
                                    )}
                                    onChange={() => toggleSelect(student.id)}
                                />
                            </td>
                            <td>{student.name}</td>
                            <td>{student.code}</td>
                            <td>
                                <Badge
                                    bg={student.active ? 'success' : 'danger'}
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
        </div>
    );
}

export default App;
