import React, { Component } from 'react'
import axios from 'axios';
import { Button, Input } from 'antd';
import AddButton from '../utils/AddButton';
import {server,config} from '../utils/modules';
import Container from '../containerComponts/Container';
import Edit from '../utils/EditButton';
import Delete from '../utils/DeleteButton';

export default class Board extends Component {
  constructor(props){
    super(props);
    this.state= {
      add : false,
      containers : null,
      addcontainer  : {},
      edit : false,
      Boardtitle : ''
    }
  }

  componentDidMount(){
    // eslint-disable-next-line react/prop-types
    const {id} = this.props.match.params;
    axios.get(`${server}/container?board_id=${id}`,config)
    .then(res => {
      if(res.status === 204){
        this.setState({
          ...this.state,
          // containers : [{id : 0, title: ""}],
          Boardtitle : this.props.location.state.title
        })
      }else{
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        containers : res.data.result,
        Boardtitle : this.props.location.state.title
      })
    }
    })
    .catch(err=> {
      console.log(err);
    })
  }
  
  ChangeState = (key) => {
    return this.setState({
      [key] : !this.state.key
    })
  }

  onChange = (e, key) => {
    const container = {
      title : e.target.value
    }
    this.setState({
      [key] : container
    })
  }

  connectServer =()=> {
    if(this.state.addcontainer.title){
    const {id} = this.props.match.params;
    axios.post(`${server}/container/create?board_id=${id}`,this.state.addcontainer, config)
    .then(res=>{
      window.location.reload();
      // const Addcontainer = this.state.containers.concat(res.data.result);
      // this.setState({
      //   containers : Addcontainer
      // });
      // this.ChangeState('add');
    })
  }else{
    alert("입력하세요")
  }
  }

  delete = ()=>{
    const {id} = this.props.match.params;
    axios.delete(`${server}/board/delete/${id}`, config)
    .then(res=>{
    if(res.status ===204)
     this.props.history.push('/boardList');
    })
  }

  editButton = () => {
    const Title = {title : this.state.Boardtitle}
    const {id} = this.props.match.params
    axios.patch(`${server}/board/edit/${id}`,Title, config)
    .then(res => {
      const boardTitle = Title.title;
      this.setState({
        Boardtitle: boardTitle.title,
        edit : false
      })

    })
  }

    render() {
      const {title} = this.props.location.state;
        return (
          <div>
            <div>
              {this.state.edit ? (
                <div>
                  <Input placeholder={title} onChange={(e) => this.onChange(e, 'Boardtitle')} /> 
                  <Button onClick={this.editButton}>수정하기</Button> 
                </div>
            ): <h1>{this.state.Boardtitle}</h1>}
              <Edit confirm={this.ChangeState} />   <Delete confirm={this.delete} />
            </div> 
            {this.state.containers === null ? <h1>비어있습니다.</h1> : 
            this.state.containers.map((container)=> {
              return(
                <div key={container.id}>
                  <Container title={container.title} containerId={container.id} />
                </div>
              )}
            )}
            <AddButton toggle={()=>this.ChangeState('add')} name='container' />
            {this.state.add ? (
              <div>
                <Input onChange={(e) =>this.onChange(e, 'addcontainer')} placeholder="제목" />
                <Button onClick={this.connectServer}>추가하기</Button>
              </div>
          ) : <div />}
          </div>
        )}
}