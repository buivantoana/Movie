/* eslint-disable */
import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
} from '@mui/material'
import { styled } from '@mui/system'
import axios from 'axios'
import bg from '../../../image/body-background.png'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { reselectGender } from '../../../redux/reselect/reselectGender'
import { IGender } from '@/interface/Gender'
import { IMovie } from '@/interface/Movie'

import {
  addMovie,
  deleteMovie,
  getMovie,
  putMovie,
} from '../../../service/movieallservice'
import { reselectDataUser } from '../../../redux/reselect/reselectAuth'

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
const CustomSelect = styled(Select)({
  width: '100%',
  color: 'white',
  '& .MuiSelect-outlined': {
    borderColor: 'blue', // Màu viền khi không focus
  },
  '& .MuiSelect-outlined.Mui-focused': {
    borderColor: 'blue', // Màu viền khi focus
    color: 'white',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white', // Màu viền khi không focus
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'blue', // Màu viền khi focus
  },
  '& .MuiListItem-root': {
    color: 'green', // Màu mục lựa chọn
  },
  '& .MuiCheckbox-root': {
    color: 'green', // Màu checkbox
  },
  '& .MuiListItemText-primary': {
    color: 'green', // Màu văn bản mục lựa chọn
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

const Textarea = styled(TextareaAutosize)(
  () => `
    width: calc(100% - 24px);
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 20px 12px;
    border-radius: 8px;
    color: white;
    background:transparent;
    border: 1px solid white;
   

    &:hover {
      border-color: blue;
    }
    &::placeholder{
      color:white
    }

    &:focus {
      border-color: blue;
     
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
)

type formTypeGender = [
  {
    id: Number
    name: String
  },
]
const initialSelectedOptions: formTypeGender = [
  {
    id: 0,
    name: 'Gender',
  },
]
type formTypeMovie = {
  backdrop_path: String
  genre_ids: Number[]
  id: Number
  poster_path: String
  release_date: String
  title: String
  vote_average: Number
  video: string
}
const inittileMovie: formTypeMovie = {
  backdrop_path: '',
  genre_ids: [],
  id: 0,
  poster_path: '',
  release_date: '',
  title: '',
  vote_average: 0,
  video: '',
}
export function Movie() {
  const [selectedOptions, setSelectedOptions] = useState<formTypeGender>(
    initialSelectedOptions,
  )

  let [movie, setMovie] = useState<formTypeMovie>(inittileMovie)
  let [oveview, setOveview] = useState<string>('')
  let [modal, setModal] = useState<boolean>(false)
  let [modalUpdate, setModalUpdate] = useState<boolean>(false)
  let datagender: IGender[] = useSelector(reselectGender)
  const handleChange = (event: any) => {
    let data = event.target.value.filter((item: any) => item.id !== 0)

    setSelectedOptions(data)
  }

  const { data: listmovie } = useQuery('getmovieadmin', {
    queryFn: () => getMovie(),
    refetchOnWindowFocus: false,
  })
  let handleChangeAddmovie =
    (name: keyof formTypeMovie) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMovie((prev) => ({ ...prev, [name]: event.target.value }))
    }
  let handleClick = async () => {
    let arrgender: Number[] = []

    selectedOptions.map((item) => {
      return arrgender.push(item.id)
    })
    let data = { ...movie, genre_ids: arrgender, overview: oveview }

    let res = await addMovie(data)
    if (res.status === 0) {
      alert('Ban da them thanh cong')
      setMovie(inittileMovie)
    }
  }

  let handleClickModal = () => {
    setModal(!modal)
  }

  let handleDeleteMovie = async (id: Number) => {
    let res = await deleteMovie(id)
    if (res.status === 0) {
      alert('Ban da xoa thanh cong')
    }
  }

  let handleUpdateMovie = (id: Number) => {
    let datafilter = listmovie?.data.filter((item: any) => {
      return item.id === id
    })
    setMovie((prev) => ({
      ...prev,
      backdrop_path: datafilter[0].backdrop_path,
      id: datafilter[0].id,
      poster_path: datafilter[0].poster_path,
      title: datafilter[0].title,
      release_date: datafilter[0].release_date,
    }))
    setOveview(datafilter[0].overview)
    setModalUpdate(!modalUpdate)
  }
  let handleClose = () => {
    setModalUpdate(!modalUpdate)
  }

  let updateMovie = async () => {
    let res = await putMovie(movie.id, {
      ...movie,
      oveview,
    })
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
          <h2 style={{ textAlign: 'center', marginBottom: '32px' }}>
            Add Movie
          </h2>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <CustomTextField
                label='Id'
                value={movie.id}
                onChange={handleChangeAddmovie('id')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label='Title'
                value={movie.title}
                onChange={handleChangeAddmovie('title')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label='Poster_path'
                value={movie.poster_path}
                onChange={handleChangeAddmovie('poster_path')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label='Backdrop_path'
                value={movie.backdrop_path}
                onChange={handleChangeAddmovie('backdrop_path')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label='Release_date
'
                value={movie.release_date}
                onChange={handleChangeAddmovie('release_date')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label='vote_average'
                value={movie.vote_average}
                onChange={handleChangeAddmovie('vote_average')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>
            <Grid item xs={4}>
              <CustomTextField
                label='Video Traler'
                value={movie.video}
                onChange={handleChangeAddmovie('video')}
                size={'medium'}
                variant='outlined'
              />
            </Grid>

            <Grid item xs={4}>
              <CustomSelect
                labelId='select-label'
                multiple
                value={selectedOptions}
                onChange={handleChange}
                renderValue={(selected: any) => {
                  let html = ''
                  selected.map((item: any) => {
                    return (html += `${item.name}   `)
                  })
                  return html
                }}
              >
                {datagender &&
                  datagender.length &&
                  datagender.map((option: any) => (
                    <MenuItem key={option.id} value={option}>
                      <Checkbox checked={selectedOptions.includes(option)} />
                      <ListItemText primary={option.name} />
                    </MenuItem>
                  ))}
              </CustomSelect>
            </Grid>
            <Grid item xs={12}>
              <Textarea
                aria-label='minimum height'
                minRows={3}
                value={oveview}
                onChange={(e) => setOveview(e.target.value)}
                maxRows={12}
                placeholder='Description'
              />
            </Grid>
          </Grid>

          <Button
            onClick={handleClick}
            style={{ marginTop: '10px' }}
            variant={'contained'}
          >
            Add Movie
          </Button>
          <Button
            onClick={handleClickModal}
            variant={'contained'}
            style={{
              marginTop: '10px',
              marginLeft: '20px',
              background: 'green',
            }}
          >
            LIst Movie
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
            Add Movie
          </Button>

          <h2 style={{ textAlign: 'center' }}>List Movie</h2>
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
                    Image
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>
                    Release
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>
                    Vote_average
                  </TableCell>
                  <TableCell style={{ color: 'white' }} align='center'>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listmovie?.data.length &&
                  listmovie?.data.map((row: IMovie) => (
                    <TableRow
                      key={row.id}
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
                        {row.title}
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align='center'>
                        <img
                          width={100}
                          height={100}
                          style={{ objectFit: 'cover' }}
                          src={`https://image.tmdb.org/t/p/w500${row.poster_path}`}
                          alt=''
                        />
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align='center'>
                        {row.release_date}
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align='center'>
                        {row.vote_average}
                      </TableCell>
                      <TableCell style={{ color: 'white' }} align='center'>
                        <Button
                          onClick={() => handleDeleteMovie(Number(row.id))}
                          style={{ marginRight: '10px', background: 'red' }}
                          variant={'contained'}
                        >
                          Delete
                        </Button>
                        <Button
                          onClick={() => handleUpdateMovie(Number(row.id))}
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
                width: 800,
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
                <Grid container spacing={5}>
                  <Grid item xs={4}>
                    <CustomTextField
                      label='Id'
                      value={movie.id}
                      onChange={handleChangeAddmovie('id')}
                      size={'medium'}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextField
                      label='Title'
                      value={movie.title}
                      onChange={handleChangeAddmovie('title')}
                      size={'medium'}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextField
                      label='Poster_path'
                      value={movie.poster_path}
                      onChange={handleChangeAddmovie('poster_path')}
                      size={'medium'}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextField
                      label='Release_date'
                      value={movie.release_date}
                      onChange={handleChangeAddmovie('release_date')}
                      size={'medium'}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <CustomTextField
                      label='Backdrop_path'
                      value={movie.backdrop_path}
                      onChange={handleChangeAddmovie('backdrop_path')}
                      size={'medium'}
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Textarea
                      aria-label='minimum height'
                      minRows={3}
                      value={oveview}
                      onChange={(e) => setOveview(e.target.value)}
                      maxRows={12}
                      placeholder='Description'
                    />
                  </Grid>
                </Grid>
              </Box>
              <Stack>
                <Button
                  onClick={updateMovie}
                  style={{
                    margin: '20px 320px',
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
