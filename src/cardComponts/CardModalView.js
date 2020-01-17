import React, { Component } from 'react'
import { Button , Modal,Input, Radio} from 'antd';
import axios from 'axios';
import {server, config} from '../utils/modules';

export default class CardModalView extends Component {
    constructor(props){
        super(props);
        this.state = {
            title : "",
            contents : "",
            ranking : 0,
            edit : false
        }
    }

    componentDidMount () {
        this.setState({
            title : this.props.ViewData.title,
            contents :this.props.ViewData.contents,
            ranking : this.props.ViewData.ranking
        })
    }

    deleteCard = () =>{
        axios.delete(`${server}/card/delete?card_id=${this.props.ViewData.id}`, config)
        .then(res => {
            console.log("card View delete Res", res);
            window.location.reload();
        })
    }

    toggleEdit  = () =>  {
        this.setState({
            edit : !this.state.edit
        })
    }

    onChange = (key , e) => {
      this.setState({
        [key] : e.target.value
      })
    }

    edit = () =>  {
        const editData = {
            title : this.state.title,
            contents : this.state.contents ,
            ranking : this.state.ranking
        }
        axios.patch(`${server}/card/edit?card_id=${this.props.ViewData.id}`, editData, config)
        .then(res => {
            this.setState({
              title : this.state.title,
              contents : this.state.contents,
              ranking : Number(this.state.ranking),
              edit : !this.state.edit
            })
            console.log("Res Card Edit ", res);

        })  
    }

    render() {
        let rank;
        if(this.props.ViewData.ranking === 3){
            rank = "상";
        }else if(this.props.ViewData.ranking === 2){
            rank = "중";
        }else{
            rank = "하";
        }
        if(this.state.edit){
            return (
              <div>
                <Modal
                  visible={this.state.edit}
                  onCancel={this.toggleEdit}
                  footer={(
                    <div>
                      <Button onClick={this.edit}>수정하기</Button>
                      <Button key="back" onClick={this.toggleEdit}>
                        취소하기
                      </Button>
                    </div>
                  )}
                >
                  <div>
                    <Input placeholder={this.state.title} allowClear onChange={(e) => this.onChange("title", e)} />
                    <br />
                    <br />x
                    <Input.TextArea placeholder={this.state.contents} allowClear onChange={(e) => this.onChange("contents", e)} />
                    중요도
                    <br />
                    <Radio.Group>
                      <Radio value="1">상</Radio>
                      <Radio value="2">중</Radio>
                      <Radio value="3">하</Radio>
                    </Radio.Group>
                  </div>
                </Modal>
              </div>
            )
        }
        return (
          <div>
            <Modal
              visible={this.props.cardViewtoggle}
              title={this.state.title}
              onCancel={this.props.onCancel}
              footer={(
                <Button key="back" onClick={this.props.onCancel}>
                Return
                </Button>
              )}
            >
              <Button onClick={this.toggleEdit}>수정</Button>
              <Button onClick={this.deleteCard}>삭제</Button>
              <div>
                <p>내용 : {this.state.contents}</p>
                <p>중요도 : {rank}</p>
              </div>
            </Modal>
          </div>
        )
                 
    }
}
