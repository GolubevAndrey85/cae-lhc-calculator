import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: '#', width: 50 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'cae', headerName: 'CAE', width: 70 },
    { field: 'lhc', headerName: 'LHC', width: 70 }
  ];

const BasicTable2 = (props) => {
    return (
        <div style={{ height: 'auto', width: '100%' }}>
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