import * as actionTypes from '../actions/actionTypes';

const initialStore={
    token:null,
    authenticated:false
}

const reducer=(state=initialStore,action)=>{
    switch(action.type){
        case actionTypes.AUTH_SUCCESS:
            return{
                ...state,
                token:action.token,
                authenticated:true
            }
        case actionTypes.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                authenticated:false
            }
        default: return state;
    }
}

export default reducer;