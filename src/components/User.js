import React, { Component } from 'react';

class User extends Component {
    render() {
        return (
            <div>
                <div>User 1</div>
                    <form action='/api/getUsername' method='post'>
                        <label>
                            Name:
                            <input type="text" name="user1" placeholder="영희" />
                        </label>
                <div>User 2</div>
                        <label>
                            Name:
                            <input type="text" name="user2" placeholder="철수"/>
                        </label>
                    <input type="submit" value="Submit" />
                    </form>
            </div>
        ) 
    }
}

export default User;