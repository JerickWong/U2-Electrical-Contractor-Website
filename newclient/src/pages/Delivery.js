import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Button, InputAdornment, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem, InputLabel, FormControl, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';
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
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                <FormControl>
                                <InputLabel className={classes.label} id="demo-simple-select-label">Project Name</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt} value={category} onChange={handleChange} id="demo-simple-select">
                                            <MenuItem value={1}>Aseana 4</MenuItem>
                                            <MenuItem value={2}>Aseana 5</MenuItem>
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
                                <tr>
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