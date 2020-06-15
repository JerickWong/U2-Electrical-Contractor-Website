import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {Container, Table} from 'react-bootstrap';
import { makeStyles, MenuItem, InputLabel, Grid, Select, FormControl } from '@material-ui/core'
import '../styles/mts.css';
import db from '../components/Firestore/firestore'

const useStyles = makeStyles((theme) => ({
  formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
  },
  selectEmpty: {
      marginTop: theme.spacing(2),
  },
  formControl: {
    width: 300,
    marginLeft: theme.spacing(7)
  }
}));

const dbMTS = db.collection('MTS-Collection');
const project_names = [] // for dropdown
let firstproject = '' // initial project

dbMTS.get().then(mtsSnapshot => {
    mtsSnapshot.docs.forEach((project, index) => {
       renderMTS(project, index+1)
    })
})

////// GETTING DATA FROM DB TEST ///////

function renderMTS(project, value) {
  if (value == 1) {
      firstproject = project.data().name
  }
  console.log(project.data().name)
  const name = project.data().name
  project_names.push( (<MenuItem value={name}>{name}</MenuItem>) )
}

// dbMTS.limit(1).get().then(snap => {
// firstproject =  snap.docs[0].data().name
// console.log(firstproject)
// console.log(snap.docs[0].data())
// })


function MtsList(props) {
  const classes = useStyles();
  const [projName, setProject] = useState(firstproject);
  const [mtsRows, setMtsRows] = useState([])

  let allMts = []
  

  function render(mts) {
    const mtsData = mts.data()
    const name = projName
    let newRow = [...mtsRows]
    newRow.push(
        <tr>
            <td>{name}</td>
            <td>{mtsData.MTS_number}</td>
            <td>{mtsData.status}</td>
            <td><a href="#"><FontAwesomeIcon className="view" icon={faEye} /></a></td>
        </tr>
    )
    setMtsRows(newRow)
    console.log(newRow)
    console.log(mtsRows)
    console.log(mtsData.MTS_number)
    console.log('ILAN DAPAT TO')
  }

  useEffect(() => {
      console.log('not inf loop')
      console.log(projName)
      setMtsRows([])
      dbMTS.doc(projName).collection('MTS').get().then(snap => {
        snap.docs.map(mts => {
            render(mts)
        })
      })
  }, [projName])

  const handleChange = (event) => {
      console.log(event.target.value)
      setProject(event.target.value);
  };

  return (
      <div className="App">
          <Container className="cont">
              <div className="project">
                  <Grid container spacing={1}>
                      <Grid item xs={6}>
                          <FormControl className={classes.formControl}>
                              <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
                              <Select labelId="demo-simple-select-label" value={projName} size="large" onChange={handleChange} id="demo-simple-select">
                                  {project_names}
                              </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={1} />
                      <Grid item xs={4}>
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
              <Table className="tbl1" hover bordercolor="#8f8f94" border="#8f8f94">
                  <thead>
                      <tr>
                          <th>Project Name</th>
                          <th>MTS No.</th>
                          <th>Status</th>
                          <th></th>
                      </tr>
                  </thead>
                  {/* <tr>
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
                  </tr> */}
                  { mtsRows }
              </Table>
          </Container>
      </div>
  );
}

export default MtsList;
