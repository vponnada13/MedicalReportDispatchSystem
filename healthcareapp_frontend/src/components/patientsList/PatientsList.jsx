import React, { useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import EditPatient from '../EditPatient/EditPatient';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function PatientsList() {
    const [tableData, setTableData] = useState({});
    const [status, setStatus] = useState({});
    const [loading, setLoading] = useState(true);
    let [load, setLoad] = useState(true);
    const handleDelete = (id) => {
        console.log(id, 'id')
        let data = {
            _id: id
        }
        axios.post('http://localhost:8000/patient/delete', data).then(
            data => {
                console.log(data)
                onLoadApi();

            }
        )
    }
    const handleEdit = (id) => {
        console.log(id, 'id')
    }
    const handleLoad = (a) => {
      console.log(a, 'a')
      setLoad(a)
      onLoadApi();
    }

    const onLoadApi = () => {
      let config = {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      }
      axios.get('http://localhost:8000/patient/viewAllPatients', config).then(
          patientData => {
              console.log(patientData.data, 'patientsData')
              setTableData(patientData.data)
              setLoading(false)
          }
      )
    }
    useEffect(() => {
        console.log('in useEffect')
       onLoadApi(); 
    }, []);

  return (
      <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Name</b></TableCell>
            <TableCell align="right"><b>Age</b></TableCell>
            <TableCell align="right"><b>Priority</b></TableCell>
            <TableCell align="right"><b>Send To Lab</b></TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          { (!loading) ? (
              tableData.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  {/* <TableCell align="right">{row.name}</TableCell> */}
                  <TableCell align="right">{row.age}</TableCell>
                  <TableCell align="right">{row.priority}</TableCell>
                  <TableCell align="right">{row.sendtolab}</TableCell>
                  <TableCell align="right"><EditPatient patientId={row._id} handleLoad={handleLoad} /></TableCell>
                  <TableCell align="right"><button onClick={() => handleDelete(row._id)} style={{ backgroundColor: 'red', border: 'none', cursor: 'pointer', color: 'white', padding: '10px', borderRadius: '5px'}}>Delete</button></TableCell>
                </TableRow>
              ))
          ) : ''
          }
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}
