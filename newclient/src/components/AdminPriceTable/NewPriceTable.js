import React, { forwardRef, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Add from "@material-ui/icons/Add";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { FormControl, Form, Col, Button, Container } from "react-bootstrap";
import "../../styles/pricetable.css";
import suppliers from '../../api/supplier';

export default function NewPriceTable(props) {
  const [category, setCategory] = useState({items: []});
  const [isEditing, setIsEditing] = useState([])
  const [edit, setEdit] = useState({
    unit: '',
    product_name: '',
    brand_name: '',
    model_name: '',
    list_price: '',
    price_adjustment: '',
    net_price: '',
    remarks: '',
  })

  useEffect(() => {
    setCategory(props.data);
  }, [props.data]);

  function editItem(event, item, index) {
    setEdit({
      unit: item.unit,
      product_name: item.product_name,
      brand_name: item.brand_name,
      model_name: item.model_name,
      list_price: item.list_price,
      price_adjustment: item.price_adjustment,
      net_price: item.net_price,
      remarks: item.remarks,
    })
    let tempEditing = [...isEditing]
    tempEditing[index] = true
    setIsEditing(tempEditing)
  }

  async function updateItem(index) {
    category.items[index] = edit

    try {
      await suppliers.updateSupplierById(category._id, category)
      let tempEditing = [...isEditing]
      tempEditing[index] = false
      setIsEditing(tempEditing)
    } catch (error) {
      alert(error)
    }
  }

  function cancelEdit(index) {
    let tempEditing = [...isEditing]
    tempEditing[index] = false
    setIsEditing(tempEditing)
  }

  async function deleteItem(index) {
    category.items.splice(index, 1)
    try {
      await suppliers.updateSupplierById(category._id, category)
      setCategory({...category})
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Table bordered responsive className="priceTable" size="lg">
      <thead>
        <tr>
          <th width="100">Unit</th>
          <th width="600">Product Name</th>
          <th width="230">Brand</th>
          <th width="230">Model</th>
          <th width="170">List Price</th>
          <th width="200">Price Adjustment</th>
          <th width="170">Net Price</th>
          <th width="220">Remarks</th>
          <th width="400">Action</th>
        </tr>
      </thead>
      <tbody>
        {
          category.items.length ?
          category.items.map((cat, index) => {
            return (
              <tr key={cat._id}>
                <td>{isEditing[index] ? <Form.Control onChange={e => setEdit({...edit, unit: e.target.value})} type="text" size="sm" defaultValue={cat.unit ? cat.unit.slice() : ''}/> : cat.unit}</td>
                <td>{isEditing[index] ? <Form.Control onChange={e => setEdit({...edit, product_name: e.target.value})} type="text" size="sm" defaultValue={cat.product_name ? cat.product_name.slice() : ''}/> : cat.product_name}</td>
                <td>{isEditing[index] ? <Form.Control onChange={e => setEdit({...edit, brand_name: e.target.value})} type="text" size="sm" defaultValue={cat.brand_name ? cat.brand_name.slice() : ''}/> : cat.brand_name}</td>
                <td>{isEditing[index] ? <Form.Control onChange={e => setEdit({...edit, model_name: e.target.value})} type="text" size="sm" defaultValue={cat.model_name ? cat.model_name.slice() : ''}/> : cat.model_name}</td>
                <td>{isEditing[index] ? <Form.Control onChange={e => setEdit({...edit, list_price: e.target.value})} type="text" size="sm" defaultValue={cat.list_price ? cat.list_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice() : ''}/> : cat.list_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{isEditing[index] ? <Form.Control onChange={e => setEdit({...edit, price_adjustment: e.target.value})} type="text" size="sm" defaultValue={cat.price_adjustment ? cat.price_adjustment.slice() : ''}/> : cat.price_adjustment ? cat.price_adjustment : ''}</td>
                <td>{isEditing[index] ? <Form.Control onChange={e => setEdit({...edit, net_price: e.target.value})} type="text" size="sm" defaultValue={cat.net_price ? cat.net_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").slice() : ''}/> : cat.net_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{isEditing[index] ? <Form.Control onChange={e => setEdit({...edit, remarks: e.target.value})} type="text" size="sm" defaultValue={cat.remarks ? cat.remarks.slice() : ''}/> : cat.remarks}</td>
                <td>
                  {
                    category.name === "Pending Items" &&
                    <Button size="sm" variant="light" className="actionButton" onClick={() => {props.setOpenPending(true); props.setPendingItem(cat)}}>
                      <Add />
                    </Button>
                  }
                  {
                    isEditing[index] ? 
                    <Button size="sm" variant="light" className="actionButton" onClick={() => updateItem(index)}>
                      <Check />
                    </Button>
                    :
                    <Button size="sm" variant="light" className="actionButton" onClick={ event => editItem(event, cat, index)}>
                      <Edit />
                    </Button>
                  }
                  {
                    isEditing[index] ?
                    <Button size="sm" variant="light" className="actionButton" onClick={() => cancelEdit(index)}>
                      <Clear />
                    </Button>
                    :
                    <Button size="sm" variant="light" className="actionButton" onClick={() => deleteItem(index)}>
                      <DeleteOutline />
                    </Button>
                  }
                </td>
              </tr>
            )
          })
          :
          "No items to show"
        }
      </tbody>
    </Table>
  );
}
