import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {Container, Table} from 'react-bootstrap';
import { makeStyles, MenuItem, InputLabel, Grid, Select, FormControl } from '@material-ui/core'
import '../styles/mts.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
  },
  selectEmpty: {
      marginTop: theme.spacing(2),
  },
}));


function MtsList() {
  const classes = useStyles();
  const [projName, setProject] = React.useState('');
  const handleChange = (event) => {
      setProject(event.target.value);
  };

  return (
      <div className="App">
          <Container>
              <div className="project">
                  <Grid container spacing={2}>
                      <Grid item xs={2}>
                          <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
                              <Select labelId="demo-simple-select-label" value={projName} size="large" onChange={handleChange} id="demo-simple-select">
                                  <MenuItem value={1}>ASEANA 4</MenuItem>
                                  <MenuItem value={2}>ASEANA 5</MenuItem>
                              </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={8}>
                      </Grid>
                      <Grid item xs={2}>
                          <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-label">Project Status</InputLabel>
                              <Select labelId="demo-simple-select-label" value={projName} size="large" onChange={handleChange} id="demo-simple-select">
                                  <MenuItem value={1}>Confirmed</MenuItem>
                                  <MenuItem value={2}>For Approval</MenuItem>
                              </Select>
                          </FormControl>
                      </Grid>
                  </Grid>
              </div>
              <Table className="tbl1" bordered hover>
                  <thead>
                      <tr>
                          <th>Project Name</th>
                          <th>MTS No.</th>
                          <th>Status</th>
                          <th></th>
                      </tr>
                  </thead>
                  <tr>
                      <td>Aseana 1</td>
                      <td>71101</td>
                      <td>Confirmed</td>
                      <td><a href="#"><FontAwesomeIcon className="view" icon={faEye} /></a></td>
                  </tr>
                  <tr>
                      <td>Aseana 2</td>
                      <td>71102</td>
                      <td>For Approval</td>
                      <td><a href="#"><FontAwesomeIcon className="view" icon={faEye} /></a></td>
                  </tr>
                  <tr>
                      <td>Aseana 3</td>
                      <td>71103</td>
                      <td>Confirmed</td>
                      <td><a href="#"><FontAwesomeIcon className="view" icon={faEye} /></a></td>
                  </tr>
                  <tr>
                      <td>Aseana 4</td>
                      <td>71104</td>
                      <td>For Approval</td>
                      <td><a href="#"><FontAwesomeIcon className="view" icon={faEye} /></a></td>
                  </tr>
                  <tr>
                      <td>Aseana 5</td>
                      <td>71105</td>
                      <td>For Approval</td>
                      <td><a href="#"><FontAwesomeIcon className="view" icon={faEye} /></a></td>
                  </tr>
              </Table>
          </Container>
      </div>
  );
}

export default MtsList;