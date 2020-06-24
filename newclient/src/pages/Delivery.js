import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Button, InputAdornment, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem, InputLabel, FormControl, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import db from '../components/Firestore/firestore'
import UserAlert from '../components/UserAlert/UserAlert'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
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
        marginTop: 15,
        margin: theme.spacing(0),
        color: white,
        width: 250,
    },
    root: {
        flexGrow: 1,
    },
    txt: {
        width: 300
    },
    txt1:{
        marginTop: 15,
        width:300
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
    ////// STATES //////
    const [projName, setProject] = useState('');    
    const [errMessage, setError] = useState('')
    const [projDropDown, setProjDrop] = useState([])
    const [mtsRows, setMtsRows] = useState([])
    const [first, setFirst] = useState('')
    const [changeProject, setChangeProject] = useState(true)
    const classes = useStyles();    
    let temprows = []
    let dates = []
    let objects = []
    
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

    // TODO
    function renderRows() {

        dates.map(date => {
            
            // let index = 0
            // let products = []
            let mtsnumbers = []
            dbMTS.doc(projName).collection('MTS').where('date', '==', date).get()
            .then(snap => {
                snap.docs.map(mts => {
                    // renderRows(mts)
                    let mtsData = mts.data()
                    
                    // mtsData.collection('productsList').get().then(snap => {
                        // snap.docs.map(row => {
                        //     let description = row.data().description
                        //     let qty = row.data().qty
                        //     if ( !objects.some( object => object['description'] === description) ) {
                        //         console.log('pushing product')
                        //         objects.push({
                        //             date: date,
                        //             description: description,
                        //             qty: qty
                        //         })
                        //     } else {
                        //         objects.map( object => {
                        //             if (object.description === description) {
                        //                 object.qty += qty
                        //                 console.log('qty plus plus')
                        //             }
                                        
                        //         })
                        //     }
                        // })
                    // })
                    mtsnumbers.push(mtsData.MTS_number + '')

                }) // map
                
            }) // db
            .then(() => {

                mtsnumbers.map(mtsnumber => {
                    dbMTS.doc(projName).collection('MTS').doc(mtsnumber).collection('productsList').get().then(snap => {
                        snap.docs.map(row => {
                            let description = row.data().description
                            let qty = row.data().qty
                            if ( !objects.some( object => object['description'] === description) ) {
                                console.log('pushing product')
                                objects.push({
                                    date: date,
                                    description: description,
                                    qty: qty
                                })
                            } else {
                                objects.map( object => {
                                    if (object.description === description) {
                                        object.qty += qty
                                        console.log('qty plus plus')
                                    }
                                        
                                })
                            }
                        })
                    })
                    .then(() => {
                        objects.map((object, index) => {
                            if (index == 0) {
                                temprows.push(
                                    <tr>
                                        <td>{date}</td>
                                        <td>{object.description}</td>
                                        <td>{object.qty}</td>
                                    </tr>
                                )
                            } else {
                                temprows.push(
                                    <tr>
                                        <td></td>
                                        <td>{object.description}</td>
                                        <td>{object.qty}</td>
                                    </tr>
                                )
                            }
                        })
                        setMtsRows(temprows)
                        console.log(temprows)
                        console.log(objects)
                    })
                })
                
            })
        })        

        // const mtsData = mts.data()
        // const name = projName
        // temprows.push(
        //     <tr>
        //         <td>{mtsData.date}</td>
        //         <td>{mtsData.MTS_number}</td>
        //         <td>{mtsData.total_cost}</td>
        //         <td>{tempbalance}</td>
        //     </tr>
        // )
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
                    return bb - aa;
                })
                console.log(dates)
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
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                <FormControl>
                                <InputLabel className={classes.label} id="demo-simple-select-label">Project Name</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt} value={projName} onChange={handleChange} id="demo-simple-select">
                                            {projDropDown}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={3}>
                                <TextField
                                        className={classes.txt1}
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
                                </Grid>
                                <Grid item xs={2}/>
                                <Grid item xs={3}>
                                    <Link to="/DeliverSummary">
                                    <Button variant="outlined" className={classes.button}>Summary</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                        <Table responsive name='table' hover bordercolor="#8f8f94" border="#8f8f94" >
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Item Name</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>5/25/2020</td>
                                    <td>PVC Pipe 4"</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>PVC Pipe 5"</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td>5/26/2020</td>
                                    <td>PVC Adapter 4"</td>
                                    <td>50</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>PVC Adapter 1"</td>
                                    <td>50</td>
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