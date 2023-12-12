import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Moment from 'moment';

const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'cae', headerName: 'CAE', width: 70 },
    { field: 'age', headerName: 'Age', width: 70 },
    { field: 'lhc', headerName: 'LHC', width: 70 },
    { field: 'doa', headerName: 'DOA', width: 70 },
  ];

const BasicTable2 = (props) => {
  // props.data.forEach(h => console.log(`in table === id: ${h.id}, cae: ${h.cae}, lhc: ${h.lhc}, date: ${Moment(h.date).format('DD MMM YYYY')}\n`));
    return (
        <div style={{ height: 'auto', width: '100%', marginTop: '20px'}}>
          <DataGrid
            rows={props.data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 20 },
              },
            }}
            pageSizeOptions={[20, 40]}
          />
        </div>
      );
}

export default BasicTable2;