import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { InputAdornment, Button, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem, InputLabel, FormControl, Typography } from '@material-ui/core';
import { Save, Clear, Search } from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';
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

function Price() {
    const classes = useStyles();
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    return (
        <div className="PriceList">
            <Container className="cont">
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <FormControl>
                                    <InputLabel className={classes.label} id="demo-simple-select-label">Project Name</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt} value={category} onChange={handleChange} id="demo-simple-select">
                                            <MenuItem value={1}>Aseana 4</MenuItem>
                                            <MenuItem value={2}>Aseana 5</MenuItem>
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
                                <Grid item xs={5}><Typography>Date: 1/12/19-7/13/19</Typography></Grid>
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
                            </tbody>
                            
                        </Table>
                    </MuiThemeProvider>
                </main>
            </Container>
        </div>
    );
}

export default Price;