import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Container, Table } from "react-bootstrap";
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
import UserAlert from "../components/UserAlert/UserAlert";
// import firebase from 'firebase'
import users from "../api/users";
import api from "../api";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  projectFields:{
    width: 270
  },
  parentCenter: {
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

// const dbMTS = db.collection('MTS-Collection');

function MtsList(props) {
  ////// STATES //////
  const [current_project, setProject] = useState("");
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("All");
  const [mts, setMts] = useState([]);
  const [user, setUser] = useState(fetchUser());
  const [isLoading, setLoading] = useState(false);
  // const [first, setFirst] = useState('')
  // const [changeProject, setChangeProject] = useState(true)
  const classes = useStyles();
  // let temprows = []

  // firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //         setUser(user.displayName)
  //     } else {
  //         console.log(user)
  //     }
  //     setFirst('First')
  // })

  // FIRESTORE
  // useEffect( async () => {

  //     if (first !== '') {

  //         try {
  //             // for dropdown
  //             const projectnames = await (await api.getMTSProjects()).data.data

  //             setProjects(projectnames)
  //             setProject(projectnames[0])
  //             setError('')
  //         } catch (error) {
  //             setError(error)
  //         }

  //         ////// GETTING THE PROJECTS ///////
  //         // function renderProjects(project, value) {

  //         //     if (value == 1) {
  //         //         firstproject = project.data().name
  //         //     }
  //         //     console.log(project.data().name)
  //         //     const name = project.data().name
  //         //     projectnames.push( (<MenuItem value={name}>{name}</MenuItem>) )
  //         // }

  //         // dbMTS.get().then(projSnapshot => {
  //         //     projSnapshot.docs.forEach((project, index) => {
  //         //     renderProjects(project, index+1)
  //         //     })
  //         // })
  //         // .then(() => {
  //         //     setProjects(projectnames)
  //         //     setProject(firstproject)
  //         //     setError('')
  //         // })
  //         // .catch(err => {
  //         //     setError(err.message)
  //         // })
  //     }

  // }, [first])

  // FIRESTORE
  // useEffect(() => {
  // console.log('not inf loop')
  // console.log(current_project)
  // if (current_project !== '') {
  //     setMts([])
  //     // temprows = []
  //     console.log(mts)
  //     // setChangeProject(!changeProject)
  // }
  // }, [current_project, status])

  // FIRESTORE
  // useEffect( async () => {
  //     console.log(mts)
  //     console.log(status)

  //     if (current_project !== '') {

  //         if (status === 'All') {

  //             const mts = await (await api.getAllMTS()).data.data
  //             renderRows(mts)
  //             // dbMTS.doc(current_project).collection('MTS').where('prepared_by', '==', user).get().then(snap => {
  //             //     snap.docs.map(mts => {
  //             //         renderRows(mts)
  //             //     })
  //             // })
  //             // .then(() => {
  //             //     console.log(temprows)
  //             //     setMts(temprows)
  //             // })

  //         } else {

  //             // dbMTS.doc(current_project).collection('MTS').where('prepared_by', '==', user).where('status', '==', status).get()
  //             // .then(snap => {
  //             //     snap.docs.map(mts => {
  //             //         renderRows(mts)
  //             //     })
  //             // })
  //             // .then(() => {
  //             //     console.log(temprows)
  //             //     setMts(temprows)
  //             // })
  //         }
  //     }

  // }, [changeProject])

  async function fetchUser() {
    try {
      const current = await (
        await users.getUser({ token: localStorage.getItem("token") })
      ).data.data;
      return current;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const projectnames = await (await api.getMTSProjects()).data.data;

      setProjects(projectnames);
      setProject(projectnames[0]);

      setError("");
    } catch (error) {
      alert("Something went wrong");
      setError(error);
    }
  }

  function renderError() {
    if (error) return <UserAlert severity="error" message={error} />;
    else return "";
  }

  async function getMTS() {
    setLoading(true);
    try {
      const payload = {
        project_name: current_project,
        status: status,
      };
      let new_mts = await (await api.getMTSByProject(payload)).data.data;
      let current = await user;

      new_mts = new_mts.filter((mts) => mts.prepared_by === current.username);

      setMts(new_mts);
    } catch (error) {
      setMts([]);
    }
    setLoading(false);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "selectProject") setProject(value);
    else setStatus(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (current_project) getMTS();
    else setLoading(false);
  }, [current_project, status]);

  return (
    <div className="App" style={{ marginLeft: props.isOpen && 200 }}>
      {/*style:{{marginLeft:200}}*/}
      <Container className="cont" maxWidth="lg">
        <div className="project">
          {renderError()}
          <Grid container spacing={1}>
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              xs={6}
            >
              <FormControl className={classes.projectFields}>
                <InputLabel id="demo-simple-select-label">
                  Project Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  defaultValue={projects[0]}
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
              item
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              xs={6}
            >
              <FormControl className={classes.projectFields}>
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
          <div>
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
                  <th>Date Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
            </Table>
            <div className={classes.parentCenter}>This list is empty.</div>
          </div>
        ) : (
          <Table className="tbl1" hover bordercolor="#8f8f94" border="#8f8f94">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>MTS No.</th>
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
                    <td>
                      {moment(m.date_created).format("MM-DD-YYYY, hh:mm:ss a")}
                    </td>
                    <td>{m.status}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/MtsWindow",
                          state: {
                            mts: m,
                          },
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            localStorage.setItem("mts", JSON.stringify(m));
                          }}
                        >
                          <FontAwesomeIcon className="view" icon={faEye} />
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
}

export default MtsList;
