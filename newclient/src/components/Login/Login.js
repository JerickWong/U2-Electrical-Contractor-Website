import React, { Component } from 'react';
// import history from '../../History';
import { useHistory } from 'react-router-dom'
import { Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, FormGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import '../../styles/login.css';
import UserAlert from "../UserAlert/UserAlert";
import Authentication from '../Firestore/auth'
const avatar = require('../../assets/img/avatar.png');


export default class LoginBox extends Component {
  state = {
    redirect: false,
    wrongCredentials: false,
    errorMessage: ''
  }
  setRedirect = (result, message) => {
    this.setState({
      redirect: result,
      wrongCredentials: !result,
      errorMessage: message
    })
    console.log(message)
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect from='/' to='/Mts' />
    }
  }

  checkCredentials = () => {
    const username = document.querySelector('input[name="username"]').value
    const password = document.querySelector('input[name="password"]').value
    Authentication.login(username, password, this.setRedirect)
  }

  renderError = () => {
    if (this.state.wrongCredentials)
      return <UserAlert severity='error' message={this.state.errorMessage} />
    else 
      return ''
  }

  render() {
    return (
      <Switch>        
        <div className="Login">        
          <div className="box">
          {this.renderError()}
            <div className="avatar">
              <img className="userPic" src={avatar} alt="avatar" />
            </div>
            <div className="iconInput">              
              <FormGroup>
                <FontAwesomeIcon className="icons" icon={faUser} />
                <FormControl name='username' className="username" autofocus type="text" placeholder="Username" />
              </FormGroup>
              <FormGroup>
                <FontAwesomeIcon className="icons" icon={faKey} />
                <FormControl name='password' className="password" autofocus type="password" placeholder="Password" />
              </FormGroup>
            </div>
            <div>
              {this.renderRedirect()}
              <Button className="loginBtn" block size="lg" type="submit" onClick={this.checkCredentials}>
                LOGIN
            </Button>
            </div>
          </div>
        </div>
      </Switch>
    );
  }
}


