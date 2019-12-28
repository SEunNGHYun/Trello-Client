import React,{Component} from 'react';
import {Route} from 'react-router-dom'; 
import SignUp from './signPage/Signup';
import logIn from "./signPage/logIn"
import Main from './Main';

class Routes extends Component {
  render(){
    return (
      <div>
        <Route exact path='/' component={Main} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/logIn' component={logIn} />
      </div>
    )}
}

export default Routes;
