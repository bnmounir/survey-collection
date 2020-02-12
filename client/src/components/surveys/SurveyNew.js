import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {
    state = {
        showReview: false
    };
    renderContent = () =>
        !this.state.showReview ? (
            <SurveyForm
                onSurveySubmit={() => this.setState({ showReview: true })}
            />
        ) : (
            <SurveyReview
                onCancel={() => this.setState({ showReview: false })}
            />
        );

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);
