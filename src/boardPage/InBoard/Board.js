import React, { Component } from 'react'
import axios from 'axios';
import { Button, Input , Col,Row} from 'antd';
import Head from "../../utils/Header";
import AddButton from '../../utils/AddButton';
import {server,config} from '../../utils/modules';
import Container from '../../containerComponts/Container';
import Edit from '../../utils/EditButton';
import Delete from '../../utils/DeleteButton';

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
      [key] : !this.state[key]
    })
  }

  onChange = async(value, key) => {
    const container = {
      title : value
    }
    await this.setState({
      [key] : container
    })
    this.connectServer();
  }

  connectServer =()=> {
    if(this.state.addcontainer.title){
    const {id} = this.props.match.params;
    axios.post(`${server}/container/create?board_id=${id}`,this.state.addcontainer, config)
    .then(res=>{
      window.location.reload();
    })
  }else{
    alert("입력하세요")
  }
  }

  delete = ()=>{
    const {id} = this.props.match.params;
    console.log("delete", id);
    axios.delete(`${server}/board/delete/${id}`, config)
    .then(res=>{
      console.log("res delete board", res);
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
            <Head />
            <div>
              <div>
                {this.state.edit ? (
                  <div>
                    <Input placeholder={title} onChange={(e) => this.onChange(e, 'Boardtitle')} /> 
                    <Button onClick={this.editButton}>수정하기</Button> 
                  </div>
            ): <div style={{fontSize : "40px", paddingLeft: "10px", paddingBottom: "10px"}}>{this.state.Boardtitle}</div>}
                <Edit confirm={this.ChangeState} />   <Delete confirm={this.delete} />
              </div>
              <Row style={{paddingLeft : "20px", paddingBottom : "10px"}} gutter={20}>
                {this.state.containers === null ? <h1>비어있습니다.</h1> : 
            this.state.containers.map((container)=> {
              return(
                <Col span={6}>
                  <span styke={{ paddingLeft : "10px", paddingBottom : "10px"}} key={container.id}>
                    <Container title={container.title} containerId={container.id} />
                  </span>
                </Col>
              )}
            )}
              </Row> 
            </div>
            <div style={{float : "bottom"}}>
              <AddButton toggle={()=>this.ChangeState('add')} name='container' />
              {this.state.add ? (
                <div className="mypage">
                  <Input.Search
                    placeholder="container의 이름을 적어주세요"
                    enterButton="Add"
                    size="large"
                    onSearch={value => this.onChange(value, "addcontainer")}
                  />
                </div>
          ) : <div />}
            </div>
          </div>
        )}
}