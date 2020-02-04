import React, { Component } from 'react'
import { Icon} from 'antd';

export default class beforeHeader extends Component {
    home = () => {
        this.props.history.push('/')
    }

    render() {
        return (
          <header className="TrelloW">
          TrelloW
            <Icon
              style={{ paddingLeft : "91%"}}
              type="home"
              onClick={this.home}
            />
          </header>
        )
    }
}
