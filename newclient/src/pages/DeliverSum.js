import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { InputAdornment, Button, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem, InputLabel, FormControl, Typography, IconButton, InputBase, CircularProgress } from '@material-ui/core';
import { ArrowBackIos, Save, Clear, Search, DateRange } from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import db from '../components/Firestore/firestore';
import UserAlert from '../components/UserAlert/UserAlert'
import '../styles/mts.css';
import api from '../api';
import moment from 'moment'

const primary = '#8083FF';
const gray = '#838387';
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
        margin: theme.spacing(0),
        width: 50,
        color: primary,
        marginBottom: 10
    },
    button1: {
        backgroundColor: primary,
        margin: theme.spacing(0),       
        marginTop: 8,
        color: white,
        width: 100,
        height: 35,
        marginRight: 20
      },
    root: {
        flexGrow: 1,
    },
    txt: {
        width: 390,
        marginTop: 15
    },
    txt1: {
        width: 50
    },
    txt2: {
        width: 120
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
    back:{
        alignSelf:'right'
    },
    parentCenter: {
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
}));

// const dbMTS = db.collection('MTS-Collection');

function Price() {
    const classes = useStyles();
    const [current_project, setProject] = useState('');
    const [error, setError] = useState('')
    const [projects, setProjects] = useState([])
    const [mts, setMts] = useState([])
    const [to, setTo] = useState()
    const [from, setFrom] = useState()
    const [isLoading, setLoading] = useState(true)
    const [isFiltered, setFiltered] = useState(false)
    // const [first, setFirst] = useState('')
    // const [date, setDate] = useState([])
    // const [changeProject, setChangeProject] = useState(true)
    // let temprows = []
    // let dates = []

    ////// INITIAL //////
    // useEffect(() => {

    //     const projectnames = [] // for dropdown
    //     let firstproject = ''

    //     ////// GETTING THE PROJECTS //////
    //     function renderProjects(project, value) {

    //         if (value == 1) {
    //             firstproject = project.data().name
    //         }
    //         console.log(project.data().name)
    //         const name = project.data().name
    //         projectnames.push((<MenuItem value={name}>{name}</MenuItem>))
    //     }

    //     dbMTS.get().then(projSnapshot => {
    //         projSnapshot.docs.forEach((project, index) => {
    //             renderProjects(project, index + 1)
    //         })
    //     })
    //         .then(() => {
    //             setProjects(projectnames)
    //             setProject(firstproject)
    //             setError('')
    //         })
    //         .catch(err => {
    //             setError(err.message)
    //         })

    // }, [first])    

    // async function renderRows() {

    //     // let mtsSnapshot = await dbMTS.doc(current_project).collection('MTS').get()
    //     // let mtsnumbers = []
    //     // mtsSnapshot.docs.map(mts => {
    //     //     mtsnumbers.push(mts.data().MTS_number + '')
    //     // })
    //     // const productsSnapsArray = await Promise.all(mtsnumbers.map( async mtsnumber => {
    //     //     return await dbMTS.doc(current_project).collection('MTS').doc(mtsnumber).collection('productsList').get()
    //     // }))

    //     // console.log('PRODUCTS SNAPS ARRAY', productsSnapsArray)
    //     // const deliverSumObject = []
    //     // productsSnapsArray.map(productsSnaps => {
    //     //     console.log( 'PRODUCTS SNAPS', productsSnaps)
    //     //     console.log( 'PRODUCTS SNAPS DOCS', productsSnaps.docs)
    //     //     productsSnaps.docs.map(row => {
    //     //         console.log('ROW', row.data())
    //     //         const qty = row.data().qty
    //     //         const description = row.data().description
    //     //         console.log('QTY DESCRIPTION', qty, description)
    //     //         if ( !deliverSumObject.some( deliverRow => deliverRow['description'] == description)) {
    //     //             deliverSumObject.push({
    //     //                 description: description,
    //     //                 qty: qty
    //     //             })
    //     //         } else {
    //     //             deliverSumObject.map( deliverRow => {
    //     //                 if (deliverRow['description'] == description) {
    //     //                     deliverRow['qty'] += qty
    //     //                 }
    //     //             })
    //     //         }
    //     //     })
    //     // })
    //     const rowSnapshot = await dbMTS.doc(current_project).collection('Delivered-Summary').get()

    //     rowSnapshot.docs.map(row => {
    //         const rowData = row.data()
    //         temprows.push(
    //             <tr>
    //                 <td>{rowData.estqty}</td>
    //                 <td>{rowData.description}</td>
    //                 <td>{rowData.total}</td>
    //             </tr>
    //         )
    //     })

    //     // console.log('DELIVER SUM OBJECT', deliverSumObject)

    //     // deliverSumObject.map(deliverRow => {
    //     //     temprows.push(
    //     //         <tr>
    //     //             <td></td>
    //     //             <td>{deliverRow.description}</td>
    //     //             <td>{deliverRow.qty}</td>
    //     //         </tr>
    //     //     )
    //     // })

    //     setMts(temprows)

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
    // }, [current_project])

    // useEffect(() => {
    //     console.log(mts)

    //     if (current_project != '') {

    //         dbMTS.doc(current_project).collection('MTS').get().then(snap => {
    //             snap.docs.map(mts => {
    //                 // renderRows(mts)
    //                 console.log(mts.data().date)
    //                 if (!dates.includes(mts.data().date)) {
    //                     dates.push(mts.data().date)
    //                 }
    //             })
    //         })
    //             .then(() => {
    //                 // console.log(temprows)
    //                 // setMts(temprows)
    //                 dates = dates.sort((a, b) => {
    //                     let bb = new Date(b)
    //                     let aa = new Date(a)
    //                     return aa - bb;
    //                 })
    //                 console.log(dates)
    //                 setDate(dates)
    //                 renderRows()
    //             })

    //     }

    // }, [changeProject])

    useEffect(() => {
        console.log(`FILTERED: ${isFiltered}`)
    }, [isFiltered])

    async function fetchData() {
        setLoading(true)
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

    const handleRowChange = (e, index) => {
        const newRows = [...mts]
        newRows[index]['estqty'] = e.target.value
        setMts(newRows)
    }

    const handleSave = async () => {
        try {
            await api.addEstQty({ project_name: current_project, rows: mts })
            alert('saved successfully')
        } catch (error) {
            console.log(error)
            alert('error in saving')
        }
    }

    async function getMTS() {
        setLoading(true)
        try {            
            
            // GET delivered
            const delivered = await (await api.getDeliveredByProject({ project_name: current_project })).data.data
            console.log(delivered)
            setFrom(moment(delivered.start).format('YYYY-MM-DD'))
            setTo(moment(delivered.end).format('YYYY-MM-DD'))
            setMts(delivered.rows)
        } catch (error) {
            setMts([])
        }
        setLoading(false)
    }

    async function getMTSFiltered() {
        if (to && from) {
            setFiltered(true)
            try {
                console.log(to)
                const data = await (await api.getDeliveredSummary({ project_name: current_project, to: to, from: from })).data.data
                console.log(data)
                setMts(data)
            } catch (error) {
                setMts([])
                console.log(error)
                setError(error)
            }
        } else {
            // get delivered
            console.log('waley')
            setFiltered(false)
        }
        
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        getMTS()
        setFiltered(false)
    }, [current_project])

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
                                <Button size="small" className={classes.button} startIcon={<ArrowBackIos />}>Back</Button>
                                {/*<IconButton className={classes.back}><ArrowBack/></IconButton>*/}
                            </Link>
                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <FormControl>
                                        <InputLabel className={classes.label} id="demo-simple-select-label">Project Name</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt} value={current_project} onChange={handleChange} id="demo-simple-select">
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
                                <Grid item xs={2}>
                                    <TextField
                                        label="From"
                                        type="date"
                                        size="small"
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className={classes.textField}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        label="To"
                                        type="date"
                                        size="small"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className={classes.textField}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>                                
                                <Grid item xs={1}>
                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        onClick={getMTSFiltered}
                                        className={classes.button1} 
                                        startIcon={<DateRange />}
                                        >
                                        Filter
                                    </Button>
                                </Grid>                                
                                <Grid item xs={1}>
                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        onClick={handleSave}
                                        className={classes.button1} 
                                        startIcon={<Save />}
                                        disabled={isFiltered}
                                        >
                                        Save
                                    </Button>
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
                                    <Table responsive name='table' hover bordercolor="#8f8f94" border="#8f8f94" >
                                        <thead>
                                            <tr>
                                                <th>Est Qty</th>
                                                <th>Item Name</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>                                
                                            {
                                                mts.map((m, index) => {
                                                    return (
                                                        <tr>
                                                            {
                                                                isFiltered ?
                                                                <td className={classes.txt2}>{m.estqty}
                                                                </td>
                                                                :
                                                                <td className={classes.txt2}><InputBase pattern="[0-9*]" type="number" value={m.estqty} onChange={(e) => handleRowChange(e, index)} />
                                                                    </td>
                                                            }
                                                            <td>{m.item}</td>
                                                            <td>{m.total}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </Table>
                                )
                            )
                        }
                    </MuiThemeProvider>
                </main>
            </Container>
        </div>
    );
}

export default Price;