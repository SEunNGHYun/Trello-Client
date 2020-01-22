import React, { Component } from 'react'
import { Button } from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {server, config} from './modules';
import {logout} from '../redux/actions'

class Header extends Component {
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
          <header className="TrelloW">
            TrelloW
            <span style={{marginLeft : "74%"}}>
              <Button type="link" ghost onClick={this.logOut}>
                로그아웃 
              </Button>
              <Link to="/mypage">
                <Button type="link" ghost>MY PAGE</Button>
              </Link>
              <Link to='/boardList'>
                <Button type="link" ghost>My Boards</Button>
              </Link>
            </span>
          </header>
        )
    }
}

const PropsState = state => ({
    login : state.login
  })
  const mapDispatchToProps = dispatch => ({
    logOut : () => dispatch(logout())
  });
  export default connect(PropsState, mapDispatchToProps)(Header)