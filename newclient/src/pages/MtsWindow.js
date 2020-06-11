import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {Container, Table} from 'react-bootstrap';
import {Button, TextField, Grid, InputAdornment, makeStyles, createMuiTheme } from '@material-ui/core';
import {Add, Folder, Save, Person, LocationOn, Edit, LocalShipping} from '@material-ui/icons';
import indigo from '@material-ui/core/colors/indigo';
import '../styles/mts.css';
//import { createMuiTheme } from '@material-ui/core/styles';

const color = indigo [900];
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#EBE5FF',
      main: '#8083FF',
      dark: '#474554',
      contrastText: '#FAF8FF',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 225,
    color: color,
  },
  button: {
    margin: theme.spacing(1),
    width: 220,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function MtsWindow(){
  const classes = useStyles();
  return (
    <div className="MtsContent">
      <Container className="cont">
        <div className={classes.root}>
        <Grid container spacing ={2}>
          <Grid item xs={3}>
            <TextField id="input-with-icon-textfield" 
              label="Prepared by" 
              defaultValue="Employee Name" 
              size="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Person style={{ color: color }}/>
                  </InputAdornment>
                ),
              }}
              />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <TextField id="input-with-icon-textfield" 
              className="icon"
              label="MTS No." 
              defaultValue="71101" 
              size="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Edit style={{ color: color }}/>
                  </InputAdornment>
                ),
              }}
              />
          </Grid>
          <Grid item xs={3}>
            <TextField id="input-with-icon-textfield" 
              label="Project Name" 
              defaultValue="U2 Electrical" 
              size="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Folder style={{ color: color }}/>
                  </InputAdornment>
                ),
              }}
              />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
          <TextField
                  id="date"
                  label="Date"
                  type="date"
                  size="normal"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{shrink: true}}
                  style={{ color: color }}
                />
          </Grid>
          <Grid item xs={3}>
            <TextField id="input-with-icon-textfield" 
              label="Address" 
              defaultValue="Address" 
              size="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocationOn style={{ color: color }}/>
                  </InputAdornment>
                ),
              }}
              />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <TextField id="input-with-icon-textfield" 
              label="From" 
              defaultValue="Delivered from" 
              size="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LocalShipping style={{ color: color }}/>
                  </InputAdornment>
                ),
              }}
              />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" size="large" className={classes.button} startIcon={<Add />}>Add Panelboard</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" size="large" className={classes.button} startIcon={<Add />}>Add Row</Button>
          </Grid>
          <Grid item xs={6}/>
        </Grid>
        </div>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Qty</th>  
                <th>Unit</th>
                <th>Description</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Price</th>
                <th>Total</th>
                <th>Remarks</th>
                <th></th>
              </tr>
            </thead>
              <tr>
                <td><TextField id="standard-basic" size="small" variant="outlined"/></td>
                <td><TextField id="standard-basic" size="small" variant="outlined"/></td>
                <td><TextField id="standard-basic" size="small" variant="outlined"/></td>
                <td><TextField id="standard-basic" size="small" variant="outlined"/></td>
                <td><TextField id="standard-basic" size="small" variant="outlined"/></td>
                <td><TextField id="standard-basic" size="small" variant="outlined"/></td>
                <td>4680</td>
                <td><TextField id="standard-basic" size="small" variant="outlined"/></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes}/></td>
              </tr>
          </Table>
          <Grid container spacing ={1}> 
            <Grid item xs={2}>
              <TextField id="outlined-basic" size="small" label="Requested by" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={3}>
              <TextField id="outlined-basic" size="small" label="Taken out by" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={3}>
              <TextField id="outlined-basic" size="small" label="Total Amount" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2}>
              <TextField id="outlined-basic" size="small" label="Approved by" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={3}>
              <TextField id="outlined-basic" size="small" label="Received by" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={3}>
            <Button variant="contained" color="primary" size="large" className={classes.button} startIcon={<Save />}> SAVE </Button>
            </Grid>
          </Grid>
      </Container>
    </div>
  );
}

export default MtsWindow;
