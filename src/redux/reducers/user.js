import { FETCH_SIGN_UP, FETCH_SIGN_IN, INPUT_NEW_USER_NAME, INPUT_USER1_NAME, INPUT_USER2_NAME, RECORD_RESULT } from '../actionTypes';

const initialState = {
    isCompleteSignUp : null,
    newUserName : '',
    isCompleteSignIn : false,
    curUser1 : {
        name : 'temp_user1',
        win : 0,
        lose : 0,
        draw : 0,
    },
    curUser2 : {
        name : 'temp_user2',
        win : 0,
        lose : 0,
        draw : 0,
    },
};

const user = (state = initialState, action) => {
    switch(action.type) {
        case INPUT_NEW_USER_NAME :
            return {
                ...state,
                newUserName : action.name,
            };

        case INPUT_USER1_NAME :
            return {
                ...state,
                curUser1 : {
                    ...state.curUser1,
                    name : action.user1_name
                }
            };

        case INPUT_USER2_NAME :
            return {
                ...state,
                curUser2 : {
                    ...state.curUser2,
                    name : action.user2_name
                }
            };

        case RECORD_RESULT :
            if(action.win_user === state.curUser1.name) {
                return {
                    ...state,
                    curUser1 : {
                        ...state.curUser1,
                        win : state.curUser1.win +1
                    },
                    curUser2 : {
                        ...state.curUser2,
                        lose : state.curUser2.lose + 1
                    }
                }
            }
            else if(action.win_user === state.curUser2.name) {
                return {
                    ...state,
                    curUser1 : {
                        ...state.curUser1,
                        lose : state.curUser1.lose +1
                    },
                    curUser2 : {
                        ...state.curUser2,
                        win : state.curUser2.win + 1
                    }
                }
            }
            else if(action.win_user === null) {
                return {
                    ...state,
                    curUser1 : {
                        ...state.curUser1,
                        draw : state.curUser1.draw +1
                    },
                    curUser2 : {
                        ...state.curUser2,
                        draw : state.curUser2.draw + 1
                    }
                }
            }
            return state;

        case FETCH_SIGN_UP : 
            const complete = action.response_signup;
            console.log("complete : " + complete);
            return {
                ...state,
                isCompleteSignUp : complete,
                newUserName : '',           
            };

        case FETCH_SIGN_IN :
            const login = action.response_signin;
            const user1 = action.user1;
            const user2 = action.user2;
            return {
                ...state,
                isCompleteSignIn : login,
                curUser1 : {
                    ...state.curUser1,
                    win : user1[1],
                    lose : user1[2],
                    draw : user1[3]
                },
                curUser2 : {
                    ...state.curUser2,
                    win : user2[1],
                    lose : user2[2],
                    draw : user2[3]
                }
            };
            
        default :
            return state;
    }
}

export default user;