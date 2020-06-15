import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Container, Table } from 'react-bootstrap';
import { Button, TextField, Grid, InputAdornment, makeStyles, createMuiTheme, Paper, Typography } from '@material-ui/core';
import { Add, Folder, Save, Person, LocationOn, Edit, LocalShipping } from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';
import '../styles/mts.css';

const primary = '#8083FF';
const white = '#FFFFFF';
const tbl = '#898a9c';
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
    marginRight: theme.spacing(0),
    marginTop: theme.spacing(0.3),
    width: 260,

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
    width: 50
  },
  txt1: {
    width: 90
  },
  txt2: {
    width: 100
  },
  txt4: {
    width: 260
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 260,
    justifyContent: 'center',
    height: theme.spacing(5)
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

}));

function MtsWindow() {
  const classes = useStyles();
  return (
    <div className="MtsContent">
      <Container className="cont">
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Prepared by"
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
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Address"
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
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="MTS No."
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
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Project Name"
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
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Delivered From"
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
                <Grid item xs={4}>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    size="small"
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" size="large" className={classes.button} startIcon={<Add />}>Add Row</Button>
                </Grid>
                <Grid item xs={8} />
              </Grid>
            </div>
            <Table hover bordercolor="#8f8f94" border="#8f8f94" >
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
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" variant="outlined" /></td>
                <td>4</td>
                <td><TextField id="standard-basic" className={classes.txt2} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" variant="outlined" /></td>
                <td>46</td>
                <td><TextField id="standard-basic" className={classes.txt2} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" variant="outlined" /></td>
                <td>468</td>
                <td><TextField id="standard-basic" className={classes.txt2} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" variant="outlined" /></td>
                <td>4680</td>
                <td><TextField id="standard-basic" className={classes.txt2} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" variant="outlined" /></td>
                <td>46800</td>
                <td><TextField id="standard-basic" className={classes.txt2} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField size="small" className={classes.txt} variant="outlined" /></td>
                <td><TextField id="standard-basic" size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" multiline variant="outlined" /></td>
                <td><TextField id="standard-basic" className={classes.txt1} size="small" variant="outlined" /></td>
                <td>468000</td>
                <td><TextField id="standard-basic" className={classes.txt2} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
            </Table>
            <div className="tbl">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="outlined-basic" size="small" label="Requested by" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="outlined-basic" size="small" label="Taken out by" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><Typography className={classes.total}>Total Amount: XXXX.XX</Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="outlined-basic" size="small" label="Approved by" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="outlined-basic" size="small" label="Received by" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color="primary" size="large" className={classes.button} startIcon={<Save />}> SAVE </Button>
                </Grid>
              </Grid>
            </div>
          </MuiThemeProvider>
        </main>
      </Container>
    </div>
  );
}

export default MtsWindow;
