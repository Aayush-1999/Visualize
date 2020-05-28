import React , {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles={
    root:{
        // display:'flex'
    }
};

class Dashboard extends Component{
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard);