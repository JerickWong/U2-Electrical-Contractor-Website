import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Table } from 'react-bootstrap';
import { Button, TextField, Grid, InputAdornment, makeStyles, createMuiTheme, Paper, Typography } from '@material-ui/core';
import { Add, Folder, Save, Person, LocationOn, Edit, LocalShipping, CastConnectedSharp } from '@material-ui/icons';
import { MuiThemeProvider } from '@material-ui/core/styles';
import '../styles/mts.css';
import MtsRow from "../components/MtsRow/MtsRow";
import db from '../components/Firestore/firestore'

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


function MtsWindow(props) {

  const classes = useStyles();
  let row_index = 0;
  // --------STATES--------
  const [invalid, setInvalid] = useState(true)
  const [valid, setValid] = useState({
      'mts_field': false,
      'requested_by': false
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
            
      console.log(`mts_field: ${valid['mts_field']} and requested by: ${valid['requested_by']}`)
    }
  }
  useEffect(() => {
    // di pa tapos invalid delay
    const saveButton = document.querySelector('#save')
    
    if (valid['mts_field'] && valid['requested_by']) {
      
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


////// GETTING DATA FROM DB TEST ///////
//   function renderMTS(mts) {

//     console.log(mts.data())


//     db.collection('MTS-Collection').doc(mts.id).collection('products').get().then(snapshot => {
//         snapshot.docs.forEach(product => {
//             render(product)
//         })
//     })
// }

// function render(product) {
//   console.log(product.data())  
// }

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

    // db.collection('MTS-Collection').get().then(mtsSnapshot => {
    //   mtsSnapshot.docs.forEach(mts => {
    //     renderMTS(mts)
    //   })
    // })
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
      db.collection('MTS-Collection').get().then(snap => {

          const newID = MTS_number + ""
          db.collection('MTS-Collection').doc(newID).set({
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
              status: 'for approval'
          })

          // SUBCOLLECTION, PRODUCTS LIST AKA ROWS
          rows.map(row => {
            let qty = row.querySelector('input[name="quantity"]').value
            let unit = row.querySelector('input[name="unit"]').value
            let description = row.querySelector('textarea[name="description"]').value
            let remarks = row.querySelector('input[name="remarks"]').value
            let price = row.querySelector('input[name="price"]').value

            db.collection('MTS-Collection').doc(newID).collection('productsList').add({
              qty: qty,
              unit: unit,
              description: description,
              remarks: remarks,
              price: price
          })
          
      })
      })

      
      alert('yay done')
    }

  }

  // RETURNS NON EMPTY HTML ROWS
  function getRows() {
    const tablerows = [...document.querySelectorAll('tr')]
    tablerows.splice(0, 1)
    const filteredrows = tablerows.filter(row => {
      let total = row.querySelector('td[name="total"]').innerHTML
      if (total != '0')
        return row      
        
    })
    return filteredrows
  }

  // FOR STORING JSX ROWS, WILL BE SET TO ROWOBJECT LATER ON
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
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Prepared by"
                    id='preparedby'
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
                    className={classes.txt4}
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
                    className={classes.txt4}
                    label="MTS No."
                    id='mtsnumber'
                    defaultValue="71101"
                    size="normal"
                    onChange={checkValidity}
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
                    className={classes.txt4}
                    label="Project Name"
                    id='projectname'
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
                    className={classes.txt4}
                    label="From"
                    id='deliveredfrom'
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
                  <TextField className={classes.txt4} id="requestedby" size="small" label="Requested by" defaultValue="Name" onChange={checkValidity} name='requested_by' variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="takenoutby" size="small" label="Taken out by" defaultValue="Name" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper}><Typography className={classes.total}>Total Amount: {totalAmount}</Typography></Paper>
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="approvedby" size="small" label="Approved by" defaultValue="Name" variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                  <TextField className={classes.txt4} id="receivedby" size="small" label="Received by" defaultValue="Name" variant="outlined" />
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
