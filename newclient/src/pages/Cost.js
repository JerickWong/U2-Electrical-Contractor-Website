import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Table } from 'react-bootstrap';
import { makeStyles, MenuItem, TextField, InputLabel, Grid, Select, FormControl } from '@material-ui/core';
import '../styles/mts.css';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        width: 300,
        marginLeft: theme.spacing(7)
    }, 
    textField:{
        width:290,
        marginLeft: 15,
    }
}));


function Cost() {
    const classes = useStyles();
    const [projName, setProject] = React.useState('');

    const handleChange = (event) => {
        setProject(event.target.value);
    };

    return (
        <div className="App">
            <Container className="cont">
                <div className="project">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Project Name</InputLabel>
                                <Select labelId="demo-simple-select-label" value={projName} size="large" onChange={handleChange}>
                                    <MenuItem value={1}>Aseana 4</MenuItem>
                                    <MenuItem value={2}>Aseana 5</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} />
                        <Grid item xs={2}>
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                size="small"
                                defaultValue={moment().format('YYYY-MM-DD')}
                                className={classes.textField}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>
                    </Grid>
                </div>
                <Table className="tbl1" hover bordercolor="#8f8f94" border="#8f8f94">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>MTS No.</th>
                            <th>Amount</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr> <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>

                </Table>
            </Container>
        </div>
    );
}

export default Cost;
