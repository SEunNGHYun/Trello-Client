import React, { Component } from 'react'
import axios from 'axios';
import { Icon} from 'antd';
import 'antd/dist/antd.css';
import {server, config} from '../utils/modules';
import Card from '../cardComponts/Card';

export default class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards : null,
        }
     }

    componentDidMount(){
        axios.get(`${server}/card?container_id=${this.props.containerId}`,config)
        .then(res => {
            const cards = res.data.result
            this.setState({
                cards 
            })
        })
    }

    toggleAdd = ()=> {
        this.setState({
            cardAddToggle : !this.state.cardAddToggle
        })
    }

    toggleView = ()=> {
        this.setState({
            cardViewtoggle : !this.state.cardViewtoggle
        })
    }

    render() {
        return (
          <div>
            <h3>{this.props.title}</h3>
            <Icon type='plus' onClick={this.toggleAdd} />
            {this.state.cards === null ? <h3>비어있습니다.</h3>: this.state.cards.map(card => {
              return (
                <Card />
              )})}
          </div>
        )
    }
}
