import React, { Component } from 'react'
import axios from 'axios';
import { Icon, Button,Card, Input} from 'antd';
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
            cardViewtoggle : false,
            edit : false,
            container : ""
        }
     }

    componentDidMount(){
        axios.get(`${server}/card?container_id=${this.props.containerId}`,config)
        .then(res => {
            const cards = res.data.result
            this.setState({
                cards ,
                container : this.props.title
            })
        })
    }

    toggle = (key)=> {
        this.setState({
            [key] : !this.state[key]
        })
    }

    delete = () => {
      axios.delete(`${server}/container/delete?container_id=${this.props.containerId}`,config)
      .then(res=> {
        if(res.status === 204){
        window.location.reload();
        }
      })
    }

    edit = async (value)=> {
      await this.setState({
        container : value
      })
      const containerText = {
        title : this.state.container
      }
      axios.patch(`${server}/container/edit?container_id=${this.props.containerId}`,containerText,config)
      .then(res=> {
        if(res.status ===204){
          this.toggle("edit")
        }
      })
    }

    render() {
        console.log("this.sta", this.state);
        const {cardViewtoggle, cardAddToggle} = this.state;
        return (
          <div className="containers">
            <Card
              style={{width : 400, height : 230 }}
            >
              {this.state.edit ? (
                <Input.Search
                  onSearch={(value)=> this.edit(value)} 
                  size="large"
                  enterButton="edit"
                  placeholder={this.state.container}
                />
                
            ) : (
              <div style={{fontSize : 30}}>
                {this.state.container}
              </div>
            )}
              <div style={{width : 335, height : 1, backgroundColor : "grey" , marginRight:10}} />
              <span style={{paddingLeft: "85%"}}>
                <Icon style={{paddingRight :"3%"}} type='edit' onClick={()=>this.toggle("edit")} />
                <Icon type='delete' onClick={this.delete} />
              </span>
              <CardInputModal cardAddToggle={cardAddToggle} Click={this.toggle} containerId={this.props.containerId} />
              {this.state.cards === null ? <h3>비어있습니다.</h3>: 
              this.state.cards.map(card => {
                return (
                  <div className="Cards" key={card.id}>
                    <Button type="link" onClick={()=> this.toggle("cardViewtoggle")}>{card.title}</Button>
                    <CardViewModal cardViewtoggle={cardViewtoggle} onCancel={this.toggle} containerId={this.props.containerId} ViewData={card} />
                  </div>
              )})}
              <div>
                <Icon type='plus' onClick={()=>this.toggle("cardAddToggle")} />
              </div>
            </Card>
          </div>
        )
    }
}
