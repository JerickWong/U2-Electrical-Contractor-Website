import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Table } from 'react-bootstrap';
import { Button, TextField, Grid, InputAdornment, makeStyles, createMuiTheme, Paper, Typography } from '@material-ui/core';
import { Add, Folder, Save, Person, LocationOn, Edit, LocalShipping, ArrowBack, CastConnectedSharp } from '@material-ui/icons';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import '../styles/mts.css';
import MtsRow from "../components/MtsRow/MtsRow";
import db from '../components/Firestore/firestore'
import moment from 'moment'
import UserAlert from '../components/UserAlert/UserAlert'
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
import firebase from 'firebase'

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

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    document.querySelector('#preparedby').value = user.displayName
  }
})

function MtsWindow(props) {  
  const classes = useStyles();
  // let row_index = 0;
  
  // --------STATES-------- //
  const [confirmDialog, setConfirmationDialog] = useState('')
  const [invalid, setInvalid] = useState(true)
  const [valid, setValid] = useState({
      'mts_field': false,
      'requested_by': false,
      'project_name': false
  })
  const [total, setTotal] = useState([0, 0, 0, 0, 0])
  const [totalAmount, setTotalAmount] = useState(0)
  const [first, setFirst] = ('')
  const [rowObject, setRows] = useState([])
  const [row_index, setRowIndex] = useState(0)

  // FOR INITIAL STORING OF JSX ROWS, WILL BE SET TO ROWOBJECT LATER ON
  const rows = []
  const [backToMTS, setBackToMTS] = useState('')


  useEffect(() => {
    if (props.location.state) {
      const mts_number = props.location.state.mts_number
      const projName = props.location.state.projName
      console.log(mts_number, projName)
      // const tempmtsObject = {}
      const dbMts = db.collection('MTS-Collection').doc(projName).collection('MTS').doc(mts_number + '')
      dbMts.get().then((snapshot) => {
        const mtsData = snapshot.data()
        console.log(mtsData)
        document.querySelector('#preparedby').value = mtsData.prepared_by || ''
        document.querySelector('#projectname').value = mtsData.project_name || ''
        document.querySelector('#address').value = mtsData.address || ''
        document.querySelector('#deliveredfrom').value = mtsData.delivered_from || ''
        document.querySelector('#mtsnumber').value = mtsData.MTS_number || ''
        document.querySelector('#date').value = mtsData.date 
        document.querySelector('#requestedby').value = mtsData.requested_by || ''
        document.querySelector('#approvedby').value = mtsData.approved_by || ''
        document.querySelector('#takenoutby').value = mtsData.takenout_by || ''
        document.querySelector('#receivedby').value = mtsData.received_by || ''

        // tempmtsObject.prepared_by = mtsData.prepared_by
        // tempmtsObject.project_name = mtsData.project_name
        // tempmtsObject.address = mtsData.address
        // tempmtsObject.delivered_from = mtsData.delivered_from
        // tempmtsObject.mts_number = mtsData.MTS_number + ''
        // tempmtsObject.date = mtsData.date
        // tempmtsObject.requested_by = mtsData.requested_by
        // tempmtsObject.approved_by = mtsData.approved_by
        // tempmtsObject.takenout_by = mtsData.takenout_by
        // tempmtsObject.received_by = mtsData.received_by

        // console.log(tempmtsObject)
  
        setTotalAmount(mtsData.total_cost)        
      })
      .then(() => {
        setBackToMTS(
          <Link to='/Mts'>
            <Button variant="contained" className={classes.button} startIcon={<ArrowBack />}>Back to MTS List</Button>
          </Link>
        )
      })      
      dbMts.collection('productsList').get().then(snap => {
        snap.docs.map((each, index) => {
          console.log(each.data())
          const row = each.data()

          console.log(row)
          rows.push(
            <MtsRow updateTotal={updateTotal} 
            class1={classes.txt}
            class2={classes.txt1}
            class3={classes.txt2}
            total={row.qty*row.price}
            qty={row.qty}
            unit={row.unit}
            description={row.description}
            brand={row.brand}
            model={row.model}
            price={row.price}
            remarks={row.remarks}
            click={deleteRow}
            key={index}
            />
          )
          setRowIndex(index)
        })
      })
      .then(() => {
        setRows(rows)
      })

      setValid({
        mts_field: true,
        requested_by: true,
        project_name: true
      })

    } else {
      for (let i=0; i<5; i++) {
        
        rows.push(
          <MtsRow updateTotal={updateTotal} 
                    class1={classes.txt}
                    class2={classes.txt1}
                    class3={classes.txt2}
                    total={0}
                    click={deleteRow}
                    key={i} />
        )    
        setRowIndex(i)
      }
      console.log(`row index: ${row_index}`)
      setRows(rows)
    }
  }, [first])
  
  useEffect(() => {
    let rownum = rowObject.length
    let tempindex = row_index
    if (rownum<5) {
      let temprow = [...rowObject]

      for (let i=rownum; i<5+1; i++) {
        temprow.push(
          <MtsRow updateTotal={updateTotal} 
                    class1={classes.txt}
                    class2={classes.txt1}
                    class3={classes.txt2}
                    total={0}
                    click={deleteRow}
                    key={tempindex} />
        )
        tempindex++;
      }
      setRowIndex(tempindex)
    }
  }, [rowObject])


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
  }

  function addRow() {    
    let newTotal = [...total]
    newTotal.push(0)
    setTotal(newTotal)    
        
    console.log(`row index: ${row_index}`)        
  }


  // use effect of adding rows
  useEffect(() => {
    if (total.length != 5) {
      let newRows = [...rowObject]
      newRows.push(
        <MtsRow updateTotal={updateTotal} 
                    class1={classes.txt}
                    class2={classes.txt1}
                    class3={classes.txt2}
                    total={0}
                    click={deleteRow}
                    key={row_index} />
      )
      setRows(newRows)
      setRowIndex(row_index+1)
    }

  }, [total])

    function showConfirmationDialog(rows, ...restArgs) {
      const empty = []

      restArgs.map(field => {
        if (field[0] === '')
          empty.push(field[1])
      })

      rows.map((row, index) => {
        let qty = row.querySelector('input[name="quantity"]').value
        let unit = row.querySelector('input[name="unit"]').value
        let description = row.querySelector('textarea[name="description"]').value
        let brand = row.querySelector('textarea[name="brand"]').value
        let model = row.querySelector('textarea[name="model"]').value
        let remarks = row.querySelector('textarea[name="remarks"]').value

        if (qty === '')
          empty.push(`Quantity at row ${index+1}`)
        if (unit === '')
          empty.push(`Unit at row ${index+1}`)
        if (description === '')
          empty.push(`Description at row ${index+1}`)
        if (brand === '')
          empty.push(`Brand at row ${index+1}`)
        if (model === '')
          empty.push(`Model at row ${index+1}`)
        if (remarks === '')
          empty.push(`Remarks at row ${index+1}`)
      })

      if (empty.length != 0) {
        setConfirmationDialog( <ConfirmationDialog empty={empty} confirm={handleConfirm} closing={closeConfirmDialog}/> )
      } else {
        handleConfirm()
      }      
        
    }

  function handleConfirm() {
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
      status: 'For Approval',
      date_created: moment().format('MMMM DD, YYYY HH:mm:ss')
    })
    .catch(err => alert('something went wrong'))

    // SUBCOLLECTION, PRODUCTS LIST AKA ROWS
    let index = 0;
    console.log(rows)
    rows.map(row => {
      let productID = newID + index
      let qty = parseInt(row.querySelector('input[name="quantity"]').value)
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

      const increment = firebase.firestore.FieldValue.increment(qty);
      // PRODUCTS SUMMARY
      db.collection('MTS-Collection').doc(project_name).collection('Delivered-Summary').doc(description).update({
        total: increment
      })
      .catch(err => {
        console.log(err.message)        
        db.collection('MTS-Collection').doc(project_name).collection('Delivered-Summary').doc(description).set({
          total: qty,
          description: description,
          estqty: 0
        })
        .then(() => {
          alert('yay done')
        })
      })
    })

    closeConfirmDialog();
  }

  function closeConfirmDialog() {
    setConfirmationDialog('')
  }

  // SAVING OF MTS TO DB
  function saveMTS () {

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
    
    showConfirmationDialog(rows, [prepared_by, 'Prepared By'], [address, 'Address'], [delivered_from, 'Delivered From'], 
                          [date, 'Date'], [approved_by, 'Approved By'], [takenout_by, 'Taken Out By'], [received_by, 'Received By'])    

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

  
  

  return (
    
    <div className="MtsContent">
      
      <Container className="cont">        
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {backToMTS}
          <UserAlert severity='info' message='Project Name, MTS Number and Requested By fields are required to be fill-up before saving.'/>
          
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Prepared by"
                    id='preparedby'
                    // value={mtsObject.prepared_by || ''}
                    size="normal"
                    // InputLabelProps={{shrink:true}}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{maxLength:50}} >
                    </TextField>
                    
                </Grid>
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Address"
                    id='address'
                    // value={mtsObject.address || ''}
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
                  <TextField id="input-with-icon-textfield"
                    error={!valid['mts_field']}
                    className={classes.txt4}
                    label="MTS No."
                    id='mtsnumber'
                    // value={mtsObject.mts_number || ''}
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
                  <TextField id="input-with-icon-textfield"
                    error={!valid['project_name']}
                    className={classes.txt4}
                    label="Project Name"
                    id='projectname'
                    // value={mtsObject.project_name}
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
                    // value={mtsObject.delivered_from || ''}
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
                    // value={mtsObject.date || }
                    defaultValue={moment().format('YYYY-MM-DD')}
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" size="large" onClick={addRow} className={classes.button} startIcon={<Add />}>Add Row</Button>
                </Grid>
                <Grid item xs={8} />
              </Grid>
            </div>            
            
            {confirmDialog}

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
              <tbody>
                {rowObject}
              </tbody>
              

            </Table>
            <div className="tbl">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField error={!valid['requested_by']} className={classes.txt4} id="requestedby" size="small" label="Requested by" required onChange={checkValidity} name='requested_by' variant="outlined" inputProps={{maxLength:50}}/>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="takenoutby" size="small" label="Taken out by" variant="outlined" inputProps={{maxLength:50}}></TextField>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><Typography className={classes.total}>Total Amount: {totalAmount}</Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="approvedby" size="small" label="Approved by" variant="outlined" inputProps={{maxLength:50}}/>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="receivedby" size="small" label="Received by" variant="outlined" inputProps={{maxLength:50}}/>
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
