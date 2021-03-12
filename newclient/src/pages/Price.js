import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Button, InputBase, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem, InputLabel, FormControl, InputAdornment } from '@material-ui/core';
import { Save, Clear, Search } from '@material-ui/icons';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import GetAppIcon from '@material-ui/icons/GetApp';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Badge from '@material-ui/core/Badge';
import '../styles/mts.css';
import {useDropzone} from 'react-dropzone';
import suppliers from '../api/supplier';

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
        width: 390,
        marginTop: 15
    },
    txt1: {
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
    short: {
        width: 70
    },
    medium: {
        width: 100
    }

}));

function Price() {
    const classes = useStyles();
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    const handleChange = (event) => {
        setCategory(event.target.value);
    };    

    const {getRootProps, getInputProps} = 
        useDropzone({ 
            accept: '.csv, text/csv', 
            onDropAccepted: files => parseCSV(files),
            onDropRejected: () => alert('file type rejected') 
        });    

    const fetchSuppliers = async () => {
        try {
            const temp = await (await suppliers.getAllSupplier()).data.data
            setCategories(temp)
            console.log(temp)
            setCategory(temp[0])
        } catch (error) {
            alert('error in getting suppliers')
        }
    }

    useEffect(() => {
        fetchSuppliers();
    }, [])

    useEffect(() => {
        if (category) {
            console.log(category)
            console.log(category.items)
            alert(category)
        }
    }, [category])

    const parseCSV = (files) => {        
        const Papa = require('papaparse')
        
        Papa.parse(files[0], {
            header: true,
            transformHeader: h => h.trim(),
            complete: (results, file) => {
                console.log("Parsing complete:", results, file);
                alert('Parsing complete!')

                if (category === '') {
                    alert('No selected Supplier yet')
                } else {
                    const final = window.confirm(`Are you sure you want to replace the price list for ${category.name}?`)
                    if (final)
                        uploadItems(results.data)
                }
            }
        })
        
    }

    const uploadItems = async (items) => {
        try {

            console.log(items[0].net_price)
            const payload = {...category}
            payload.items = items
            await suppliers.updateSupplierById(category._id, payload)
            alert('uploaded')
        } catch (error) {
            alert('error saving to database')
        }
    }

    return (
        <div className="PriceList">
            <Container className="cont">
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <TextField
                                        className={classes.txt}
                                        size="normal"
                                        placeholder="Search"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={5}>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Suppliers</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt1} defaultValue={categories[0]} value={category} onChange={handleChange} size="normal" id="demo-simple-select">
                                            {
                                                categories.map(cat => {
                                                    return (
                                                        <MenuItem key={cat._id} value={cat}>{cat.name}</MenuItem>
                                                    )
                                                })
                                            }                                            
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                        <Table responsive name='table' hover bordercolor="#8f8f94" border="#8f8f94" >
                            <thead>
                                <tr>
                                    <th>Unit</th>
                                    <th>Description</th>
                                    <th>Brand</th>
                                    <th>Model</th>                                    
                                    <th>List Price</th>
                                    <th>Price Adjustments</th>
                                    <th>Net Price</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tr>
                                <td>unit</td>
                                <td>description</td>
                                <td>brand</td>
                                <td>model</td>                                                            
                                <td>list price</td>
                                <td>45</td>
                                <td>net price</td>
                                <td>remarks</td>
                            </tr>
                            {
                                category ? 
                                category.items.map(cat => {
                                    return (
                                        <tr key={cat._id}>
                                            <td>{cat.unit}</td>
                                            <td>{cat.product_name}</td>
                                            <td>{cat.brand_name}</td>
                                            <td>{cat.model_name}</td>
                                            <td>{cat.list_price}</td>
                                            <td>{cat.price_adjustment}</td>
                                            <td>{cat.net_price}</td>
                                            <td>{cat.remarks}</td>
                                        </tr>
                                    )
                                })
                                :
                                'No items to show'
                            }
                            {/* <tr>
                                <td><InputBase className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>                                                            
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                            </tr>
                            <tr>
                                <td><InputBase className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>                                                            
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                            </tr>
                            <tr>
                                <td><InputBase className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>                                                            
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                            </tr>
                            <tr>
                                <td><InputBase className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>                                                            
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                            </tr> */}
                        </Table>
                        <div className="tbl">
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Button {...getRootProps({className: 'dropzone'})} 
                                    variant="contained" color="primary" size="medium" startIconclassName={classes.button}> <input {...getInputProps()} /><FontAwesomeIcon className="excel" icon={faFileExcel} />Upload Excel</Button>
                                </Grid>

                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary" size="medium" startIconclassName={classes.button} startIcon={<GetAppIcon />}>Download</Button>
                                </Grid>
                            </Grid>
                        </div>

                    </MuiThemeProvider>
                </main>
            </Container>
        </div>
    );
}

export default Price;