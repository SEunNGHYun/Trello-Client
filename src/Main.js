import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Button } from 'antd';

export default class Main extends Component {
    render() {
        return (
          <div>
                메인
            <Button>
              <Link to="/logIn">로그인</Link>
            </Button>
            <Button>
              <Link to="/signup">회원가입</Link>
            </Button>
          </div>
        )
    }
}
