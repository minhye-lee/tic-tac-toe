import React, { Component } from 'react';

class User extends Component {
    render() {
        return (
            <div>
                <div>User 1</div>
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" />
                        </label>
                    <input type="submit" value="Submit" />
                    </form>
                <div>User 2</div>
                    <form>
                        <label>
                            Name:
                            <input type="text" name="name" />
                        </label>
                    <input type="submit" value="Submit" />
                    </form>
            </div>
        ) 
    }
}

export default User;