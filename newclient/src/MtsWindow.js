import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faCalendarAlt, faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import {Container, Table, Button} from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import './styles/mts.css';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function App(){
  const classes = useStyles();
  return (
    <div className="App">
      <Container>
        <div className="project">
          <Table className="headTable">
            <tr>
              <td><TextField id="standard-basic" label="Prepared by" size="small"/></td>
              <td><TextField id="standard-basic" label="MTS No." size="small"/></td>
            </tr>
            <tr>
              <td><TextField id="standard-basic" label="Project Name" size="small"/></td>
              <td>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{shrink: true}}
                />
              </td>
            </tr>
            <tr>
              <td><TextField id="standard-basic" label="Address" size="small"/></td>
              <td><TextField id="standard-basic" label="Delivered From" size="small"/>  </td>
            </tr>
            <tr>
              <td><Button className="addBtn" size="lg"><FontAwesomeIcon className="mtsAdd" icon={faPlus}/>Add Panelboard</Button>
                  <Button className="addBtn" size="lg"><FontAwesomeIcon className="mtsAdd" icon={faPlus}/>Add Row</Button></td>
            </tr>
          </Table>
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
      </Container>
    </div>
  );
}

export default App;
