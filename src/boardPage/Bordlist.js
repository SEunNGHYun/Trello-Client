import React, { Component } from 'react'
import axios from 'axios';
import {Input, Button} from 'antd';
import { Link } from "react-router-dom";
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

    titleAdd = (e) => {
        this.setState({
            boardTitle : e.target.value
        })
    }

    addBoard = () =>{
        const titleObj = {title : this.state.boardTitle} 
        axios.post(`${server}/board/create`,titleObj, config)
        .then(res => {
            window.location.reload();
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
            <AddButton toggle={this.ToggleAdd} />
            {this.state.addToggle?(
              <div> <Input onChange={(e)=>this.titleAdd(e)} />
                <Button onClick={this.addBoard}>추가하기</Button>
              </div>
): <p />}
          </div>
        )
    }
}
