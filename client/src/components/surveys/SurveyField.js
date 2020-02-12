import React from 'react';

const SurveyField = ({ input, label, meta: { error, touched } }) => {
    return (
        <>
            <label>{label}</label>
            <input {...input} />
            <div className='red-text' style={{ marginBottom: '12px' }}>
                {touched && error}
            </div>
        </>
    );
};

export default SurveyField;
