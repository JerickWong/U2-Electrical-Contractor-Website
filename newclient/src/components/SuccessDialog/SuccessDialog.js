import React, { Component } from "react";
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
// import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
// import { white } from "material-ui/styles/colors";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 20,
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: '#4caf50',
      '&:hover': {
        backgroundColor: '#388e3c',
        color: '#FFFFFF',
      },
      color: '#FFFFFF',
      borderColor: '#FFFFFF'
    },
    fabProgress: {
      color: '#4caf50',
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
    buttonProgress: {
      color: '#4caf50',
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  });

class SuccessDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { classes } = this.props;
        const buttonClassname = clsx({
        [classes.buttonSuccess]: this.props.success,
        });
        return (
            <Dialog 
                open={this.props.open} 
                maxWidth={'sm'}
                onClose={this.props.handleClose}
              >
                <DialogTitle id="alert-dialog-title" >{this.props.isLoading ? 'Loading' : this.props.success ? `Success!` : `Error`}</DialogTitle>
                  <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description" >
                    <div className={classes.root}>
                      <div className={classes.wrapper}>
                        <Fab
                          aria-label="save"
                          color="primary"
                          className={buttonClassname}
                          onClick={this.props.handleClose}
                        >
                          {this.props.success ? <CheckIcon /> : <SaveIcon />}
                        </Fab>
                        {this.props.isLoading && <CircularProgress size={68} className={classes.fabProgress} />}
                      </div>
                      {this.props.isLoading ? '' : this.props.success ? `${this.props.action} was successful.` : this.props.message}
                    </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    {/* <Button onClick={this.handleClose} className={classes.} autoFocus>
                      Okay
                    </Button> */}
                    <div className={classes.root}>
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={buttonClassname}
                          disabled={this.props.isLoading}
                          onClick={this.props.handleClose}
                          >
                          Close
                        </Button>
                        {this.props.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </div>
                  </DialogActions>
              </Dialog>
        )
    }
}

SuccessDialog.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(SuccessDialog);