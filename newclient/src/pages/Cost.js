import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap";
import { Save } from "@material-ui/icons";
import {
  makeStyles,
  MenuItem,
  TextField,
  InputLabel,
  Button,
  Container,
  Grid,
  Select,
  FormControl,
  CircularProgress,
} from "@material-ui/core";
import "../styles/mts.css";
import moment from "moment";
import db from "../components/Firestore/firestore";
import UserAlert from "../components/UserAlert/UserAlert";
import api from "../api";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    width: 290,
    marginLeft: 15,
  },
  projectField: {
    [theme.breakpoints.between("lg", "xl")]:{
      direction: "row",
      justify:"flex-start",
      
    }
  },
  viewField: {
    [theme.breakpoints.down("sm")]: {
      //direction: "row",
      //justify: "flex-start",
      //alignItems: "center",
    },
  },
}));

const dbMTS = db.collection("MTS-Collection");

function Cost() {
  ////// STATES //////
  const [current_project, setProject] = useState("");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("Daily");
  const [mts, setMts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const [changeProject, setChangeProject] = useState(true)
  // const [balance, setBalance] = useState(0)
  const classes = useStyles();
  // let temprows = []
  // let tempbalance = 0

  ////// INITIAL //////
  // useEffect(() => {

  //     const projectnames = [] // for dropdown
  //     let firstproject = ''

  //     ////// GETTING THE PROJECTS //////
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
  //     tempbalance = mtsData.total_cost + tempbalance
  //     temprows.push(
  //         <tr>
  //             <td>{mtsData.date}</td>
  //             <td>{mtsData.MTS_number}</td>
  //             <td>{mtsData.total_cost}</td>
  //             <td>{tempbalance}</td>
  //         </tr>
  //     )
  // }

  // useEffect(() => {
  //     console.log('not inf loop')
  //     console.log(current_project)
  //     if (current_project != '') {
  //         setMts([])
  //         temprows = []
  //         tempbalance = 0
  //         console.log(mts)
  //         setChangeProject(!changeProject)
  //     }
  // }, [current_project, view])

  // useEffect(() => {
  //     console.log(mts)
  //     console.log(view)

  //     if (current_project != '') {

  //         if (view == 'Daily') {

  //             dbMTS.doc(current_project).collection('MTS').where('status', '==', 'Confirmed').get().then(snap => {
  //                 snap.docs.map(mts => {
  //                     renderRows(mts)
  //                 })
  //             })
  //             .then(() => {
  //                 console.log(temprows)
  //                 setMts(temprows)
  //                 setBalance(tempbalance)
  //             })

  //         } else {
  //             // dbMTS.doc(current_project).collection('MTS').where('status', '==', status).get()
  //             // .then(snap => {
  //             //     snap.docs.map(mts => {
  //             //         renderRows(mts)
  //             //     })
  //             // })
  //             // .then(() => {
  //             //     console.log(temprows)
  //             //     setMts(temprows)
  //             // })

  //             // MONTHLY VIEW
  //         }
  //     }

  // }, [changeProject])

  async function fetchData() {
    setLoading(true);
    try {
      const projectnames = await (await api.getMTSProjects()).data.data;

      setProjects(projectnames);
      setProject(projectnames[0]);

      setError("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
      setError(error);
    }
  }

  async function getMTS() {
    setLoading(true);
    try {
      let cost
      if (view === "Daily") {
        cost = await (
          await api.getCost({ project_name: current_project })
        ).data.data;
      } else {
        cost = await (
          await api.getMonthlyCost({ project_name: current_project })
        ).data.data;
      }
      
      setMts(cost);
    } catch (error) {
      setMts([]);
    }
    setLoading(false);
  }

  function renderError() {
    if (error) return <UserAlert severity="error" message={error} />;
    else return "";
  }

  const handleChange = (event) => {
    console.log(event.target.value);

    console.log(event.target.name);
    if (event.target.name === "selectProject") setProject(event.target.value);
    else setView(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getMTS();
  }, [current_project, view]);

  return (
    <div className="App">
      <div className="cont">
        <Container className={classes.container}>
          <div className="project">
            <Grid container spacing={2}>
              <div className={classes.projectField}>
                <Grid container item xl={6} lg={6} md={6} sm={12} xs={12}>
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
                      {/* {projects} */}
                      {projects.map((project) => {
                        return <MenuItem value={project}>{project}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </div>
              <div className={classes.viewField}>
                <Grid container item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">View</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      defaultValue="Daily"
                      value={view}
                      onChange={e => setView(e.target.value)}
                      size="large"
                      name="selectView"
                    >
                      <MenuItem value="Daily">Daily</MenuItem>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </div>
              {/* <Grid item xs={2}>
                            <Button variant="contained" color="primary" size="large" className={classes.button} startIcon={<Save />}> SAVE </Button>
                        </Grid> */}
            </Grid>
          </div>
          {
            isLoading ?
            <div style={{textAlign: 'center'}}>
                <CircularProgress size={100} />
            </div>
            
            :
            (
              !mts.length ? 
              (
                <Container>
                  <Table
                    className="tbl1"
                    hover
                    borderColor="#8f8f94"
                    border="#8f8f94"
                    responsive="md"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>MTS No.</th>
                        <th>Amount</th>
                        <th>Balance</th>
                      </tr>
                    </thead>
                  </Table>
                  <div style={{textAlign: 'center'}}>This list is empty.</div>
                </Container>
              )
              :
              (
                <Table
                  className="tbl1"
                  hover
                  borderColor="#8f8f94"
                  border="#8f8f94"
                  responsive="md"
                >
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>MTS No.</th>
                      <th>Amount</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {mts} */}
                    {
                      mts.map((m) => {
                        return (
                          <tr>
                            <td>{view === "Daily" ? moment(m.date).format("MM-DD-YYYY") : 
                            `${moment(m.start_date).format("MM-DD-YYYY")} to ${moment(m.end_date).format("MM-DD-YYYY")}`}</td>
                            <td>{view === "Daily" ? m.MTS_number : 
                            `${m.start_mts} - ${m.end_mts}`}</td>
                            <td>{m.total_amount}</td>
                            <td>{m.balance}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </Table>
              )
            )
          }
        </Container>
      </div>
    </div>
  );
}

export default Cost;
