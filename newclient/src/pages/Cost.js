import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Table } from 'react-bootstrap';
import { makeStyles, MenuItem, TextField, InputLabel, Grid, Select, FormControl } from '@material-ui/core';
import '../styles/mts.css';
import moment from 'moment'

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
    }, 
    textField:{
        width:290,
        marginLeft: 15,
    }
}));


function Cost() {
    ////// STATES //////
    const [projName, setProject] = useState('');    
    const [errMessage, setError] = useState('')
    const [projDropDown, setProjDrop] = useState([])
    const [status, setStatus] = useState('For Approval')
    const [mtsRows, setMtsRows] = useState([])
    const [first, setFirst] = useState('')
    const [newProject, setNewProject] = useState(true)
    const classes = useStyles();    
    let temprows = []
    
    useEffect(() => {
                
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
        .then(() => {
            setProjDrop(projectnames)
            setProject(firstproject)
            setError('')
        })
        .catch(err => {
            setError(err.message)
        })

    }, [first])

    function renderError() {
        if (errMessage) 
            return <UserAlert severity='error' message={errMessage} />
        else 
            return ''
    }

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

                dbMTS.doc(projName).collection('MTS').onSnapshot(snap => {
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
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
                                <Select labelId="demo-simple-select-label" value={projName} size="large" onChange={handleChange}>
                                    {projDropDown}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} />
                        <Grid item xs={2}>
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                size="small"
                                defaultValue={moment().format('YYYY-MM-DD')}
                                className={classes.textField}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                    </Grid>
                </div>
                <Table className="tbl1" hover bordercolor="#8f8f94" border="#8f8f94">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>MTS No.</th>
                            <th>Amount</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </Table>
            </Container>
        </div>
    );
}

export default Cost;
