/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react'
import axios from 'axios';
import {server, config} from '../utils/modules';

export default class MyPage extends Component {
    state = {
        name : '',
        email : '',
        password : ''
    }
    
    componentDidMount (){
        axios(`${server}/user`,config)
        .then(res => {
            const { email , password, name }= res.data.userInfo;
            this.setState({
                email,
                password,
                name
            })
        })
        .catch(err =>{
            console.log("err",err)
        })
        
    }

    render() {
        console.log("상태",this.state)
        return (
          <div>
            <p>{this.state.name}</p>
            <p>{this.state.email}</p>
            <p>{this.state.password}</p>
          </div>
        )
    }
}
