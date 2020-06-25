import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { InputAdornment, Button, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem, InputLabel, FormControl, Typography } from '@material-ui/core';
import { ArrowBack, Save, Clear, Search } from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import db from '../components/Firestore/firestore';
import UserAlert from '../components/UserAlert/UserAlert'
import '../styles/mts.css';

const primary = '#8083FF';
const white = '#FFFFFF';
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#8083FF',
        },
    },
});
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: primary,
        margin: theme.spacing(0),
        color: white,
        width: 260,
    },
    root: {
        flexGrow: 1,
    },
    txt: {
        width: 390
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    delete: {
        color: '#F04A42'
    },
    
}));

const dbMTS = db.collection('MTS-Collection');

function Price() {
    const classes = useStyles();
    const [projName, setProject] = useState('');    
    const [errMessage, setError] = useState('')
    const [projDropDown, setProjDrop] = useState([])
    const [mtsRows, setMtsRows] = useState([])
    const [first, setFirst] = useState('')
    const [datesState, setDatesState] = useState([])
    const [changeProject, setChangeProject] = useState(true)
    let temprows = []
    let dates = []

    ////// INITIAL //////
    useEffect(() => {
                
        const projectnames = [] // for dropdown
        let firstproject = ''

        ////// GETTING THE PROJECTS //////
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

    async function renderRows() {
        
        let mtsSnapshot = await dbMTS.doc(projName).collection('MTS').get()
        let mtsnumbers = []
        mtsSnapshot.docs.map(mts => {
            mtsnumbers.push(mts.data().MTS_number + '')
        })
        const productsSnapsArray = await Promise.all(mtsnumbers.map( async mtsnumber => {
            return await dbMTS.doc(projName).collection('MTS').doc(mtsnumber).collection('productsList').get()
        }))
        
        console.log('PRODUCTS SNAPS ARRAY', productsSnapsArray)
        const deliverSumObject = []
        productsSnapsArray.map(productsSnaps => {
            console.log( 'PRODUCTS SNAPS', productsSnaps)
            console.log( 'PRODUCTS SNAPS DOCS', productsSnaps.docs)
            productsSnaps.docs.map(row => {
                console.log('ROW', row.data())
                const qty = parseInt(row.data().qty)
                const description = row.data().description
                console.log('QTY DESCRIPTION', qty, description)
                if ( !deliverSumObject.some( deliverRow => deliverRow['description'] == description)) {
                    deliverSumObject.push({
                        description: description,
                        qty: qty
                    })
                } else {
                    deliverSumObject.map( deliverRow => {
                        if (deliverRow['description'] == description) {
                            deliverRow['qty'] += qty
                        }
                    })
                }
            })
        })

        console.log('DELIVER SUM OBJECT', deliverSumObject)

        deliverSumObject.map(deliverRow => {
            temprows.push(
                <tr>
                    <td></td>
                    <td>{deliverRow.description}</td>
                    <td>{deliverRow.qty}</td>
                </tr>
            )
        })

        setMtsRows(temprows)
        
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
    }, [projName])

    useEffect(() => {
        console.log(mtsRows)

        if (projName != '') {

            dbMTS.doc(projName).collection('MTS').get().then(snap => {
                snap.docs.map(mts => {
                    // renderRows(mts)
                    console.log(mts.data().date)
                    if ( !dates.includes(mts.data().date) ) {
                        dates.push(mts.data().date)
                    }
                })
            })
            .then(() => {
                // console.log(temprows)
                // setMtsRows(temprows)
                dates = dates.sort((a, b) => {
                    let bb = new Date(b)
                    let aa = new Date(a)
                    return aa - bb;
                })
                console.log(dates)
                setDatesState(dates)
                renderRows()
            })

        }
        
    }, [changeProject])

    const handleChange = (event) => {
        console.log(event.target.value)

        console.log(event.target.name)
        
        setProject(event.target.value);
    };
    return (
        <div className="PriceList">
            <Container className="cont">                
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                        <Link to="/Deliver">
                            <Button variant="outlined" className={classes.button} startIcon={<ArrowBack />}>Back</Button>
                        </Link>
                        <br></br><br></br>
                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <FormControl>
                                    <InputLabel className={classes.label} id="demo-simple-select-label">Project Name</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt} value={projName} onChange={handleChange} id="demo-simple-select">
                                            {projDropDown}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={5}>
                                    <FormControl>
                                        <TextField
                                                className={classes.txt}
                                                size="normal"
                                                placeholder="Search"
                                                type='search'
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Search />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                    </FormControl>                                    
                                </Grid>
                                <Grid item xs={12}></Grid>
                                <Grid item xs={12}></Grid>
                                <Grid item xs={12}></Grid>
                                <Grid item xs={5}><Typography>Date: {datesState[0]} - {datesState[datesState.length-1]}</Typography></Grid>
                            </Grid>
                        </div>
                        <Table responsive name='table' hover bordercolor="#8f8f94" border="#8f8f94" >
                            <thead>
                                <tr>
                                    <th>Est Qty</th>
                                    <th>Item Name</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>625</td>
                                    <td>PVC Pipe 4"</td>
                                    <td>500</td>
                                </tr>
                                <tr>
                                    <td>1250</td>
                                    <td>PVC Pipe 3"</td>
                                    <td>750</td>
                                </tr>
                                <tr>
                                    <td>625</td>
                                    <td>PVC Pipe 4"</td>
                                    <td>500</td>
                                </tr>
                                <tr>
                                    <td>1250</td>
                                    <td>PVC Pipe 3"</td>
                                    <td>750</td>
                                </tr>
                                <tr>
                                    <td>625</td>
                                    <td>PVC Pipe 4"</td>
                                    <td>500</td>
                                </tr>
                                <tr>
                                    <td>1250</td>
                                    <td>PVC Pipe 3"</td>
                                    <td>750</td>
                                </tr> */}
                                {mtsRows}
                            </tbody>
                            
                        </Table>
                    </MuiThemeProvider>
                </main>
            </Container>
        </div>
    );
}

export default Price;