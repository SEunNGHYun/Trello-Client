import React, { Component } from 'react'
import axios from 'axios';
import  { Icon } from 'antd';
import {server, config} from '../utils/modules';

export default class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            iconClick : false,
            cards : [] 
        }
     }

    componentDidMount(){
        axios.get(`${server}/card?container_id=${this.props.containerId}`,config)
        .then(res => {
            console.log("?", res);
            const cards = res.data.result
            this.setState({
                cards 
            })
        })
    }

    toggleAdd = ()=> {
        this.setState({
            iconClick : !this.state.iconClick
        })
    }

    render() {
        console.log(">", this.state);
        return (
          <div>
            <h3>{this.props.title}</h3>
            {this.state.cards.map(card => {
              return (
                <div>
                  {card.title}
                </div>
              )}
            )}
            <Icon type='plus' onClick={this.toggleAdd} />
          </div>
        )
    }
}
