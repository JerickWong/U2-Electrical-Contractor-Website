import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Table } from 'react-bootstrap';
import { Button, TextField, Grid, InputAdornment, makeStyles, createMuiTheme, Paper, Typography } from '@material-ui/core';
import { Add, Folder, Save, Person, LocationOn, Edit, LocalShipping, CastConnectedSharp } from '@material-ui/icons';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import '../styles/mts.css';
import MtsRow from "../components/MtsRow/MtsRow";
import db from '../components/Firestore/firestore'
import moment from 'moment'
import UserAlert from '../components/UserAlert/UserAlert'
import { red } from '@material-ui/core/colors';

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
    width: 70
  },
  txt1: {
    width: 90
  },
  txt2: {
    width: 130
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
const ValidationTextField = withStyles({
  root: {
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderBottomColor: 'red'
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
    width: 260
  },
})(TextField);

function MtsWindow(props) {

  const classes = useStyles();
  let row_index = 0;
  const styles = {
    borderColor: 'red',
  }
  // --------STATES-------- //
  const [invalid, setInvalid] = useState(true)
  const [valid, setValid] = useState({
      'mts_field': false,
      'requested_by': false,
      'project_name': false
  })
  
  const [total, setTotal] = useState([0, 0, 0, 0, 0])
  const [totalAmount, setTotalAmount] = useState(0)


  function checkValidity (e) {
    const value = e.target.value

    console.log(e.target.name)

    if (!value) {
      let newValid = { ...valid }
      newValid[e.target.name] = false
      console.log(newValid)

      setValid(newValid)
      console.log(valid)
      setInvalid(true)
    } else {

      let newValid = { ...valid }
      newValid[e.target.name] = true
      console.log(newValid)

      setValid(newValid)
      console.log(valid)
            
      console.log(`mts_field: ${valid['mts_field']} and requested by: ${valid['requested_by']}`)
    }
  }
  useEffect(() => {
    const saveButton = document.querySelector('#save')
    
    if (valid['mts_field'] && valid['requested_by'] && valid['project_name']) {
      
      setInvalid(false)      
      saveButton.disabled = invalid
    }
        
  }, [valid])

  // ON CHANGE UPDATE TOTAL ROW PRICE 
  function updateTotal (e) {
    const tr = e.currentTarget
    console.log(tr)

    let quantity = tr.querySelector('input[name="quantity"]').value
    let price = tr.querySelector('input[name="price"]').value
    let total = tr.querySelector('td[name="total"]').innerHTML
    console.log(`quantity: ${quantity} and price: ${price}`)
    console.log(`total: ${total}`)
    if (e.target.name === 'quantity' || e.target.name === 'price') {
      if (quantity != '' && price != '') {
        console.log('etits')
        quantity = parseInt(quantity)
        price = parseFloat(price)
        total = quantity*price
        tr.querySelector('td[name="total"]').innerHTML = total
        // grand total
      } else {
        tr.querySelector('td[name="total"]').innerHTML = 0
      }
    }
    let description = tr.querySelector('textarea[name="description"]').value
    console.log(description)
    updateTotalAmount()
  }

  // ON CHANGE OF TOTAL ROW PRICE, UPDATE TOTAL AMOUNT
  function updateTotalAmount() {
    const rows = getRows()
    let tempTotal = 0.0
    rows.map(row => {
      let total = row.querySelector('td[name="total"]').innerHTML
      total = parseFloat(total)
      tempTotal += total
    })

    setTotalAmount(tempTotal)
  }
  
  function deleteRow(e) {
    e.currentTarget.parentNode.parentNode.remove()
    updateTotalAmount()
    row_index--;
  }

  function addRow() {    
    let newTotal = [...total]
    newTotal.push(0)
    setTotal(newTotal)    
        
    console.log(`row index: ${row_index}`)        
  }


  // use effect of adding rows
useEffect(() => {
  let newRows = [...rowObject]
    newRows.push(
      <MtsRow updateTotal={updateTotal} 
                  class1={classes.txt}
                  class2={classes.txt1}
                  class3={classes.txt2}
                  total={total[row_index]}
                  click={deleteRow} />
    )
    setRows(newRows)
    row_index++;

  }, [total])


  // SAVING OF MTS TO DB
  function saveMTS () {

    if (totalAmount == 0) {
      alert('please fill out required fields')
    } else {

      // GETTING NECESSARY VALUES
      const rows = getRows()
      
      const prepared_by = document.querySelector('#preparedby').value
      const project_name = document.querySelector('#projectname').value
      const address = document.querySelector('#address').value
      const delivered_from = document.querySelector('#deliveredfrom').value

      let MTS_number = document.querySelector('#mtsnumber').value
      const date = document.querySelector('#date').value
      
      let total_cost = totalAmount
      const requested_by = document.querySelector('#requestedby').value
      const approved_by = document.querySelector('#approvedby').value
      const takenout_by = document.querySelector('#takenoutby').value
      const received_by = document.querySelector('#receivedby').value
      
      MTS_number = parseInt(MTS_number)
      total_cost = parseFloat(total_cost)

      console.log(MTS_number)

      // ACTUAL SAVING TO DB
      const newID = MTS_number + ""
      db.collection('MTS-Collection').doc(project_name).set({ name: project_name })
      const database = db.collection('MTS-Collection').doc(project_name).collection('MTS').doc(newID)      
      database.set({
        prepared_by: prepared_by,
        project_name: project_name,
        address: address,
        delivered_from: delivered_from,
        MTS_number: MTS_number,
        date: date,
        total_cost: total_cost,
        requested_by: requested_by,
        approved_by: approved_by,
        takenout_by: takenout_by,
        received_by: received_by,
        status: 'For Approval'
      })
      .catch(err => alert('something went wrong'))

      // SUBCOLLECTION, PRODUCTS LIST AKA ROWS
      let index = 0;
      console.log(rows)
      rows.map(row => {
        let productID = newID + index
        let qty = row.querySelector('input[name="quantity"]').value
        let unit = row.querySelector('input[name="unit"]').value
        let description = row.querySelector('textarea[name="description"]').value
        let brand = row.querySelector('textarea[name="brand"]').value
        let model = row.querySelector('textarea[name="model"]').value
        let remarks = row.querySelector('textarea[name="remarks"]').value
        let price = row.querySelector('input[name="price"]').value
        console.log(remarks)

        database.collection('productsList').doc(productID).set({
          qty: qty,
          unit: unit,
          description: description,
          brand: brand,
          model: model,
          remarks: remarks,
          price: price
        })
        .catch(err => alert('something went wrong'))
        index++
      })
      
      
      alert('yay done')
    }

  }

  // RETURNS NON EMPTY HTML ROWS
  function getRows() {
    const tablerows = [...document.querySelectorAll('tr')]

    // REMOVE HEADER
    tablerows.splice(0, 1)

    // FILTER ROWS WITH TOTAL
    const filteredrows = tablerows.filter(row => {
      let total = row.querySelector('td[name="total"]').innerHTML
      if (total != '0')
        return row      
        
    })
    return filteredrows
  }

  // FOR INITIAL STORING OF JSX ROWS, WILL BE SET TO ROWOBJECT LATER ON
  const rows = []

  // INITIAL ROWS, FIRST STATEMENT IS FOR EDITING, SHOW OLD MTS DATA
  if (props.edit) {
    // for (let i=0; i<MtsRows.length; i++) {
    //   row_index++;
    //   rows.push(
    //       (
    //         MtsRows.map(mts => {
    //           return <MtsRow updateTotal={updateTotal} 
    //           class1={classes.txt}
    //           class2={classes.txt1}
    //           class3={classes.txt2}
    //           total={total[row_index]}
    //           qty={mts.qty}
    //           unit={mts.unit}
    //           description={mts.description}
    //           brand={mts.brand}
    //           model={mts.model}
    //           price={mts.price}
    //           remarks={mts.remarks}
    //           click={}
    //           />
    //         })            
    //     )
    //   )    
    // }
  } else {
    for (let i=0; i<4; i++) {
      
      rows.push(
        <MtsRow updateTotal={updateTotal} 
                  class1={classes.txt}
                  class2={classes.txt1}
                  class3={classes.txt2}
                  total={total[row_index]}
                  click={deleteRow} />
      )    
      row_index++;
    }
    console.log(`row index: ${row_index}`)
    // setRows(rows)
  }
  
  const [rowObject, setRows] = useState(rows)

  return (
    <div className="MtsContent">
      <Container className="cont">
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <UserAlert severity='info' message='hi po lagyan po projname mts tsaka requestedby tytyty'/>
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Prepared by"
                    id='preparedby'
                    defaultValue={props.prepared_by}
                    size="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    style={{styles}}
                    inputProps={{maxLength:50}}
                    
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Address"
                    id='address'
                    defaultValue={props.address}
                    size="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocationOn color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{maxLength:75}}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ValidationTextField id="input-with-icon-textfield"
                    error={!valid['mts_field']}
                    className={classes.txt4}
                    label="MTS No."
                    id='mtsnumber'
                    defaultValue={props.MTS_number}
                    required
                    size="normal"
                    onChange={checkValidity}
                    name='mts_field'
                    pattern="[0-9*]"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Edit color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{maxLength:6}}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ValidationTextField id="input-with-icon-textfield"
                    error={!valid['project_name']}
                    className={classes.txt4}
                    label="Project Name"
                    id='projectname'
                    defaultValue={props.project_name}
                    required
                    size="normal"
                    onChange={checkValidity}
                    name='project_name'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Folder color="primary" />
                        </InputAdornment>
                      ),
                      maxLength:50
                    }}
                    inputProps={{maxLength:50}}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="From"
                    id='deliveredfrom'
                    defaultValue={props.delivered_from}
                    size="normal"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocalShipping color="primary" />
                        </InputAdornment>
                      ),
                      maxLength:75
                    }}
                    inputProps={{maxLength:50}}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    size="small"
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" size="large" onClick={addRow} className={classes.button} startIcon={<Add />}>Add Row</Button>
                </Grid>
                <Grid item xs={8} />
              </Grid>
            </div>            
            <Table name='table' hover bordercolor="#8f8f94" border="#8f8f94" >
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
              
              {rowObject}

            </Table>
            <div className="tbl">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <ValidationTextField className={classes.txt4} id="requestedby" size="small" label="Requested by" required defaultValue={props.requested_by} onChange={checkValidity} name='requested_by' variant="outlined" inputProps={{maxLength:50}}/>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="takenoutby" size="small" label="Taken out by" defaultValue={props.takenout_by} variant="outlined" inputProps={{maxLength:50}}/>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><Typography className={classes.total}>Total Amount: {totalAmount}</Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="approvedby" size="small" label="Approved by" defaultValue={props.approved_by} variant="outlined" inputProps={{maxLength:50}}/>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="receivedby" size="small" label="Received by" defaultValue={props.received_by} variant="outlined" inputProps={{maxLength:50}}/>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color="primary" size="large" id='save' onClick={saveMTS} disabled={invalid} className={classes.button} startIcon={<Save />}> SAVE </Button>
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
