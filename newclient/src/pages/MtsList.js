import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Container, Table} from 'react-bootstrap';
import { makeStyles, MenuItem, InputLabel, Grid, Select, FormControl, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import '../styles/mts.css';
// import db from '../components/Firestore/firestore';
import UserAlert from '../components/UserAlert/UserAlert'
// import firebase from 'firebase'
import users from '../api/users'
import api from '../api'
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
  }
}));

// const dbMTS = db.collection('MTS-Collection');

function MtsList(props) {
    ////// STATES //////
    const [current_project, setProject] = useState('');
    const [error, setError] = useState('')
    const [projects, setProjects] = useState([])
    const [status, setStatus] = useState('All')
    const [mts, setMts] = useState([])
    const [user, setUser] = useState(fetchUser())
    // const [first, setFirst] = useState('')
    // const [changeProject, setChangeProject] = useState(true)
    const classes = useStyles();    
    // let temprows = []

    // firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //         setUser(user.displayName)
    //     } else {
    //         console.log(user)
    //     }
    //     setFirst('First')
    // })
    
    // FIRESTORE
    // useEffect( async () => {

    //     if (first !== '') {
            
    //         try {
    //             // for dropdown
    //             const projectnames = await (await api.getMTSProjects()).data.data
                
    //             setProjects(projectnames)
    //             setProject(projectnames[0])
    //             setError('')
    //         } catch (error) {
    //             setError(error)
    //         }
    
    //         ////// GETTING THE PROJECTS ///////
    //         // function renderProjects(project, value) {
                
    //         //     if (value == 1) {
    //         //         firstproject = project.data().name
    //         //     }
    //         //     console.log(project.data().name)
    //         //     const name = project.data().name
    //         //     projectnames.push( (<MenuItem value={name}>{name}</MenuItem>) )    
    //         // }
    
    //         // dbMTS.get().then(projSnapshot => {
    //         //     projSnapshot.docs.forEach((project, index) => {
    //         //     renderProjects(project, index+1)
    //         //     })
    //         // })
    //         // .then(() => {
    //         //     setProjects(projectnames)
    //         //     setProject(firstproject)
    //         //     setError('')
    //         // })
    //         // .catch(err => {
    //         //     setError(err.message)
    //         // })
    //     }        

    // }, [first])
    
    // FIRESTORE
    // useEffect(() => {
        // console.log('not inf loop')
        // console.log(current_project)
        // if (current_project !== '') {
        //     setMts([])
        //     // temprows = []
        //     console.log(mts)
        //     // setChangeProject(!changeProject)
        // }        
    // }, [current_project, status])


    // FIRESTORE
    // useEffect( async () => {
    //     console.log(mts)
    //     console.log(status)

    //     if (current_project !== '') {            

    //         if (status === 'All') {

    //             const mts = await (await api.getAllMTS()).data.data
    //             renderRows(mts)
    //             // dbMTS.doc(current_project).collection('MTS').where('prepared_by', '==', user).get().then(snap => {
    //             //     snap.docs.map(mts => {
    //             //         renderRows(mts)
    //             //     })
    //             // })
    //             // .then(() => {
    //             //     console.log(temprows)
    //             //     setMts(temprows)
    //             // })

    //         } else {
                
    //             // dbMTS.doc(current_project).collection('MTS').where('prepared_by', '==', user).where('status', '==', status).get()
    //             // .then(snap => {
    //             //     snap.docs.map(mts => {
    //             //         renderRows(mts)
    //             //     })
    //             // })
    //             // .then(() => {
    //             //     console.log(temprows)
    //             //     setMts(temprows)
    //             // })
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

        try {
    
            const projectnames = await (await api.getMTSProjects()).data.data
            
            setProjects(projectnames)
            setProject(projectnames[0])
            
            setError('')
        } catch (error) {
            alert('Something went wrong')
            setError(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [user])
    
    
    function renderError() {
        if (error) 
            return <UserAlert severity='error' message={error} />
        else 
            return ''
    }

    async function getMTS() {
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
    }

    useEffect( () => {
        if (current_project)
            getMTS()
    }, [current_project, status])

    const handleChange = (event) => {
        const { name, value } = event.target
        
        if (name === 'selectProject') 
            setProject(value);
            
        else
            setStatus(value)
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
                                <Select labelId="demo-simple-select-label" defaultValue={projects[0]} value={current_project} size="large" onChange={handleChange} name="selectProject">
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
                <Table className="tbl1" hover bordercolor="#8f8f94" border="#8f8f94">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>MTS No.</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {/* {mts} */}
                        {
                            mts.map( (m, index) => {
                                return (
                                    <tr>
                                        <td>{current_project}</td>
                                        <td>{m.MTS_number}</td>
                                        <td>{moment(m.date_created).format("MM-DD-YYYY, hh:mm:ss a")}</td>
                                        <td>{m.status}</td>
                                        <td><Link to={{
                                            pathname:'/MtsWindow',
                                            state: {
                                                current_project: current_project,
                                                mts_number: m.MTS_number
                                            }
                                        }}>
                                        <Button variant="outlined" color="primary"><FontAwesomeIcon className="view" icon={faEye} />
                                        View</Button>
                                        </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                
            </Container>
        </div>
    );
}

    export default MtsList;
