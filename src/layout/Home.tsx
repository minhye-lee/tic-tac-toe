import * as React from 'react';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Score from '../components/Score';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

interface IProps {
    isCompleteSignIn : boolean;
}

class Home extends React.Component<IProps> {

    render () {
        const { isCompleteSignIn } = this.props;
        let button : any = null;
        if(!isCompleteSignIn)
            button = <button onClick={() => alert('로그인을 해주세요')}>Game Start</button>
        else
            button = <button><Link to = "/game">Game Start! </Link></button>

        return (
            <div className="home">
                <h1>Welcome!</h1>
                <div className="signIn">
                    {isCompleteSignIn ? <Score/> : <SignIn />}
                </div>
                <div className="signUp">
                    <SignUp />
                </div>
                {button}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isCompleteSignIn : state.user.isCompleteSignIn
})
export default connect(mapStateToProps, null)(Home);