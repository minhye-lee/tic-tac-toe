import * as types from "./actionTypes";

//game
export const handleClicked = (x, y) => ({
    type: types.HANDLE_CLICKED,
    x,
    y
});

export const goToMove = (index) => ({
    type: types.GO_TO_MOVE,
    index
});

export const setBoardSize = (size) => ({
    type: types.SET_BOARD_SIZE,
    size
});

//user
export const fetchSignUp = (response_signup) => ({
    type: types.FETCH_SIGN_UP,
    response_signup
});

export const inputNewUserName = (name) => ({
    type: types.INPUT_NEW_USER_NAME,
    name
});

export const inputUser1Name = (user1_name) => ({
    type: types.INPUT_USER1_NAME,
    user1_name
});

export const inputUser2Name = (user2_name) => ({
    type: types.INPUT_USER2_NAME,
    user2_name
});

export const recordResult = (win_user, lose_user) => ({
    type: types.RECORD_RESULT,
    win_user,
    lose_user
});

export const fetchSignIn = (response_signin) => ({
    type: types.FETCH_SIGN_IN,
    response_signin
});

export const postSignUp = (name) => dispatch => {
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

export const postSignIn = (user1, user2) => dispatch => {
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