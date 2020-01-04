import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Input, Button} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import {loginCheck} from '../redux/actions';
import {server, config} from '../utils/modules';

class LogIn extends Component {
constructor(props){
  super(props);
  this.state = {
    email: '',
    password : ''
  }
  this.ChangeStates = this.ChangeStates.bind(this);
  this.logIn = this.logIn.bind(this);
}

  ChangeStates(e, key){
    this.setState({
      [key] : e.target.value
    })
  }

  logIn (){
    axios.post(`${server}/user/login`,this.state,config)
    .then(res => {
      if(res.status === 200){
        this.props.logincheck();
        this.props.history.push('/')
      }else{
        alert('다시 시도해주세요')
      }
    })
    .catch(()=>alert('다시 시도해주세요'))
  }

    render() {
        return (
          <div>
            <div>
            email :  <Input placeholder="aaaa@fffff.com" onChange={(e)=>this.ChangeStates(e, 'email')} />
            </div>
            <div>
            Password : <Input.Password placeholder='password' onChange={e=>this.ChangeStates(e, 'password')} />
            </div>
            <Button onClick={this.logIn}>로그인 하기
            </Button>
            <Button>
              <Link to='/signup'>회원가입하기</Link>
            </Button>
          </div>
        )
    }
}
const mapStateToProps = state => ({
  login : state.login
})
const mapDispatchToProps = dispatch => ({
  logincheck: () => dispatch(loginCheck())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);