// src/App.js
import React, { useReducer, useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import AlertMessage from './components/AlertMessage';
import TotalSelected from './components/TotalSelected';
import {
    studentReducer,
    initialState,
    ADD_STUDENT,
    DELETE_STUDENT,
    TOGGLE_SELECT,
    CLEAR_ALL,
    SET_ALERT,
    CLEAR_ALERT,
    TOGGLE_ACTIVE
} from './reducers/studentReducer';

function App() {
    const [state, dispatch] = useReducer(studentReducer, initialState);
    const [newStudent, setNewStudent] = useState({
        name: '',
        code: '',
        active: true
    });

    // Set thời gian thông báo
    const setAlert = (message, variant) => {
        dispatch({ type: SET_ALERT, payload: { message, variant } });
        setTimeout(() => dispatch({ type: CLEAR_ALERT }), 800);
    };

    // Add thêm student
    const addStudent = () => {
        // check valid
        const namePattern = /^[A-Za-z\s]+$/;

        if (!newStudent.name || !newStudent.code) {
            setAlert('Please fill in all fields', 'warning');
        } else if (!namePattern.test(newStudent.name)) {
            setAlert(
                'Invalid student name. Only letters and spaces are allowed.',
                'danger'
            );
        } else {
            dispatch({ type: ADD_STUDENT, payload: newStudent });
            setNewStudent({ name: '', code: '', active: true });
            setAlert('Student added successfully', 'success');
        }
    };

    // Xóa student
    const deleteStudent = (id) => {
        dispatch({ type: DELETE_STUDENT, payload: id });
        setAlert('Student deleted successfully', 'info');
    };

    // Click vào tăng total selected
    const toggleSelect = (id) => {
        dispatch({ type: TOGGLE_SELECT, payload: id });
    };

    // Xóa All
    const clearAll = () => {
        dispatch({ type: CLEAR_ALL });
        setAlert('All students cleared', 'info');
    };

    // Thay đổi trạng thái status
    const toggleActive = (id) => {
        dispatch({ type: TOGGLE_ACTIVE, payload: id });
        setAlert('Student status updated', 'info');
    };

    return (
        <div className='container mt-4'>
            <AlertMessage alert={state.alert} />
            <TotalSelected
                totalSelected={state.selectedStudents.length}
                clearAll={clearAll}
            />
            <StudentForm
                newStudent={newStudent}
                setNewStudent={setNewStudent}
                addStudent={addStudent}
            />
            <StudentTable
                students={state.students}
                selectedStudents={state.selectedStudents}
                toggleSelect={toggleSelect}
                deleteStudent={deleteStudent}
                toggleActive={toggleActive}
            />
        </div>
    );
}

export default App;
