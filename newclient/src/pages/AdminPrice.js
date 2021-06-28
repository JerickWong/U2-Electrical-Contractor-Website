import React, { useState, useEffect, useRef } from "react";
import { Container, Table } from "react-bootstrap";
import {
  Button,
  TextField,
  Grid,
  makeStyles,
  createMuiTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  Input,
  InputGroup,
  ButtonGroup,
  InputAdornment,
  InputBase,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import {
  Add,
  AddBox,
  ArrowDownward,
  Edit,
  Clear,
  Search,
  GroupAdd,
  QueryBuilder,
  AddShoppingCart,
  ChevronRight,
  DeleteOutline,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  ViewColumn,
  AccountCircle,
  Delete,
} from "@material-ui/icons";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import { MaterialTable, MTable, MTableToolbar } from "material-table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GetAppIcon from "@material-ui/icons/GetApp";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
//import PriceTable from '../components/AdminPriceTable/PriceTable';
import NewPriceTable from "../components/AdminPriceTable/NewPriceTable";
import Badge from "@material-ui/core/Badge";
import "../styles/mts.css";
import { useDropzone } from "react-dropzone";
import suppliers from "../api/supplier";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
import SuccessDialog from "../components/SuccessDialog/SuccessDialog";

const primary = "#8083FF";
const white = "#FFFFFF";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8083FF",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  button: {
    backgroundColor: primary,
    margin: theme.spacing(0),
    color: white,
    width: 200,
  },
  pending: {
    alignItems: "flex-end",
  },
  save: {
    width: 200,
    backgroundColor: primary,
    color: white,
    marginLeft: 57,
  },
  root: {
    flexGrow: 1,
  },
  txt: {
    width: 300,
    marginTop: 15,
  },
  badge: {
    marginTop: 15,
  },
  txt1: {
    width: 300,
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
  delete: {
    color: "#F04A42",
  },
  short: {
    width: 70,
  },
  medium: {
    width: 100,
  },
  AddBtn2: {
    width: 300,
  },
  priceIcons: {
    color: primary,
    fontSize: "small",
  },
  modalIcons: {
    color: "primary",
    display: "flex",
    fontSize: 30,
  },
  modalTitle: {
    fontSize: 20,
    display: "flex",
    marginTop: 30,
    padding: theme.spacing(2),
  },
  modalFields: {
    width: 400,
    marginBottom: 20,
    alignItems: "center",
    display: "flex",
    marginLeft: 30,
  },
  button3:{ 
    marginTop: 10
  }
}));

