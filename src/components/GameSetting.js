import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setBoardSize } from '../redux/actions';

class GameSetting extends Component {
    setBoard = (event) => {
        const { setBoardSize } = this.props;
        const value = parseInt(event.target.value);
        setBoardSize(value);
    }
  
    render = () => {  
      return(
        <div className="GameSetting">
            <h1>Tic-Tac-Toe Game</h1>
            <div className="setGameBoard">
                <label>게임판의 크기를 설정해주세요. : </label>
                    <select onChange={this.setBoard}>
                        <option value="3">3 X 3</option>
                        <option value="4">4 X 4</option>
                        <option value="5">5 X 5</option>
                    </select>
            </div>
        </div>
      )
    }
  }

const mapDispatchToProps = {
    setBoardSize,
}

export default connect(null, mapDispatchToProps)(GameSetting);