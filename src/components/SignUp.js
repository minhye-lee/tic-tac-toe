import React, { Component } from 'react';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iscomplete : null,
            input : '',
        };
    }

    handleChange = (event) => {
        this.setState({input : event.target.value});
    }

    handleClick = () => {
        console.log(this.state.input);
        fetch('/api/newUser', {
            method : 'POST',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                "name" : this.state.input  
            })
        })
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(iscomplete => this.setState({iscomplete : iscomplete.enroll}))
        .then(() => {
            if(this.state.iscomplete) {
            console.log(this.state.iscomplete);
            alert('회원가입 완료');
            } else {
            console.log(this.state.iscomplete);
            alert('회원가입 실패');
            }});
    
        

    }

    render() {
        return (
            <div>
                <div>Sign Up!</div>
                        <label>
                            Name:
                            <input type="text" name="name" placeholder="user" onChange={this.handleChange} autoComplete='off'/>
                        </label>
                        <button onClick={this.handleClick}>Submit</button>
            </div>
        ); 
    }
}

export default SignUp;