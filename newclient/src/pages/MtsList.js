import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {Container, Row, Col, Dropdown, DropdownButton, Table} from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import '../styles/mts.css';

export default class MtsList extends Component{
    render(){
        return(
            <BrowserRouter>
              <div className="App">
                <Container>
                <div className="project">
                  <Row className="justify-content-md-center">
                      <Col md={2}></Col>
                      <Col md={2}>Project Name</Col>
                      <Col md={2}>
                        <DropdownButton id="dropdown-basic-button" title="ASEANA 4">
                          <Dropdown.Item as="button">ASEANA 4</Dropdown.Item>
                          <Dropdown.Item as="button">ASEANA 5</Dropdown.Item>
                        </DropdownButton>
                      </Col>
                      <Col md={2}>Status</Col>
                      <Col md={2}>
                        <DropdownButton id="dropdown-basic-button" title="Project Status">
                          <Dropdown.Item as="button">Confirmed</Dropdown.Item>
                          <Dropdown.Item as="button">For Approval</Dropdown.Item>
                        </DropdownButton>
                      </Col>
                      <Col md={2}></Col>
                  </Row>
                  </div>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Project Name</th>  
                        <th>MTS No.</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                      <tr>
                        <td>Aseana 4</td>
                        <td>71105</td>
                        <td>Confirmed</td>
                        <td><a href="#"><FontAwesomeIcon className="view" icon={faEye}/></a></td>
                      </tr>
                      <tr>
                        <td>Aseana 5</td>
                        <td>71101</td>
                        <td>For Approval</td>
                        <td><a href="#"><FontAwesomeIcon className="view" icon={faEye}/></a></td>
                      </tr>
                  </Table>
                </Container>
              </div>
            </BrowserRouter>            
        );
    }
}