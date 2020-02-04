/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { Button, Input } from "antd";
import axios from 'axios';
import Head from '../utils/beforeHeader';
import {server} from '../utils/modules';

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : '',
      email: '',
      password : ''
    };
    this.ChangeStates = this.ChangeStates.bind(this)
  }

  onClose = () => {
    this.props.history.push("/logIn");
  }

    Signup=()=>{
      const {email, password, name} = this.state;
      if(email.length === 0 || password.length === 0  || name.length === 0 ){
        return alert("정보가 없습니다.")
      }
      return axios.post(`${server}/user/signup`,{    
        data: this.state
      })
      .then(resData => {
        if(resData.status === 201){
           alert("회원가입 완료");
          return this.props.history.push('/login');
         }
         return alert("사용중인 email입니다.")
       })
    }

    ChangeStates(e, key){
      this.setState({
        [key] : e.target.value
      })
    }

    render() {
        return (
          <div>
            <Head history={this.props.history} />
            <div className="signPage">
              <span>
            email <Input placeholder="aaaa@fffff.com" onChange={(e)=>this.ChangeStates(e, 'email')} />
              </span>
              <div>
            이름<Input placeholder="name" onChange={(value)=>this.ChangeStates(value, 'name')} />
              </div>
              <div>
            password <Input.Password placeholder="password" onChange={(value)=>this.ChangeStates(value, 'password')} />
              </div>
              <div style={{ paddingBottom : 10}} />
              <Button className='signup-button' type='primary' onClick={this.Signup}>회원 가입</Button>
            </div>
          </div>
        )
    }
}
