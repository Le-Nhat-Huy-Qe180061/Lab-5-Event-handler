import React from 'react';
import { Form, Button } from 'react-bootstrap';

const StudentForm = ({ newStudent, setNewStudent, addStudent }) => {
    return (
        <Form className='mb-5'>
            <Form.Group
                className='mb-2 d-flex'
                style={{ width: '740px', justifyContent: 'space-between' }}
            >
                <Form.Control
                    style={{ width: '660px' }}
                    type='text'
                    placeholder='Student Name'
                    value={newStudent.name}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, name: e.target.value })
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
                    style={{ width: '660px' }}
                    placeholder='Student Code'
                    value={newStudent.code}
                    onChange={(e) =>
                        setNewStudent({ ...newStudent, code: e.target.value })
                    }
                />
            </Form.Group>
            <Form.Check
                type='checkbox'
                id='active-switch'
                label='Still Active'
                checked={newStudent.active}
                onChange={(e) =>
                    setNewStudent({ ...newStudent, active: e.target.checked })
                }
            />
        </Form>
    );
};

export default StudentForm;
