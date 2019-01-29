import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputUser1Name, inputUser2Name, postSignIn } from  '../redux/actions';

class SignIn extends Component {

    handleClick = () => {
        const { postSignIn, curUser1, curUser2 } = this.props;
        postSignIn(curUser1.name, curUser2.name)
    }

    render() {
        const { inputUser1Name, inputUser2Name } = this.props;
        return (
            <div>
                <h2>Sign In</h2>
                <form>
                    <h4>User 1</h4>
                            <label>
                                Name 
                                <input
                                    type="text"
                                    name="user1"
                                    placeholder="user1"
                                    onChange={(e) => inputUser1Name(e.target.value)}/>
                            </label>
                    <h4>User 2</h4>
                            <label>
                                Name 
                                <input
                                    type="text"
                                    name="user2"
                                    placeholder="user2"
                                    onChange={(e) => inputUser2Name(e.target.value)}/>
                            </label>
                    <button type="reset" onClick={this.handleClick}> Login </button>
                </form>
            </div>
        ) 
    }
}

const mapStateToProps = state => ({
    curUser1 : state.user.curUser1,
    curUser2 : state.user.curUser2,
})
const mapDispatchToProps = {
    inputUser1Name,
    inputUser2Name,
    postSignIn
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);