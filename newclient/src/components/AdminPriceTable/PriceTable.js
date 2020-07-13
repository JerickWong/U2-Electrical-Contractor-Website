import React, {forwardRef} from 'react';
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

export default function PriceTable() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Unit', field: 'unit' },
            { title: 'Description', field: 'description' },
            { title: 'Brand', field: 'brand' },
            { title: 'Model', field: 'model' },
            { title: 'List Price', field: 'listPrice' },
            { title: 'Price Adjustment', field: 'priceAdj' },
            { title: 'Net Price', field: 'netPrice' },
            { title: 'Remarks', field: 'remarks' }
        ],
        data: [
            {
                unit: '5', description: 'something', brand: 'some brand',
                model: 'some model', listPrice: 'xxx.xx', priceAdj: 'xx%', netPrice: 'xx.xx', remarks: 'hekhek'
            },
            {
                unit: '5', description: 'something', brand: 'some brand',
                model: 'some model', listPrice: 'xxx.xx', priceAdj: 'xx%', netPrice: 'xx.xx', remarks: 'hekhek'
            },
            {
                unit: '5', description: 'something', brand: 'some brand',
                model: 'some model', listPrice: 'xxx.xx', priceAdj: 'xx%', netPrice: 'xx.xx', remarks: 'hekhek'
            },
            {
                unit: '5', description: 'something', brand: 'some brand',
                model: 'some model', listPrice: 'xxx.xx', priceAdj: 'xx%', netPrice: 'xx.xx', remarks: 'hekhek'
            },
            {
                unit: '5', description: 'something', brand: 'some brand',
                model: 'some model', listPrice: 'xxx.xx', priceAdj: 'xx%', netPrice: 'xx.xx', remarks: 'hekhek'
            }
        ],
    });
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
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}