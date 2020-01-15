import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import axios from'axios';
import {connect} from 'react-redux';
import {server, config} from './utils/modules';
import {checkuser, logout} from './redux/actions'

class Main extends Component {

  componentDidMount(){
    axios(server,config).then(res=> {
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
    axios.get(`${server}/user/logout`, config)
    .then(res => {
      if(res.status === 200){
        this.props.logOut();
      }
    }).catch(err => {
      console.log('로그아웃이 안됨')
    })
  }

    render() {
        return (
          <div>
            {this.props.login ? (
              <header>
                <Button onClick={this.logOut}>
                로그아웃 
                </Button>
                <Link to="/mypage">
                  <Button>MY PAGE</Button>
                </Link>
                <Link to='/boardList'>
                  <Button>My Boards</Button>
                </Link>
                
              </header>
            )
          : (
            <header>
            메인
              <Link to="/logIn">
                <Button>로그인</Button>
              </Link>
              <Link to="/signup">
                <Button>회원가입</Button>
              </Link>
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