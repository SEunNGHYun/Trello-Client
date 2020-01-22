/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import axios from 'axios';
import {Button, Input, Avatar, Icon} from'antd';
import {connect} from 'react-redux';
import Head from '../utils/beforeHeader';
import {server, config} from '../utils/modules'
import {logout} from '../redux/actions';

class MyPage extends Component {
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

    userDelete = () => {
        alert("정말 삭제하시겠습니끼?")
        axios.delete(`${server}/user/delete`, config)
        .then(res => {
            if(res.status === 200){
            this.props.logOut();
            this.props.history.push('/');
            }
        })
    }

    render() {
        return (
          <div>
            <Head history={this.props.history} />
            <div className="myPageName">MY Page</div>
            <div className="mypage">
              <div className="userImage">
                <Avatar size={100} icon={<Icon type="user" />} />
              </div>
              {this.state.edit ? (
                <div className="userInfocontents"> 
                  <p>{this.state.email}</p>
                  <Input placeholder="name" onChange={(e)=> this.ChangeState("editName", e)} />    
                  <Input placeholder="password" onChange={(e)=> this.ChangeState("editPassword", e)} />    
                  <Button onClick={this.serverConnect}>수정하기</Button>
                  <Button onClick={this.cancel}>취소하기</Button>     
                </div>
)
            : (
              <div className="userInfocontents">
                <p>{this.state.name}</p>
                <p>{this.state.email}</p>
                <Button onClick={this.userEdit}>수정하기</Button>
                <Button onClick={this.userDelete}>탈퇴하기</Button>
              </div>
          )}
            </div>
          </div>
        )
    }
}

const PropsState = state => ({
    login : state.login
  })
  const mapDispatchToProps = dispatch => ({
    logOut : () => dispatch(logout())
  });
  export default connect(PropsState, mapDispatchToProps)(MyPage)