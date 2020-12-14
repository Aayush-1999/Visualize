import React, {Component} from 'react';
import {Route , Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Dashboard from './Containers/Dashboard/Dashboard';
import UploadData from './Containers/NewChart/UploadData/UploadData';
import CheckDescribe from './Containers/NewChart/CheckDescribe/CheckDescribe';
import Visualize from './Containers/NewChart/Visualize/Visualize';
import Publish from './Containers/NewChart/Publish/Publish';

class App extends Component{
  render(){
    return(
      <Layout>
        <Route path="/" exact component={Dashboard} />
        <Route path="/chart" exact>
          <Redirect to="/chart/upload" />
        </Route>
        <Route path="/chart/upload" exact component={UploadData} />
        <Route path="/chart/describe" component={CheckDescribe} />
        <Route path="/chart/visualize" component={Visualize} />
        <Route path="/chart/publish" component={Publish} />
      </Layout>
    )
  }
}

export default App;