import React, { Component } from 'react'
import axios from 'axios';
import {Input, Button} from 'antd';
import { Link } from "react-router-dom";
import Head from '../utils/Header';
import {server, config}from '../utils/modules'
import AddButton from '../utils/AddButton';

export default class Bordlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            addToggle : false,
            list : [],
            boardTitle :''
        }
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

    ToggleAdd =()=>{
        this.setState({
            addToggle : !this.state.addToggle
        })
    }

    titleAdd = async (value) => {
        await this.setState({
            boardTitle : value
        })
        const titleObj = {title : this.state.boardTitle} 
        axios.post(`${server}/board/create`,titleObj, config)
        .then(res => {
            window.location.reload();
        })
    }

    render() {
        return (
          <div>
            <Head />
            <p className="myPageName">My Boards</p>
            {this.state.list.map(data =>{
              console.log("Data", data)
              return (
                <div key={data.id} className="boardName">
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
            <AddButton toggle={this.ToggleAdd} />
            {this.state.addToggle?(
              <div className="boardAdd"> 
                <Input.Search
                  placeholder="board의 이름을 적어주세요"
                  enterButton="Add"
                  size="large"
                  onSearch={value => this.titleAdd(value)}
                />
              </div>
): <p />}
          </div>
        )
    }
}
