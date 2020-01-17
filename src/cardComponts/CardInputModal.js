import React, { Component } from 'react'
import { Button , Modal, Input , Radio } from 'antd';
import axios from 'axios';
import {server, config} from '../utils/modules';

const RadioGroup = Radio.Group;

export default class CardInputModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      title : "",
      contents : "",
      ranking : null
    }
  }
  

  connectServer = () => {
    console.log("this.state in card", this.state)
    axios.post(`${server}/card/create?container_id=${this.props.containerId}`, this.state , config)
    .then(res =>{
       console.log("input Card ",res)
       window.location.reload();
    })
  }

  onChange = (key, e) => {
    this.setState({
      [key] : e.target.value
    })
  }
  

    render() {
      const { TextArea } = Input;
        return (
          <div>
            <Modal
              visible={this.props.cardAddToggle}
              onOk={this.connectServer}
              title="추가하기"
              onCancel={this.props.Click}
              footer={(
                <div>
                  <Button key="back" onClick={this.props.Click}>
                  Return
                  </Button>
                  <Button onClick={this.connectServer}>
                  Create
                  </Button>
                </div>
              )}
            >
              <div>
                <Input placeholder="제목" allowClear onChange={(e) => this.onChange("title", e)} />
                <br />
                <br />
                <TextArea placeholder="내용" allowClear onChange={(e) => this.onChange("contents", e)} />
                <h3>중요도</h3>
                <RadioGroup value={this.state.ranking} onChange={(e)=> this.onChange("ranking", e)}>
                  <Radio value="1">상</Radio>
                  <Radio value="2">중</Radio>
                  <Radio value="3">하</Radio>
                </RadioGroup>
              </div>
            </Modal>
          </div>
        )
    }
}
