import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Table } from "react-bootstrap";
import {
  Button,
  TextField,
  Grid,
  InputAdornment,
  makeStyles,
  createMuiTheme,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  Add,
  Folder,
  Save,
  Person,
  LocationOn,
  Edit,
  LocalShipping,
  ArrowBackIos,
} from "@material-ui/icons";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { InputBase } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { Prompt } from "react-router";
import "../styles/mts.css";
// import MtsRow from "../components/MtsRow/MtsRow";
// import db from "../components/Firestore/firestore";
import moment from "moment";
import UserAlert from "../components/UserAlert/UserAlert";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
// import firebase from "firebase";
import api from "../api";
import users from "../api/users";
import supplier from "../api/supplier";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import SuccessDialog from "../components/SuccessDialog/SuccessDialog";

const filter = createFilterOptions();
const primary = "#8083FF";
const white = "#FFFFFF";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8083FF",
    },
    success: {
      main: "#4caf50",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginTop: theme.spacing(0.3),
    width: 260,
  },
  backButton: {
    margin: theme.spacing(0),
    width: 50,
    color: primary,
    marginBottom: 10
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
    width: 70,
  },
  txt1: {
    width: 90,
  },
  txt2: {
    width: 130,
  },
  txt4: {
    width: 260,
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    width: 260,
    justifyContent: "center",
    height: theme.spacing(5),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  back: {
    color: primary,
    marginBottom: 10,
  },
  total: {
    marginTop: 10,
  },
}));

