import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import {
  Button,
  Grid,
  makeStyles,
  createMuiTheme,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  Input,
  ButtonGroup,
  InputAdornment,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import {
  Add,
  Edit,
  GroupAdd,
  QueryBuilder,
  Delete,
  LocalOffer,
  Search,
} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import GetAppIcon from "@material-ui/icons/GetApp";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import NewPriceTable from "../components/AdminPriceTable/NewPriceTable";
import Badge from "@material-ui/core/Badge";
import "../styles/mts.css";
import { useDropzone } from "react-dropzone";
import suppliers from "../api/supplier";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
import SuccessDialog from "../components/SuccessDialog/SuccessDialog";
import SingleFieldDialog from "../components/SingleFieldDialog/SingleFieldDialog";

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
    color: white,
    width: 150,
  },
  btnGrp1: {
    width: 195,
  },
  btnGrp2: {
    marginTop: 10,
    marginBottom: 10,
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
    marginBottom: 20,
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
    alignItems: "center",
  },
  editFields: {
    width: 230,
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  modalContent: {
    marginTop: 20,
    marginBottom: 10,
  },
  upload:{
    width: 170
  },
  download:{
    marginLeft:20,
    width: 150
  }
}));

function AdminPrice(props) {
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
  const [openPrice, setOpenPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(null);
  const [backupCategory, setBackupCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const endRef = useRef(null);
  const [pending, setPending] = useState({
    name: "Pending Items",
    items: [],
  });
  const [tobeAdded, setTobeAdded] = useState({});
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItems, setSelected] = useState([]);

  const Papa = require("papaparse");

  useEffect(() => {
    setItems([]);
  }, [openAdd]);

  useEffect(() => {
    if (!openPending) setTobeAdded({});
  }, [openPending]);

  useEffect(() => {
    if (!openPending) setSelected([]);
  }, [category]);

  const handleChange = (event) => {
    if (isAdding) category.items.pop();
    setIsAdding(false);
    setCategory(event.target.value);
    setBackupCategory(event.target.value);
    document.getElementById("search").value = "";
  };

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        payload._id = data.data.id;
        setCategory(payload);
        setBackupCategory(payload);
        categories.push(payload);
        categories[categories.length - 1] = payload;
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
    //try {
    const temp = await (await suppliers.getAllSupplier()).data.data;
    temp.sort((a, b) => a.name.localeCompare(b.name));
    temp.forEach((s) => {
      if (s.name === "Pending Items") setPending(s);
    });
    setCategories(temp);
    setCategory(temp[0]);
    setBackupCategory(temp[0]);
    //} catch (error) {
    //  console.log(error);
    //  alert("error in getting suppliers");
    //}
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
          if (final) {
            uploadItems(results.data);
            setOpenEdit(false);
          }
        } else {
          if (category === null) alert("No selected Supplier yet");
          else {
            results.data.forEach((item) => {
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
    rawItems.forEach((item) => {
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
      setCategory(payload);
      setBackupCategory(payload);
      const index = categories.indexOf(backupCategory);
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

  const addPendingItems = async () => {
    try {
      const sorted = selectedItems.sort((a, b) => b - a);
      sorted.forEach((index) => {
        category.items.push(pending.items[index]);
        pending.items.splice(index, 1);
      });
      await suppliers.updateSupplierById(category._id, category);
      await suppliers.updateSupplierById(pending._id, pending);
      setSelected([]);
      setOpenPending(false);
      setCategory({ ...category });
    } catch (error) {
      alert(error);
    }
  };

  const newItem = () => {
    if (!isAdding) {
      setIsAdding(true);
      const temp = { ...category };
      temp.items.push({
        unit: "",
        product_name: "",
        brand_name: "",
        model_name: "",
        list_price: "",
        price_adjustment: "",
        net_price: "",
        remarks: "",
      });
      setCategory(temp);
    }
    scrollToBottom();
  };

  const applyPrice = async () => {
    try {
      selectedItems.forEach((index) => {
        category.items[index].price_adjustment = price;
        category.items[index].net_price =
          (1 + price / 100) * category.items[index].list_price;
      });
      await suppliers.updateSupplierById(category._id, category);
      setSelected([]);
      setOpenPrice(false);
      setCategory({ ...category });
    } catch (error) {
      alert(error);
    }
  };

  const removeItems = async () => {
    const sorted = selectedItems.sort((a, b) => b - a);
    sorted.forEach((index) => {
      category.items.splice(index, 1);
    });

    try {
      await suppliers.updateSupplierById(category._id, category);
      setSelected([]);
      setCategory({ ...category });
    } catch (error) {
      console.error(error);
      alert("something went wrong");
    }
  };

  const handleSearch = (event) => {
    let query = event.target.value;
    if (query !== "") {
      query = query.toLowerCase();
      const temp = [...backupCategory.items];
      console.log(temp);
      const filtered = temp.filter((obj) => {
        let unit = obj.unit.toLowerCase();
        let product_name = obj.product_name.toLowerCase();
        let model_name = obj.model_name.toLowerCase();
        let brand_name = obj.brand_name.toLowerCase();
        let remarks = obj.remarks.toLowerCase();
        return (
          unit.includes(query) ||
          product_name.includes(query) ||
          model_name.includes(query) ||
          brand_name.includes(query) ||
          remarks.includes(query)
        );
      });
      console.log(filtered);
      setCategory({ items: filtered });
    } else {
      setCategory(backupCategory);
    }
  };

  return (
    <div className="PriceList" style={{ marginLeft: props.isOpen && 200 }}>
      {/*style:{{marginLeft:200}}*/}
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
                <Grid
                  container
                  item
                  direction="row"
                  justify="center"
                  alignItems="center"
                  xs={4}
                >
                  <FormControl>
                    <TextField
                      className={classes.txt}
                      size="normal"
                      placeholder="Search"
                      type="search"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleSearch}
                      id="search"
                    />
                  </FormControl>
                </Grid>
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
                      style={{ marginBottom: 20 }}
                    >
                      Pending Items
                    </Button>
                  </Badge>
                </Grid>
                <Grid container spacing={2}>
                  <Grid
                    container
                    item
                    xs={6}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <ButtonGroup variant="contained">
                      <Button
                        className={classes.btnGrp1}
                        color="primary"
                        startIcon={<GroupAdd />}
                        onClick={() => setOpenAdd(true)}
                      >
                        Add Supplier
                      </Button>
                      <Button
                        className={classes.btnGrp1}
                        color="primary"
                        startIcon={<Edit />}
                        onClick={() => {
                          setOpenEdit(true);
                          setName(category.name);
                        }}
                      >
                        Edit Supplier
                      </Button>
                      <Button
                        className={classes.btnGrp1}
                        color="secondary"
                        disable={!category}
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
                    xs={6}
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Add />}
                      onClick={newItem}
                      style={{ width: 167 }}
                    >
                      Add Item
                    </Button>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  {Boolean(selectedItems.length) && (
                    <ButtonGroup
                      variant="outlined"
                      style={{ position: "absolute", margin: 10 }}
                    >
                      <Button
                        color="primary"
                        className={classes.btnGrp2}
                        startIcon={<LocalOffer />}
                        onClick={() => setOpenPrice(true)}
                      >
                        Apply Price Adjustment
                      </Button>
                      {category.name === "Pending Items" && (
                        <Button
                          color="primary"
                          disable={!category}
                          className={classes.btnGrp2}
                          startIcon={<Add />}
                          onClick={() => setOpenPending(true)}
                        >
                          Add Selected
                        </Button>
                      )}
                      <Button
                        color="secondary"
                        disable={!category}
                        className={classes.btnGrp2}
                        startIcon={<Delete />}
                        onClick={removeItems}
                      >
                        Remove Selected
                      </Button>
                    </ButtonGroup>
                  )}
                </Grid>
              </Grid>
            </div>
            <br />
            <br />
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
            <SingleFieldDialog
              open={openAdd}
              close={setOpenAdd}
              title={"New Supplier"}
              label={"Name"}
              defaultValue={""}
              isName={true}
              type={"text"}
              value={name}
              setValue={setName}
              actionName={"Create Supplier"}
              handleAction={addSupplier}
              getInputProps={getInputProps}
              getRootProps={getRootProps}
              items={items}
            />

            {/* EDIT SUPPLIER */}
            <SingleFieldDialog
              open={openEdit}
              close={setOpenEdit}
              title={"Edit Supplier"}
              label={"Name"}
              defaultValue={name}
              isName={true}
              type={"text"}
              value={name}
              setValue={setName}
              actionName={"Save Changes"}
              handleAction={editSupplier}
              getInputProps={getInputProps}
              getRootProps={getRootProps}
            />

            {/* APPLY PRICE ADJUSTMENT */}
            <SingleFieldDialog
              open={openPrice}
              close={setOpenPrice}
              title={"Apply Price Adjustment"}
              label={"Enter Price Percentage"}
              endAdornment={"%"}
              defaultValue={0}
              isName={false}
              type={"number"}
              value={price}
              setValue={setPrice}
              actionName={"Apply"}
              handleAction={applyPrice}
            />

            {/* ADD PENDING ITEMS */}
            <Dialog
              fullWidth="true"
              maxWidth="sm"
              open={openPending}
              onClose={() => setOpenPending(false)}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                <h3>
                  Select which supplier to add{" "}
                  {tobeAdded.unit ? "this item" : "the items selected"} to:
                </h3>
              </DialogTitle>
              <DialogContent dividers>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
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
                  {tobeAdded.unit && (
                    <Grid
                      className={classes.modalContent}
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <FormControl className={classes.editFields}>
                        <TextField
                          id="standard-basic"
                          size="Small"
                          label="Unit"
                          defaultValue={tobeAdded.unit}
                          onChange={(e) =>
                            setTobeAdded({ ...tobeAdded, unit: e.target.value })
                          }
                        />
                      </FormControl>
                      <FormControl className={classes.editFields}>
                        {" "}
                        <TextField
                          id="standard-basic"
                          size="Small"
                          label="Product Name"
                          defaultValue={tobeAdded.product_name}
                          onChange={(e) =>
                            setTobeAdded({
                              ...tobeAdded,
                              product_name: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl className={classes.editFields}>
                        <TextField
                          id="standard-basic"
                          size="Small"
                          label="Brand"
                          defaultValue={tobeAdded.brand_name}
                          onChange={(e) =>
                            setTobeAdded({
                              ...tobeAdded,
                              brand_name: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl className={classes.editFields}>
                        <TextField
                          size="Small"
                          id="standard-basic"
                          label="Model"
                          defaultValue={tobeAdded.model_name}
                          onChange={(e) =>
                            setTobeAdded({
                              ...tobeAdded,
                              model_name: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormControl className={classes.editFields}>
                        <TextField
                          id="standard-basic"
                          size="Small"
                          label="List Price"
                          defaultValue={tobeAdded.list_price}
                          type="Number"
                          onChange={(e) => {
                            if (
                              e.target.value === "" ||
                              parseFloat(e.target.value) < 0
                            )
                              e.target.value = "";
                            setTobeAdded({
                              ...tobeAdded,
                              list_price: e.target.value,
                            });
                          }}
                          inputProps={{ min: 0 }}
                        />
                      </FormControl>
                      <FormControl className={classes.editFields}>
                        {" "}
                        <TextField
                          id="standard-basic"
                          size="Small"
                          label="Price Adjustment"
                          defaultValue={tobeAdded.price_adjustment}
                          type="Number"
                          onChange={(e) =>
                            setTobeAdded({
                              ...tobeAdded,
                              price_adjustment: e.target.value,
                            })
                          }
                          endAdornment={
                            <InputAdornment position="end"> % </InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl className={classes.editFields}>
                        <TextField
                          id="standard-basic"
                          size="Small"
                          label="Net Price"
                          defaultValue={tobeAdded.net_price}
                          type="Number"
                          onChange={(e) => {
                            if (
                              e.target.value === "" ||
                              parseFloat(e.target.value) < 0
                            )
                              e.target.value = "";
                            setTobeAdded({
                              ...tobeAdded,
                              list_price: e.target.value,
                            });
                          }}
                          inputProps={{ min: 0 }}
                        />
                      </FormControl>
                      <FormControl className={classes.editFields}>
                        <TextField
                          id="standard-basic"
                          size="Small"
                          label="Remarks"
                          defaultValue={tobeAdded.remarks}
                          onChange={(e) =>
                            setTobeAdded({
                              ...tobeAdded,
                              remarks: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenPending(false)}
                  variant="contained"
                  color="secondary"
                >
                  Cancel
                </Button>
                {tobeAdded.unit ? (
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
                ) : (
                  <Button
                    className={classes.create}
                    variant="contained"
                    color="primary"
                    onClick={() => addPendingItems()}
                  >
                    Add Items
                  </Button>
                )}
              </DialogActions>
            </Dialog>

            <div className="tbl">
              <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.upload}
                      {...getRootProps({ className: "dropzone" })}
                    >
                      <input {...getInputProps()} />
                      <FontAwesomeIcon className="excel" icon={faFileExcel} />
                      Upload Excel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.download}
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
