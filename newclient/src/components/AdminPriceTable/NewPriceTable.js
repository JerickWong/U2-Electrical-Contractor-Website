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
  const [state, setState] = useState({
    columns: [
      { title: "Unit", field: "unit" },
      { title: "Product Name", field: "product_name" },
      { title: "Brand", field: "brand_name" },
      { title: "Model", field: "model_name" },
      { title: "List Price", field: "list_price" },
      { title: "Price Adjustment", field: "price_adjustment" },
      { title: "Net Price", field: "net_price" },
      { title: "Remarks", field: "remarks" },
    ],
    data: props.data,
  });
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchSuppliers = async () => {
    try {
        let temp = await (await suppliers.getAllSupplier()).data.data
        temp.sort((a, b) => a.name.localeCompare(b.name))
        temp = temp.filter( s => {
            if (s.name !== "Pending Items")
                return s
        })
        setCategories(temp)
        setCategory(temp[0])
    } catch (error) {
        console.log(error)
        alert('error in getting suppliers')
    }
}

useEffect(() => {
    fetchSuppliers();
}, [])

  useEffect(() => {
    setState({ ...state, data: props.data });
  }, [props.data]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  return (
    <Table bordered responsive className="priceTable">
      <thead>
        <tr>
          <th width="100">Unit</th>
          <th width="250">Product Name</th>
          <th width="230">Brand</th>
          <th width="230">Model</th>
          <th width="170">List Price</th>
          <th width="170">Price Adjustment</th>
          <th width="170">Net Price</th>
          <th width="220">Remarks</th>
          <th width="160">Action</th>
        </tr>
      </thead>
      <tbody>
        {
          category ?
          category.items.map((cat, index) => {
            return (
              <tr key={cat._id}>
                <td>{cat.unit}</td>
                <td>{cat.product_name}</td>
                <td>{cat.brand_name}</td>
                <td>{cat.model_name}</td>
                <td>{cat.list_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{cat.price_adjustment ? cat.price_adjustment : ''}</td>
                <td>{cat.net_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>{cat.remarks}</td>
                <td>
                  <Button size="sm" variant="light" className="actionButton">
                    <DeleteOutline />
                  </Button>
                  <Button size="sm" variant="light" className="actionButton">
                    <Edit />
                  </Button>
                </td>
              </tr>
            )
          })
          :
          "No items to show"
        }
      </tbody>
      
{/* 
        <td>
          <Form.Control type="text" size="sm" />
        </td>
        <td>
          <Form.Control type="text" size="sm" />
        </td>
        <td>
          <Form.Control type="text" size="sm" />
        </td>
        <td>
          <Form.Control type="text" size="sm" />
        </td>
        <td>
          <Form.Control type="text" size="sm" />
        </td>
        <td>
          <Form.Control type="text" size="sm" />
        </td>
        <td>
          <Form>
            <Form.Control type="text" size="sm" />
          </td>
          <td>
            <Form.Control type="text" size="sm" />
          </Form>
        </td>
        <td>
          <Button size="sm" variant="light" className="actionButton">
            <DeleteOutline />
          </Button>
          <Button size="sm" variant="light" className="actionButton">
            <Edit />
          </Button>
        </td> */}
      
    </Table>
  );
}
