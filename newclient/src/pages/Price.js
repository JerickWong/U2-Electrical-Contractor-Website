import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Button, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { Save, Clear } from '@material-ui/icons';
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
    return (
        <div className="PriceList">
            <Container className="cont">
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <TextField className={classes.txt} placeholder="Search" variant="outlined" size="normal" />
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={5}>
                                    <FormControl>
                                        <Select labelId="demo-simple-select-label" className={classes.txt} value={category} onChange={handleChange} size="normal" variant="outlined" id="demo-simple-select">
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
                                    <th>Model</th>
                                    <th>Brand</th>
                                    <th>Color</th>
                                    <th>Supplier</th>
                                    <th>Price</th>
                                    <th>Remarks</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tr>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><Clear className={classes.delete} /></td>
                            </tr>
                            <tr>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><Clear className={classes.delete} /></td>
                            </tr>
                            <tr>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><Clear className={classes.delete} /></td>
                            </tr>
                            <tr>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><Clear className={classes.delete} /></td>
                            </tr>
                            <tr>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><TextField className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField variant="outlined" size="small" /></td>
                                <td><TextField multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><TextField multiline variant="outlined" size="small" /></td>
                                <td><Clear className={classes.delete} /></td>
                            </tr>
                        </Table>
                        <div className="tbl">
                            <Grid container spacing={4}>
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" size="large" startIconclassName={classes.button}><FontAwesomeIcon className="excel" icon={faFileExcel} />Import Excel File </Button>
                                </Grid>
                                <Grid item xs={3} />
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" size="large" startIconclassName={classes.button} startIcon={<Save />}> Save as Excel </Button>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button variant="contained" color="primary" size="large" startIconclassName={classes.button} startIcon={<Save />}> Save Changes </Button>
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