function MtsWindow(props) {
  const classes = useStyles();
  const history = useHistory();
  // let row_index = 0;
  // DOCUMENTATION: 09/03/2020
  // utilized states for each input
  // removed validity, invalid

  // --------STATES-------- //
  const [message, setMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [empty, setEmpty] = useState([]);
  const [isEdit, setIsEdit] = useState(true);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("Add");
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [prepared_by, setPreparedBy] = useState("");
  const [address, setAddress] = useState("");
  const [MTS_number, setMtsNumber] = useState("");
  const [project_name, setProjectName] = useState("");
  const [delivered_from, setDeliveredFrom] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [requested_by, setRequestedBy] = useState("");
  const [takenout_by, setTakenoutBy] = useState("");
  const [approved_by, setApprovedBy] = useState("");
  const [received_by, setReceivedBy] = useState("");
  const [total_amount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState("For Approval");
  const [confirmed, setConfirmed] = useState(false);
  const [isUnsaved, setUnsaved] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedItems, setSelected] = useState([[], [], [], [], []]);
  const [pendingItems, setPending] = useState({
    pendingSupplier: null,
    items: [],
  });
  const [rows, setRows] = useState([
    {
      qty: "",
      description: "",
      price: "",
      unit: "",
      brand: "",
      model: "",
      remarks: "",
      total: 0,
    },
    {
      qty: "",
      description: "",
      price: "",
      unit: "",
      brand: "",
      model: "",
      remarks: "",
      total: 0,
    },
    {
      qty: "",
      description: "",
      price: "",
      unit: "",
      brand: "",
      model: "",
      remarks: "",
      total: 0,
    },
    {
      qty: "",
      description: "",
      price: "",
      unit: "",
      brand: "",
      model: "",
      remarks: "",
      total: 0,
    },
    {
      qty: "",
      description: "",
      price: "",
      unit: "",
      brand: "",
      model: "",
      remarks: "",
      total: 0,
    },
  ]);

  useEffect(() => {
    if (isEdit) {
      if (props.location.state) {
        // const mts = Object.assign({}, props.location.state.mts)
        const mts = props.location.state.mts;
        // removeFromDelivered()

        setPreparedBy(mts.prepared_by);
        setAddress(mts.address);
        setMtsNumber(mts.MTS_number);
        setProjectName(mts.project_name);
        setDeliveredFrom(mts.delivered_from);
        setDate(moment(mts.date).format("YYYY-MM-DD"));
        setRequestedBy(mts.requested_by);
        setTakenoutBy(mts.takenout_by);
        setApprovedBy(mts.approved_by);
        setReceivedBy(mts.received_by);
        setTotalAmount(mts.total_amount);
        setStatus(mts.status);
        setAction("Edit");

        if (mts.status === "Confirmed") setConfirmed(true);

        let length = mts.rows.length;
        let temp = [];

        if (length < 5) {
          while (5 - length) {
            temp.push({
              qty: "",
              description: "",
              price: "",
              unit: "",
              brand: "",
              model: "",
              remarks: "",
              total: 0,
            });
            length++;
          }
        }
        setRows([...mts.rows, ...temp]);
        setUnsaved(true);
      } else {
        users
          .getUser({ token: localStorage.getItem("token") })
          .then((res) => setPreparedBy(res.data.data.username))
          .catch((err) => console.log(err));
      }
    }

    setIsEdit(false);
    supplier
      .getAllSupplier()
      .then((res) => {
        const raw = res.data.data;
        let compiled = [],
          tempUnits = [];
        raw.forEach((supp) => {
          const items = supp.items;
          compiled = compiled.concat(items);
          items.forEach((item) => tempUnits.push(item.unit));

          if (supp.name === "Pending Items")
            pendingItems.pendingSupplier = supp;
        });
        tempUnits = [...new Set(tempUnits)];
        setUnits(tempUnits);
        setSuppliers(compiled);
        const temp = selectedItems.map(() => compiled);
        setSelected(temp);
      })
      .catch((err) => console.log(`no suppliers: ${err}`));
  }, []);

  function unsaved() {
    if (isUnsaved && !confirmed) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  }

  // FIRESTORE SHIT
  // FOR INITIAL STORING OF JSX ROWS, WILL BE SET TO ROWOBJECT LATER ON
  // const rows = []
  // const [backToMTS, setBackToMTS] = useState('')

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       document.querySelector('#preparedby').value = user.displayName
  //     }
  //   })

  //   if (firebase.auth().currentUser) {
  //     document.querySelector('#preparedby').value = firebase.auth().currentUser.displayName
  //   }

  //   if (props.location.state) {
  //     const mts_number = props.location.state.mts_number
  //     const projName = props.location.state.projName
  //     console.log(mts_number, projName)
  //     // const tempmtsObject = {}
  //     const dbMts = db.collection('MTS-Collection').doc(projName).collection('MTS').doc(mts_number + '')
  //     dbMts.get().then((snapshot) => {
  //       const mtsData = snapshot.data()
  //       console.log(mtsData)
  //       document.querySelector('#preparedby').value = mtsData.prepared_by || ''
  //       document.querySelector('#projectname').value = mtsData.project_name || ''
  //       document.querySelector('#address').value = mtsData.address || ''
  //       document.querySelector('#deliveredfrom').value = mtsData.delivered_from || ''
  //       document.querySelector('#mtsnumber').value = mtsData.MTS_number || ''
  //       document.querySelector('#date').value = mtsData.date
  //       document.querySelector('#requestedby').value = mtsData.requested_by || ''
  //       document.querySelector('#approvedby').value = mtsData.approved_by || ''
  //       document.querySelector('#takenoutby').value = mtsData.takenout_by || ''
  //       document.querySelector('#receivedby').value = mtsData.received_by || ''

  //       // tempmtsObject.prepared_by = mtsData.prepared_by
  //       // tempmtsObject.project_name = mtsData.project_name
  //       // tempmtsObject.address = mtsData.address
  //       // tempmtsObject.delivered_from = mtsData.delivered_from
  //       // tempmtsObject.mts_number = mtsData.MTS_number + ''
  //       // tempmtsObject.date = mtsData.date
  //       // tempmtsObject.requested_by = mtsData.requested_by
  //       // tempmtsObject.approved_by = mtsData.approved_by
  //       // tempmtsObject.takenout_by = mtsData.takenout_by
  //       // tempmtsObject.received_by = mtsData.received_by

  //       // console.log(tempmtsObject)

  //       setTotalAmount(mtsData.total_cost)
  //     })
  //     .then(() => {
  //       // TODO
  //       setBackToMTS(
  //         <Link to='/AdminMts'>
  //           <Button className={classes.back} startIcon={<ArrowBackIos />}>Back to MTS List</Button>
  //         </Link>
  //       )
  //     })
  //     dbMts.collection('productsList').get().then(snap => {
  //       snap.docs.map((each, index) => {
  //         console.log(each.data())
  //         const row = each.data()

  //         console.log(row)
  //         rows.push(
  //           <MtsRow updateTotal={updateTotal}
  //           class1={classes.txt}
  //           class2={classes.txt1}
  //           class3={classes.txt2}
  //           total={row.qty*row.price}
  //           qty={row.qty}
  //           unit={row.unit}
  //           description={row.description}
  //           brand={row.brand}
  //           model={row.model}
  //           price={row.price}
  //           remarks={row.remarks}
  //           click={deleteRow}
  //           key={index}
  //           />
  //         )
  //         setRowIndex(index)
  //       })
  //     })
  //     .then(() => {
  //       setRows(rows)
  //     })

  //   } else {
  //     for (let i=0; i<5; i++) {

  //       rows.push(
  //         <MtsRow updateTotal={updateTotal}
  //                   class1={classes.txt}
  //                   class2={classes.txt1}
  //                   class3={classes.txt2}
  //                   total={0}
  //                   click={deleteRow}
  //                   key={i} />
  //       )
  //       setRowIndex(i)
  //     }
  //     console.log(`row index: ${row_index}`)
  //     setRows(rows)
  //   }
  // }, [first])

  // ON CHANGE UPDATE TOTAL ROW PRICE
  function updateTotal(e, index) {
    const currentRows = [...rows];

    if (currentRows[index].qty && currentRows[index].price) {
      currentRows[index].total = parseInt(currentRows[index].qty) * parseFloat(currentRows[index].price);
    } else {
      currentRows[index].total = 0
    }
    setRows(currentRows)
  }

  useEffect(() => {
    updateTotalAmount();
  }, [rows]);

  // ON CHANGE OF TOTAL ROW PRICE, UPDATE TOTAL AMOUNT
  function updateTotalAmount() {
    let total = 0;
    for (let x in rows) if (rows[x].total) total += rows[x].total;

    setTotalAmount(total);
  }

  function deleteRow(e, index) {
    const currentRows = [...rows];
    currentRows.splice(index, 1);
    setRows(currentRows);
    updateTotalAmount();
  }

  function addRow() {
    const currentRows = [...rows];
    currentRows.push({
      qty: "",
      description: "",
      price: "",
      unit: "",
      brand: "",
      model: "",
      remarks: "",
      total: 0,
    });
    setRows(currentRows);
  }

  function showConfirmationDialog() {
    const temp = ["By proceeding, you are leaving out the following empty:"];

    if (prepared_by === "") temp.push("Prepared By");
    if (project_name === "") temp.push("Project Name");
    if (MTS_number === "") temp.push("MTS Number");
    if (delivered_from === "") temp.push("Delivered from");
    if (requested_by === "") temp.push("Requested By");
    if (approved_by === "") temp.push("Approved By");
    if (takenout_by === "") temp.push("Taken out By");
    if (received_by === "") temp.push("Received By");
    if (date === "") temp.push("Date");
    if (address === "") temp.push("Address");

    rows.forEach((row, index) => {
      const { qty, description, unit, brand, model, remarks } = row;

      if (qty === "") temp.push(`Quantity at row ${index + 1}`);
      if (unit === "") temp.push(`Unit at row ${index + 1}`);
      if (description === "") temp.push(`Description at row ${index + 1}`);
      if (brand === "") temp.push(`Brand at row ${index + 1}`);
      if (model === "") temp.push(`Model at row ${index + 1}`);
      if (remarks === "") temp.push(`Remarks at row ${index + 1}`);
    });

    if (temp.length > 1) {
      setEmpty(temp);
      // setConfirmationDialog( <ConfirmationDialog empty={empty} confirm={handleConfirm} closing={closeConfirmDialog}/> )
      setOpenConfirm(true);
    } else {
      handleConfirm();
    }
  }

  async function handleConfirm() {
    setOpen(true);
    setLoading(true);

    const clean_rows = rows.filter((row) => row.description && row.qty);

    const payload = {
      prepared_by,
      project_name,
      address,
      delivered_from,
      MTS_number,
      date,
      total_amount: parseFloat(total_amount),
      requested_by,
      approved_by,
      takenout_by,
      received_by,
      rows: clean_rows,
      status,
    };

    // editing
    if (props.location.state) {
      try {
        const _id = props.location.state.mts._id;
        await (await api.updateMTSById(_id, payload)).data;

        // alert(response.message)
        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 1000);
        setUnsaved(false);
      } catch (error) {
        // alert(error)
        setTimeout(() => {
          setLoading(false);
          setSuccess(false);
          setMessage("MTS number already exists");
        }, 1000);
      }
    } else {
      try {
        await (await api.insertMTS(payload)).data;

        setTimeout(() => {
          setLoading(false);
          setSuccess(true);
        }, 1000);
      } catch (error) {
        // alert(error)
        setTimeout(() => {
          setMessage("MTS number already exists");
          setLoading(false);
          setSuccess(false);
        }, 1000);
      }
    }

    if (pendingItems.items.length > 0) {
      const pending = [...new Set(pendingItems.items)];
      const pendingRows = pending.map((index) => rows[index]);
      try {
        const payload = { items: [] };
        pendingRows.forEach((row) => {
          const { unit, description, brand, model, remarks, price } = row;
          payload.items.push({
            unit,
            product_name: description,
            brand_name: brand,
            model_name: model,
            remarks,
            net_price: price,
            price_adjustment: 0,
            list_price: price,
          });
        });

        payload.name = "Pending Items";

        const { pendingSupplier } = pendingItems;

        if (pendingSupplier === null) {
          await supplier.insertSupplier(payload);
        } else {
          // get supplier by name == Pending Items
          payload.items = [...pendingSupplier.items, ...payload.items]
          await supplier.updateSupplierById(pendingSupplier._id, payload);
        }
      } catch (error) {
        console.log(error);
        alert("failed to add pending items");
      }
    }
    // FIRESTORE Saving
    // ACTUAL SAVING TO DB
    // const newID = MTS_number + ""
    // db.collection('MTS-Collection').doc(project_name).set({ name: project_name })
    // const database = db.collection('MTS-Collection').doc(project_name).collection('MTS').doc(newID)
    // database.set({
    //   prepared_by: prepared_by,
    //   project_name: project_name,
    //   address: address,
    //   delivered_from: delivered_from,
    //   MTS_number: MTS_number,
    //   date: date,
    //   total_cost: total_cost,
    //   requested_by: requested_by,
    //   approved_by: approved_by,
    //   takenout_by: takenout_by,
    //   received_by: received_by,
    //   status: 'For Approval',
    //   date_created: moment().format('MMMM DD, YYYY HH:mm:ss')
    // })
    // .catch(err => alert('something went wrong'))

    // SUBCOLLECTION, PRODUCTS LIST AKA ROWS
    // let index = 0;
    // console.log(rows)
    // rows.map(row => {
    //   let productID = index + newID
    //   let qty = parseInt(row.querySelector('input[name="quantity"]').value)
    //   let unit = row.querySelector('input[name="unit"]').value
    //   let description = row.querySelector('textarea[name="description"]').value
    //   description = description.replace(/\//g, "|");
    //   description = description.replace(/./g, "_");
    //   let brand = row.querySelector('textarea[name="brand"]').value
    //   let model = row.querySelector('textarea[name="model"]').value
    //   let remarks = row.querySelector('textarea[name="remarks"]').value
    //   let price = row.querySelector('input[name="price"]').value
    //   console.log(remarks)

    //   database.collection('productsList').doc(productID).set({
    //     qty: qty,
    //     unit: unit,
    //     description: description,
    //     brand: brand,
    //     model: model,
    //     remarks: remarks,
    //     price: price
    //   })
    //   .catch(err => alert('something went wrong'))
    //   index++

    // })

    closeConfirmDialog();
  }

  function closeConfirmDialog() {
    setOpenConfirm(false);
  }

  // SAVING OF MTS TO DB
  function saveMTS() {
    showConfirmationDialog();
  }

  // RETURNS NON EMPTY HTML ROWS
  // function getRows() {
  //   const tablerows = [...document.querySelectorAll("tr")];

  //   // REMOVE HEADER
  //   tablerows.splice(0, 1);

  //   // FILTER ROWS WITH TOTAL
  //   const filteredrows = tablerows.filter((row) => {
  //     let total = row.querySelector('td[name="total"]').innerHTML;
  //     if (total !== "0") return row;
  //   });
  //   return filteredrows;
  // }

  function handleRowChange(e, index) {
    const { name, value } = e.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  }

  const handleClose = async () => {
    setOpen(false);

    if (success) {
      try {
        const type = await (
          await users.getUser({ token: localStorage.getItem("token") })
        ).data.data.type;

        if (type === "Admin" || type === "Manager") history.push("/AdminMts");
        else history.push("/Mts");
      } catch (error) {
        console.log(error);
        history.push("/Mts");
      }
    }
  };

  return (
    <div className="MtsContent">
      {/*style:{{marginLeft:200}}*/}
      <Container className="cont">
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.location.state ? <Button size="small" onClick={() => window.history.back()} className={classes.backButton} startIcon={<ArrowBackIos />}>Back</Button>
                            :
                            ""}
          <UserAlert
            severity="info"
            message={
              confirmed
                ? "This MTS is Read Only"
                : "Project Name, MTS Number and Requested By fields are required to be filled-up before saving."
            }
          />

          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <TextField
                    id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Prepared by"
                    value={prepared_by}
                    onChange={(e) => setPreparedBy(e.target.value)}
                    size="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                      readOnly: confirmed,
                    }}
                    inputProps={{ maxLength: 50 }}
                  ></TextField>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    size="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocationOn color="primary" />
                        </InputAdornment>
                      ),
                      readOnly: confirmed,
                    }}
                    inputProps={{ maxLength: 75 }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  xs={4}
                >
                  <TextField
                    id="input-with-icon-textfield"
                    error={!MTS_number}
                    className={classes.txt4}
                    label="MTS No."
                    value={MTS_number}
                    required
                    size="normal"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => !e.target.value.includes('-') && e.target.value.length < 11 && setMtsNumber(e.target.value)}
                    name="mts_field"
                    pattern="[0-9*]"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Edit color="primary" />
                        </InputAdornment>
                      ),
                      readOnly: confirmed,
                    }}
                    inputProps={{ maxLength: 6 }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  xs={4}
                >
                  <TextField
                    id="input-with-icon-textfield"
                    error={!project_name}
                    className={classes.txt4}
                    label="Project Name"
                    value={project_name}
                    required
                    size="normal"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setProjectName(e.target.value)}
                    name="project_name"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Folder color="primary" />
                        </InputAdornment>
                      ),
                      readOnly: confirmed,
                      maxLength: 50,
                    }}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    id="input-with-icon-textfield"
                    className={classes.txt4}
                    label="From"
                    value={delivered_from}
                    onChange={(e) => setDeliveredFrom(e.target.value)}
                    size="normal"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocalShipping color="primary" />
                        </InputAdornment>
                      ),
                      readOnly: confirmed,
                      maxLength: 75,
                    }}
                    inputProps={{ maxLength: 50 }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    size="small"
                    // value={mtsObject.date || }
                    // defaultValue={moment().format('YYYY-MM-DD')}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      readOnly: confirmed,
                    }}
                    required
                  />
                </Grid>
                <Grid container item xs={5}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={addRow}
                    className={classes.button}
                    startIcon={<Add />}
                  >
                    Add Row
                  </Button>
                </Grid>
                <Grid item xs={7} />
              </Grid>
            </div>

            <Table name="table" hover bordercolor="#8f8f94" border="#8f8f94">
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
                {rows.map((row, index) => {
                  return (
                    <tr>
                      <td>
                        <InputBase
                          className={classes.txt}
                          name="qty"
                          size="small"
                          value={row.qty && Math.max(0, row.qty)}
                          onChange={(e) => {
                            if (!e.target.value) {
                              e.target.value = ''
                            }
                            if (e.target.value.includes('-')) {
                              e.target.value = Math.abs(e.target.value)
                            }
                            e.target.value.length < 8 && (handleRowChange(e, index) || updateTotal(e, index))
                          }}
                          pattern="[0-9*]"
                          inputProps= {{min: 0}}
                          type="number"
                          readOnly={confirmed}
                        />
                      </td>
                      <td>
                        <Autocomplete
                          value={row.unit}
                          onChange={(event, newValue) => {
                            const newRows = [...rows];
                            newRows[index]["unit"] = newValue;
                            setRows(newRows);

                            let tempItems = [...suppliers];
                            tempItems = tempItems.filter(
                              (item) => item.unit === newValue
                            );
                            selectedItems[index] = tempItems;
                          }}
                          options={units}
                          selectOnFocus
                          handleHomeEndKeys
                          freeSolo
                          disabled={confirmed}
                          renderInput={(params) => (
                            <TextField
                              className={classes.txt1}
                              {...params}
                              onChange={(event) => {
                                const newRows = [...rows];
                                newRows[index]["unit"] = event.target.value;
                                setRows(newRows);
                              }}
                              multiline
                            />
                          )}
                        />
                      </td>
                      <td>
                        <Autocomplete
                          value={row.description}
                          onChange={(event, newValue) => {
                            if (newValue && newValue.inputValue) {
                              alert(
                                `${newValue.inputValue} and its row will be added to pending items. Do not change its row position.`
                              );
                              pendingItems.items.push(index); // needs new Set array
                              const newRows = [...rows];
                              newRows[index]["description"] =
                                newValue.inputValue;
                              setRows(newRows);
                            } else {
                              if (newValue) {
                                const newRows = [...rows];
                                newRows[index]["description"] =
                                  newValue.product_name;
                                setRows(newRows);

                                const {
                                  model_name,
                                  brand_name,
                                  remarks,
                                  net_price,
                                  unit,
                                } = newValue;

                                row.unit = unit;

                                if (net_price) {
                                  row.price = net_price;
                                  updateTotal(event, index);
                                }
                                  if (model_name) row.model = model_name;
                                  else row.model = "";
                                  if (brand_name) row.brand = brand_name;
                                  else row.brand = "";
                                  if (remarks) row.remarks = remarks;
                                  else row.remarks = "";
                              } 
                            }
                          }}
                          onInputChange={(event, value) => {
                            console.log(value)
                            const newRows = [...rows];
                            newRows[index]["description"] = value;
                          }}
                          filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            // Suggest the creation of a new value
                            if (params.inputValue !== "") {
                              filtered.push({
                                inputValue: params.inputValue,
                                product_name: `Add "${params.inputValue}"`,
                              });
                            }

                            console.log(filtered)
                            return filtered;
                          }}
                          selectOnFocus
                          handleHomeEndKeys
                          options={selectedItems[index]}
                          getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === "string") {
                              return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                              return option.inputValue;
                            }
                            row.price = option.net_price;
                            // Regular option
                            return option.product_name;
                          }}
                          getOptionSelected={(option, value) =>
                            option.product_name === value.product_name
                          }
                          renderOption={(option) => option.product_name}
                          freeSolo
                          disabled={confirmed}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              multiline
                              className={classes.txt4}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.txt1}
                          name="brand"
                          size="small"
                          value={row.brand}
                          onChange={(e) => handleRowChange(e, index)}
                          multiline
                          readOnly={confirmed}
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.txt1}
                          name="model"
                          size="small"
                          value={row.model}
                          onChange={(e) => handleRowChange(e, index)}
                          multiline
                          readOnly={confirmed}
                        />
                      </td>
                      <td>
                        <InputBase
                          className={classes.txt1}
                          name="price"
                          size="small"
                          value={row.price}
                          onChange={(e) => {
                            if (!e.target.value) {
                              e.target.value = ''
                            }
                            if (e.target.value.includes('-')) {
                              e.target.value = Math.abs(e.target.value)
                            }
                            handleRowChange(e, index)
                            updateTotal(e, index)
                          }}
                          pattern="[0-9*]"
                          type="number"
                          inputProps= {{min: 0}}
                          readOnly={confirmed}
                        />
                      </td>
                      <td name="total">{row.total}</td>
                      <td>
                        <InputBase
                          name="remarks"
                          className={classes.txt2}
                          size="small"
                          value={row.remarks}
                          onChange={(e) => handleRowChange(e, index)}
                          multiline
                          inputProps={{ maxLength: 100 }}
                          readOnly={confirmed}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          onClick={(e) => deleteRow(e, index)}
                          className="delete"
                          icon={faTimes}
                        />
                      </td>
                    </tr>
                  );
                })}
                {/* {rowObject} */}
              </tbody>
            </Table>
            <div className="tbl">
              <Grid container spacing={3}>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <TextField
                    error={!requested_by}
                    value={requested_by}
                    InputLabelProps={{ shrink: true }}
                    className={classes.txt4}
                    size="small"
                    label="Requested by"
                    required
                    onChange={(e) => setRequestedBy(e.target.value)}
                    name="requested_by"
                    variant="outlined"
                    inputProps={{ readOnly: confirmed, maxLength: 50 }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    className={classes.txt4}
                    value={takenout_by}
                    onChange={(e) => setTakenoutBy(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    label="Taken out by"
                    variant="outlined"
                    inputProps={{ readOnly: confirmed, maxLength: 50 }}
                  ></TextField>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Paper className={classes.paper}>
                    <Typography className={classes.total}>
                      Total Amount: {total_amount}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <TextField
                    className={classes.txt4}
                    value={approved_by}
                    onChange={(e) => setApprovedBy(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    label="Approved by"
                    variant="outlined"
                    inputProps={{ readOnly: confirmed, maxLength: 50 }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <TextField
                    className={classes.txt4}
                    value={received_by}
                    onChange={(e) => setReceivedBy(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    label="Received by"
                    variant="outlined"
                    inputProps={{ readOnly: confirmed, maxLength: 50 }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    id="save"
                    onClick={saveMTS}
                    disabled={
                      !MTS_number || !project_name || !requested_by || confirmed
                    }
                    className={classes.button}
                    startIcon={<Save />}
                  >
                    {" "}
                    SAVE{" "}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </MuiThemeProvider>
        </main>
      </Container>
      {unsaved()}
      <Prompt
        when={isUnsaved && !confirmed}
        message="You have unsaved changes, are you sure you want to leave?"
      />

      <SuccessDialog
        open={open}
        handleClose={handleClose}
        success={success}
        isLoading={isLoading}
        action={action}
        message={message}
      />

      <ConfirmationDialog
        empty={empty}
        confirm={handleConfirm}
        open={openConfirm}
        handleClose={closeConfirmDialog}
      />
    </div>
  );
}

export default MtsWindow;
