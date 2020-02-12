import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FIELDS } from './fieldsArray';
import * as actions from '../../actions';

const SurveyReview = ({ values, onCancel, submitSurvey, history }) => {
    const reviewFields = FIELDS.map(({ label, name }) => {
        return (
            <div key={name}>
                <div>
                    <label htmlFor=''>{label}</label>
                    <div>{values[name]}</div>
                </div>
            </div>
        );
    });

    return (
        <>
            <h1>Please Review Survey:</h1>
            {reviewFields}
            <button
                className='yellow darken-4 btn-flat white-text'
                onClick={onCancel}
            >
                Back
            </button>
            <button
                onClick={() => submitSurvey(values, history)}
                className='teal btn-flat right white-text'
            >
                Send Survey
                <i className='material-icons right'>email</i>
            </button>
        </>
    );
};

function mapStateToProps({
    form: {
        surveyForm: { values }
    }
}) {
    return { values: values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
