import React, { Component } from 'react';
import history from '../../History';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, FormGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import '../../styles/login.css';
const avatar = require('../../assets/img/avatar.png');

export default class LoginBox extends Component {
  render(){
    return (
        <div className="Login">
          <div className="box">
            <div className="avatar">
              <img className="userPic" src={avatar} alt="avatar"/>
            </div>
              <Form>
                <div className = "iconInput"> 
                  <FormGroup>
                    <FontAwesomeIcon className="icons" icon={faUser} />
                    <FormControl className="username" autofocus type="text" placeholder="Username"/>
                  </FormGroup>
                  <FormGroup>
                    <FontAwesomeIcon className="icons" icon={faKey} />
                    <FormControl className="password" autofocus type="password" placeholder="Password"/>
                  </FormGroup>
                </div>
                <Button className="loginBtn" block size="lg" type="submit" onClick={() => history.push('/MtsDisplay')}>LOGIN</Button>
              </Form>
          </div>
        </div>
    );
  }
}


