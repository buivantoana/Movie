import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { deleteCustumer, getCustumer } from '../../../service/custumer'
import { useQuery } from 'react-query'

export function User() {
  const { data } = useQuery('getcustumer', {
    queryFn: () => getCustumer(),
    refetchOnWindowFocus: false,
  })
  let handleDeleteCustumer = async (id: String) => {
    let res = await deleteCustumer(id)
    if (res.status === 0) {
      alert('Ban da xoa thanh cong')
    }
    if (res.status === 1) {
      alert('ban ko co quyen')
    }
  }
  return (
    <Container
      style={{
        color: 'white',
        padding: ' 30px ',
        background: ' #1a1f37',
        borderRadius: '10px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>List Custumer</h2>
      <TableContainer component={Paper} style={{ background: 'transparent' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: 'white' }} align='center'>
                ID
              </TableCell>
              <TableCell style={{ color: 'white' }} align='center'>
                email
              </TableCell>
              <TableCell style={{ color: 'white' }} align='center'>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.length &&
              data?.data.map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    style={{ color: 'white' }}
                    align='center'
                    component='th'
                    scope='row'
                  >
                    {row._id}
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>
                    {row.email}
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>
                    <Button
                      onClick={() => handleDeleteCustumer(row._id)}
                      style={{ marginRight: '10px', background: 'red' }}
                      variant={'contained'}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
