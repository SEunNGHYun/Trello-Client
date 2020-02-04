import React,{Component} from 'react';
import {Route} from 'react-router-dom'; 
import MyPage from './PrivatePages/MyPage';
import SignUp from './signPage/Signup';
import logIn from "./signPage/logIn"
import Main from './Main';
import Board from './boardPage/InBoard/Board';
import BoardList from './boardPage/Bordlist';

class Routes extends Component {
  render(){
    return (
      <div>
        <Route exact path='/' component={Main} />
        <Route exact path='/mypage' component={MyPage} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/logIn' component={logIn} />
        <Route exact path='/boardList' component={BoardList} />
        <Route exact path="/board/:id" component={Board} />
      </div>
    )}
}

export default Routes;
