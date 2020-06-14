import React from "react";
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MtsRow = (props) => {
    return (
        <tr>
            <td><TextField size="small" onChange={props.updateTotal} className={`${props.class1} quantity`} variant="outlined" />{props.qty}</td>
            <td><TextField size="small" className={`${props.class1} unit`} variant="outlined" />{props.unit}</td>
            <td><TextField size="small" multiline variant="outlined" className='description' />{props.description}</td>
            <td><TextField className={`${props.class2} brand`} size="small" multiline variant="outlined" />{props.brand}</td>
            <td><TextField className={`${props.class2} model`} size="small" multiline variant="outlined" />{props.model}</td>
            <td><TextField onChange={props.updateTotal} className={`${props.class2} price`} size="small" variant="outlined" />{props.price}</td>
                <td>{props.total}</td>
            <td><TextField className={`${props.class3} remarks`} size="small" variant="outlined" />{props.remarks}</td>
            <td><FontAwesomeIcon onClick={props.click} className="delete" icon={faTimes} /></td>
        </tr>
    )
}

export default MtsRow;