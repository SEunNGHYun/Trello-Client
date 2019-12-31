import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import axios from'axios';
import {connect} from 'react-redux';
import {server} from './modules';
import {checkuser, logout} from './redux/actions'

 class Main extends Component {
   

   componentDidMount(){
     axios('http://127.0.0.1:4000',{withCredentials: true}).then(res=> {
       if(res.status ===200){
         this.props.checkuser();
       }
     })
     .catch(err => {
       if(err){
         this.props.history.push('/');
       }
     })
   }

   logOut = () => {
     axios.get(`${server}/user/logout`, {withCredentials: true})
     .then(res => {
       if(res.status === 200){
         this.props.logOut();
       }
     }).catch(err => {
       console.log('로그아웃이 안됨')
     })
  }

    render() {
      console.log("?", this.props.login);
        return (
          <div>
            {this.props.login ? (
              <header>
                <Button onClick={this.logOut}>
                로그아웃 
                </Button>
              </header>
            )
           : (
             <header>
            메인
               <Button>
                 <Link to="/logIn">로그인</Link>
               </Button>
               <Button>
                 <Link to="/signup">회원가입</Link>
               </Button>
             </header>
           )}
          </div>
        )
    }
}
const PropsState = state => ({
  login : state.login
})
const mapDispatchToProps = dispatch => ({
  checkuser: () => dispatch(checkuser()),
  logOut : () => dispatch(logout())
});
export default connect(PropsState, mapDispatchToProps)(Main)