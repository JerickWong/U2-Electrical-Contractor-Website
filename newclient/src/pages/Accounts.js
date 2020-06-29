import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import {
    Button, TextField, InputAdornment, Input, Grid, makeStyles, createMuiTheme, IconButton,
    Select, MenuItem, InputLabel, FormControl, Typography, FormGroup
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Search, Lock, AccountCircle, Save } from '@material-ui/icons';
import EmailIcon from '@material-ui/icons/Email';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserMinus, faKey } from "@fortawesome/free-solid-svg-icons";
import '../styles/accounts.css';
import Authenticate from '../components/Firestore/auth'
import db from '../components/Firestore/firestore'
import moment from 'moment'

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
    button: {
        backgroundColor: primary,
        marginTop: 15,
        margin: theme.spacing(0),
        color: white,
        width: 250,
    },
    root: {
        flexGrow: 1,
    },
    txt: {
        width: 230
    },
    txt1: {
        marginTop: 15,
        width: 230
    },
    button1: {
        marginTop: 15,
        marginLeft: 30,
        width: 210
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    delete: {
        color: '#F04A42'
    },
    title: {
        margin: 0,
        padding: theme.spacing(2),
    },
    userFunc: {
        color: 'primary',
        display: 'flex',
        fontSize: 20,
    },
    modalIcons: {
        color: 'primary',
        display: 'flex',
        fontSize: 30
    },
    modalTitle: {
        fontSize: 20,
        display: 'flex',
        marginTop: 30,
        padding: theme.spacing(2)

    },
    modalFields: {
        width: 400,
        marginBottom: 20,
        alignItems: 'center',
        display: 'flex',
        marginLeft: 30
    },
}));

