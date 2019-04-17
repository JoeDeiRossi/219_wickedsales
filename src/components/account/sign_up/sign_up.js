
import React, {Component} from 'react';
import SignUpForm from './sign_up_form';

class SignUp extends Component {
    render() {
        return (
            <div>
                <h1 className="center">Sign Up</h1>
                <SignUpForm signUp={this.handleSignUp}/>
            </div>
        );
    }

    handleSignUp(values) {
        console.log('Form values:', values);
    }
}

export default SignUp;
