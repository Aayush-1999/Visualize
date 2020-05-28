import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles=makeStyles(theme=>({
    formLabel:{
        marginLeft:0
    },
    radioForm:{
        margin:'6px 0'
    },
    radioGroup:{
        flexDirection:'row'
    },
    radioLabel:{
        paddingTop:'10px',
        fontSize:'0.9rem',
        marginRight:theme.spacing(1)
    },
    radioOptionLabel:{
        fontSize:'0.9rem'
    }
}))

function RadioLayout(props){
    const classes=useStyles()
    return(
        <div>
            <RadioGroup aria-label="label-alignment" 
            name="label-alignment" value='left' classes={{root:classes.radioGroup}} >
                <FormLabel component="legend" className={classes.radioLabel} >{props.label}</FormLabel>
                <FormControlLabel value="left" className={classes.formLabel} 
                    control={<Radio color='primary' size='small' />} 
                    label={props.option1} classes={{label:classes.radioOptionLabel}} />
                <FormControlLabel value="right" className={classes.formLabel}
                    control={<Radio color='primary' size='small' />} 
                    label={props.option2} classes={{label:classes.radioOptionLabel}}/>
            </RadioGroup>
        </div>
    )
}

export default RadioLayout;