function Accounts() {
    const classes = useStyles();
    const [role, setRole] = React.useState('All');
    const [newRole, setNewRole] = React.useState('Employee');
    const [editRole, setEditRole] = React.useState('');
    const handleChange = (event) => {
        setRole(event.target.value)
    }
    const handleNewRole = (event) => {
        setNewRole(event.target.value);
    };
    const handleEditRole = (event) => {
        setEditRole(event.target.value)
    }
    const createAccount = () => {
        const email = document.querySelector('#new-email').value
        const username = document.querySelector('#new-username').value
        const password = document.querySelector('#new-password').value
        console.log(email,username,password, newRole)        
        db.collection('Accounts').add({
            email,
            password,
            username,
            role: 'Admin',
            date_created: moment().format('MMMM DD, YYYY HH:mm:ss')
        })
        .then(() => {
            console.log('Account has been added')
            Authenticate.signup(email, username, password, newRole)
        })
        .catch((err) => {
            console.log (err)
        })
    }

    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickEdit = (event) => {
        setEdit(true);
        // get username, password, and role to display to the click modal
    }
    const handleCloseEdit = () => {
        setEdit(false);
    }
    return (
        <div className="Accounts">
            <Container className="cont">
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <FormControl>
                                        <InputLabel className={classes.label} id="demo-simple-select-label">Project Name</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt} defaultValue={'All'} value={role} onChange={handleChange} id="demo-simple-select">
                                            <MenuItem value={'All'}>All</MenuItem>
                                            <MenuItem value={'Employee'}>Employee</MenuItem>
                                            <MenuItem value={'Manager'}>Manager</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} />
                                <Grid item xs={3}>
                                    <TextField
                                        className={classes.txt1}
                                        size="normal"
                                        placeholder="Search"
                                        type='search'
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={3}>
                                    <Button color="primary" className={classes.button1} onClick={handleClickOpen} variant="contained">
                                        Create Account
                                    </Button>

                                    {/* CREATE ACCOUNT */}
                                    <Dialog fullWidth="true" maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">
                                            <h3>New Account</h3>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <div className="modalAcc">
                                                <FormGroup>
                                                    <InputLabel className={classes.modalFields}>Email</InputLabel>
                                                    <Input
                                                        id="new-email"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <EmailIcon color="primary" />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel className={classes.modalFields}>Username</InputLabel>
                                                    <Input
                                                        id="new-username"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <AccountCircle color="primary" />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel className={classes.modalFields}>Password</InputLabel>
                                                    <Input
                                                        id="new-password"
                                                        className={classes.modalFields}
                                                        type="password"
                                                        variant="outlined"
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <Lock color="primary" />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel className={classes.modalFields}>Role</InputLabel>
                                                    <Select
                                                        className={classes.modalFields}
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        defaultValue={'Employee'}
                                                        value={newRole}
                                                        onChange={handleNewRole}
                                                    >
                                                        <MenuItem value={'Employee'}>Employee</MenuItem>
                                                        <MenuItem value={'Manager'}>Manager</MenuItem>
                                                    </Select>
                                                </FormGroup>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} variant="contained" color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => {handleClose(); createAccount();}} className={classes.create} variant="contained" color="primary">
                                                Create Account
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                    {/* EDIT ACCOUNT */}
                                    <Dialog fullWidth="true" maxWidth="sm" open={edit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">
                                            <h3>Edit Account</h3>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <div className="modalAcc">
                                               <FormGroup>
                                                    <InputLabel className={classes.modalFields}>Email</InputLabel>
                                                    <Input
                                                        id="edit-email"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <EmailIcon color="primary" />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel className={classes.modalFields}>Username</InputLabel>
                                                    <Input
                                                        id="edit-username"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <AccountCircle color="primary" />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel className={classes.modalFields}>Password</InputLabel>
                                                    <Input
                                                        id="edit-password"
                                                        className={classes.modalFields}
                                                        type="password"
                                                        variant="outlined"
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <Lock color="primary" />
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel className={classes.modalFields}>Role</InputLabel>
                                                    <Select
                                                        className={classes.modalFields}
                                                        labelId="demo-simple-select-filled-label"
                                                        id="demo-simple-select-filled"
                                                        defaultValue={'Employee'}
                                                        value={editRole}
                                                        onChange={handleEditRole}
                                                    >
                                                        <MenuItem value={'Employee'}>Employee</MenuItem>
                                                        <MenuItem value={'Manager'}>Manager</MenuItem>
                                                    </Select>
                                                </FormGroup>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseEdit} variant="contained" color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleCloseEdit} variant="contained" color="primary">
                                                Create Account
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Grid>
                            </Grid>
                        </div>
                        <Table responsive name='table' hover bordercolor="#8f8f94" border="#8f8f94">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Date Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Teptep</td>
                                    <td>password1</td>
                                    <td>Manager</td>
                                    <td>05/15/2020</td>
                                    <td>
                                        <IconButton color="primary" onClick={handleClickEdit} ><FontAwesomeIcon className={classes.userFunc} icon={faUserEdit} /></IconButton>
                                        <IconButton color="primary"><FontAwesomeIcon className={classes.userFunc} icon={faUserMinus} /></IconButton>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Jerick Wong</td>
                                    <td>password2</td>
                                    <td>Employee</td>
                                    <td>05/16/2020</td>
                                    <td>
                                        <IconButton color="primary" onClick={handleClickEdit}><FontAwesomeIcon className={classes.userFunc} icon={faUserEdit} /></IconButton>
                                        <IconButton color="primary"><FontAwesomeIcon className={classes.userFunc} icon={faUserMinus} /></IconButton>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Marybelle Tandoc</td>
                                    <td>password3</td>
                                    <td>Manager</td>
                                    <td>05/17/2020</td>
                                    <td>
                                        <IconButton color="primary" onClick={handleClickEdit}><FontAwesomeIcon className={classes.userFunc} icon={faUserEdit} /></IconButton>
                                        <IconButton color="primary"><FontAwesomeIcon className={classes.userFunc} icon={faUserMinus} /></IconButton>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Aaron Uy</td>
                                    <td>password4</td>
                                    <td>Employee</td>
                                    <td>05/18/2020</td>
                                    <td>
                                        <IconButton color="primary" onClick={handleClickEdit}><FontAwesomeIcon className={classes.userFunc} icon={faUserEdit} /></IconButton>
                                        <IconButton color="primary"><FontAwesomeIcon className={classes.userFunc} icon={faUserMinus} /></IconButton>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Randy Uy</td>
                                    <td>bestTaokeEver</td>
                                    <td>Admin</td>
                                    <td>01/05/2020</td>
                                    <td>
                                        <IconButton color="primary" onClick={handleClickEdit}><FontAwesomeIcon className={classes.userFunc} icon={faUserEdit} /></IconButton>
                                        <IconButton color="primary"><FontAwesomeIcon className={classes.userFunc} icon={faUserMinus} /></IconButton>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        {/* <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<Save />}
                        >
                            Save Changes
                        </Button> */}
                    </MuiThemeProvider>
                </main>
            </Container>
        </div >
    );
}

export default Accounts;