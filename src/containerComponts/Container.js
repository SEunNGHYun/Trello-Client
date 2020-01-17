import React, { Component } from 'react'
import axios from 'axios';
import { Icon, Button,Card} from 'antd';
import 'antd/dist/antd.css';
import {server, config} from '../utils/modules';
import CardInputModal from '../cardComponts/CardInputModal';
import CardViewModal from '../cardComponts/CardModalView';

export default class Container extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards : null,
            cardAddToggle: false,
            cardViewtoggle : false
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
        console.log("this.sta", this.state);
        const {cardViewtoggle, cardAddToggle} = this.state;
        return (
          <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Card
              title={this.props.title}
            >
              <CardInputModal cardAddToggle={cardAddToggle} Click={this.toggleAdd} containerId={this.props.containerId} />
              {this.state.cards === null ? <h3>비어있습니다.</h3>: this.state.cards.map(card => {
              return (
                <div key={card.id}>
                  <Button type="link" onClick={this.toggleView}>{card.title}</Button>
                  <CardViewModal cardViewtoggle={cardViewtoggle} onCancel={this.toggleView} containerId={this.props.containerId} ViewData={card} />
                </div>
              )})}
              <Icon type='plus' onClick={this.toggleAdd} />
            </Card>
          </div>
        )
    }
}
