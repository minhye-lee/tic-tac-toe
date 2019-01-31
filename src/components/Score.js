import React, { Component } from 'react';
import { connect } from 'react-redux';
import { recordScore } from  '../redux/actions';

class Score extends Component {

    componentWillReceiveProps (nextProps) {
        //winner 갱신되면 score component 갱신
        const {winner, isDraw, curUser1, curUser2, recordScore} = this.props;
        if(winner !== nextProps.winner || isDraw !== nextProps.isDraw) {
            if(nextProps.winner === 'X' && nextProps.winner !== 'null') {
                recordScore(curUser1, curUser2);
            }
            else if(nextProps.winner === 'O' && nextProps.winner !== 'null'){
                recordScore(curUser2, curUser1);
            }
            else if(nextProps.winner === 'null' && nextProps.isDraw === true){
                recordScore(null, null);
            }
        }
    }
    render() {
        const {curUser1, curUser2} = this.props;
        return (
            <div className='score'>
                <div className='score_curUser1'>
                    <h4>User1 (X) </h4>
                    <div>Name :  {curUser1.name}</div>
                    <div>Win :  {curUser1.win}</div>
                    <div>Lose :  {curUser1.lose}</div>
                    <div>Draw :  {curUser1.draw}</div>
                </div>
                <div className='score_curUser2'>
                    <h4>User2 (O) </h4>
                    <div>Name :  {curUser2.name}</div>
                    <div>Win :  {curUser2.win}</div>
                    <div>Lose :  {curUser2.lose}</div>
                    <div>Draw :  {curUser2.draw}</div>
                </div>
            </div>
        ) 
    }
}

const mapStateToProps = state => ({
    curUser1 : state.user.curUser1,
    curUser2 : state.user.curUser2,
    winner : state.game.winner,
    isDraw : state.game.isDraw,
})
const mapDispatchToProps = {
    recordScore
};
export default connect(mapStateToProps, mapDispatchToProps)(Score);