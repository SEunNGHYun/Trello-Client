import React, { Component } from 'react'
import axios from 'axios';
import { Button, Input } from 'antd';
import AddButton from '../utils/AddButton';
import {server,config} from '../utils/modules';
import Card from '../Cardcomponents/Card';

export default class Container extends Component {
  constructor(props){
    super(props);
    this.state= {
      add : false,
      containers : [],
      addcontainer  : {}
    }
  }

  componentDidMount(){
    // eslint-disable-next-line react/prop-types
    const {id} = this.props.match.params;
    axios.get(`${server}/container?board_id=${id}`,config)
    .then(res => {
       console.log("Res", res);
      if(res.status === 204){
        this.setState({
          containers : [{id : 0, title: ""}]
        })
      }else{
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        containers : res.data.result
      })
    }
    })
    .catch(err=> {
      console.log(err);
    })
  }
  
  toggleADD = () => {
    return this.setState({
      add : !this.state.add
    })
  }

  Addcotaniner = (e) => {
    const container = {
      title : e.target.value
    }
    this.setState({
      addcontainer : container
    })
  }

  connectServer =()=> {
    const {id} = this.props.match.params;
    axios.post(`${server}/container/create?board_id=${id}`,this.state.addcontainer, config)
    .then(res=>{
      const Addcontainer = this.state.containers.concat(res.data.result);
      this.setState({
        containers : Addcontainer
      });
      this.toggleADD();
    })
  }


    render() {
      const {title} = this.props.location.state;
        return (
          <div>
            <h1>{title}</h1>
            {this.state.containers.map((container)=> {
              return(
                <div key={container.id}>
                  <Card title={container.title} containerId={container.id} />
                </div>
              )}
            )}
            <AddButton toggle={this.toggleADD} />
            {this.state.add ? (
              <div>
                <Input onChange={(e) =>this.Addcotaniner(e)} placeholder="제목" />
                <Button onClick={this.connectServer}>추가하기</Button>
              </div>
          ) : <div />}
          </div>
        )}
}