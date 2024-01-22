import { Container, Stack } from '@mui/material'
import loading from '../../image/Dual Ring-0.6s-257px (1).gif'

export function Loading() {
  return (
    <Container style={{ width: '100%', height: '100vh' }}>
      <Stack
        width={'100%'}
        height={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <img src={loading} alt='' width={'70px'} height={'70px'} />
      </Stack>
    </Container>
  )
}
