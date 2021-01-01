import * as actionTypes from './actionTypes';

export const authStart=(data)=>{
    return dispatch=>{
        localStorage.setItem('token',data.token)
        dispatch(authSuccess(data.token))
    }
}

export const authSuccess=(token)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
    }
}

export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState=()=>{
    return dispatch=> {
        const token=localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }
        else{
            dispatch(authSuccess(token))
        }
    }
}