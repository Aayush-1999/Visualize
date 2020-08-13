import React,{Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../../Components/Navigation/Header/Header';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';

const styles=theme=>({
    root:{
        display:'flex'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content:{
        flexGrow:1,
        padding:theme.spacing(3)
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Layout extends Component{
    state={
        open:false,
        showAlert:false
    };

    handleDrawerOpen = () => {
        this.setState({open:true});
    }

    handleDrawerClose = () => {
        this.setState({open:false});
    };

    handleClose=()=>{
        this.setState({showAlert:false});
    }
    
      render(){
        const {classes} = this.props;
        return(
            <Auxiliary>
                <div className={classes.root}>
                    <CssBaseline />
                    <Header onClickHandler={this.handleDrawerOpen} isOpen={this.state.open} />
                    <SideDrawer onClickHandler={this.handleDrawerClose} show={this.state.open} />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Snackbar open={this.state.showAlert} 
                            autoHideDuration={6000} 
                            anchorOrigin={{vertical:'top', horizontal:'center'}} 
                            onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="error">
                                Please try again!
                            </Alert>
                        </Snackbar>
                        {this.props.children}
                    </main>
                </div>
            </Auxiliary>
        )
    }
}

export default withStyles(styles)(Layout);