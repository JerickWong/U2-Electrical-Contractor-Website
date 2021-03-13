import React, {forwardRef, useState, useEffect} from 'react';
import MaterialTable, { MTable, MTableToolbar } from 'material-table';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Height } from '@material-ui/icons';
import supplier from '../../api/supplier'

 export default function PriceTable (props) {
    
    const [state, setState] = useState({
        columns: [
            { title: 'Unit', field: 'unit' },
            { title: 'Product Name', field: 'product_name' },
            { title: 'Brand', field: 'brand_name' },
            { title: 'Model', field: 'model_name' },
            { title: 'List Price', field: 'list_price' },
            { title: 'Price Adjustment', field: 'price_adjustment' },
            { title: 'Net Price', field: 'net_price' },
            { title: 'Remarks', field: 'remarks' }
        ],
        data: props.data,
    });

    useEffect(() => {
        setState({...state, data: props.data})
    }, [props.data])

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddShoppingCart {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

    return (
        <MaterialTable
            icons={tableIcons}
            columns={state.columns}
            data={state.data}
            options={{
                showTitle:false,
                sorting:false,
                draggable: false,
                actionsColumnIndex: -1
            }}
            components={{
                Toolbar: props =>(
                    <div style={{ height:"30px" }}>
                        <MTableToolbar {...props} />
                    </div>
                ),
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        try {                            
                            setTimeout( async () => {

                                const data = [...state.data];
                                data.push(newData);
                                setState({...state, data})
                                
                                await supplier.updateSupplierById(props.category._id, {...props.category, items: data})
                                resolve();
                            }, 600);
                        } catch (error) {
                            alert('error in adding')
                        }
                    }),
                onRowUpdate: async (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(async () => {
                            try {
                                if (oldData) {
                                    const data = [...state.data];
                                    data[data.indexOf(oldData)] = newData;
                                    setState({...state, data})
                                    await supplier.updateSupplierById(props.category._id, {...props.category, items: data})
                                }
                                resolve();
                            } catch (error) {
                                alert('error in updating')
                            }
                        }, 600);
                    }),
                onRowDelete: async (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(async () => {
                            try {
                                const data = [...state.data];
                                data.splice(data.indexOf(oldData), 1);
                                setState({...state, data})
                                await supplier.updateSupplierById(props.category._id, {...props.category, items: data})
                                resolve();
                            } catch (error) {
                                alert('error in deleting')
                            }
                        }, 600);
                    }),
            }}
        />
    );
}