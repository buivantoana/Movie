/* eslint-disable */
import { Container } from '@mui/material'
import { HeaderAdmin } from '../header/HeaderAdmin'
import bg from '../../../image/body-background.png'
import { HeaderContainer } from '../header/HeaderContainer'
import { useState } from 'react'
import { Movie } from './Movie'
import { Gender } from './Gender'
import { User } from './User'
import { VideoMovie } from './VideoMovie'

export function Home() {
  let [check, setcheck] = useState<number>(0)
  let [name, setname] = useState<string>('Home')

  function handlemenu(id: number): void {
    if (id === 0) {
      setcheck(id)
      setname('Home')
    } else if (id === 1) {
      setcheck(id)
      setname('Thể loại Movie')
    } else if (id === 2) {
      setcheck(id)
      setname('Chi tiết movie')
    } else if (id === 3) {
      setcheck(id)
      setname('Người dùng')
    } else if (id === 4) {
      setcheck(id)
      setname('Profile')
    } else if (id === 5) {
      setcheck(id)
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        backgroundImage: `url(${bg})`,
        height: '100vh',
      }}
    >
      <HeaderAdmin check={check} handlemenu={handlemenu} />

      <Container
        className='adminscroll'
        style={{ padding: '20px', overflowY: 'scroll', margin: 0 }}
      >
        <HeaderContainer name={name} />
        {check === 0 && (
          <div style={{ color: 'white', marginTop: '100px' }}>
            <Movie />
          </div>
        )}
        {check === 1 && (
          <div style={{ color: 'white', marginTop: '100px' }}>
            <Gender />
          </div>
        )}
        {check === 2 && (
          <div style={{ color: 'white', marginTop: '100px' }}>oke</div>
        )}
        {check === 3 && (
          <div style={{ color: 'white', marginTop: '100px' }}>
            <User />
          </div>
        )}
        {check === 4 && (
          <div style={{ color: 'white', marginTop: '100px' }}>
            <VideoMovie />
          </div>
        )}
      </Container>
    </div>
  )
}
