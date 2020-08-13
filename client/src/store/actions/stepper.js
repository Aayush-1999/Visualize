import * as actionTypes from './actionTypes';

export const incStepper=(val)=>{
    return{
        type:actionTypes.INCREASE_STEPPER,
        step:val
    }
}

export const decStepper=(val)=>{
    return{
        type:actionTypes.DECREASE_STEPPER,
        step:val
    }
}