import React from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles,withStyles } from '@material-ui/core/styles';

const useStyles=makeStyles(theme=>({
    tooltipIcon:{
        margin:theme.spacing(2)
    }
}))

const CustomTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.7)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

function HelpTooltip(props){
    const classes=useStyles();
    return(
        <CustomTooltip title={props.title} arrow placement='right' className={classes.tooltipIcon} >
            <HelpOutlineIcon color='disabled' fontSize='small' />
        </CustomTooltip>
    )
}

export default HelpTooltip;