import React from "react";
import { InputBase } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MtsRow = (props) => {
    return (
        <tr onChange={props.updateTotal}>
            <td><InputBase name='quantity' className={props.class1} size="small"  pattern="[0-9*]" type="number" defaultValue={props.qty}/></td>
            <td><InputBase name='unit' className={props.class1} size="small"  defaultValue={props.unit}/></td>
            <td><InputBase name='description' className='description' size="small"  multiline defaultValue={props.description} /></td>
            <td><InputBase name='brand' className={props.class2} size="small"  multiline defaultValue={props.brand} /></td>
            <td><InputBase name='model' className={props.class2} size="small"  multiline defaultValue={props.model}/></td>
            <td><InputBase name='price' className={props.class2} size="small"  pattern="[0-9*]" type="number" defaultValue={props.price}/></td>
                <td name='total'>{props.total}</td>
            <td><InputBase name='remarks' className={props.class3} size="small"  multiline inputProps={{maxLength:100}} defaultValue={props.remarks}/></td>
            <td><FontAwesomeIcon onClick={props.click} className="delete" icon={faTimes} /></td>
        </tr>
    )
}

export default MtsRow;