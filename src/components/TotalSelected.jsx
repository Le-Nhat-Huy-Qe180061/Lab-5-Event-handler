import React from 'react';
import { Button } from 'react-bootstrap';

const TotalSelected = ({ totalSelected, clearAll }) => {
    return (
        <div
            className='d-flex justify-content-between align-items-center'
            style={{
                width: '745px',
                marginBottom: '30px'
            }}
        >
            <h2>
                Total Selected Student:{' '}
                <span id='totalSelected'>{totalSelected}</span>
            </h2>
            <Button variant='primary' className='mb-3' onClick={clearAll}>
                Clear
            </Button>
        </div>
    );
};

export default TotalSelected;
