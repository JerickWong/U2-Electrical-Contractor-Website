import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import {
    Button, TextField, InputAdornment, Input, Grid, makeStyles, createMuiTheme, IconButton,
    Select, MenuItem, InputLabel, FormControl, FormHelperText, FormGroup
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
import users from '../api/users';
import { Redirect } from 'react-router-dom';
import ConfirmationDialog from '../components/ConfirmationDialog/ConfirmationDialog'
import SuccessDialog from '../components/SuccessDialog/SuccessDialog'

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
    const [openConfirm, setOpenConfirm] = useState(false)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [action, setAction] = useState('')
    const [role, setRole] = useState('All');
    const [newRole, setNewRole] = useState('Employee');
    const [username, setNewUsername] = useState('')
    const [password, setNewPassword] = useState('')
    const [deleteAccount, setDelete] = useState(null)
    const [editAccount, setAccount] = useState(null);
    const [editUsername, setUsername] = useState('');
    const [editPassword, setPassword] = useState('');
    const [editRole, setEditRole] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [backupAccounts, setBackup] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [complete, setComplete] = useState(false)
    const [redirect, setRedirect] = useState('Admin')

    const fetchUsers = async () => {
        try {
            let dataArray = (await users.getAllUsers()).data.data
            const user = (await users.getUser({ token: localStorage.getItem('token') })).data.data
            // console.log(user)
            // alert(user.type === "Manager")

            if (user.type === "Manager")
                setRedirect('Manager')
            else if (user.type === "Employee")
                setRedirect('Employee')
            
            setAccounts(dataArray)
            setBackup(dataArray)
        } catch (error) {
            console.log(error)
            alert('error getting users')
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        handleFilterRole()
    }, [role])

    useEffect(() => {
        if (username === '' || password === '')
            setComplete(false)
        else
            setComplete(true)
    }, [username, password])

    const checkAdmin = () => {
        if (redirect === "Manager")
            return <Redirect to='/AdminMts' />
        else if (redirect === "Employee")
            return <Redirect to='/Mts' />
    }

    const handleChange = (event) => {
        setRole(event.target.value)        
    }
    const handleNewRole = (event) => {
        setNewRole(event.target.value);
    };
    const handleEditRole = (event) => {
        setEditRole(event.target.value)
    }
    const handleFilterRole = () => {
        if (role === "All") {
            setAccounts(backupAccounts)
        } else {
            const accs = [...backupAccounts]
            const filtered = accs.filter(acc => {
                if (acc.type === role)
                    return acc
            })
            setAccounts(filtered)
        }
    }
    const handleSearch = (event) => {
        
        let query = event.target.value
        if (query !== '') {
            query = query.toLowerCase()
            const accs = [...backupAccounts]
            const filtered = accs.filter(acc => {
                const lowerUser = acc.username.toLowerCase()
                if (acc.type === role || role === "All") 
                    if ((lowerUser).includes(query))
                        return acc
                
            })
            setAccounts(filtered)
        } else {
            handleFilterRole()
        }

    }
    const createAccount = async () => {
        setOpenAdd(false)
        setOpen(true)
        setLoading(true)
        setAction('Create')
        // const email = document.querySelector('#new-email').value
        // const username = document.querySelector('#new-username').value
        // const password = document.querySelector('#new-password').value


        // console.log(email,username,password, newRole)        
        // db.collection('Accounts').add({
        //     email,
        //     password,
        //     username,
        //     role: newRole,
        //     date_created: moment().format('MMMM DD, YYYY HH:mm:ss')
        // })
        // .then(() => {
        //     console.log('Account has been added')
        //     Authenticate.signup(email, username, password, newRole)
        // })
        // .catch((err) => {
        //     console.log (err)
        // })
        try {
            await users.register({ username, password, type: newRole })
            setTimeout(() => {
                setLoading(false)
                setSuccess(true)
              }, 1000)
        } catch (error) {
            // if (error.message.includes('404')) {

            // }
            setTimeout(() => {
                setLoading(false)
                setSuccess(false)
              }, 1000)
        }
        await fetchUsers();
    }

    const handleEditAccount = async () => {
        
        const { _id, type } = editAccount
        if (type === "Admin" && type !== editRole) {
            alert('Cannot change admin role')
        } else {
            handleCloseEdit();
            setOpen(true)
            setLoading(true)
            setAction('Edit')

            try {
                const payload = {
                    username: editUsername,
                    password: editPassword,
                    type: editRole
                }
                const message = await (await users.updateUser(_id , payload)).data.message
                setTimeout(() => {
                    setLoading(false)
                    setSuccess(true)
                  }, 1000)
            } catch (error) {
                setTimeout(() => {
                    setLoading(false)
                    setSuccess(false)
                  }, 1000)
                // alert('Username exists already')
            }
            
            await fetchUsers();
        }
    }

    const handleDelete = async () => {

        if (deleteAccount.type === "Admin")
            alert('Cannot delete Admin account')
        else {
            setOpen(true)
            setLoading(true)
            setAction('Delete')
            try {
                await (await users.deleteUser( deleteAccount._id )).data.success
                setTimeout(() => {
                    setLoading(false)
                    setSuccess(true)
                  }, 1000)
            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    setLoading(false)
                    setSuccess(false)
                  }, 1000)
            }
        }

        fetchUsers();
    }

    const prepareEdit = (account) => {
        setUsername(account.username)
        setEditRole(account.type)
        setEdit(true)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

        setTimeout(() => {
            setSuccess(false)
        }, 100)
    };
    // const handleClickEdit = (event) => {
    //     setEdit(true);
    //     // get username, password, and role to display to the click modal
    // }
    const handleCloseEdit = () => {
        setEdit(false);
        setUsername('')
        setEditRole('')
        setPassword('')
    }
    return (
        <div className="Accounts">
            { checkAdmin() }
            <Container className="cont">
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <Grid container spacing={2}>
                                <Grid item xs={3}>
                                    <FormControl>
                                        <InputLabel className={classes.label} id="demo-simple-select-label">Role</InputLabel>
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
                                        onChange={handleSearch}
                                    />
                                </Grid>
                                <Grid item xs={2} />
                                <Grid item xs={3}>
                                    <Button color="primary" className={classes.button1} onClick={() => setOpenAdd(true)} variant="contained">
                                        Create Account
                                    </Button>

                                    {/* CREATE ACCOUNT */}
                                    <Dialog fullWidth="true" maxWidth="sm" open={openAdd} onClose={() => setOpenAdd(false)} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">
                                            <h3>New Account</h3>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <div className="modalAcc">
                                                {/* <FormGroup>
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
                                                </FormGroup> */}
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
                                                        value={username}
                                                        onChange={(e) => setNewUsername(e.target.value)}
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
                                                        value={password}
                                                        onChange={(e) => setNewPassword(e.target.value)}
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
                                            <Button onClick={() => setOpenAdd(false)} variant="contained">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => { complete ? createAccount() : alert('Please fill out all fields!')}} className={classes.create} variant="contained" color="primary">
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
                                                        value={editUsername}
                                                        onChange={(e) => {setUsername(e.target.value)}}
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
                                                        value={editPassword}
                                                        onChange={(e) => {setPassword(e.target.value)}}
                                                    />
                                                    <FormHelperText className={classes.modalFields}>Leave blank to have password unchanged</FormHelperText>
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
                                            <Button onClick={handleCloseEdit} variant="contained">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleEditAccount} variant="contained" color="primary">
                                                Edit Account
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
                                    <th>Role</th>
                                    <th>Date Created</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    accounts.map((account, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{account.username}</td>
                                                <td>{account.type}</td>
                                                <td>{moment(account.date_created).format('MM-DD-YYYY')}</td>
                                                <td>
                                                    <IconButton color="primary" onClick={() => {prepareEdit(account); setAccount(account)}} ><FontAwesomeIcon className={classes.userFunc} icon={faUserEdit} /></IconButton>
                                                    <IconButton color="primary" onClick={() => {setDelete(account); setOpenConfirm(true)}} ><FontAwesomeIcon className={classes.userFunc} icon={faUserMinus} /></IconButton>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
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

            <SuccessDialog
                open={open}
                handleClose={handleClose}
                success={success}
                isLoading={loading}
                action={action}
            />

<ConfirmationDialog open={openConfirm} message={`Are you sure you want to delete ${deleteAccount ? deleteAccount.username : ''}'s account?`} 
                confirm={handleDelete} handleClose={() => setOpenConfirm(false)}/>
        </div >
    );
}

export default Accounts;