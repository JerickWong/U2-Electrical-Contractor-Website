import React from "react";
import { Button, TextField, Grid, InputAdornment, makeStyles, createMuiTheme, Paper, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MtsRow = (props) => {
    return (
        <tr>
            <td><TextField size="small" onChange={props.updateTotal} className={`${props.class1} quantity`} variant="outlined" /></td>
            <td><TextField size="small" className={`${props.class1} unit`} variant="outlined" /></td>
            <td><TextField size="small" multiline variant="outlined" className='description' /></td>
            <td><TextField className={`${props.class2} brand`} size="small" multiline variant="outlined" /></td>
            <td><TextField className={`${props.class2} model`} size="small" multiline variant="outlined" /></td>
            <td><TextField onChange={props.updateTotal} className={`${props.class2} price`} size="small" variant="outlined" /></td>
                <td>{props.total}</td>
            <td><TextField className={`${props.class3} remarks`} size="small" variant="outlined" /></td>
            <td><FontAwesomeIcon className="delete" icon={faTimes} /></td>
        </tr>
    )
}

export default MtsRow;