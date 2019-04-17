
import React, {Component} from 'react';
import SignInForm from './sign_in_form';

class SignIn extends Component {
    render() {
        return (
            <div>
                <h1 className="center">Sign In</h1>
                <SignInForm signIn={this.handleSignIn}/>
            </div>
        );
    }

    handleSignIn(values) {
        console.log('Form values:', values);
    }
}

export default SignIn;
