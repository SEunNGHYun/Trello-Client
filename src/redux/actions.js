
const LOGINCHECK = 'LOGIN';
const CHECKUSER = 'CHECK';
const LOGOUT = 'LOGOUT';

export const loginCheck = ()=>({ type : LOGINCHECK });
export const checkuser = () => ({type : CHECKUSER });
export const logout = () => ({type : LOGOUT})

const initialState = {
    login : false
};

 function Action(state = initialState, action){
    switch(action.type){
        case LOGINCHECK : return { login : !state.login }
        case CHECKUSER : return { login : true }
        case LOGOUT : return {login : false}
    default : return state;
    }
}
export default Action;