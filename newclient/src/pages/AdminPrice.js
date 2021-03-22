import React, { useState, useEffect } from 'react';
import { Container, Table, } from 'react-bootstrap';
import {
    Button, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem,
    InputLabel, FormControl, FormGroup, Input, InputGroup, ButtonGroup, InputAdornment, InputBase, IconButton
} from '@material-ui/core';
import {
    AddBox, ArrowDownward, Edit, Clear, Search, GroupAdd, QueryBuilder, AddShoppingCart,
    ChevronRight, DeleteOutline, FilterList, FirstPage, LastPage,
    Remove, SaveAlt, ViewColumn, AccountCircle, Delete
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
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog'

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
    },
    modalIcons: {
        color: 'primary',
        display: 'flex',
        fontSize: 30
    },
    modalTitle: {
        fontSize: 20,
        display: 'flex',
        marginTop: 30,
        padding: theme.spacing(2)

    },
    modalFields: {
        width: 400,
        marginBottom: 20,
        alignItems: 'center',
        display: 'flex',
        marginLeft: 30
    },
}));

function AdminPrice() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [items, setItems] = useState([])
    const Papa = require('papaparse')

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setOpenConfirm(false);
    };

    const addSupplier = async () => {
        try {
            const payload = {
                name,
                items
            }
            await suppliers.insertSupplier(payload)
            alert('successfully adding suppliers')
            fetchSuppliers();
        } catch (error) {
            alert('error in adding supplier')
        }
        handleClose();
        setName('')
        setItems([])
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

    const downloadFile = async () => {
        let latest = {...category}
        try {
            latest = await (await suppliers.getSupplierById(category._id)).data.data
            console.log(latest)
            alert(latest)
        } catch (error) {
            console.log(error)
            alert('downloaded file not the latest version')
        }

        const data = latest.items.filter(c => {
            delete c._id
            return delete c.tableData
        })

        const csv = Papa.unparse(data, {
            header: true
        })
        const filename = `${latest.name}.csv` || `export.csv`

        if (csv === null)
            alert('empty')
        
        const blob = new Blob([csv]);
        if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
            window.navigator.msSaveBlob(blob, filename);
        else
        {
            const a = window.document.createElement("a");
            a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
            a.download = filename;
            document.body.appendChild(a);
            a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
            document.body.removeChild(a);
        }
    }


    const parseCSV = (files) => {                
        
        Papa.parse(files[0], {
            header: true,
            transformHeader: h => h.trim(),
            complete: (results, file) => {
                alert('Parsing complete!')

                // check if not open, meaning youre not adding a new supplier
                if (!open) {
                    const final = window.confirm(`Are you sure you want to replace the price list for ${category.name}?`)
                    if (final)
                        uploadItems(results.data)
                } else {
                    if (category === null)
                        alert('No selected Supplier yet')
                    else {
                        const rawItems = results.data.map(item => {
                            const list_price = parseFloat(item.list_price.trim().replace(',', ''))
                            console.log(list_price)
                            const net_price = parseFloat(item.net_price.trim().replace(',', ''))
                            const price_adjustment = parseFloat(item.price_adjustment.trim().replace(',', ''))
                            return {...item, list_price, net_price, price_adjustment}
                        })
                        setItems(rawItems)
                    }
                }
            }
        })
        
    }

    const uploadItems = async (rawItems) => {

        rawItems = rawItems.map(item => {
            const list_price = parseFloat(item.list_price.trim().replace(',', ''))
            console.log(list_price)
            const net_price = parseFloat(item.net_price.trim().replace(',', ''))
            const price_adjustment = parseFloat(item.price_adjustment.trim().replace(',', ''))
            return {...item, list_price, net_price, price_adjustment}
        })
        console.log(rawItems)

        try {

            const payload = {...category}
            payload.items = rawItems
            await suppliers.updateSupplierById(payload._id, payload)
            alert('uploaded')
        } catch (error) {
            alert('error saving to database')
        }

        setItems([])
        window.location.reload();
    }

    const handleDelete = async () => {
        try {
            await suppliers.deleteSupplierById(category._id)
            alert('supplier deleted')
        } catch (error) {
            console.log(error)
            alert('error in deleting supplier')
        }
        fetchSuppliers();
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
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label" shrink={true}>Suppliers</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt1} defaultValue={categories[0]} value={category} onChange={handleChange} size="normal" id="demo-simple-select" >
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
                                <Grid item xs={4}>
                                    
                                </Grid>
                                
                                <Grid item xs={3}>
                                    <Badge color="secondary" className={classes.badge} badgeContent={1}>
                                        <Button variant="contained" color="primary" size="medium" startIcon={<QueryBuilder />} className={classes.pending}>Pending Items</Button>
                                    </Badge>
                                </Grid>
                                <Grid item xs={4}>
                                <Button variant="contained" color="primary" className={classes.button3} startIcon={<GroupAdd />} onClick={handleClickOpen}>
                                        Add Supplier
                                    </Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="secondary" disable={!category} className={classes.button3} startIcon={<Delete />} onClick={() => setOpenConfirm(true)}>
                                        Delete Supplier
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <br></br>
                        <PriceTable data={category ? category.items : []} category={category}/>

                            {/* ADD SUPPLIER */}
                        <Dialog fullWidth="true" maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">
                                <h3>New Supplier</h3>
                            </DialogTitle>
                            <DialogContent dividers>
                                <div className="modalAcc">                                    
                                    <FormGroup>
                                        <InputLabel className={classes.modalFields}>Name</InputLabel>
                                        <Input
                                            className={classes.modalFields}
                                            variant="outlined"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountCircle color="primary" />
                                                </InputAdornment>
                                            }
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </FormGroup>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} variant="contained" >
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary" className={classes.button} {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <FontAwesomeIcon className="excel" icon={faFileExcel} />Upload Excel
                                </Button>
                                <Button className={classes.create} variant="contained" color="primary" onClick={() => { name ? addSupplier() : alert('Enter a name')}}>
                                    Create Supplier
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <div className="tbl">
                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <Button variant="contained" color="primary" className={classes.button} {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()} />
                                        <FontAwesomeIcon className="excel" icon={faFileExcel} />Upload Excel
                                    </Button>
                                    <Button variant="contained" color="primary" className={classes.button3} startIcon={<GetAppIcon />} onClick={downloadFile}>
                                        Download
                                    </Button>
                                </Grid>
                                <Grid item xs={3} />
                            </Grid>
                        </div>
                    </MuiThemeProvider>
                </main>
            </Container>
            <ConfirmationDialog open={openConfirm} message={'All of its items will also be deleted. Are you sure you want to delete?'} 
            confirm={handleDelete} handleClose={handleClose}/>
        </div>
    );
}

export default AdminPrice;