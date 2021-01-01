import React, {Component} from 'react';
import {Route , Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import LoginEmail from './Containers/login/email/login-email';
import LoginPassword from './Containers/login/password/login-password';
import SignUp from './Containers/signup/signup';
import Dashboard from './Containers/Dashboard/Dashboard';
import UploadData from './Containers/NewChart/UploadData/UploadData';
import CheckDescribe from './Containers/NewChart/CheckDescribe/CheckDescribe';
import Visualize from './Containers/NewChart/Visualize/Visualize';
import Publish from './Containers/NewChart/Publish/Publish';
import * as actions from './store/actions/index';

class App extends Component{
  componentDidMount(){
    this.props.onCheckAuthState()
  }

  render(){
    let routes=(
      <Switch>
        <Route path="/" exact><Redirect to="/signin" /></Route>
        <Route path="/signin" exact component={LoginEmail} />
        <Route path="/signin/pwd" exact component={LoginPassword} />
        <Route path="/signup" exact component={SignUp} />
        {/* <Redirect to="/" /> */}
      </Switch>
    )
      
    if(this.props.isAuthenticated){
      routes=(
        <Layout>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/chart" exact>
              <Redirect to="/chart/upload" />
            </Route>
            <Route path="/chart/upload" exact component={UploadData} />
            <Route path="/chart/describe" component={CheckDescribe} />
            <Route path="/chart/visualize" component={Visualize} />
            <Route path="/chart/publish" component={Publish} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      )
    }

    return(
      <Auxiliary>
        {routes}
      </Auxiliary>
    )
  }
}

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.authenticated
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onCheckAuthState:()=>dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);