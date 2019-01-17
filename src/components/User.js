import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iscomplete : null,
            cur_user1 : '',
            cur_user2 : '',
        };
    }

    handleClick = () => {
        console.log(this.state.cur_user1, this.state.cur_user2);
        fetch('/api/getUsername', {
            method : 'POST',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                "user1" : this.state.cur_user1,
                "user2" : this.state.cur_user2 
            })
        })
        .then(res => {
            console.log(res)
            return res.json()
        })
        .then(iscomplete => this.setState({iscomplete : iscomplete.login}))
        .then(() => {
            if(this.state.iscomplete) {
            console.log(this.state.iscomplete);
            alert('로그인 완료');
            } else {
            console.log(this.state.iscomplete);
            alert('로그인 실패');
            }});

    }

    render() {
        return (
            <div>
                <div>User 1</div>
                        <label>
                            Name:
                            <input type="text" name="user1" placeholder="user1" onChange={(e) => this.setState({ cur_user1 : e.target.value })}/>
                        </label>
                <div>User 2</div>
                        <label>
                            Name:
                            <input type="text" name="user2" placeholder="user2" onChange={(e) => this.setState({cur_user2 : e.target.value})}/>
                        </label>
                    <button onClick={this.handleClick}> Game Start! </button>
            </div>
        ) 
    }
}

export default User;