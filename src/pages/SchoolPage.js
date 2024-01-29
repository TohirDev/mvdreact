// /* eslint-disable */

import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';
// components
import AddingSchool from '../sections/@dashboard/maktab/addingSchool';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { token } from '../sections/@dashboard/user/addingUsers';

const SchoolPage = () => {
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState([]);

  const getMaktab = () => {
    fetch('http://localhost:5000/api/maktablar/get-all-maktab', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status${response?.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        throw new Error('Response in not JSON');
      })
      // eslint-disable-next-line react-hooks/rules-of-hooks
      .then((data) => setUser(data.data))
      .catch((error) => console.log(error));
  };

  const deleteMaktab = (id) => {
    fetch(`http://localhost:5000/api/maktablar/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    }).then(() => {
      getMaktab();
    });
  };

  useEffect(() => {
    getMaktab();
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Maktab
        </Typography>
        <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          Qo'shish
        </Button>
      </Stack>
      <AddingSchool onOpen={open} onCloses={() => setOpen(false)} onRequest={() => getMaktab()} />
      <Card>
        <Scrollbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>I.F.O</TableCell>
                  <TableCell>Maktab</TableCell>
                  <TableCell>Sinflar</TableCell>
                  <TableCell>O'quvchilar</TableCell>
                  <TableCell>Jinsi</TableCell>
                  <TableCell>Tahrirlash/O'chirish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user.map((row) => (
                  <TableRow key={row?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row?.user?.name}
                    </TableCell>
                    <TableCell>{row.nomi}</TableCell>
                    <TableCell>{row.sinf}</TableCell>
                    <TableCell>{row.oquvchi}</TableCell>
                    <TableCell>{row.jinsi}</TableCell>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button variant="contained" color="inherit" sx={{ mr: 2 }} onClick={() => console.log(row.id)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => deleteMaktab(row._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
};

export default SchoolPage;
