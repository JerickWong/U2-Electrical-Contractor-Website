import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {Container, Table} from 'react-bootstrap';
import { makeStyles, MenuItem, InputLabel, Grid, Select, FormControl } from '@material-ui/core';
import { Link } from 'react-router-dom'
import '../styles/mts.css';
import db from '../components/Firestore/firestore';
import firebase from 'firebase'
import UserAlert from '../components/UserAlert/UserAlert'

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

function AdminMts(props) {
    ////// STATES //////
    const [projName, setProject] = useState('');    
    const [errMessage, setError] = useState('')
    const [projDropDown, setProjDrop] = useState([])
    const [status, setStatus] = useState('All')
    const [mtsRows, setMtsRows] = useState([])
    const [first, setFirst] = useState('')
    const [changeProject, setChangeProject] = useState(true)
    const classes = useStyles();    
    let temprows = []    
    
    useEffect(() => {
                
        const projectnames = [] // for dropdown
        let firstproject = ''

        ////// GETTING THE PROJECTS ///////
        function renderProjects(project, value) {
            
            if (value == 1) {
                firstproject = project.data().name
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
        let canConfirm = ''
        if (mtsData.status === 'For Approval') {
            canConfirm = (
                <Link href='#' onClick={(e) => {confirmMTS(e, mtsData.MTS_number)}}>Confirm</Link>
            )
        }
        temprows.push(
            <tr>
                <td>{name}</td>
                <td>{mtsData.MTS_number}</td>
                <td>{mtsData.prepared_by}</td>
                <td>{mtsData.date_created}</td>
                <td>{mtsData.status}</td>
                <td><Link to={{
                    pathname:'/AdminMtsWindow',
                    state: {
                        projName: name,
                        mts_number: mtsData.MTS_number
                    }                    
                }}><FontAwesomeIcon className="view" icon={faEye} /></Link> &nbsp; &nbsp;
                {canConfirm}
                </td>
            </tr>
        )        
    }

    async function confirmMTS(e, mtsnumber) {
        e.preventDefault();
        // dbMTS.doc(projName).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
        // dbMTS.doc(projName).collection('MTS').doc('wala dapat to').update({ status: 'Confirmed' })
        // .then(() => {            
        //     console.log(projName)
        //     setProject(projName)
        //     setChangeProject(!changeProject)
        //     alert('Success!')
        // })
        // .catch(err => {
        //     alert(err.message)
        //     dbMTS.doc(projName).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
        //     .then(() => {
        //         console.log(projName)
        //         setProject(projName)
        //         setChangeProject(!changeProject)
        //         alert('Success!')
        //     })
        // })
        dbMTS.doc(projName).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
        .then(() => {            
            console.log(projName)
            setProject(projName)
            setChangeProject(!changeProject)
            alert('Success!')
        })
        .catch(err => {
            alert(err.message)
        })

        // PRODUCTS SUMMARY
        const productsSnap = await dbMTS.doc(projName).collection('MTS').doc(mtsnumber+'').collection('productsList').get()
        productsSnap.docs.map(snap => {
            const qty = snap.data().qty
            const description = snap.data().description
            
            const increment = firebase.firestore.FieldValue.increment(qty);      
            dbMTS.doc(projName).collection('Delivered-Summary').doc(description).update({
                total: increment
            })
            .catch(err => {
                console.log(err.message)        
                dbMTS.doc(projName).collection('Delivered-Summary').doc(description).set({
                total: qty,
                description: description,
                estqty: 0
                })
            })
            .then(() => { alert('Success!!!') })
        })
        
    }

    useEffect(() => {
        console.log('not inf loop')
        console.log(projName)
        if (projName != '') {
            setMtsRows([])
            temprows = []
            console.log(mtsRows)
            setChangeProject(!changeProject)
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
        
    }, [changeProject])

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
                    {renderError()}
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
                            <th>Prepared By</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {mtsRows}
                    </tbody>
                </Table>
                
            </Container>
        </div>
    );
}

    export default AdminMts;