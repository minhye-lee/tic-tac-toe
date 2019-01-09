import React, { Component } from 'react';
import { connect } from 'react-redux';

class Status extends Component {
    
    render () {
        const winner = this.props.winner;
        let status;

        //console.log("winner" + winner);
        if(winner) {
            status = 'Winner : ' + winner;
        }
        else if( this.props.isDraw) {
            status = 'Draw!!!';
        }
        else {
            status = 'Next Player : ' + (this.props.isNextX ? "X" : "O");
        }


        return (
            <div className="gameInfo">
                {status}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    winner : state.winner,
    isNextX : state.isNextX,
    isDraw : state.isDraw
})

export default connect(mapStateToProps, null)(Status);