import * as actionTypes from '../actions/actionTypes';

const initialStore={
    activeStep:0
}

const reducer=(state=initialStore,action)=>{
    switch(action.type){
        case actionTypes.INCREASE_STEPPER : 
            return{
                ...state,
                activeStep:action.step
            };
        case actionTypes.DECREASE_STEPPER :
            return{
                ...state,
                activeStep:action.step
            };
        default:return state;
    }
}

export default reducer;