import React, { Component } from 'react'
import axios from 'axios';
import { Route, Link } from "react-router-dom";
import {server, config}from '../utils/modules'

export default class Bordlist extends Component {
    state = {
        list : []
    }

    componentDidMount(){
        axios(`${server}/board/list`,config)
        .then(res =>{
            const result = res.data.list;
            this.setState({
                list : result
            })
        })
    }

    render() {
        return (
          <div>
            {this.state.list.map(data =>{
              return (
                <div key={data.id}>
                  <Link to={{
                      pathname : `board/${data.id}`,
                      state : {
                          title : data.title
                      }
                    }}
                  >
                    {data.title}
                  </Link>
                </div>
              )
         })}
          </div>
        )
    }
}
