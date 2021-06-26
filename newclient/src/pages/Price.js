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
    const [backupCategory, setBackup] = useState(null);
    const [categories, setCategories] = useState([]);
    const Papa = require('papaparse')

    const handleChange = (event) => {
        setCategory(event.target.value);
        setBackup(event.target.value);
        document.getElementById('search').value = ""
    };    

    const {getRootProps, getInputProps} = 
        useDropzone({ 
            accept: '.csv, text/csv', 
            onDropAccepted: files => parseCSV(files),
            onDropRejected: () => alert('file type rejected') 
        });    

    const fetchSuppliers = async () => {
        try {
            let temp = await (await suppliers.getAllSupplier()).data.data
            temp.sort((a, b) => a.name.localeCompare(b.name))
            temp = temp.filter( s => {
                if (s.name !== "Pending Items")
                    return s
            })
            setCategories(temp)
            setCategory(temp[0])
            setBackup(temp[0])
        } catch (error) {
            console.log(error)
            alert('error in getting suppliers')
        }
    }

    useEffect(() => {
        fetchSuppliers();
    }, [])

    const parseCSV = (files) => {
        
        Papa.parse(files[0], {
            header: true,
            transformHeader: h => h.trim(),
            complete: (results, file) => {
                alert('Parsing complete!')

                if (category === null) {
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

        items.map(item => {
            item.unit = item.unit.trim()
            item.product_name = item.product_name.trim()
            item.brand_name = item.brand_name.trim()
            item.model_name = item.model_name.trim()
            item.remarks = item.remarks.trim()
            item.list_price = parseFloat(item.list_price.trim().replace(',', ''))
            item.net_price = parseFloat(item.net_price.trim().replace(',', ''))
            item.price_adjustment = parseFloat(item.price_adjustment.trim().replace(',', ''))
        })

        try {

            const payload = {...category}
            payload.items = items
            await suppliers.updateSupplierById(payload._id, payload)
            alert('uploaded')
            await fetchSuppliers();
            setCategory(payload);
            setBackup(payload)
        } catch (error) {
            alert('error saving to database')
        }
    }

    const handleSearch = (event) => {
        
        let query = event.target.value
        if (query !== '') {
            query = query.toLowerCase()
            const price = [...backupCategory.items]
            const filtered = price.filter(p => {
                const lowerUnit = p.unit.toLowerCase()
                const lowerName = p.product_name.toLowerCase()
                const lowerBrand = p.brand_name.toLowerCase()
                const lowerModel = p.model_name.toLowerCase()
                const lowerRemarks = p.remarks.toLowerCase()
                if (lowerUnit.includes(query) || lowerName.includes(query) || lowerBrand.includes(query) || 
                    lowerModel.includes(query) || lowerRemarks.includes(query))
                    return p
                
            })
            setCategory({...category, items: filtered})
        } else {
            setCategory(backupCategory)
        }

    }

    const downloadFile = () => {
        const data = category.items.filter(c => {
            return delete c._id
        })

        const csv = Papa.unparse(data, {
            header: true
        })
        const filename = `${category.name}.csv` || `export.csv`

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
                                        onChange={handleSearch}
                                        id="search"
                                    />
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={5}>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label" shrink={true}>Suppliers</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt1} defaultValue={categories[0]} value={backupCategory} onChange={handleChange} size="normal" id="demo-simple-select">
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
                            <tbody>
                                {
                                    category ? 
                                    category.items.map(cat => {
                                        return (
                                            <tr key={cat._id}>
                                                <td>{cat.unit}</td>
                                                <td>{cat.product_name}</td>
                                                <td>{cat.brand_name}</td>
                                                <td>{cat.model_name}</td>
                                                <td>{cat.list_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{cat.price_adjustment ? cat.price_adjustment : ''}</td>
                                                <td>{cat.net_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{cat.remarks}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    'No items to show'
                                }
                            </tbody>
                        </Table>
                        <div className="tbl">
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <Button {...getRootProps({className: 'dropzone'})} 
                                    variant="contained" color="primary" size="medium" startIconclassName={classes.button}> <input {...getInputProps()} /><FontAwesomeIcon className="excel" icon={faFileExcel} />Upload Excel</Button>
                                </Grid>

                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary" size="medium" startIconclassName={classes.button} startIcon={<GetAppIcon />} onClick={downloadFile}>
                                        Download
                                    </Button>
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