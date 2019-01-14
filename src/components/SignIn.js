import React, { Component } from 'react';

class SignIn extends Component {
    render() {
        return (
            <div>
                <div>User 1</div>
                    <form action='/api/newUser' method='post'>
                        <label>
                            Name:
                            <input type="text" name="name" placeholder="영희" />
                        </label>
                    <input type="submit" value="Submit" />
                    </form>
            </div>
        ) 
    }
}

export default SignIn;