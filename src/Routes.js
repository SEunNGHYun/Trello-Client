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
        <Route path='/mypage' component={MyPage} />
        <Route path='/signup' component={SignUp} />
        <Route path='/logIn' component={logIn} />
        <Route path='/boardList' component={BoardList} />
        <Route path="/board/:id" component={Board} />
      </div>
    )}
}

export default Routes;
