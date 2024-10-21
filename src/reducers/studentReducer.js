// Action types
export const ADD_STUDENT = 'ADD_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const TOGGLE_SELECT = 'TOGGLE_SELECT';
export const CLEAR_ALL = 'CLEAR_ALL';
export const SET_ALERT = 'SET_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE';
// Initial state
export const initialState = {
    students: [
        { id: 1, name: 'Nguyen Van A', code: 'CODE12345', active: true },
        { id: 2, name: 'Tran Van B', code: 'CODE67890', active: false }
    ],
    selectedStudents: [],
    alert: null
};

// Reducer function
export const studentReducer = (state, action) => {
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
        case TOGGLE_ACTIVE:
            return {
                ...state,
                students: state.students.map((student) =>
                    student.id === action.payload
                        ? { ...student, active: !student.active }
                        : student
                )
            };

        default:
            return state;
    }
};
