import React, { Component } from 'react'
import {Button, Icon} from 'antd';

export default class AddButton extends Component {
    render() {
        return (
          <div className="addButton">
            <Button onClick={this.props.toggle}>
              <Icon type="plus" />
            ADD
            </Button>
          </div>
        )
    }
}
