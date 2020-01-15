import React, { Component } from 'react'
import axios from 'axios';
import { Button , Modal} from 'antd';
import {server,config} from '../utils/modules';
import ModalCard from './ModalCard';

export default class Card extends Component {
    componentDidMount(){
        
    }

    connetserver = ()=>{
        axios.post(`${server}/card/`, config)
    }

    render() {
        return (
          <div>
            <Button />
            <Modal
              visible={this.state.cardAddToggle}
              onOk={this.toggleAdd}
              title="추가하기"
              onCancel={this.toggleAdd}
              footer={(
                <Button key="back" onClick={this.toggleAdd}>
                Return
                </Button>
              )}
            />
          </div>
        )
    }
}
