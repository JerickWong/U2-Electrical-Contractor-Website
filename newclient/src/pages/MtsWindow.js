import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Container, Table } from 'react-bootstrap';
import { Button, TextField, Grid, InputAdornment, makeStyles, createMuiTheme, Paper, Typography } from '@material-ui/core';
import { Add, Folder, Save, Person, LocationOn, Edit, LocalShipping } from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';
import '../styles/mts.css';
import MtsRow from "../components/MtsRow/MtsRow";

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
  let row_index = 0;
  // --------STATES--------
  const [invalid, setInvalid] = useState(true)
  const [valid, setValid] = useState({
      'mts_field': false,
      'requested_by': false
  })
  const [total, setTotal] = useState([])
  const [grand_total, setGrandTotal] = useState(0)


  function check_validity (e) {
    const value = e.target.value

    console.log(e.target.name)

    if (!value) {
      let newValid = { ...valid }
      newValid[e.target.name] = false
      console.log(newValid)

      setValid(newValid)
      console.log(valid)
      // setValid(prevState => {
      //   let required = {...prevState.required} ;  // creating copy of state variable jasper
      //   required[e.target.name] = false;                     // update the name property, assign a new value                 
      //   return { required };                                 // return new object jasper object
      // })
      setInvalid(true)
    } else {

      let newValid = { ...valid }
      newValid[e.target.name] = true
      console.log(newValid)

      setValid(newValid)
      console.log(valid)

      if (valid['mts_field'] && valid['requested_by']) 
        setInvalid(false)
            
      console.log(`mts_field: ${valid['mts_field']} and requested by: ${valid['requested_by']}`)
    }
  }

  function updateTotal (e) {
    
  }

  function save_MTS () {
    
  }

  const rows = [(
    <MtsRow updateTotal={updateTotal} 
                class1={classes.txt}
                class2={classes.txt1}
                class3={classes.txt2}
                total={total[row_index]} />
  )]

  for (let i=0; i<5; i++) {
    row_index++;
    rows.push(
      <MtsRow updateTotal={updateTotal} 
                class1={classes.txt}
                class2={classes.txt1}
                class3={classes.txt2}
                total={total[row_index]} />
    )    
  }

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
                    className={`${classes.txt4} `}
                    label="Prepared by"
                    id='prepared_by'
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
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={`${classes.txt4} `}
                    label="Address"
                    id='address'
                    defaultValue="Manila"
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
                    className={`${classes.txt4} `}
                    label="MTS No."
                    id='mts_number'
                    defaultValue="71101"
                    size="normal"
                    onChange={check_validity}
                    name='mts_field'
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
                    className={`${classes.txt4} `}
                    label="Project Name"
                    id='project_name'
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
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={`${classes.txt4} `}
                    label="From"
                    id='delivered_from'
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
                <Grid item xs={4}>
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
              {/* <tr>
                <td><TextField size="small" onChange={updateTotal} className={`${classes.txt} quantity`} variant="outlined" /></td>
                <td><TextField size="small" className={`${classes.txt} unit`} variant="outlined" /></td>
                <td><TextField size="small" multiline variant="outlined" className='description' /></td>
                <td><TextField className={`${classes.txt1} brand`} size="small" multiline variant="outlined" /></td>
                <td><TextField className={`${classes.txt1} model`} size="small" multiline variant="outlined" /></td>
                <td><TextField onChange={updateTotal} className={`${classes.txt1} price`} size="small" variant="outlined" /></td>
                  <td>{total[0]}</td>
                <td><TextField className={`${classes.txt2} remarks`} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" onChange={updateTotal} className={`${classes.txt} quantity`} variant="outlined" /></td>
                <td><TextField size="small" className={`${classes.txt} unit`} variant="outlined" /></td>
                <td><TextField size="small" multiline variant="outlined" className='description' /></td>
                <td><TextField className={`${classes.txt1} brand`} size="small" multiline variant="outlined" /></td>
                <td><TextField className={`${classes.txt1} model`} size="small" multiline variant="outlined" /></td>
                <td><TextField onChange={updateTotal} className={`${classes.txt1} price`} size="small" variant="outlined" /></td>
                <td>{total[1]}</td>
                <td><TextField className={`${classes.txt2} remarks`} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" onChange={updateTotal} className={`${classes.txt} quantity`} variant="outlined" /></td>
                <td><TextField size="small" className={`${classes.txt} unit`} variant="outlined" /></td>
                <td><TextField size="small" multiline variant="outlined" className='description' /></td>
                <td><TextField className={`${classes.txt1} brand`} size="small" multiline variant="outlined" /></td>
                <td><TextField className={`${classes.txt1} model`} size="small" multiline variant="outlined" /></td>
                <td><TextField onChange={updateTotal} className={`${classes.txt1} price`} size="small" variant="outlined" /></td>
                <td>{total[0]}</td>
                <td><TextField className={`${classes.txt2} remarks`} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" onChange={updateTotal} className={`${classes.txt} quantity`} variant="outlined" /></td>
                <td><TextField size="small" className={`${classes.txt} unit`} variant="outlined" /></td>
                <td><TextField size="small" multiline variant="outlined" className='description' /></td>
                <td><TextField className={`${classes.txt1} brand`} size="small" multiline variant="outlined" /></td>
                <td><TextField className={`${classes.txt1} model`} size="small" multiline variant="outlined" /></td>
                <td><TextField onChange={updateTotal} className={`${classes.txt1} price`} size="small" variant="outlined" /></td>
                <td>{total[2]}</td>
                <td><TextField className={`${classes.txt2} remarks`} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" onChange={updateTotal} className={`${classes.txt} quantity`} variant="outlined" /></td>
                <td><TextField size="small" className={`${classes.txt} unit`} variant="outlined" /></td>
                <td><TextField size="small" multiline variant="outlined" className='description' /></td>
                <td><TextField className={`${classes.txt1} brand`} size="small" multiline variant="outlined" /></td>
                <td><TextField className={`${classes.txt1} model`} size="small" multiline variant="outlined" /></td>
                <td><TextField onChange={updateTotal} className={`${classes.txt1} price`} size="small" variant="outlined" /></td>
                <td>{total[3]}</td>
                <td><TextField className={`${classes.txt2} remarks`} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr>
              <tr>
                <td><TextField size="small" onChange={updateTotal} className={`${classes.txt} quantity`} variant="outlined" /></td>
                <td><TextField size="small" className={`${classes.txt} unit`} variant="outlined" /></td>
                <td><TextField size="small" multiline variant="outlined" className='description' /></td>
                <td><TextField className={`${classes.txt1} brand`} size="small" multiline variant="outlined" /></td>
                <td><TextField className={`${classes.txt1} model`} size="small" multiline variant="outlined" /></td>
                <td><TextField onChange={updateTotal} className={`${classes.txt1} price`} size="small" variant="outlined" /></td>
                <td>{total[4]}</td>
                <td><TextField className={`${classes.txt2} remarks`} size="small" variant="outlined" /></td>
                <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
              </tr> */}
              {rows}
            </Table>
            <div className="tbl">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="" size="small" label="Requested by" defaultValue="Name" onChange={check_validity} name='requested_by' variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="" size="small" label="Taken out by" defaultValue="Name" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><Typography className={classes.total}>Total Amount: {grand_total}</Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="" size="small" label="Approved by" defaultValue="Name" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="" size="small" label="Received by" defaultValue="Name" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color="primary" size="large"  disabled={invalid} className={classes.button} startIcon={<Save />}> SAVE </Button>
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