function AdminPrice() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [action, setAction] = useState("");
  const [message, setMessage] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPending, setOpenPending] = useState(false);
  const [category, setCategory] = useState(null);
  const [backupCategory, setBackupCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const endRef = useRef(null)
  const [pending, setPending] = useState({
    name: "Pending Items",
    items: [],
  });
  const [tobeAdded, setTobeAdded] = useState({});
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItems, setSelected] = useState([])

  const Papa = require("papaparse");

  const handleChange = (event) => {
    if (isAdding)
      category.items.pop()
    setIsAdding(false)
    setCategory(event.target.value);
    setBackupCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  
    setTimeout(() => {
      setSuccess(false)
    }, 2000)
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addSupplier = async () => {
    setOpen(true);
    setLoading(true);
    setAction("Add");
    try {
      const payload = {
        name,
        items,
      };
      const data = await suppliers.insertSupplier(payload);
      setOpenAdd(false);
      if (data.status === 208) {
        setTimeout(() => {
          setOpenAdd(false);
          setLoading(false);
          setSuccess(false);
          setMessage("Supplier Name already exists");
        }, 1000);
      } else {
        setTimeout(() => {
          setOpenAdd(false);
          setLoading(false);
          setSuccess(true);
        }, 1000);
        payload._id = data.data.id
        setCategory(payload)
        setBackupCategory(payload)
        categories.push(payload)
        categories[categories.length-1] = payload;
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        setSuccess(false);
      }, 1000);
      alert("error in adding supplier");
    }

    setName("");
    setItems([]);
  };

  const editSupplier = async () => {
    try {
      const payload = { ...category };
      payload.name = name;
      await suppliers.updateSupplierById(payload._id, payload);

      const index = categories.indexOf(category);
      categories[index] = payload;
      setCategory(payload);
      setBackupCategory(payload);
    } catch (error) {
      alert("error saving to database");
    }
    setOpenEdit(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv, text/csv",
    onDropAccepted: (files) => parseCSV(files),
    onDropRejected: () => {
      alert("file type rejected");
    },
  });

  const fetchSuppliers = async () => {
    setIsLoading(true);
    try {
      const temp = await (await suppliers.getAllSupplier()).data.data;
      temp.sort((a, b) => a.name.localeCompare(b.name));
      temp.map((s) => {
        if (s.name === "Pending Items") setPending(s);
      });
      setCategories(temp);
      setCategory(temp[0]);
      setBackupCategory(temp[0]);
    } catch (error) {
      console.log(error);
      alert("error in getting suppliers");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const downloadFile = async () => {
    let latest = { ...category };
    try {
      latest = await (await suppliers.getSupplierById(category._id)).data.data;
    } catch (error) {
      console.log(error);
      alert("downloaded file not the latest version");
    }

    const data = latest.items.filter((c) => {
      delete c._id;
      return delete c.tableData;
    });

    const csv = Papa.unparse(data, {
      header: true,
    });
    const filename = `${latest.name}.csv` || `export.csv`;

    if (csv === null) alert("empty");

    const blob = new Blob([csv]);
    if (window.navigator.msSaveOrOpenBlob)
      // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveBlob(blob, filename);
    else {
      const a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, { type: "text/plain" });
      a.download = filename;
      document.body.appendChild(a);
      a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a);
    }
  };

  const parseCSV = (files) => {
    Papa.parse(files[0], {
      header: true,
      transformHeader: (h) => h.trim(),
      complete: (results, file) => {
        // setOpen(true)
        // setLoading(true)
        // setSuccess(false)
        // setAction('Parse')
        // setTimeout(() => {
        //     setLoading(false)
        //     setSuccess(true)
        // }, 1000)

        // check if not open, meaning youre not adding a new supplier
        if (!openAdd) {
          const final = window.confirm(
            `Are you sure you want to replace the price list for ${category.name}?`
          );
          if (final) uploadItems(results.data);
        } else {
          if (category === null) alert("No selected Supplier yet");
          else {
            results.data.map((item) => {
              item.unit = item.unit.trim();
              item.product_name = item.product_name.trim();
              item.brand_name = item.brand_name.trim();
              item.model_name = item.model_name.trim();
              item.remarks = item.remarks.trim();
              item.list_price = parseFloat(
                item.list_price.trim().replace(",", "")
              );
              item.net_price = parseFloat(
                item.net_price.trim().replace(",", "")
              );
              item.price_adjustment = parseFloat(
                item.price_adjustment.trim().replace(",", "")
              );
            });
            setItems(results.data);
          }
        }
      },
    });
  };

  const uploadItems = async (rawItems) => {
    rawItems.map((item) => {
      item.unit = item.unit.trim();
      item.product_name = item.product_name.trim();
      item.brand_name = item.brand_name.trim();
      item.model_name = item.model_name.trim();
      item.remarks = item.remarks.trim();
      item.list_price = parseFloat(item.list_price.trim().replace(",", ""));
      item.net_price = parseFloat(item.net_price.trim().replace(",", ""));
      item.price_adjustment = parseFloat(
        item.price_adjustment.trim().replace(",", "")
      );
    });

    try {
      const payload = { ...category };
      payload.items = rawItems;
      await suppliers.updateSupplierById(payload._id, payload);
      alert("uploaded");
      setCategory(payload)
      setBackupCategory(payload)
      const index = categories.indexOf(category);
      categories[index] = payload;
    } catch (error) {
      alert("error saving to database");
    }

    setItems([]);
  };

  const handleDelete = async () => {
    setOpen(true);
    setLoading(true);
    setAction("Delete");
    try {
      await suppliers.deleteSupplierById(category._id);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1000);
      await fetchSuppliers();
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setLoading(false);
        setSuccess(false);
      }, 1000);
      alert("error in deleting supplier");
    }
  };

  const addPendingItem = async () => {
    try {
      let payload = { ...category };
      payload.items.push(tobeAdded);
      await suppliers.updateSupplierById(category._id, payload);
      setOpenPending(false);

      let index = categories.indexOf(category);
      categories[index] = payload;
      setCategory(payload);
      setBackupCategory(payload);

      payload = { ...pending };
      index = pending.items.indexOf(tobeAdded);
      payload.items.splice(index, 1);
      await suppliers.updateSupplierById(pending._id, payload);

      index = categories.indexOf(pending);
      categories[index] = payload;
      setPending(payload);
    } catch (error) {
      alert(error);
    }
  };

  const newItem = () => {
    setIsAdding(true)
    const temp = {...category}
    temp.items.push({
      unit: '',
      product_name: '',
      brand_name: '',
      model_name: '',
      list_price: '',
      price_adjustment: '',
      net_price: '',
      remarks: '',
    })
    setCategory(temp)
    scrollToBottom()
  }

  return (
    <div className="PriceList">
      <Container fluid="lg" className="cont">
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid container item xs={4}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label" shrink={true}>
                      Suppliers
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      className={classes.txt1}
                      defaultValue={categories[0]}
                      value={backupCategory}
                      onChange={handleChange}
                      size="normal"
                      id="demo-simple-select"
                    >
                      {categories.map((cat) => {
                        return (
                          <MenuItem key={cat._id} value={cat}>
                            {cat.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid container item xs={4} />
                <Grid
                  container
                  item
                  xs={4}
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Badge
                    color="secondary"
                    className={classes.badge}
                    badgeContent={pending.items.length}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      startIcon={<QueryBuilder />}
                      className={classes.pending}
                      onClick={() => setCategory(pending)}
                    >
                      Pending Items
                    </Button>
                  </Badge>
                </Grid>
                <Grid container spacing={2}>
                  <Grid
                    container
                    item
                    xs={8}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <ButtonGroup variant="contained">
                      <Button
                        color="primary"
                        className={classes.button3}
                        startIcon={<GroupAdd />}
                        onClick={() => setOpenAdd(true)}
                      >
                        Add Supplier
                      </Button>
                      <Button
                        color="primary"
                        className={classes.button3}
                        startIcon={<Edit />}
                        onClick={() => {
                          setOpenEdit(true);
                          setName(category.name);
                        }}
                      >
                        Edit Supplier
                      </Button>
                      <Button
                        color="secondary"
                        disable={!category}
                        className={classes.button3}
                        startIcon={<Delete />}
                        onClick={() => setOpenConfirm(true)}
                      >
                        Delete Supplier
                      </Button>
                    </ButtonGroup>
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
                        className={classes.button3}
                        startIcon={<Add />}
                        onClick={newItem}
                      >
                        Add Item
                      </Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <br></br>
            {/*<PriceTable data={category ? category.items : []} category={category}/>*/}
            {isLoading ? (
              <CircularProgress />
            ) : (
              <NewPriceTable
                data={category ? category : []}
                category={category}
                setOpenPending={setOpenPending}
                setPendingItem={setTobeAdded}
                isAdding={isAdding}
                setIsAdding={setIsAdding}
                selectedItems={selectedItems}
                setSelected={setSelected}
              />
            )}
            {/* ADD SUPPLIER */}
            <Dialog
              fullWidth="true"
              maxWidth="sm"
              open={openAdd}
              onClose={() => {
                setOpenAdd(false);
                setItems([]);
              }}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                <h3>New Supplier</h3>
              </DialogTitle>
              <DialogContent dividers>
                <div className="modalAcc">
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      Name
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle color="primary" />
                        </InputAdornment>
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <InputLabel className={classes.modalFields}>
                      {items.length ? "Upload Complete!" : "No Uploaded File"}
                    </InputLabel>
                  </FormGroup>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    setOpenAdd(false);
                    setItems([]);
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  <FontAwesomeIcon className="excel" icon={faFileExcel} />
                  Upload Excel
                </Button>
                <Button
                  className={classes.create}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    name ? addSupplier() : alert("Enter a name");
                  }}
                >
                  Create Supplier
                </Button>
              </DialogActions>
            </Dialog>

            {/* EDIT SUPPLIER */}
            <Dialog
              fullWidth="true"
              maxWidth="sm"
              open={openEdit}
              onClose={() => setOpenEdit(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                <h3>Edit Supplier</h3>
              </DialogTitle>
              <DialogContent dividers>
                <div className="modalAcc">
                  <FormGroup>
                    <InputLabel
                      className={classes.modalFields}
                      onChange={(e) => setName(e.target.value)}
                    >
                      Name
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      startAdornment={
                        <InputAdornment position="start">
                          <AccountCircle color="primary" />
                        </InputAdornment>
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenEdit(false)} variant="contained">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  <FontAwesomeIcon className="excel" icon={faFileExcel} />
                  Upload Excel
                </Button>
                <Button
                  className={classes.create}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    name ? editSupplier() : alert("Enter a name");
                  }}
                >
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>

            {/* ADD PENDING ITEMS */}
            <Dialog
              fullWidth="true"
              maxWidth="sm"
              open={openPending}
              onClose={() => setOpenPending(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                <h3>Select which supplier to add this item</h3>
              </DialogTitle>
              <DialogContent dividers>
                <div className="modalAcc">
                  <FormControl>
                    <InputLabel
                      id="demo-simple-select-label"
                      className={classes.modalFields}
                      shrink={true}
                    >
                      Suppliers
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      className={classes.modalFields}
                      defaultValue={categories[0]}
                      value={category}
                      onChange={handleChange}
                      size="normal"
                      id="demo-simple-select"
                    >
                      {categories.map((cat) => {
                        return (
                          <MenuItem key={cat._id} value={cat}>
                            {cat.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                  <br />
                  <br />
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      Unit
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      defaultValue={tobeAdded.unit}
                      onChange={(e) =>
                        setTobeAdded({ ...tobeAdded, unit: e.target.value })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      Product Name
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      defaultValue={tobeAdded.product_name}
                      onChange={(e) =>
                        setTobeAdded({
                          ...tobeAdded,
                          product_name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      Brand
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      defaultValue={tobeAdded.brand_name}
                      onChange={(e) =>
                        setTobeAdded({
                          ...tobeAdded,
                          brand_name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      Model
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      defaultValue={tobeAdded.model_name}
                      onChange={(e) =>
                        setTobeAdded({
                          ...tobeAdded,
                          model_name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      List Price
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      defaultValue={tobeAdded.list_price}
                      onChange={(e) =>
                        setTobeAdded({
                          ...tobeAdded,
                          list_price: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      Price Adjustment
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      defaultValue={tobeAdded.price_adjustment}
                      onChange={(e) =>
                        setTobeAdded({
                          ...tobeAdded,
                          price_adjustment: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      Net Price
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      defaultValue={tobeAdded.net_price}
                      onChange={(e) =>
                        setTobeAdded({
                          ...tobeAdded,
                          net_price: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                  <FormGroup>
                    <InputLabel className={classes.modalFields}>
                      Remarks
                    </InputLabel>
                    <Input
                      className={classes.modalFields}
                      variant="outlined"
                      defaultValue={tobeAdded.remarks}
                      onChange={(e) =>
                        setTobeAdded({ ...tobeAdded, remarks: e.target.value })
                      }
                    />
                  </FormGroup>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenPending(false)}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  className={classes.create}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    tobeAdded.unit && tobeAdded.product_name
                      ? addPendingItem()
                      : alert("Enter a name");
                  }}
                >
                  Add This Item
                </Button>
              </DialogActions>
            </Dialog>

            <div className="tbl">
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    {...getRootProps({ className: "dropzone" })}
                  >
                    <input {...getInputProps()} />
                    <FontAwesomeIcon className="excel" icon={faFileExcel} />
                    Upload Excel
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button3}
                    startIcon={<GetAppIcon />}
                    onClick={downloadFile}
                  >
                    Download
                  </Button>
                </Grid>
              </Grid>
            </div>
          </MuiThemeProvider>
        </main>
      </Container>

      <SuccessDialog
        open={open}
        handleClose={handleClose}
        success={success}
        isLoading={loading}
        action={action}
        message={message}
      />

      <ConfirmationDialog
        open={openConfirm}
        message={
          "All of its items will also be deleted. Are you sure you want to delete?"
        }
        confirm={handleDelete}
        handleClose={() => setOpenConfirm(false)}
      />

      {/* <ConfirmationDialog open={openConfirm} message={`Are you sure you want to replace the price list for ${category.name}?`} 
            confirm={handleDelete} handleClose={() => setOpenConfirm(false)}/> */}
      <div ref={endRef} />
    </div>
  );
}

export default AdminPrice;
