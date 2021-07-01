import React from 'react'
import { 
    Dialog, 
    makeStyles, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    FormGroup, 
    Input, 
    InputLabel, 
    Button, 
    InputAdornment
} from "@material-ui/core";
import { LocalOffer, AccountCircle } from '@material-ui/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
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
  }));

export default function SingleFieldDialog(props) {
    const classes = useStyles();
    return (
        <Dialog
            fullWidth="true"
            maxWidth="sm"
            open={props.open}
            onClose={() => props.close(false)}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
            <h3>{props.title}</h3>
            </DialogTitle>
            <DialogContent dividers>
            <div className="modalAcc">
                <FormGroup>
                <InputLabel className={classes.modalFields}>
                    {props.label}
                </InputLabel>
                <Input
                    className={classes.modalFields}
                    variant="outlined"
                    startAdornment={
                    <InputAdornment position="start">
                        {props.isName ? <AccountCircle color="primary" /> :
                            <LocalOffer color="primary" />
                        }
                    </InputAdornment>
                    }
                    endAdornment={
                    <InputAdornment position="end">
                        {props.endAdornment}
                    </InputAdornment>
                    }
                    defaultValue={props.defaultValue}
                    type={props.type}
                    onChange={(e) => props.setValue(e.target.value)}
                />
                {
                    props.items &&
                    <InputLabel className={classes.modalFields}>
                        {props.items.length ? "Upload Complete!" : "No Uploaded File"}
                    </InputLabel>
                }
                </FormGroup>
            </div>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={() => props.close(false)}
                variant="contained"
            >
                Cancel
            </Button>
            {
                props.getInputProps &&
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  {...props.getRootProps({ className: "dropzone" })}
                >
                  <input {...props.getInputProps()} />
                  <FontAwesomeIcon className="excel" icon={faFileExcel} />
                  Upload Excel
                </Button>
            }
            <Button
                className={classes.create}
                variant="contained"
                color="primary"
                onClick={() => {
                props.value ? props.handleAction() : alert("Do not leave empty");
                }}
            >
                {props.actionName}
            </Button>
            </DialogActions>
        </Dialog>
    )
}