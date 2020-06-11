import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, FormGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import './App.css';
import { useHistory } from "react-router-dom";

const avatar = require('./avatar.png');

function Login() {

  const history = useHistory();

  const routeChange = () =>{ 
    let path = `path`; 
    history.push(path);
  }

  return (
    <div className="center">
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
          <Button onclick="{this.routeChange}" className="loginBtn" block size="lg" type="submit">LOGIN</Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
