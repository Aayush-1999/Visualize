import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';
import Divider from '@material-ui/core/Divider';

const useStyles=makeStyles(theme=>({
    color: {
        width: '46px',
        height: '20px',
        borderRadius: '2px',
        boxShadow: '3px 5px 2px rgba(0,0,0,0.14)',
        background: 'rgba(205,23,19,0.8)',
        // background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
    colorLabel:{
        transform:'none'
    },
    divider:{
        margin:'7px 0'
    },
    formLabel:{
        flexGrow:'1'
    },
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    swatch: {
        marginLeft:theme.spacing(11),
        marginTop:'-6px',
        padding: '5px',
        cursor: 'pointer',   
    }
}))

function Appearance(props){
    const classes=useStyles();
    const [displayColorPicker,setDisplayColorPicker]=React.useState(false)
    
    const handleClick=()=>{
        setDisplayColorPicker(true)
    }

    const handleClose=()=>{
        setDisplayColorPicker(false)
    }

    return(
    <Auxiliary>
        <FormControl>
            <InputLabel className={classes.colorLabel} id="color-value">Bar color</InputLabel>
            <div className={ classes.swatch } onClick={handleClick}>
                <div className={ classes.color } />
            </div>
            { displayColorPicker ? 
                <div className={ classes.popover }>
                    <div className={ classes.cover } onClick={handleClose}/>
                    <SketchPicker/>
                </div> : null }
        </FormControl>  
            <Divider className={classes.divider} />
            {/* <FormGroup>
                <FormControlLabel control={
                <Switch
                // checked={state.checkedB} onChange={handleChange} 
                name="checkedB" color="primary" size="small" />
                } label="Customize colors" />
            </FormGroup>               */}
            <FormGroup row>
            <FormControlLabel control={
                <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB" color="primary"
                />} label="Color key" className={classes.formLabel}
            />
            <FormControlLabel control={ 
                <Checkbox 
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB" color="primary"
                />} label="Separating lines"
            />
            <FormControlLabel control={
                <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB" color="primary"
                />} label="Thicker bars" className={classes.formLabel}
            />
            <FormControlLabel control={
                <Checkbox
                    // checked={state.checkedB}
                    // onChange={handleChange}
                    name="checkedB" color="primary"
                />} label="Bar background"
            />
        </FormGroup>
    </Auxiliary>
    )
}   

export default Appearance;