import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  // let empty = props.empty.join(', ')
  // empty.substring(0, empty.length -2)

  // React.useEffect(() => {
  //   if (!open) {
  //     setValue(valueProp);
  //   }
  // }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      console.log(radioGroupRef.current)
      radioGroupRef.current.focus();
    }
    console.log(radioGroupRef.current)
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
    props.handle()
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    alert(props.empty)
  }, [props.empty])

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Warning!</DialogTitle>
      <DialogContent dividers>
        <DialogContentText >            

            {props.message}
            
            {props.empty.map((item, index) => {
              if (!index) 
                return (<div>{item}<br/><br/></div>)
              
              return(
                <div>{item}<br /></div>
              )
            })}
            {/* {console.log(empty)} */}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} style={{backgroundColor:'red', color: 'white'}} color="primary">
          Cancel
        </Button>
        <Button onClick={() => {handleOk()}} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,   
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

export default function ConfirmationDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState('Dione');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    props.closing();

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div className={classes.root}>      

        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper,
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
          empty={props.empty} 
          message={props.message}
          handle={props.confirm}
        />
    </div>
    
  );
}
