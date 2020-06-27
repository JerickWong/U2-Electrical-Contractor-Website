import React, { useState } from 'react';
import { Container, Table, } from 'react-bootstrap';
import {
    Button, TextField, Grid, makeStyles, createMuiTheme, Select, MenuItem,
    InputLabel, FormControl, FormGroup, Input, InputGroup, ButtonGroup, InputAdornment, InputBase, IconButton
} from '@material-ui/core';
import { Edit, Clear, Search, GroupAdd, QueryBuilder, AddShoppingCart } from '@material-ui/icons';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GetAppIcon from '@material-ui/icons/GetApp';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Badge from '@material-ui/core/Badge';
import '../styles/mts.css';

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
        margin: theme.spacing(0),
        color: white,
        width: 200,
    },
    pending: {
        marginLeft: 80
    },
    save: {
        width: 200,
        backgroundColor: primary,
        color: white,
        marginLeft: 57
    },
    root: {
        flexGrow: 1,
    },
    txt: {
        width: 300,
        marginTop: 15
    },
    badge: {
        marginTop: 15
    },
    txt1: {
        width: 300
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
    delete: {
        color: '#F04A42'
    },
    short: {
        width: 70
    },
    medium: {
        width: 100
    },
    AddBtn1: {
        marginRight: 7
    },
    priceIcons: {
        color: primary,
        fontSize: 'small',
    },
    modalFields: {
        align: 'center',
        width: 400,
        marginBottom: 30,
        alignItems: 'center',
        display: 'flex'
    },
    button3:{
        marginLeft: 10,
    }
}));

function AdminPrice() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="PriceList">
            <Container className="cont">
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <MuiThemeProvider theme={theme}>
                        <div className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <TextField
                                        className={classes.txt}
                                        size="normal"
                                        placeholder="Search"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Search />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Suppliers</InputLabel>
                                        <Select labelId="demo-simple-select-label" className={classes.txt1} value={category} onChange={handleChange} size="normal" id="demo-simple-select">
                                            <MenuItem value={1}>Category1</MenuItem>
                                            <MenuItem value={2}>Category2</MenuItem>
                                            <MenuItem value={3}>Category3</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} />
                                <Grid item xs={3}>
                                    <Badge color="secondary" className={classes.badge} badgeContent={1}>
                                        <Button variant="contained" color="primary" size="medium" startIcon={<QueryBuilder />} className={classes.pending}>Pending Items</Button>
                                    </Badge>
                                </Grid>
                                <Grid item xs={4}>
                                    <Button variant="contained" color="primary" className={classes.AddBtn1} startIcon={<AddShoppingCart />}>Add Item</Button>
                                    <Button variant="contained" color="primary" className={classes.AddBtn2} startIcon={<GroupAdd />}>Add Supplier</Button>
                                </Grid>
                            </Grid>
                        </div>
                        <Table responsive name='table' hover bordercolor="#8f8f94" border="#8f8f94" >
                            <thead>
                                <tr>
                                    <th>Unit</th>
                                    <th>Description</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>List Price</th>
                                    <th>Price Adjustment</th>
                                    <th>List Price</th>
                                    <th>Remarks</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tr>
                                <td><InputBase type="number" className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} onClick={handleClickOpen} icon={faEdit} /></IconButton>
                                    <Dialog fullWidth="true" maxWidth="sm" className={classes.modalPrice} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">
                                            <h3>Edit Record</h3>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <div className="modalPrice">
                                                <FormGroup>
                                                    <InputLabel>Unit</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        type="number"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Description</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Brand</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Model</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>List Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Price Adjustment</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Net Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Remarks</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} variant="contained" color="primary">
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary">
                                                Save Changes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} icon={faTrashAlt} /></IconButton>
                                </td>
                            </tr>
                            <tr>
                                <td><InputBase type="number" className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} onClick={handleClickOpen} icon={faEdit} /></IconButton>
                                    <Dialog fullWidth="true" maxWidth="sm" className={classes.modalPrice} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">
                                            <h3>Edit Record</h3>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <div className="modalPrice">
                                                <FormGroup>
                                                    <InputLabel>Unit</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        type="number"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Description</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Brand</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Model</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>List Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Price Adjustment</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Net Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Remarks</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} variant="contained" color="primary">
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary">
                                                Save Changes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} icon={faTrashAlt} /></IconButton>
                                </td>
                            </tr><tr>
                                <td><InputBase type="number" className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} onClick={handleClickOpen} icon={faEdit} /></IconButton>
                                    <Dialog fullWidth="true" maxWidth="sm" className={classes.modalPrice} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">
                                            <h3>Edit Record</h3>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <div className="modalPrice">
                                                <FormGroup>
                                                    <InputLabel>Unit</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        type="number"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Description</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Brand</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Model</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>List Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Price Adjustment</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Net Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Remarks</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} variant="contained" color="primary">
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary">
                                                Save Changes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} icon={faTrashAlt} /></IconButton>
                                </td>
                            </tr><tr>
                                <td><InputBase type="number" className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} onClick={handleClickOpen} icon={faEdit} /></IconButton>
                                    <Dialog fullWidth="true" maxWidth="sm" className={classes.modalPrice} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">
                                            <h3>Edit Record</h3>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <div className="modalPrice">
                                                <FormGroup>
                                                    <InputLabel>Unit</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        type="number"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Description</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Brand</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Model</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>List Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Price Adjustment</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Net Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Remarks</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} variant="contained" color="primary">
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary">
                                                Save Changes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} icon={faTrashAlt} /></IconButton>
                                </td>
                            </tr><tr>
                                <td><InputBase type="number" className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.medium} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline className={classes.short} variant="outlined" size="small" /></td>
                                <td><InputBase multiline variant="outlined" size="small" /></td>
                                <td>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} onClick={handleClickOpen} icon={faEdit} /></IconButton>
                                    <Dialog fullWidth="true" maxWidth="sm" className={classes.modalPrice} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">
                                            <h3>Edit Record</h3>
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <div className="modalPrice">
                                                <FormGroup>
                                                    <InputLabel>Unit</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        type="number"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Description</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Brand</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Model</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>List Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Price Adjustment</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Net Price</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <InputLabel>Remarks</InputLabel>
                                                    <Input
                                                        id="input-with-icon-adornment"
                                                        className={classes.modalFields}
                                                        variant="outlined"
                                                    />
                                                </FormGroup>
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} variant="contained" color="primary">
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary">
                                                Save Changes
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <IconButton><FontAwesomeIcon color="primary" className={classes.priceIcons} icon={faTrashAlt} /></IconButton>
                                </td>
                            </tr>
                        </Table>
                        <div className="tbl">
                            <Grid container spacing={1}>
                                <Grid item xs={5}>
                                    <Button variant="contained" color="primary" className={classes.button}><FontAwesomeIcon className="excel" icon={faFileExcel} />Upload Excel</Button>
                                    <Button variant="contained" color="primary" className={classes.button3} startIcon={<GetAppIcon />}>Download</Button>
                                </Grid>
                                <Grid item xs={3} />
                            </Grid>
                        </div>
                    </MuiThemeProvider>
                </main>
            </Container>
        </div>
    );
}

export default AdminPrice;