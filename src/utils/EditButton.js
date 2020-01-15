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
              title="수정하시겠습니까?"
              onConfirm={()=>this.props.confirm('edit')}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Edit</a>
            </Popconfirm>
          </span>
        )
    }
}
