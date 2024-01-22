import styled from '@emotion/styled'
import { Button, Container, Grid, TextField } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Video, Transformation, CloudinaryContext } from 'cloudinary-react'
import axios from 'axios'
import { useState } from 'react'

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
    color: 'white',
  },
  '& input': {
    color: 'white',
  },
})

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})
export function VideoMovie() {
  let [video, setVideo] = useState<FormData>()
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'dmwgp0bx')
      setVideo(formData)
    }
  }

  async function handleVideo() {
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dbmj1ajrv/video/upload',
        video,
      )
      console.log(response)
    } catch (error) {
      console.error('Error uploading file:', error)
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
      <h2 style={{ textAlign: 'left', marginBottom: '32px' }}>
        Add Video Movie
      </h2>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <CustomTextField label='Id' size={'medium'} variant='outlined' />
        </Grid>
        <Grid item xs={4}>
          <Button
            component='label'
            variant='contained'
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              accept='video/*'
              onChange={handleFileChange}
              type='file'
            />
          </Button>
        </Grid>
      </Grid>

      <Button
        style={{ marginTop: '30px' }}
        onClick={handleVideo}
        variant={'contained'}
      >
        Add Video
      </Button>
      <Button
        variant={'contained'}
        style={{
          marginTop: '30px',
          marginLeft: '20px',
          background: 'green',
        }}
      >
        LIst Video
      </Button>
      <CloudinaryContext cloudName='dbmj1ajrv'>
        <Video
          publicId={
            'http://res.cloudinary.com/dbmj1ajrv/video/upload/v1699588463/kbwizxoogzeesugqos5t.mp4'
          }
          controls
        >
          <Transformation width='300' height='200' crop='fill' />
        </Video>
      </CloudinaryContext>
    </Container>
  )
}
