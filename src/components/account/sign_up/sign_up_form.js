
import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../../general/input';

const SignUpForm = props => {
    const {handleSubmit, signUp} = props;

    return (
        <form onSubmit={handleSubmit(signUp)}>
            <div className="row">
                <Field id="name" col="s6" name="name" component={Input} label="Name"/>
                <Field id="email" col="s6" name="email" component={Input} label="Email"/>
            </div>
            <div className="row">
                <Field id="password" col="s6" name="password" component={Input} label="Password"/>
                <Field id="confirmPassword" col="s6" name="confirmPassword" component={Input} label="Confirm Password"/>
            </div>

            <div className="row">
                <div className="col s12 right-align">
                    <button className="btn green">Sign Up</button>
                </div>
            </div>
        </form>
    );
}

function validate({name, email, password, confirmPassword}) {
    const errors = {};

    if (!name) {
        errors.name = 'Please enter your name';
    }

    if (!email) {
        errors.email = 'Please enter your email';
    }

    if (!password) {
        errors.password = 'Please enter your password';
    }

    if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords must match';
    }

    return errors;
}

export default reduxForm({
    form: 'sign-up-form',
    validate: validate
})(SignUpForm);
