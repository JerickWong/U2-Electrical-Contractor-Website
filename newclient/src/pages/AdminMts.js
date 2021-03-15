import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import DeleteIcon from '@material-ui/icons/Delete';
import {Container, Table} from 'react-bootstrap';
import { makeStyles, MenuItem, InputLabel, Grid, Select, FormControl, Button, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom'
import '../styles/mts.css';
import db from '../components/Firestore/firestore';
import firebase from 'firebase'
import UserAlert from '../components/UserAlert/UserAlert'
import users from '../api/users';
import api, { deleteMTSById } from '../api';
import moment from 'moment';

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
  parentCenter: {
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ''
  }
}));

// const dbMTS = db.collection('MTS-Collection');

function AdminMts(props) {
    ////// STATES //////
    const [current_project, setProject] = useState('');    
    const [error, setError] = useState('')
    const [projects, setProjects] = useState([])
    const [status, setStatus] = useState('All')
    const [mts, setMts] = useState([])
    const [user, setUser] = useState(fetchUser())
    const [current_mts, setCurrent] = useState(null)
    const [isLoading, setLoading] = useState(true)
    // const [first, setFirst] = useState('')
    // const [changeProject, setChangeProject] = useState(true)
    const classes = useStyles();    
    // let temprows = []

    // useEffect(() => {
                
    //     const projectnames = [] // for dropdown
    //     let firstproject = ''

    //     ////// GETTING THE PROJECTS ///////
    //     function renderProjects(project, value) {
            
    //         if (value == 1) {
    //             firstproject = project.data().name
    //         }
    //         console.log(project.data().name)
    //         const name = project.data().name
    //         projectnames.push( (<MenuItem value={name}>{name}</MenuItem>) )    
    //     }

    //     dbMTS.get().then(projSnapshot => {
    //         projSnapshot.docs.forEach((project, index) => {
    //         renderProjects(project, index+1)
    //         })
    //     })
    //     .then(() => {
    //         setProjects(projectnames)
    //         setProject(firstproject)
    //         setError('')
    //     })
    //     .catch(err => {
    //         setError(err.message)
    //     })

    // }, [first])    

    // function renderRows(mts) {
    //     const mtsData = mts.data()
    //     const name = current_project
    //     let canConfirm = ''
    //     if (mtsData.status === 'For Approval') {
    //         canConfirm = (
    //             <Link href='#' onClick={(e) => {confirmMTS(e, mtsData.MTS_number)}}>Confirm</Link>
    //         )
    //     }
    //     temprows.push(
    //         <tr>
    //             <td>{name}</td>
    //             <td>{mtsData.MTS_number}</td>
    //             <td>{mtsData.prepared_by}</td>
    //             <td>{mtsData.date_created}</td>
    //             <td>{mtsData.status}</td>
    //             <td><Link to={{
    //                 pathname:'/AdminMtsWindow',
    //                 state: {
    //                     current_project: name,
    //                     mts_number: mtsData.MTS_number
    //                 }                    
    //             }}><FontAwesomeIcon className="view" icon={faEye} /></Link> &nbsp; &nbsp;
    //             {canConfirm}
    //             </td>
    //         </tr>
    //     )        
    // }

    // async function confirmMTS(e, mtsnumber) {
    //     e.preventDefault();
    //     // dbMTS.doc(current_project).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
    //     // dbMTS.doc(current_project).collection('MTS').doc('wala dapat to').update({ status: 'Confirmed' })
    //     // .then(() => {            
    //     //     console.log(current_project)
    //     //     setProject(current_project)
    //     //     setChangeProject(!changeProject)
    //     //     alert('Success!')
    //     // })
    //     // .catch(err => {
    //     //     alert(err.message)
    //     //     dbMTS.doc(current_project).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
    //     //     .then(() => {
    //     //         console.log(current_project)
    //     //         setProject(current_project)
    //     //         setChangeProject(!changeProject)
    //     //         alert('Success!')
    //     //     })
    //     // })
    //     dbMTS.doc(current_project).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
    //     .then(() => {            
    //         console.log(current_project)
    //         setProject(current_project)
    //         setChangeProject(!changeProject)
    //         alert('Success!')
    //     })
    //     .catch(err => {
    //         alert(err.message)
    //     })

    //     // PRODUCTS SUMMARY
    //     const productsSnap = await dbMTS.doc(current_project).collection('MTS').doc(mtsnumber+'').collection('productsList').get()
    //     productsSnap.docs.map(snap => {
    //         const qty = snap.data().qty
    //         const description = snap.data().description
            
    //         const increment = firebase.firestore.FieldValue.increment(qty);      
    //         dbMTS.doc(current_project).collection('Delivered-Summary').doc(description).update({
    //             total: increment
    //         })
    //         .catch(err => {
    //             console.log(err.message)        
    //             dbMTS.doc(current_project).collection('Delivered-Summary').doc(description).set({
    //             total: qty,
    //             description: description,
    //             estqty: 0
    //             })
    //         })
    //         .then(() => { alert('Success!!!') })
    //     })
        
    // }

    // useEffect(() => {
    //     console.log('not inf loop')
    //     console.log(current_project)
    //     if (current_project != '') {
    //         setMts([])
    //         temprows = []
    //         console.log(mts)
    //         setChangeProject(!changeProject)
    //     }        
    // }, [current_project, status])    

    // useEffect(() => {
    //     console.log(mts)
    //     console.log(status)

    //     if (current_project != '') {            

    //         if (status == 'All') {

    //             dbMTS.doc(current_project).collection('MTS').get().then(snap => {
    //                 snap.docs.map(mts => {
    //                     renderRows(mts)
    //                 })
    //             })
    //             .then(() => {
    //                 console.log(temprows)
    //                 setMts(temprows)
    //             })

    //         } else {
    //             dbMTS.doc(current_project).collection('MTS').where('status', '==', status).get()
    //             .then(snap => {
    //                 snap.docs.map(mts => {
    //                     renderRows(mts)
    //                 })
    //             })
    //             .then(() => {
    //                 console.log(temprows)
    //                 setMts(temprows)
    //             })
    //         }
    //     }
        
    // }, [changeProject])

    async function fetchUser() {

        try {
            return await (await users.getUser({token: localStorage.getItem('token')})).data.data
        } catch (error) {
            console.log(error)
            alert('user not logged in')
            return null
        }
    }

    async function fetchData() {
        setLoading(true)
        try {    
            const projectnames = await (await api.getMTSProjects()).data.data
            
            setProjects(projectnames)
            setProject(projectnames[0])
            
            setError('')
        } catch (error) {
            alert(error)
            setError(error)
        }
        // setLoading(false)
    }    

    function renderError() {
        if (error) 
            return <UserAlert severity='error' message={error} />
        else 
            return ''
    }

    async function getMTS() {
        setLoading(true)
        try {            
            const payload = {
                project_name: current_project,
                status: status
            }
            const new_mts = await (await api.getMTSByProject(payload)).data.data
            setMts(new_mts)
        } catch (error) {
            setMts([])            
        }
        setLoading(false)
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target
        
        if (name === 'selectProject') 
            setProject(value);
            
        else
            setStatus(value)
    };
    
    const handleConfirm = async () => {
        try {
            current_mts.status = "Confirmed"
            await api.updateMTSById(current_mts._id, current_mts)

            // delivered
            const isExist = await (await api.getDeliveredByProject({ project_name: current_project })).data.success
            
            // if project already exists, append delivered object
            if (isExist) {
                await api.addItem({ project_name: current_project, rows: current_mts.rows, date: current_mts.date })
                alert('added item')
            }

            // create new delivered object
            else {
            
                const delivered_rows = current_mts.rows.map(row => {
                    return { estqty: 0, item: row.description, total: row.qty }
                })
                const delivered = await (await api.insertDelivered({ project_name: current_project, start: current_mts.date, end: current_mts.date, rows: delivered_rows })).data.message
                alert(delivered)
            }

            alert('all goods')
        } catch (error) {
            console.log(error)
            alert('Something went wrong when confirming')
        }
        getMTS();
    }

    const handleDelete = async (mts) => {
        try {
            
            if (mts.status === "Confirmed")
                await api.removeItem({ project_name: current_project, date: mts.date, rows: mts.rows })
            
            await api.deleteMTSById(mts._id)
            alert('successfully deleted')
        } catch (error) {
            console.log(error)
            alert('error in deleting')
        }
        getMTS();
    }

    useEffect(() => {
        fetchData()
    }, [user])

    useEffect( () => {
        if (current_project)
            getMTS()
    }, [current_project, status])

    useEffect(() => {
        if (current_mts)
            handleConfirm()
    }, [current_mts])

    return (
        <div className="App">
            <Container className="cont">                
                <div className="project">
                    {renderError()}
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
                                <Select labelId="demo-simple-select-label" value={current_project} size="large" onChange={handleChange} name="selectProject">
                                    {
                                        projects.map(project => {
                                            return (
                                                <MenuItem value={project}>{project}</MenuItem>
                                            )
                                        })
                                    }
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
                {
                    isLoading ?
                    <div className={classes.parentCenter}>
                        <CircularProgress size={70} />
                    </div>
                    
                    :
                    (

                        !mts.length ?
                        (
                            <Container>
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
                                </Table>
                                <div className={classes.parentCenter}>This list is empty.</div>
                            </Container>
                        )
                        :
                        (
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
                                    {
                                        mts.map( (m, index) => {
                                            return (
                                                <tr>
                                                    <td>{current_project}</td>
                                                    <td>{m.MTS_number}</td>
                                                    <td>{m.prepared_by}</td>
                                                    <td>{moment(m.date_created).format("MM-DD-YYYY, hh:mm:ss a")}</td>
                                                    <td>{m.status}</td>
                                                    <td><Link to={{
                                                        pathname:'/AdminMtsWindow',
                                                        state: {
                                                            mts: m
                                                        }
                                                    }}>                                    
                                                    <Button variant="outlined" color="primary"><FontAwesomeIcon className="view" icon={faEye} />
                                                    View</Button>
                                                    </Link>
                                                    {
                                                        m.status === "Confirmed" ? ""
                                                            : <Button variant="outlined" onClick={() => { setCurrent(m); }}>Confirm</Button>
                                                    }
                                                    <Button variant="outlined" color="secondary" onClick={() => { handleDelete(m) }}><DeleteIcon />
                                                    Delete</Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        )
                    )
                }
                
            </Container>
        </div>
    );
}

    export default AdminMts;