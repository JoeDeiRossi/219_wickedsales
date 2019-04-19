
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signOut} from '../../../actions';
import './sign_out.scss';

class SignOut extends Component {
    componentDidMount() {
        this.props.signOut();
    }
    
    render() {
        return (
            <div className="sign-out">
                <div className="sign-out-header center">
                    <h1>Whatever</h1>
                    <h2>Signed out</h2>
                </div>
            </div>
        );
    }
}

export default connect(null, {
    signOut: signOut
})(SignOut);
