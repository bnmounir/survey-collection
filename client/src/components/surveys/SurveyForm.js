import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import ValidateEmails from '../../utils/validateEmails';
import { FIELDS } from './fieldsArray';

export class SurveyForm extends Component {
    renderFields() {
        return FIELDS.map(({ label, name }) => (
            <Field
                key={name}
                label={label}
                type='text'
                name={name}
                component={SurveyField}
            />
        ));
    }
    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(
                        this.props.onSurveySubmit
                    )}
                >
                    {this.renderFields()}
                    <Link
                        to='/surveys'
                        className='yellow darken-4 btn-flat white-text'
                    >
                        Cancel
                    </Link>
                    <button
                        className='teal btn-flat right white-text'
                        type='submit'
                    >
                        Next
                        <i className='material-icons right'>done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = ValidateEmails(values.recipients || '');

    FIELDS.forEach(({ name, label }) => {
        if (!values[name]) {
            errors[name] = `${label} is required`;
        }
    });
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
