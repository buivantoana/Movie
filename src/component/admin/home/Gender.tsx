/* eslint-disable */
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import bg from '../../../image/body-background.png'
import {
  addGender,
  deleteGender,
  getGender,
  putGender,
} from '../../../service/genderservice'

const CustomTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'blue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'blue',
    },
  },
  '& label': {
    color: 'white', // Màu của label mặc định
  },
  '& input': {
    color: 'white',
  },
})

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,

  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
type formTypeGender = {
  id: Number
  name: String
}

let inittileGender: formTypeGender = {
  id: 0,
  name: '',
}

export function Gender() {
  let [gender, setGender] = useState<formTypeGender>(inittileGender)
  let [modal, setModal] = useState<boolean>(false)
  let [modalUpdate, setModalUpdate] = useState<boolean>(false)

  let handleChange =
    (name: keyof formTypeGender) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setGender((prev) => ({ ...prev, [name]: event.target.value }))
    }
  let handleClick = async () => {
    let res = await addGender(gender)
    if (res.status === 0) {
      alert('Ban da them thanh cong')
      setGender(inittileGender)
    }
  }
  let handleClickModal = () => {
    setModal(!modal)
  }

  const { data, isLoading, isError } = useQuery('admingender', {
    queryFn: () => getGender(),
  })

  let handleDeleteGender = async (id: Number) => {
    let res = await deleteGender(id)
    console.log(res)
    if (res.status == 0) {
      alert('Ban da xoa thanh cong')
    }
  }

  let handleUpdateGender = (id: Number) => {
    let datafilter = data?.data.filter((item: any) => {
      return item.id === id
    })
    setGender((prev) => ({ id: datafilter[0].id, name: datafilter[0].name }))
    setModalUpdate(!modalUpdate)
  }
  let handleClose = () => {
    setModalUpdate(!modalUpdate)
  }

  let updateGender = async () => {
    let res = await putGender(gender.id, gender)
    if (res.status === 0) {
      alert('ban da update thnah cong')
      setModalUpdate(!modalUpdate)
    }
  }

  return (
    <div>
      {!modal ? (
        <Container
          style={{
            color: 'white',
            padding: ' 30px ',
            background: ' #1a1f37',
            borderRadius: '10px',
          }}
        >
          <h2 style={{ textAlign: 'left', marginBottom: '32px' }}>
            Add Gender Movie
          </h2>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <CustomTextField
                label='Id'
                value={gender.id}
                onChange={handleChange('id')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label='Title'
                value={gender.name}
                onChange={handleChange('name')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>
          </Grid>

          <Button
            onClick={handleClick}
            style={{ marginTop: '30px' }}
            variant={'contained'}
          >
            Add Gender
          </Button>
          <Button
            onClick={handleClickModal}
            variant={'contained'}
            style={{
              marginTop: '30px',
              marginLeft: '20px',
              background: 'green',
            }}
          >
            LIst Gender
          </Button>
        </Container>
      ) : (
        <Container
          style={{
            color: 'white',
            padding: ' 30px ',
            background: ' #1a1f37',
            borderRadius: '10px',
          }}
        >
          <Button
            onClick={handleClickModal}
            style={{ marginTop: '30px' }}
            variant={'contained'}
          >
            Add Gender
          </Button>

          <h2 style={{ textAlign: 'center' }}>List Gender</h2>
          <TableContainer
            component={Paper}
            style={{ background: 'transparent' }}
          >
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white' }} align='center'>
                    ID
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>
                    Name
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data?.data.length &&
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
                        {row.id}
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align='center'>
                        {row.name}
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align='center'>
                        <Button
                          onClick={() => handleDeleteGender(row.id)}
                          style={{ marginRight: '10px', background: 'red' }}
                          variant={'contained'}
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => handleUpdateGender(row.id)}
                          style={{ marginRight: '10px', background: 'green' }}
                          variant={'contained'}
                        >
                          Update
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal
            open={modalUpdate}
            onClose={handleClose}
            aria-labelledby='parent-modal-title'
            aria-describedby='parent-modal-description'
          >
            <Box
              sx={{
                ...style,
                width: 400,
                backgroundImage: `url(${bg})`,
                backgroundSize: '689% 100%',
              }}
            >
              <h2
                id='parent-modal-title'
                style={{ textAlign: 'center', color: 'white' }}
              >
                Update Gender
              </h2>
              <Box>
                <CustomTextField
                  label='Title'
                  value={gender.id}
                  onChange={handleChange('id')}
                  size={'medium'}
                  variant='outlined'
                />
                <CustomTextField
                  label='Title'
                  value={gender.name}
                  onChange={handleChange('name')}
                  size={'medium'}
                  variant='outlined'
                  style={{ marginTop: '15px' }}
                />
              </Box>
              <Stack>
                <Button
                  onClick={updateGender}
                  style={{
                    margin: '20px 120px',
                    background: 'blue',
                  }}
                  variant={'contained'}
                >
                  Update
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Container>
      )}
    </div>
  )
}
