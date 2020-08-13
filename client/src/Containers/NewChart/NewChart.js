import React , {Component} from 'react';
import Stepper from '../../Components/Stepper/Stepper';
import { withStyles } from '@material-ui/core/styles';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const styles=theme=>({
    content:{
        padding:theme.spacing(2),
    }
});

class NewChart extends Component{
    render(){
        const {classes} = this.props;
        return(
            <Auxiliary>
                <Stepper />
                <div className={classes.content}>
                {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}

export default withStyles(styles)(NewChart);