/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import axios from 'axios';
import {Button, Input} from'antd';
import {server, config} from '../utils/modules';

export default class MyPage extends Component {
    state = {
        name : '',
        email : '',
        edit : false,
        editName : '',
        editPassword : '',
    }
    
    componentDidMount (){
        axios(`${server}/user`,config)
        .then(res => {
            const { email , name }= res.data.userInfo;
            this.setState({
                email,
                name
            })
        })
        .catch(err =>{
            console.log("err",err)
        })
    }

    ChangeState = (key, e)=>{
        this.setState({
            [key] : e.target.value
        })
    }

    userEdit=()=>{
        this.setState({
           edit : !this.state.edit 
        })
    }

    serverConnect=() => {
        if(this.state.editPassword.length> 0 && this.state.editName.length> 0){
        const Edit = {
            name : this.state.editName,
            password : this.state.editPassword
        }
        axios.patch(`${server}/user/edit`,Edit, config)
        .then(res=> {
            if(res.status === 200){
                window.location.reload();
            }
        })
    }else{
        alert("모두 입력하세요")
    }
    }

    cancel = () => {
        window.location.reload();
    }

    render() {
        return (
          <div>
            {this.state.edit ? (
              <div> 
                <p>{this.state.email}</p>
                <Input placeholder="name" onChange={(e)=> this.ChangeState("editName", e)} />    
                <Input placeholder="password" onChange={(e)=> this.ChangeState("editPassword", e)} />    
                <Button onClick={this.serverConnect}>수정하기</Button>
                <Button onClick={this.cancel}>취소하기</Button>     
              </div>
)
            : (
              <div>
                <p>{this.state.name}</p>
                <p>{this.state.email}</p>
                <Button onClick={this.userEdit}>수정하기</Button>
              </div>
          )}
          </div>
        )
    }
}
