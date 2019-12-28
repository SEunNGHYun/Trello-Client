/* eslint-disable react/no-unused-state */
import React, { Component } from 'react'
import { Button, Input } from "antd";
import axios from 'axios';
import {server} from '../modules';

export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name : '',
      email: '',
      password : ''
    };
  }

    Signup=()=>{
      const {email, password, name} = this.state;
      if(email.length === 0 || password.length === 0  || name.length === 0 ){
        return alert('모두 입력해주세요')
      }
      return axios.post(`${server}/user/signup`,{    
        data: this.state
      })
      .then(resData => {
        if(resData.status === 201){
          alert('회원가입 성공')
        }else{
          alert('존재하는 회원입니다')
        }
      })
    }

    ChangeStates(e, key){
      console.log("k", e.target.value)
      this.setState({
        [key] : e.target.value
      })
    }

    render() {
        return (
          <div>
            <div>
            email :  <Input placeholder="aaaa@fffff.com" onChange={(e)=>this.ChangeStates(e, 'email')} />
            </div>
            <div>
            이름 : <Input placeholder="name" onChange={(value)=>this.ChangeStates(value, 'name')} />
            </div>
            <div>
            password : <Input.Password placeholder="password" onChange={(value)=>this.ChangeStates(value, 'password')} />
            </div>
            <Button className='signup-button' type='primary' onClick={this.Signup}>회원 가입</Button>
          </div>
        )
    }
}
