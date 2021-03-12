import React, { useState } from 'react';
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
    const [category, setCategory] = React.useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
    };    

    const {acceptedFiles, getRootProps, getInputProps} = 
        useDropzone({ 
            accept: '.csv, text/csv', 
            onDropAccepted: files => uploadExcel(files),
            onDropRejected: () => alert('file type rejected') 
        });    

    const uploadExcel = async (files) => {
        alert(files)
        console.log(files)
        const Papa = require('papaparse')
        let json
        Papa.parse(files[0], {
            header: true,
            complete: (results, file) => {
                console.log("Parsing complete:", results, file);
                alert('Parsing complete!')
            }
        })
        
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
                                        <Select labelId="demo-simple-select-label" className={classes.txt1} value={category} onChange={handleChange} size="normal" id="demo-simple-select">
                                            <MenuItem value={1}>Category1</MenuItem>
                                            <MenuItem value={2}>Category2</MenuItem>
                                            <MenuItem value={3}>Category3</MenuItem>
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
                                    <th>Price</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tr>
                                <td>unit</td>
                                <td>description</td>
                                <td>brand</td>
                                <td>model</td>                                                            
                                <td>price</td>
                                <td>remarks</td>
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
                            </tr>
                            <tr>
                                <td><InputBase className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>                                                            
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                            </tr>
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

                        {/* <Dropzone onDrop={onDrop} accept={}>
                            {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                                <input {...getInputProps()} />
                                <p>Drag and drop a file OR click here to select a file</p>
                                {file && (
                                <div>
                                    <strong>Selected file:</strong> {file.name}
                                </div>
                                )}
                            </div>
                            )}
                        </Dropzone> */}
                    </MuiThemeProvider>
                </main>
            </Container>
        </div>
    );
}

export default Price;