import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import HelpTooltip from '../../../../UI/HelpTooltip/HelpTooltip';

const useStyles=makeStyles(theme=>({
    selectInput:{
        lineHeight:'1em',
        backgroundColor:'#fff',
        padding:'0.1rem'
    },
    selectInputWidth:{
        minWidth: 110,
        [theme.breakpoints.up('sm')]:{
            minWidth:200
        },
        [theme.breakpoints.up('lg')]:{
            minWidth:250
        }
    }
}))

function SelectLayout(props){
    const classes=useStyles();
    return(
        <Grid container spacing={0}>
          <Grid item sm={10}>
                <FormControl className={classes.selectInputWidth} >
                    <InputLabel shrink id="customize-value">{props.label}</InputLabel>
                    <Select
                      labelId="customize-value"
                      id="customize-value"
                      value={props.defaultValue}
                      onChange={props.selectColumn}
                      className={classes.selectInput}
                      displayEmpty
                      MenuProps={{ 
                          anchorOrigin:{ vertical: 'bottom', horizontal: 'center' },
                          getContentAnchorEl:null,
                          transformOrigin:{ vertical: 'top', horizontal: 'center' },
                      }}
                    >
                        {props.data.map((col,index)=>
                            <MenuItem key={['col', index].join('_')} value={col}>{col}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={2}>
                {props.showTooltip?
                <HelpTooltip title={props.tooltipTitle} />:null}
            </Grid>
        </Grid>
    )
}

export default SelectLayout;