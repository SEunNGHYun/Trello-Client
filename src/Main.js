import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { Button } from 'antd';
import axios from'axios';
import {connect} from 'react-redux';
import {server, config} from './utils/modules';
import {checkuser} from './redux/actions'

class Main extends Component {

  componentDidMount(){
    axios.get(server,config).then(res=> {
      if(res.status ===200){
        this.props.checkuser();
      }
    })
    .catch(err => {
      if(err){
        this.props.history.push('/');
      }
    })
  }

    render() {
        return (
          <div>
            {this.props.login ? this.props.history.push("/boardList")
          : (
            <div>
              <header className="TrelloW">
                TrelloW
              </header>
              <div className="Main">
                <div className="mainContents">
                  자신의 할 일을 적어보세요
                </div>
                <Link to="/logIn">
                  <Button>로그인</Button>
                </Link>
                <Link to="/signup">
                  <Button>회원가입</Button>
                </Link>
              </div>
            </div>
          )}
          </div>
        )
    }
}
const PropsState = state => ({
  login : state.login
})
const mapDispatchToProps = dispatch => ({
  checkuser: () => dispatch(checkuser())
});
export default connect(PropsState, mapDispatchToProps)(Main)