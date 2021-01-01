import React, {Component} from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import axios from '../../axiosInstance';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles} from '@material-ui/core/styles';  
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';  
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as actions from '../../store/actions/index';
import styles from './signup.styles';

class SignUp extends Component{
    state={
        user:{
            firstName:null,
            lastName:null,
            email:null,
            password: undefined,
            confirm:null
        },
        progressBar:false,
        showPassword:false
    }

    handleChange = (event,key) => {
        const newUser = {...this.state.user}
        newUser.key = event.target.value
        this.setState({user:newUser})
    }

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword });
    }
    
    handleMouseDownPassword = event => {
        event.preventDefault();
    }

    formHandler=(event)=>{
        event.preventDefault();
        this.setState({progressBar:true},()=>{
            setTimeout(()=>{
                axios.post("/register",{
                    firstName:this.state.user.firstName,
                    lastName:this.state.user.lastName,
                    email:this.state.user.email,
                    password:this.state.user.password
                })
                .then(response=>{
                    if(response.status===200){
                        this.props.onAuthStart(response.data)
                        this.props.history.push({
                            pathname: "/",
                            state:{user:response.data}
                        });
                    }
                })
                .catch((error)=>{
                    if(error.response){
                        this.setState({
                            progressBar:false,
                            error:true,
                            helperText:"Couldn't find your account"
                        })
                    }
                    else{
                        console.log(error);
                    }
                })
            },1500)
        })
    }

    signInButtonHandler=(event)=>{
        event.preventDefault();
        this.setState({progressBar:true},()=>{
            setTimeout(()=>{
                this.props.history.push("/signin")
            },200)
        })
    }

    render(){
        const {classes} = this.props;
        let progress=this.state.progressBar?<LinearProgress />:null

        return(
            <Container maxWidth="md" disableGutters className={classes.root} >
                <Card variant="outlined" className={classes.paper}>
                    {progress}
                    <div className={classes.cardBody}>
                        <Grid container spacing={3}>
                            <Grid item sm={12} md={7}>
                                <CardContent className={classes.cardContent} >
                                    <Typography variant="h5"    >
                                        Create your Account
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <form className={classes.form} >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField  
                                                    fullWidth
                                                    variant="outlined"
                                                    margin="normal"
                                                    id="First name"  
                                                    label="First name"
                                                    type="text"
                                                    autoFocus
                                                    size="small"
                                                    onChange={(event)=>this.handleChange(event,"firstName")}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField 
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="normal"
                                                    id="Last name"  
                                                    label="Last name"
                                                    type="text"
                                                    size="small"
                                                    onChange={(event)=>this.handleChange(event,"lastName")}
                                                />
                                            </Grid>
                                        </Grid>
                                        <TextField 
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="Username"  
                                            label="Username"
                                            type="text"
                                            size="small"
                                            InputProps={{
                                                endAdornment: 
                                                <InputAdornment position="end">@gmail.com</InputAdornment>,
                                              }}
                                            onChange={(event)=>this.handleChange(event,"email")}
                                        />
                                        <Typography component="div" variant="caption">
                                            You can use letter, numbetrs & periods
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={10} sm={6}>
                                            <FormControl size='small' variant="outlined" margin="normal">
                                                <InputLabel htmlFor="password">Password</InputLabel>
                                                <OutlinedInput id="password"
                                                    type={this.state.showPassword ? 'text' : 'password'}
                                                    value={this.state.user.password}
                                                    onChange={(event)=>this.handleChange(event,"password")}
                                                    endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                    }
                                                    labelWidth={74}
                                                />
                                            </FormControl>
                                            </Grid>
                                            <Grid item xs={10} sm={6}>
                                                <TextField 
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="Confirm"  
                                                    label="Confirm"
                                                    type="text"
                                                    size="small"
                                                    onChange={(event)=>this.handleChange(event,"confirmPassword")}
                                                />    
                                            </Grid>
                                        </Grid>
                                        <Typography variant="caption">
                                            Use 8 or more characters with a mix of letters, numbers & symbols
                                        </Typography>
                                        <Grid container className={classes.grid}>
                                            <Grid item xs>
                                                <Button color="primary"className={classes.label} onClick={this.signInButtonHandler} 
                                                >Sign in instead</Button>
                                            </Grid>
                                            <Grid item>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.formHandler}
                                                >Next</Button>
                                        </Grid>
                                    </Grid>
                                    </form>
                                </CardActions>
                            </Grid>
                            <Grid item md={5} className={classes.accountImage} >
                                <img alt="account icon"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA2FBMVEX///9zqvlRjvg6W7zy8vJjnPlvqPlqpflxqflHifj39vRRj/k5WLn6+fVnpPlOjPhBhvgxVbonT7k1VLfq8f7z9/6uyPsgS7i/1vxHed+uzPs8Xb3l5+7Jz+STodPw9f7U4/3d6f16jMvR1ueNsvp2pPnW5P2kxfvP3f20y/uiv/thkeVWgtlJcMtAaMuLmtFMg+tpf8eHtfpalPi5wt9geMWxutxCbtJ3istnmevf4uxHZb9QedK0vd2lsNjN0uZcku9XccOXuPplfMZ+pPGfuO/B0fC2x+8bJSh+AAANrUlEQVR4nN2daVviShOGB4iERGKWUUFBR0VHRx0ZcRmFGX31uPz/f/QmBASkq7qqF5Z5PpzrXOcDJ7fVXVtXJ1++zFLr9dOVw/r6TP+fs1NKV1krF1Y8L1o9rH+b9+MY1reT48qaWy6kWgmLxWLoRVfPJxvzfixD2tjbLAzoPggzeZG3cro376fT1v52J6WrFEb6IMxNGR1t7s/7IZW1X++4k3SfCQeU4cuP5XM+qVspr03RiQgzyGxbLpPz2Tg5Lo9tPDnh0JbL4Xz2+hsPoMMIl8L5TLsVJuFCO5/1eqcspSMQDiiLi+V8UrfirpWxpckjLObOZ0Eyn9StFPCNp0Q4tOWcnc/Gd8rGUyfMlG3L0+9zwUvdiiCeGyfMTenN2vms15+V6NQIB5TFlxmVXd9OTl2Xs/GMEBZn5HzYbsUk4dCWK6cnlui+bxfYbsU4YQ4ZrRybdj6qbsUG4YAyNOd8UrdiwnZGCYv5tgz1ez6pW9HeeJYIh5RXz3XVnGBj79jIxrNI2JfXdz4qlAXzdFYIi7mHVSB0LeBZIkwZi3zAjaUiLHp8wvXlIoz4uc7+khHyg+PJkhHyU7n6chF6dT6h0Thvn/AHm/B4yQhP2YTPy0UYHrIJOzYSGouEL/884RGbsLBkhPzE1NI2tEVYvGITri0XoULqvWSE/NR7Y9kII24NvL50hNziwlZpYY+Q25P6vnSE3PLJHmFx1Q4ht0e8Z4Ow4rru/379CouruYwS7s2TsHJ/dv6nV/qaqdpX6eL31tavokFKdglsjLB81mdLoSbV52z83jJF6XEJzTQx7s97KVwJVop5sfXLBCS7yDfQxHDPGyjdiLKxFWoz8gl1M++znyS8IeTFliYju42xrUd43pjaeDLIzJBLQ3heYuLljKUtjVg5S8IzrvnGGZXXqrc5K8L7xldFvj5j45ci46wIyz9RvmqcCTVx9UJtqc6IEFugcZLETwftdvvgKftXGLG6pYI4E8IKbMBq0mhfd4OhutftRgL+MZTMOAvC+wb0zHFyc+0EvjOSHzjXNyBjthsXkPAMNGBy05rAG0K2bhLQjOyVap/wDwQYJ7cCvpzxFtyP1d9MROuE4BZMbpqBkC9T0ATNWL3gIdqO+D1oSyUHMF+f8QBB5DBaJoQB2zhgitiGETkulU3Iqp6ULSixYoNjQ5v1IQgY34hdzKT8G9DdMPYim5BR4/+EwxqBLxMYSBmIbEJ6nwYME6Vkh2LC1Ig7cFwkBw17nahzEDC+k2/CXMEdmKaSQ781wnu4lki6REDH6YJGLFWJCRy7I0zseVfAJyvF0kAxZsQDuNYoEW3I7eoTT2ZAL1Mq1egmTI1Yg41I8zZsQtrgHpxtl6o3dBOmRnyC/1S0rcg+e/pGOT90kYI+uaU50lz+LbwTS1VKE459Qko65UbWKMfP9JcpQliirNOIC0ghRNZoqdrjmDA1IpgYlWjrNGQTEvYh8ldnBMNcwSXiTQn+NFxlE8onhs6xnlm8y7ThLkZISG348zTSqS8XbQryHE1K+IBtRLmzUZiJkhL+wQmvmYTXOKHMiApzbbLpyzLe2qZm3URCqREVpi9PJYS4CU3bUGpE75lNKGljSExYSv4yCW9RX5oi4quU3WqTHpGijjRV/MD1NDJCPCYqzHlL2hgN/HlYlUWmoC0hLJVwQv6sPl4+ncmOCKtPTEIk9R78IloosstD2egelpEOjMgCdBypCfHslF1ayMon+SkoL1wgrZqREbFVyi8t8MRUuki5G5GwDXFfo3B3DSWUL9IUkWVDuQnRZaqQeOOpN2UUgRPzZfF+INiECmkpmtTck0adnhiEWHU4+kXYmyokbejFJ1m4z0VPa/y/JBMimZvCtSc0betRnocTMIgDOA2YkJ/SYCcXFeLEDNWdot3SccHxQuGCJZbUkLZhpto1BTGguZkSthEVLsliNy5o2zBT0pJvRb9FBUQiokrAR66rS0rD8UeKuzJEv4vPSE38HORqVK7jf0H6GCTXPkRsSc7xW3RAOOYrhUOEUFY5TSAm6F5M9yBnkBFypgr3KzOB4YI3XFlr+9BK9f02fCIj/HsB21ApHMJVPnZaIVLS2xGODPnBTo/sZAaEgDNVqH8zQeGCHCw+nqt2OT325Qetyxr7lwBChfo3E1QDY8cVgOLk6bYZBIPl6vtB0Lx9QiYw2YSKbwCDCJWGuJPaU/vvY7fb7HYf/7afaiwP8/ErQEDkHzzlAuonJcLs8eIkVf4P1Z8QEyoGC7B+oqc0xgURqtROmYBwsXiECu3gXEB1sXiESpVFJsCZLiCh6lvbNsSrVNXTWCNUzLsziTNThXhojFAYD5VdKdSqYec0tgkVTtaGEp/OIKNsyLPF/UBYy9SPiEohESBUy0oziUe/ZEeHU0rh4t7B7t+dVreZJm3Nbmvn7+5BL/2v3LytKrzqrtTCGEjsTHl4SXL50HKypHSUfPtZauq0Hi6x60EiiQCVc7ZM4rztgoHXaO84AVAgppjOTrvEgBRWwBqOBnI1lFOLnO9gxwFuk4yKKGfngMwo7GJoOBrI1RBb3qUHGd4H5EOJxCgOhxqOBspqKAExjlM+Al6ulJHidcSuVDmj6Uu4SvFpqD5fsuvwJhUCZ1e+VoVDNUoHayOJsxrZgyR3yF0nkLF5J62KhY5Grc82lLiAwl1N3Njh8/UZdyTbUexoVEunXOJuFJp7J3fMBTqS79xhzTexo1HsQn1I6GqQfmK1dqtmwIEZb5H+G5Cz6QECGxHsesclSRdfitiCV6o43vOHEicl3ohQRIx7TdUVOpTf7AGI4nMZxXb3SOK7M0B5Ed8ob8ExRAe4ywZEwz1NQuCMTbhM4//0+fqM/4kRxV0oTUBoI4ruc8WXZgBTRNFYu3iRam9DaCMKvKkpC/YRBQtVPCWsGQ0zARegpoJ+3DPGl2na3YhPR3Wq36GAhttnI1a1vei4/ObUm7PEhzJ6SWkuoLf/ydfUHk0CpoiPn85Oxce/yv38cQGd70kjJg96gX5aweQFDKifr1MbDgXdYhs3IvcOEAlxwqECJ/hKUyZTohyyGefLNPY/gA6d9GNFJug8f2RE7uUKmsZHMgETKo2zTQs67f5I3Wys0UyjdQqebhv6ihc0SzuMiczLlHR9XLsEJoW0+ojjggZrBs3veNeOCVMjDq7sQZeevGNDhODFhEF2aokvUxVxM+YWKTLynU24ce//cJQHRXBwln+rEhI4/1VOCavW+DJVkYt5BrLuoeD7M2df7e3CTOlORIZKDX4PEb5Q+qfWtAjoOM0aOL5uzJNmgi+yVQhvEdJRcAC+HdtQuM8FT0RXOlYBHecKJNQ5NpxWB7yaULaK6K94EKBmN/+zkJcqlV8tRosXEFB9TAgQcmfWtYYYHMKARqr7cW1iiMeWMu/nCAbU7gR/Fnql1I4VUUDloVlY6DsWbCAGLxigodp3XPgL3FKPargT5cBe1IafySR5A0HBcDfxCgU0mHSPJHvJgqt5rjau4NHDP/RhNJ8ZSvptHffdlBWD10jyJRPPSI/ts6Rf03M7RlZq0DzCfEwfUGdICJb880GV8ht4A4gqP3iXrNCijVCRi/DBQLfT1Tzl7koNaKiXL9I+4f1flbVNjbgRONId2DehqW+OT4n0xUC3UFdcqr7/o4jHiIEJzUf7oShGzBgrbwp2DJz3onwH2jUh/bOPbuGdNpf4Yb6g+Urks2nCL1++k7/GVnZPH6mQfuC8vUREPv0hKFyMb3dW3MJxSw7pB/7jc5HiX2ZhQvJO/DBk+fWtCQ1B5/cQ3w/DKOR8i81kD1Ek7kd0y25qyreuk4+yfygI0rDZej+88jyK9xyTZysWDqXwXcRKSukWOq/b729vj639x7e3983Xw6OriL71xk1oKZ0ZSfVbz5VyBuq6GZjnhayFOW5C082LacGvWqBJ7/uHIf81pXxpfq9MjzAyMXshld63kLUIjR5VwKKHfeOEdoP9SLLXYlojtB4phtL6VrAGYag/S0qVjrPRIJyNm8ml8Wl5dULLCemkSG9sN01oZoaNKvV1qkwY2WiRIlJep6qEM12jmZTXqSJhONs1mkl1nSoSztKPDsWtFLUIZxbrx7VRVtqKSoSatyhVxetoaBHa7B9iqqsgqhDOYxPmUknBFQgtnTSRpFAq8glnVBSKpeBt+ISrM4+E4+J7Gzah7f6oTCdcRC6hjaELnraZuQ2TcNb5tkjHPEQeYWS/PUoQL31jEc4lWRMIHj7VJPRmXTGB4iAyCBcHkIVIJ/TmGemndEhGJBMuFiDDilTCRVqiuaiIRELP7Jy6ET3T4iKNMFqQMDGpY1ICRyJcjEA/LVJFTCAMFyFVE+tkTV5MyQnD+SfbsPbLUn8jJfRW59SUoWmjI/M3MsJo4aLEZ21KNiNOGC6qjxnXiYuuVJQwDBd4C46Er1SMMDqaa0uGoW3Ep8KEYWTuXq917RfAlQoSelcL7UOndAyZESBcChczqf2CeDcKCcNoyQyYa1voVEWEocGb9TPVt45gqU4ThtHLsrjQae0V3M+MU4TRyt68H1NL9bKLEkZXczs5M6ZPjBOE3urC1kkspYwVEWH0j/Blqo/245Aw/BfW57hOOmvlMcIwOlqKHJul/dO17Dw1JQy96HAZA7xcG9uFtcqKF638WN74J9X+5srpjM33f6Pd5sovQYyvAAAAAElFTkSuQmCC"
                                    className={classes.accountIcon}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Card>
            </Container>    
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuthStart:(userData)=>dispatch(actions.authStart(userData))
    }
}

export default  connect(null,mapDispatchToProps)(withStyles(styles)(SignUp));