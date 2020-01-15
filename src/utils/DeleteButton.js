import React, { Component } from 'react'
import { Popconfirm, message} from 'antd';

export default class DeleteButton extends Component {

    cancel = () => {
        message.error("취소되었습니다.")
    }

    render() {
        return (
          <span>
            <Popconfirm
              title="삭제하시겠습니까?"
              onConfirm={this.props.confirm}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        )
    }
}
