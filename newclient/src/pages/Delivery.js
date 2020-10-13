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
    alert('yow')
    
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
    async function renderRows() {
        
        // let countperdate = []
        // returns array of array
        let deliverObjectArray = await Promise.all(dates.map( async date => {
            const mtsSnap = await dbMTS.doc(projName).collection('MTS').where('date', '==', date).get()            
            const mtsnumbers = []
            mtsSnap.docs.map(mts => {
                mtsnumbers.push(mts.data().MTS_number + '')
            })
            console.log(mtsnumbers)
            // array of productsList snaps, array accdg to mts 
            const productsSnapsArray = await Promise.all(mtsnumbers.map(async mtsnumber => {
                console.log('MTS NUMBER', mtsnumber)
                return await dbMTS.doc(projName).collection('MTS').doc(mtsnumber).collection('productsList').get()
            }))
            console.log('ANO TONG ARRAY', productsSnapsArray, date)
            
            const deliverObject = []
            productsSnapsArray.map(productsSnap => {
                console.log(productsSnap.docs.length, date)
                productsSnap.docs.map(row => {
                    console.log('ROW DATA', row.data())
                    const qty = row.data().qty
                    const description = row.data().description
                    if ( !deliverObject.some( deliverRow => deliverRow['description'] == description)) {
                        deliverObject.push({
                            date: date,
                            qty: qty,
                            description: description
                        })
                    } else {
                        deliverObject.map( deliverRow => {
                            if (deliverRow['description'] == description) {
                                deliverRow.qty += qty
                            }
                        })
                    }                    
                })
                
            })

            console.log('DELIVER OBJECT', deliverObject)

            // this should return a deliverObject
            return deliverObject
        }))
        console.log('DELIVER OBJECT ARRAY', deliverObjectArray)
        console.log('TEMPROWS SHOULD BE EMPTY', temprows)
        deliverObjectArray.map(deliverObject => {
            deliverObject.map((deliverRow, index) => {
                if (index == 0) {
                    temprows.push(
                        <tr>
                            <td>{deliverRow.date}</td>
                            <td>{deliverRow.description}</td>
                            <td>{deliverRow.qty}</td>
                        </tr>
                    )
                } else {
                    temprows.push(
                        <tr>
                            <td></td>
                            <td>{deliverRow.description}</td>
                            <td>{deliverRow.qty}</td>
                        </tr>
                    )
                }
            })
        })
        console.log('TEMPROWS SHOULD BE DELIVEROBJECT ARRAY TOTAL', temprows)
        setMtsRows(temprows)
        // let mtsnumbersSnap = []
        // dates.map( async date => {
        //     let mtsSnap = await dbMTS.doc(projName).collection('MTS').where('date', '==', date).get()
        //     mtsnumbersSnap.push({date: date, mtsSnap: mtsSnap})
        // })
        
        // const products = []

        // const deliverObjectMtsArray = []
        // mtsnumbersSnap.map(snap => {
        //     const mtsnumbers = []
        //     snap.mtsSnap.docs.map(mts => 
        //         mtsnumbers.push({
        //         date: snap.date,
        //         mtsnumber: mts.data().MTS_number + ''
        //     }))
        //     deliverObjectMtsArray.push(mtsnumbers)
        // })

        // console.log(mtsnumbers)
        // console.log('DELIVEROBJECTMTS ',deliverObjectMtsArray)

        // const deliverObjectProductsSnapsArray = await Promise.all(deliverObjectMtsArray.map( async deliverObjectMts => {
        //     // const mtsSnap = await dbMTS.doc(projName).collection('MTS').where('date', '==', date).get()
        //     // return {date: date, mtsSnap: mtsSnap}
        //     const mtsnumbers = []
        //     const mtsSnap = await Promise.all(deliverObjectMts.map(async mtsRow => {
        //         const productsSnap = await dbMTS.doc(projName).collection('MTS').doc(mtsRow.mtsnumber).get()
        //     }))
        // }))
        // const products = []
        // const productsSnap = await Promise.all(mtsnumbers.map( async mtsnumber => {
        //     const product = await dbMTS.doc(projName).collection('MTS').doc(mtsnumber.mtsnumber).get()
        //     product.docs.map(row => {
        //         row.data().qty
        //         products.push({
        //             date: mtsnumber.date,
        //             mtsnumber: mtsnumber.mtsnumber,

        //         })
        //     })
        //     // snap.mtsSnap.docs.map(mts => {
        //     //     console.log(mts)
        //     //     console.log(mts.data())
        //     //     // console.log('DATE QTY DESC', snap.date, mts.data().qty, mts.data().description)
        //     //     products.push({
        //     //         date: snap.date,
        //     //         qty: mts.data().qty,
        //     //         description: mts.data().description
        //     //     })
        //     // })
        // }))

        // console.log('PRODUCTS', products)
        // console.log('MTSNUMBERSSNAP1',mtsnumbersSnap)
        // const mtsnumbers = []
        // mtsnumbersSnap.map(mts => {
        //     let mtsData = mts.data()
        //     mtsnumbers.push(mtsData.MTS_number + '')
        // })
        // console.log(mtsnumbers)

        // const products = await Promise.all( mtsnumbers.map( async mtsnumber => {
        //     await dbMTS.doc(projName).collection('MTS').doc(mtsnumber).get()
        // }))

        // products.map(snap => {
        //     snap.docs.map(product => {
        //         let description = product.data().description
        //         let qty = product.data().qty
        //     })
        // })


        // dates.map((date, i) => {
            
        //     // let index = 0            
        //     let mtsnumbers = []
        //     let products = []
        //     dbMTS.doc(projName).collection('MTS').where('date', '==', date).get()
        //     .then(snap => {
        //         let count = 0
        //         snap.docs.map(mts => {
        //             // renderRows(mts)
        //             let mtsData = mts.data()
                                        
        //             console.log(mtsData.MTS_number)
        //             mtsnumbers.push(mtsData.MTS_number + '')
        //             count++
        //         }) // map
        //         countperdate.push(count)
        //     }) // db
        //     .then(() => {
        //         // console.log('countperdate ',countperdate)
        //         console.log('AFTER GET DB DATE ')
        //         mtsnumbers.map(mtsnumber => {
        //             console.log('MAPPING MTSNUMBERSS')
        //             dbMTS.doc(projName).collection('MTS').doc(mtsnumber).collection('productsList').get().then(snap => {
        //                 snap.docs.map(row => {
        //                     let description = row.data().description
        //                     let qty = parseInt(row.data().qty)
        //                     // console.log(description, qty)
                            
        //                     if ( !products.some( product => product['description'] == description) ) {
        //                         // console.log('pushing')
        //                         products.push({                                    
        //                             description: description,
        //                             qty: parseInt(qty)
        //                         })
        //                     } else {
        //                         products.map( product => {
        //                             // console.log('appending')
        //                             if (product.description == description) {
        //                                 // console.log(product.qty, qty)
        //                                 product.qty += qty                                        
        //                                 console.log(product.qty)
        //                             }
                                        
        //                         })
        //                     }
        //                     console.log('GETTING PRODUCTS PER MTS')
        //                 })
        //             })
        //             .then(() => {
        //                 // console.log('PRODUCTS', products)
        //                 console.log('AFTER GET DB PRODUCTS')

        //                 products.map((product, index) => {
                            // if (index == 0) {
                            //     temprows.push(
                            //         <tr>
                            //             <td>{date}</td>
                            //             <td>{product.description}</td>
                            //             <td>{product.qty}</td>
                            //         </tr>
                            //     )
                            // } else {
                            //     temprows.push(
                            //         <tr>
                            //             <td></td>
                            //             <td>{product.description}</td>
                            //             <td>{product.qty}</td>
                            //         </tr>
                            //     )
                            // }
        //                     console.log('MAPPING OF PRODUCTS', product)
        //                 })
        //                 let ryanrows = [...mtsRows, ...temprows]                        
        //                 setMtsRows(ryanrows)
        //                 console.log('ryanrows ', ryanrows)
        //                 // console.log(objects)
        //                 console.log('COUNT PER DATE !!!!!!!', countperdate)
        //             })
        //         })
                
        //     })
        // })

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

            dbMTS.doc(projName).collection('MTS').where('status', '==', 'Confirmed').get().then(snap => {
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