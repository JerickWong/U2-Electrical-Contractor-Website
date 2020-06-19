import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {Container, Table} from 'react-bootstrap';
import { makeStyles, MenuItem, InputLabel, Grid, Select, FormControl } from '@material-ui/core';
import '../styles/mts.css';
import db from '../components/Firestore/firestore';

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
const projectnames = [] // for dropdown
let firstproject = ''

////// GETTING THE PROJECTS ///////
function renderProjects(project, value) {
    
    if (value == 1) {
        firstproject = project.data().name
        console.log('THIS IS ONCE LANG')
    }
    console.log(project.data().name)
    const name = project.data().name
    projectnames.push( (<MenuItem value={name}>{name}</MenuItem>) )    
}

dbMTS.get().then(projSnapshot => {
    projSnapshot.docs.forEach((project, index) => {
    renderProjects(project, index+1)
    })
})



function MtsList(props) {
    ////// STATES //////
    const [projName, setProject] = useState('');    
    const [projDropDown, setProjDrop] = useState([])
    const [status, setStatus] = useState('For Approval')
    const [mtsRows, setMtsRows] = useState([])
    const [first, setFirst] = useState('')
    const [newProject, setNewProject] = useState(true)
    const classes = useStyles();    
    let temprows = []
    
    useEffect(() => {
        setTimeout(() => {
            setProjDrop(projectnames)
            setProject(firstproject)
        }, 500)
    }, [first])

    function renderRows(mts) {
        const mtsData = mts.data()
        const name = projName
        // let newRow = [...mtsRows]
        temprows.push(
            <tr>
                <td>{name}</td>
                <td>{mtsData.MTS_number}</td>
                <td>{mtsData.status}</td>
                <td><a href="#"><FontAwesomeIcon className="view" icon={faEye} /></a></td>
            </tr>
        )
        // setMtsRows(newRow)
        console.log('RENDER ROW')
        console.log(temprows)
        // console.log(mtsRows)
    }

    useEffect(() => {
        console.log('not inf loop')
        console.log(projName)
        if (projName != '') {
            setMtsRows([])
            temprows = []
            console.log(mtsRows)
            setNewProject(!newProject)
        }        
    }, [projName, status])

    useEffect(() => {
        console.log(mtsRows)
        console.log(status)

        if (projName != '') {            

            if (status == 'All') {

                dbMTS.doc(projName).collection('MTS').get().then(snap => {
                    snap.docs.map(mts => {
                        renderRows(mts)
                    })
                })
                .then(() => {
                    console.log(temprows)
                    setMtsRows(temprows)
                })

            } else {
                dbMTS.doc(projName).collection('MTS').where('status', '==', status).get()
                .then(snap => {
                    snap.docs.map(mts => {
                        renderRows(mts)
                    })
                })
                .then(() => {
                    console.log(temprows)
                    setMtsRows(temprows)
                })
            }
        }
        
    }, [newProject])

    const handleChange = (event) => {
        console.log(event.target.value)

        console.log(event.target.name)
        if (event.target.name === 'selectProject') 
            setProject(event.target.value);
            
        else
            setStatus(event.target.value)
    };

    return (
        <div className="App">
            <Container className="cont">
                <div className="project">
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
                                <Select labelId="demo-simple-select-label" value={projName} size="large" onChange={handleChange} name="selectProject">
                                    {projDropDown}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Project Status</InputLabel>
                                <Select labelId="demo-simple-select-label" defaultValue={'All'} size="large" onChange={handleChange} id="selectStatus">
                                    <MenuItem value={'All'}>All</MenuItem>
                                    <MenuItem value={'Confirmed'}>Confirmed</MenuItem>
                                    <MenuItem value={'For Approval'}>For Approval</MenuItem>                                    
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
