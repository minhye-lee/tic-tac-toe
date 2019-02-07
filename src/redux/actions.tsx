import * as types from "./actionTypes";
import { ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, Dispatch} from 'redux';

// game reducer
// 버튼 클릭시에 마크 표시
export interface HandleClicked {
    type: types.HANDLE_CLICKED;
    x : number;
    y : number;
}
export const handleClicked = (x : number, y : number) : HandleClicked => ({
    type: types.HANDLE_CLICKED,
    x,
    y
});
// 해당 squarehistory로 이동
export interface GoToMove {
    type: types.GO_TO_MOVE;
    index : number;
};
export const goToMove = (index : number) : GoToMove => ({
    type: types.GO_TO_MOVE,
    index
});
// 게임판의 사이즈 결정
export interface SetBoardSize {
    type: types.SET_BOARD_SIZE;
    size : number
};
export const setBoardSize = (size : number) : SetBoardSize => ({
    type: types.SET_BOARD_SIZE,
    size
});

// user reducer
// 회원가입시 username 입력
export interface InputNewUserName {
    type: types.INPUT_NEW_USER_NAME;
    name : string;
};
export const inputNewUserName = (name : string) : InputNewUserName => ({
    type: types.INPUT_NEW_USER_NAME,
    name
});
// user1 로그인시 username 입력
export interface InputUser1Name {
    type: types.INPUT_USER1_NAME;
    user1_name : string;
};
export const inputUser1Name = (user1_name : string) : InputUser1Name => ({
    type: types.INPUT_USER1_NAME,
    user1_name
});
// user2 로그인시 username 입력
export interface InputUser2Name {
    type: types.INPUT_USER2_NAME;
    user2_name : string;
};
export const inputUser2Name = (user2_name : string) : InputUser2Name => ({
    type: types.INPUT_USER2_NAME,
    user2_name
});
//승패가 가려지면 결과 저장
export interface RecordResult {
    type : types.RECORD_RESULT;
    win_user : string;
    lose_user : string;
}
export const recordResult = (win_user : string, lose_user : string) : RecordResult => ({
    type: types.RECORD_RESULT,
    win_user,
    lose_user
});
//회원가입 성공여부
export interface FetchSignUp {
    type : types.FETCH_SIGN_UP;
    response_signup : boolean;
}
export const fetchSignUp = (response_signup : boolean) : FetchSignUp => ({
    type: types.FETCH_SIGN_UP,
    response_signup
});
//로그인 성공여부
export interface FetchSignIn {
    type : types.FETCH_SIGN_IN;
    response_signin : boolean;
}
export const fetchSignIn = (response_signin : boolean) : FetchSignIn => ({
    type: types.FETCH_SIGN_IN,
    response_signin
});


export const postSignUp = (name : string) => (dispatch : Dispatch) => {
    fetch('/api/newUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name
            })
        })
        .then(res => {
            return res.json();
        }).then(isComplete => {
            dispatch({
                type: types.FETCH_SIGN_UP,
                response_signup: isComplete.enroll
            })
            return isComplete.enroll
        }).then((enroll) => {
            if (enroll) {
                alert('회원가입 성공');
            } else {
                alert('회원가입 실패');
            }
        })
}

export const postSignIn = (user1 : string, user2 : string) => (dispatch : Dispatch) => {
    if(user1 !== user2){
        fetch('/api/getUsername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user1" : user1,
                "user2" : user2 
            })
        })
        .then(res => {
            return res.json();
        }).then(isComplete => {
            dispatch({
                type: types.FETCH_SIGN_IN,
                response_signin: isComplete.login,
                user1 : isComplete.auth_user1,
                user2 : isComplete.auth_user2,
            })
            return isComplete.login
        }).then((login) => {
            if (login) {
                alert('로그인 성공');
            } else {
                alert('로그인 실패');
            }
        })

    } else {
        alert('동일유저입니다');
    }

}

export const recordScore = (winner, loser) => (dispatch, getState) => {

    dispatch({
        type: types.RECORD_RESULT,
        win_user : winner ? winner.name : null,
        lose_user : loser ? loser.name : null
    })

    const { curUser1, curUser2 } = getState().user;
    const user1 = [curUser1.name, curUser1.win, curUser1.lose, curUser1.draw];
    const user2 = [curUser2.name, curUser2.win, curUser2.lose, curUser2.draw];
    
    fetch('/api/updateScore', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "user1" : user1,
            "user2" : user2 
        })
    })


}