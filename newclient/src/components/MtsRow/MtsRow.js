import React from "react";
import { TextField } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MtsRow = (props) => {
    return (
        <tr onChange={props.updateTotal}>
            <td><TextField name='quantity' className={props.class1} size="small" variant="outlined" pattern="[0-9*]" type="number" />{props.qty}</td>
            <td><TextField name='unit' className={props.class1} size="small" variant="outlined" />{props.unit}</td>
            <td><TextField name='description' className='description' size="small" variant="outlined" multiline />{props.description}</td>
            <td><TextField name='brand' className={props.class2} size="small" variant="outlined" multiline />{props.brand}</td>
            <td><TextField name='model' className={props.class2} size="small" variant="outlined" multiline />{props.model}</td>
            <td><TextField name='price' className={props.class2} size="small" variant="outlined" pattern="[0-9*]" type="number" />{props.price}</td>
                <td name='total'>{props.total}</td>
            <td><TextField name='remarks' className={props.class3} size="small" variant="outlined" multiline inputProps={{maxLength:100}} />{props.remarks}</td>
            <td><FontAwesomeIcon onClick={props.click} className="delete" icon={faTimes} /></td>
        </tr>
    )
}

export default MtsRow;