import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {Container, Table} from 'react-bootstrap';
import {Button, TextField, Grid, InputAdornment, makeStyles, createMuiTheme, Paper, Typography } from '@material-ui/core';
import {Add, Folder, Save, Person, LocationOn, Edit, LocalShipping} from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';
import '../styles/mts.css';

const primary = '#8083FF';
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
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: 225,
    
  },
  button: {
    backgroundColor: primary,
    margin: theme.spacing(0),
    width: 225,
  },
  root: {
    flexGrow: 1,
  },
  txt: {
    width:50
  },
  paper:{
    display: 'flex',
    flexWrap: 'wrap',
    width: 225,
    justifyContent: 'center',
    height: theme.spacing(5)
  },
}));

function MtsWindow() {
  const classes = useStyles();
  return (
    <div className="MtsContent">
      <Container className="cont">
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField id="input-with-icon-textfield"
                  label="Prepared by"
                  defaultValue="Employee Name"
                  size="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Person color="primary" />
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
                        <Edit color="primary" />
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
                        <Folder color="primary" />
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
                  size="small"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{ shrink: true }}
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
                        <LocationOn color="primary" />
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
                        <LocalShipping color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button variant="contained" size="large" className={classes.button} startIcon={<Add />}>Add Row</Button>
              </Grid>
              <Grid item xs={6} />
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
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td>4680</td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
            </tr>
            <tr>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td>4680</td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
            </tr>
            <tr>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td>4680</td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
            </tr>
            <tr>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td>4680</td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
            </tr>
            <tr>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField size="small" className={classes.txt} variant="outlined"/></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td>4680</td>
              <td><TextField id="standard-basic" size="small" variant="outlined" /></td>
              <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
            </tr>
          </Table>
          <div className="tbl">
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <TextField id="outlined-basic" size="small" label="Requested by" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <TextField id="outlined-basic" size="small" label="Taken out by" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <Paper className={classes.paper}><Typography className={classes.total}>Total Amount: XXXX.XX</Typography></Paper>
            </Grid>
            <Grid item xs={2}>
              <TextField id="outlined-basic" size="small" label="Approved by" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <TextField id="outlined-basic" size="small" label="Received by" defaultValue="Name" variant="outlined" />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={3}>
              <Button variant="contained" color="primary" size="large" className={classes.button} startIcon={<Save />}> SAVE </Button>
            </Grid>
          </Grid>
          </div>
          </MuiThemeProvider>
      </Container>
    </div>
  );
}

export default MtsWindow;
