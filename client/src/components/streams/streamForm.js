import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class StreamForm extends Component {
    // For error
    renderError = ({ touched, error }) => {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{error}</div>
                </div>
            );
        }
    };

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmitHandler = formValues => {
        this.props.onSubmit(formValues); // Calling the reference passed from the parent component
    };

    render() {
        const { handleSubmit } = this.props; // Coming from redux-form
        return (
            <form className='ui form error' onSubmit={handleSubmit(this.onSubmitHandler)}>
                <Field name='title' component={this.renderInput} label='Enter title'></Field>
                <Field name='description' component={this.renderInput} label='Enter description'></Field>
                <button className='ui button primary' type='submit'>
                    Submit
                </button>
                <Link to='/' className='ui button'>
                    Cancel
                </Link>
            </form>
        );
    }
}

// Validate function
const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'Title is required';
    }
    if (!formValues.description) {
        errors.description = 'Description is required';
    }
    return errors;
};

export default reduxForm({
    form: 'StreamCreate',
    validate
})(StreamForm);
