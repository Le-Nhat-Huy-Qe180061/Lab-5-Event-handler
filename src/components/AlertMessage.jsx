import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ alert }) => {
    if (!alert) return null;

    return <Alert variant={alert.variant}>{alert.message}</Alert>;
};

export default AlertMessage;
