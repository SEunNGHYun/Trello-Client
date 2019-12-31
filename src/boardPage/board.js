import React, { Component } from 'react'
import axios from 'axios';
import {server} from '../modules';

export default class Board extends Component {
  state = {
    title :''
  }

  componentDidMount(){
    axios.get(`${server}/board`,{
      headers : {
        Cookie : 'user=token'
      }
    })
  }

    render() {
        return (
          <div>
            {this.state.title}
          </div>
        )
    }
}
