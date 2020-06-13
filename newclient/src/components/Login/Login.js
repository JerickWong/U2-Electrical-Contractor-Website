import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import '../../styles/login.css';
const avatar = require('../../assets/img/avatar.png');


export default class LoginBox extends Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect from='/' to='/Mts' />
    }
  }
  render() {
    return (
      <Switch>
        <div className="Login">
          <div className="box">
            <div className="avatar">
              <img className="userPic" src={avatar} alt="avatar" />
            </div>
            <div className="iconInput">
              <FormGroup>
                <FontAwesomeIcon className="icons" icon={faUser} />
                <FormControl className="username" autofocus type="text" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <FontAwesomeIcon className="icons" icon={faKey} />
                <FormControl className="password" autofocus type="password" placeholder="Password" />
              </FormGroup>
            </div>
            <div>
              {this.renderRedirect()}
              <Button className="loginBtn" block size="lg" type="submit" onClick={this.setRedirect}>
                LOGIN
            </Button>
            </div>
          </div>
        </div>
      </Switch>
    );
  }
}


