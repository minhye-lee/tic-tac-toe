import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputNewUserName, postSignUp } from  '../redux/actions';


class SignUp extends Component {

    handleClick = () => {
        const { postSignUp, newUserName } = this.props;
        postSignUp(newUserName);
    }

    render() {
        const { inputNewUserName } = this.props;
        return (
            <div className="signUp">
                <h2>Sign Up</h2>
                    <form>
                        <label>
                            Name:
                            <input 
                                type="text"
                                name="name"
                                placeholder="user"
                                onChange={(e) => inputNewUserName(e.target.value)}
                                autoComplete='off'/>
                        </label>
                        <button
                            type="reset"
                            onClick={this.handleClick}>
                            Submit
                        </button>
                    </form>
            </div>
        ); 
    }
}

const mapStateToProps = state => ({
    newUserName : state.user.newUserName,
    isCompleteSignUp : state.user.isCompleteSignUp,
})
const mapDispatchToProps = {
    inputNewUserName,
    postSignUp,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);