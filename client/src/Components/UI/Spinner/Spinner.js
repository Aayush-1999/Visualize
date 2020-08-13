import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems:'center',
      justifyContent:'center',
      height:'100vh'
    },
}));
  
const Spinner=(props)=>{
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <CircularProgress size={60} />
        </div>
    );
}

export default Spinner;
