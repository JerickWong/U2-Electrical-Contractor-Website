import React, { useState, useEffect } from 'react';
import { Container, Table, } from 'react-bootstrap';
import {
    Button, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem,
    InputLabel, FormControl, FormGroup, Input, InputGroup, ButtonGroup, InputAdornment, InputBase, IconButton
} from '@material-ui/core';
import {
    AddBox, ArrowDownward, Edit, Clear, Search, GroupAdd, QueryBuilder, AddShoppingCart,
    ChevronRight, DeleteOutline, FilterList, FirstPage, LastPage,
    Remove, SaveAlt, ViewColumn
} from '@material-ui/icons';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import { MaterialTable } from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetAppIcon from '@material-ui/icons/GetApp';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import PriceTable from '../components/AdminPriceTable/PriceTable';
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
        width: 200,
    },
    pending: {
        marginLeft: 80
    },
    save: {
        width: 200,
        backgroundColor: primary,
        color: white,
        marginLeft: 57
    },
    root: {
        flexGrow: 1,
    },
    txt: {
        width: 300,
        marginTop: 15
    },
    badge: {
        marginTop: 15
    },
    txt1: {
        width: 300
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
    },
    AddBtn2: {
        width: 300
    },
    priceIcons: {
        color: primary,
        fontSize: 'small',
    },
    button3: {
        marginLeft: 10,
    }
}));

function AdminPrice() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const addSupplier = () => {

    }

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
            setCategory(temp[0])
        } catch (error) {
            console.log(error)
            alert('error in getting suppliers')
        }
    }

    useEffect(() => {
        fetchSuppliers();
    }, [])

    const parseCSV = (files) => {        
        const Papa = require('papaparse')
        
        Papa.parse(files[0], {
            header: true,
            transformHeader: h => h.trim(),
            complete: (results, file) => {
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

        items = items.map(item => {
            const list_price = parseFloat(item.list_price.trim().replace(',', ''))
            console.log(list_price)
            const net_price = parseFloat(item.net_price.trim().replace(',', ''))
            const price_adjustment = parseFloat(item.price_adjustment.trim().replace(',', ''))
            return {...item, list_price, net_price, price_adjustment}
        })
        console.log(items)

        try {

            const payload = {...category}
            payload.items = items
            await suppliers.updateSupplierById(payload._id, payload)
            alert('uploaded')
            await fetchSuppliers();
            setCategory(payload);
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
                                <Grid item xs={4}>
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
                                <Grid item xs={4}>
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
                                <Grid item xs={1} />
                                <Grid item xs={3}>
                                    <Badge color="secondary" className={classes.badge} badgeContent={1}>
                                        <Button variant="contained" color="primary" size="medium" startIcon={<QueryBuilder />} className={classes.pending}>Pending Items</Button>
                                    </Badge>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" className={classes.AddBtn2} startIcon={<GroupAdd />}>Add Supplier</Button>
                                </Grid>
                            </Grid>
                        </div>
                            <br></br>
                            <PriceTable data={category.items} />
                        <div className="tbl">
                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <Button variant="contained" color="primary" className={classes.button} {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        <FontAwesomeIcon className="excel" icon={faFileExcel} />Upload Excel
                                    </Button>
                                    <Button variant="contained" color="primary" className={classes.button3} startIcon={<GetAppIcon />}>Download</Button>
                                </Grid>
                                <Grid item xs={3} />
                            </Grid>
                        </div>
                    </MuiThemeProvider>
                </main>
            </Container>
        </div>
    );
}

export default AdminPrice;