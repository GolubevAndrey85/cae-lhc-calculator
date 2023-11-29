import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(date, cae, lhc) {
    return { date, cae, lhc };
}

const getData = (data) => {
    data.forEach(d => {
        rows.push(createData(d.date, d.cae, d.lhc));
    });
}

const rows = [];

const BasicTable = (props) => {
    const rows = [];
    props.data.forEach(d => {
        console.log(`Data in table ${d.date} ${d.cae} ${d.lhc}`);
        rows.push(createData(d.date, d.cae, d.lhc));
    });
    return (
        <TableContainer component={Paper} className='table-container'>
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">CAE&nbsp;(years)</TableCell>
                        <TableCell align="right">LHA&nbsp;(%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.date}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.date}</TableCell>
                            <TableCell align="right">{row.cae}</TableCell>
                            <TableCell align="right">{row.lhc}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;