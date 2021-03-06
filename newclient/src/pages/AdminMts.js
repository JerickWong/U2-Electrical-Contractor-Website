import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Visibility, Delete, CheckCircle } from "@material-ui/icons";
import { ButtonGroup, Container, Table } from "react-bootstrap";
import {
  makeStyles,
  MenuItem,
  InputLabel,
  Grid,
  Select,
  FormControl,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "../styles/mts.css";
// import db from '../components/Firestore/firestore';
// import firebase from 'firebase'
import UserAlert from "../components/UserAlert/UserAlert";
import users from "../api/users";
import api from "../api";
import supplier from "../api/supplier";
import moment from "moment";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog";
import SuccessDialog from "../components/SuccessDialog/SuccessDialog";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: 300,
  },
  parentCenter: {
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "",
  },
}));

// const dbMTS = db.collection('MTS-Collection');

function AdminMts(props) {
  ////// STATES //////
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [action, setAction] = useState("");
  const [current_project, setProject] = useState("");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("All");
  const [mts, setMts] = useState([]);
  const [user, setUser] = useState(fetchUser());
  const [current_mts, setCurrent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [empty, setEmpty] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [pending, setPending] = useState(null);
  const [pendingItems, setPendingItems] = useState([]);
  // const [first, setFirst] = useState('')
  // const [changeProject, setChangeProject] = useState(true)
  const classes = useStyles();
  // let temprows = []

  // useEffect(() => {

  //     const projectnames = [] // for dropdown
  //     let firstproject = ''

  //     ////// GETTING THE PROJECTS ///////
  //     function renderProjects(project, value) {

  //         if (value == 1) {
  //             firstproject = project.data().name
  //         }
  //         console.log(project.data().name)
  //         const name = project.data().name
  //         projectnames.push( (<MenuItem value={name}>{name}</MenuItem>) )
  //     }

  //     dbMTS.get().then(projSnapshot => {
  //         projSnapshot.docs.forEach((project, index) => {
  //         renderProjects(project, index+1)
  //         })
  //     })
  //     .then(() => {
  //         setProjects(projectnames)
  //         setProject(firstproject)
  //         setError('')
  //     })
  //     .catch(err => {
  //         setError(err.message)
  //     })

  // }, [first])

  // function renderRows(mts) {
  //     const mtsData = mts.data()
  //     const name = current_project
  //     let canConfirm = ''
  //     if (mtsData.status === 'For Approval') {
  //         canConfirm = (
  //             <Link href='#' onClick={(e) => {confirmMTS(e, mtsData.MTS_number)}}>Confirm</Link>
  //         )
  //     }
  //     temprows.push(
  //         <tr>
  //             <td>{name}</td>
  //             <td>{mtsData.MTS_number}</td>
  //             <td>{mtsData.prepared_by}</td>
  //             <td>{mtsData.date_created}</td>
  //             <td>{mtsData.status}</td>
  //             <td><Link to={{
  //                 pathname:'/AdminMtsWindow',
  //                 state: {
  //                     current_project: name,
  //                     mts_number: mtsData.MTS_number
  //                 }
  //             }}><FontAwesomeIcon className="view" icon={faEye} /></Link> &nbsp; &nbsp;
  //             {canConfirm}
  //             </td>
  //         </tr>
  //     )
  // }

  // async function confirmMTS(e, mtsnumber) {
  //     e.preventDefault();
  //     // dbMTS.doc(current_project).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
  //     // dbMTS.doc(current_project).collection('MTS').doc('wala dapat to').update({ status: 'Confirmed' })
  //     // .then(() => {
  //     //     console.log(current_project)
  //     //     setProject(current_project)
  //     //     setChangeProject(!changeProject)
  //     //     alert('Success!')
  //     // })
  //     // .catch(err => {
  //     //     alert(err.message)
  //     //     dbMTS.doc(current_project).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
  //     //     .then(() => {
  //     //         console.log(current_project)
  //     //         setProject(current_project)
  //     //         setChangeProject(!changeProject)
  //     //         alert('Success!')
  //     //     })
  //     // })
  //     dbMTS.doc(current_project).collection('MTS').doc(mtsnumber+'').update({ status: 'Confirmed' })
  //     .then(() => {
  //         console.log(current_project)
  //         setProject(current_project)
  //         setChangeProject(!changeProject)
  //         alert('Success!')
  //     })
  //     .catch(err => {
  //         alert(err.message)
  //     })

  //     // PRODUCTS SUMMARY
  //     const productsSnap = await dbMTS.doc(current_project).collection('MTS').doc(mtsnumber+'').collection('productsList').get()
  //     productsSnap.docs.map(snap => {
  //         const qty = snap.data().qty
  //         const description = snap.data().description

  //         const increment = firebase.firestore.FieldValue.increment(qty);
  //         dbMTS.doc(current_project).collection('Delivered-Summary').doc(description).update({
  //             total: increment
  //         })
  //         .catch(err => {
  //             console.log(err.message)
  //             dbMTS.doc(current_project).collection('Delivered-Summary').doc(description).set({
  //             total: qty,
  //             description: description,
  //             estqty: 0
  //             })
  //         })
  //         .then(() => { alert('Success!!!') })
  //     })

  // }

  // useEffect(() => {
  //     console.log('not inf loop')
  //     console.log(current_project)
  //     if (current_project != '') {
  //         setMts([])
  //         temprows = []
  //         console.log(mts)
  //         setChangeProject(!changeProject)
  //     }
  // }, [current_project, status])

  // useEffect(() => {
  //     console.log(mts)
  //     console.log(status)

  //     if (current_project != '') {

  //         if (status == 'All') {

  //             dbMTS.doc(current_project).collection('MTS').get().then(snap => {
  //                 snap.docs.map(mts => {
  //                     renderRows(mts)
  //                 })
  //             })
  //             .then(() => {
  //                 console.log(temprows)
  //                 setMts(temprows)
  //             })

  //         } else {
  //             dbMTS.doc(current_project).collection('MTS').where('status', '==', status).get()
  //             .then(snap => {
  //                 snap.docs.map(mts => {
  //                     renderRows(mts)
  //                 })
  //             })
  //             .then(() => {
  //                 console.log(temprows)
  //                 setMts(temprows)
  //             })
  //         }
  //     }

  // }, [changeProject])

  async function fetchUser() {
    try {
      return await (
        await users.getUser({ token: localStorage.getItem("token") })
      ).data.data;
    } catch (error) {
      console.log(error);
      alert("user not logged in");
      return null;
    }
  }

  async function fetchData() {
    setIsLoading(true);
    try {
      const projectnames = await (await api.getMTSProjects()).data.data;
      const allSuppliers = await (await supplier.getAllSupplier()).data.data;
      const tempPending = allSuppliers.find(
        (supplier) => supplier.name === "Pending Items"
      );

      setProjects(projectnames);
      setProject(projectnames[0]);
      setSuppliers(allSuppliers);
      setPending(tempPending);

      setError("");
    } catch (error) {
      alert(error);
      setError(error);
    }
    // setIsLoading(false)
  }

  function renderError() {
    if (error) return <UserAlert severity="error" message={error} />;
    else return "";
  }

  async function getMTS() {
    setIsLoading(true);
    try {
      const payload = {
        project_name: current_project,
        status: status,
      };
      const raw = await (await api.getMTSByProject(payload)).data;

      if (raw.success) {
        const new_mts = raw.data;
        setMts(new_mts);
      } else setMts([]);
    } catch (error) {
      setMts([]);
    }
    setIsLoading(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "selectProject") setProject(value);
    else setStatus(value);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setOpen(true);
    setAction("Confirm");

    // add pending items
    if (pendingItems.length > 0) {
      const payload = { ...pending };
      payload.items = [...pending.items, ...pendingItems];
      await supplier.updateSupplierById(pending._id, payload);
      setPendingItems([]);
    }

    // confirm mts
    console.log(current_mts);
    current_mts.status = "Confirmed";
    await api.updateMTSById(current_mts._id, current_mts);

    // delivered
    const isExist = await (
      await api.getDeliveredByProject({ project_name: current_project })
    ).data.success;

    // new delivered summary, array
    const dates = await (
      await api.getDates({ project_name: current_project })
    ).data.data;
    const newDelivered = await (
      await api.getDeliveredSummary({
        project_name: current_project,
        from: dates.start,
        to: dates.end,
      })
    ).data.data;

    // if project already exists, append delivered object
    if (isExist) {
      try {
        await api.updateDelivered({
          project_name: current_project,
          start: dates.start,
          end: dates.end,
          rows: newDelivered,
        });
      } catch (e) {
        alert("delivered summary did not update");
      }
    }

    // create new delivered object
    else {
      const delivered_rows = newDelivered.map((row) => {
        return { ...row, estqty: 0 };
      });
      await (
        await api.insertDelivered({
          project_name: current_project,
          start: dates.start,
          end: dates.end,
          rows: delivered_rows,
        })
      ).data.message;
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setSuccess(true);
    await getMTS();
  };

  const checkItems = async () => {
    setLoading(true);
    setOpen(true);
    // check items if in price list or
    try {
      const tempPendingItems = [];
      console.log(current_mts);

      current_mts.rows.forEach((row) => {
        const found = suppliers.find((supplier) =>
          supplier.items.find((item) => {
            return (
              item.unit.trim() === row.unit.trim() &&
              item.product_name.trim() === row.description.trim() &&
              item.brand_name.trim() === row.brand.trim() &&
              item.model_name.trim() === row.model.trim()
            );
          })
        );

        if (!found) {
          tempPendingItems.push({
            ...row,
            product_name: row.description,
            brand_name: row.brand,
            model_name: row.model,
          });
        }
      });

      if (tempPendingItems.length === 0) {
        await handleConfirm();
      } else {
        // if not found at least
        setOpen(false);
        setMessage("");
        const temp = [
          "By proceeding, the following will be added to the Pending Items:",
        ];
        tempPendingItems.forEach((item) => {
          console.log(item);
          temp.push(
            `${item.unit} ${item.description} ${item.brand} ${item.model}`
          );
        });
        setEmpty(temp);
        setPendingItems(tempPendingItems);
        setOpenConfirm(true);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
      alert("Something went wrong when confirming");
    }
  };

  const handleDelete = async () => {
    setOpen(true);
    setLoading(true);
    setAction("Delete");
    try {
      console.log(current_mts._id);
      console.log(current_mts);
      await api.deleteMTSById(current_mts._id);
      const payload = {
        project_name: current_project,
        status: "Confirmed",
      };
      console.log("deleted");
      const isMts = await (await api.getMTSByProject(payload)).data.success;
      console.log("ismts");
      const delivered = await (
        await api.getDeliveredByProject({ project_name: current_project })
      ).data;
      console.log("delivered");

      if (delivered.success) {
        if (isMts) {
          const dates = await (
            await api.getDates({ project_name: current_project })
          ).data.data;
          const newDelivered = await (
            await api.getDeliveredSummary({
              project_name: current_project,
              from: dates.start,
              to: dates.end,
            })
          ).data.data;

          await api.updateDelivered({
            project_name: current_project,
            start: dates.start,
            end: dates.end,
            rows: newDelivered,
          });
          console.log("updated");
        } else {
          console.log("here");
          await api.deleteDeliveredById(delivered.data._id);
          console.log("deleted");
        }
      }
      console.log("success!");
      setSuccess(true);
    } catch (error) {
      console.log(error.error);
      setSuccess(false);
      alert("error in deleting");
      if (error.toString().includes("404"))
        setMessage("MTS could not be found");
      else setMessage("Unknown error");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    getMTS();
  };

  const handleClose = () => {
    setOpen(false);

    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    if (current_project) getMTS();
  }, [current_project, status]);

  useEffect(() => {
    if (action === "Delete") {
      setMessage(
        `Are you sure you want to delete MTS #${
          current_mts ? current_mts.MTS_number : ""
        }?`
      );
    } else {
      if (current_mts) checkItems();
    }
  }, [current_mts]);

  return (
    <div className="App" style={{ marginLeft: props.isOpen && 200 }}>
      <Container className="cont">
        <div className="project">
          {renderError()}
          <Grid container spacing={1}>
            <Grid
              container
              item
              xs={6}
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Project Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={current_project}
                  size="large"
                  onChange={handleChange}
                  name="selectProject"
                >
                  {projects.map((project) => {
                    return <MenuItem value={project}>{project}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid
              container
              item
              xs={6}
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">
                  Project Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  defaultValue={"All"}
                  size="large"
                  onChange={handleChange}
                  id="selectStatus"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                  <MenuItem value={"For Approval"}>For Approval</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        {isLoading ? (
          <div className={classes.parentCenter}>
            <CircularProgress size={70} />
          </div>
        ) : !mts.length ? (
          <Container>
            <Table
              className="tbl1"
              hover
              bordercolor="#8f8f94"
              border="#8f8f94"
            >
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>MTS No.</th>
                  <th>Prepared By</th>
                  <th>Date Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
            </Table>
            <div className={classes.parentCenter}>This list is empty.</div>
          </Container>
        ) : (
          <Table className="tbl1" hover bordercolor="#8f8f94" border="#8f8f94">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>MTS No.</th>
                <th>Prepared By</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {mts.map((m, index) => {
                return (
                  <tr>
                    <td>{current_project}</td>
                    <td>{m.MTS_number}</td>
                    <td>{m.prepared_by}</td>
                    <td>
                      {moment(m.date_created).format("MM-DD-YYYY, hh:mm:ss a")}
                    </td>
                    <td>{m.status}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/AdminMtsWindow",
                          state: {
                            mts: m,
                          },
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<Visibility />}
                        >
                          View
                        </Button>
                      </Link>{" "}
                      {m.status === "Confirmed" ? (
                        ""
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<CheckCircle />}
                          onClick={() => {
                            setCurrent(m);
                          }}
                        >
                          Confirm
                        </Button>
                      )}{" "}
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<Delete />}
                        onClick={() => {
                          setAction("Delete");
                          setEmpty([]);
                          setCurrent(m);
                          setOpenConfirm(true);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
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
        message={message}
        confirm={action === "Delete" ? handleDelete : handleConfirm}
        handleClose={() => setOpenConfirm(false)}
        empty={empty}
      />
    </div>
  );
}

export default AdminMts;
