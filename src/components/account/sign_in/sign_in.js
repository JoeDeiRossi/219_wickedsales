
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SignInForm from './sign_in_form';
import {signIn} from '../../../actions';

class SignIn extends Component {
    render() {
        return (
            <div>
                <h1 className="center">Sign In</h1>
                <SignInForm signIn={this.handleSignIn}/>
            </div>
        );
    }

    handleSignIn = values => {
        this.props.signIn(values);
    }
}

export default connect(null, {
    signIn: signIn
})(SignIn);
