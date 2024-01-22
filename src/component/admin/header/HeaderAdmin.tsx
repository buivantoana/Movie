/* eslint-disable */
import icon from '../../../image/motphimtv.png'
import { Container, Typography } from '@mui/material'
import './headeradmin.css'

import bg from '../../../image/sidenav-card-background.png'

export function HeaderAdmin({
  check,
  handlemenu,
}: {
  check: number
  handlemenu: (id: number) => void
}) {
  return (
    <Container style={{ width: '250px' }}>
      <img src={icon} style={{ padding: '5px' }} alt='' />
      <hr
        className='hr'
        style={{
          opacity: '0.25',
          backgroundColor: 'transparent',
          backgroundImage:
            'linear-gradient(to right, rgba(0, 117, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))!important',
        }}
      />
      <div className='menu-admin'>
        <div
          onClick={() => handlemenu(0)}
          className={
            check === 0 ? 'menu-admin-item actives-menu' : 'menu-admin-item '
          }
        >
          <div className='menu-admin-item-flex '>
            <div
              className={
                check === 0
                  ? 'menu-admin-item-flex-left active-left'
                  : 'menu-admin-item-flex-left'
              }
            >
              <i className='fa-solid fa-house'></i>
            </div>
            <div className='menu-admin-item-flex-right'>Home</div>
          </div>
        </div>
        <div
          onClick={() => handlemenu(1)}
          className={
            check === 1 ? 'menu-admin-item actives-menu' : 'menu-admin-item '
          }
        >
          <div className='menu-admin-item-flex'>
            <div
              className={
                check === 1
                  ? 'menu-admin-item-flex-left active-left'
                  : 'menu-admin-item-flex-left'
              }
            >
              <i className='fa-solid fa-table-columns'></i>
            </div>
            <div className='menu-admin-item-flex-right'>Thể loại Movie</div>
          </div>
        </div>
        <div
          onClick={() => handlemenu(2)}
          className={
            check === 2 ? 'menu-admin-item actives-menu' : 'menu-admin-item '
          }
        >
          <div className='menu-admin-item-flex'>
            <div
              className={
                check === 2
                  ? 'menu-admin-item-flex-left active-left'
                  : 'menu-admin-item-flex-left'
              }
            >
              <i className='fa-solid fa-info'></i>
            </div>
            <div className='menu-admin-item-flex-right'>Chi tiết Movie</div>
          </div>
        </div>
        <div
          onClick={() => handlemenu(3)}
          className={
            check === 3 ? 'menu-admin-item actives-menu' : 'menu-admin-item '
          }
        >
          <div className='menu-admin-item-flex'>
            <div
              className={
                check === 3
                  ? 'menu-admin-item-flex-left active-left'
                  : 'menu-admin-item-flex-left'
              }
            >
              <i className='fa-solid fa-users'></i>
            </div>
            <div className='menu-admin-item-flex-right'>Người dùng</div>
          </div>
        </div>
        <Typography color={'white'}>AccoutPage</Typography>
        <div
          onClick={() => handlemenu(4)}
          className={
            check === 4 ? 'menu-admin-item actives-menu' : 'menu-admin-item '
          }
        >
          <div className='menu-admin-item-flex'>
            <div
              className={
                check === 4
                  ? 'menu-admin-item-flex-left active-left'
                  : 'menu-admin-item-flex-left'
              }
            >
              <i className='fa-solid fa-user'></i>
            </div>
            <div className='menu-admin-item-flex-right'>Profile</div>
          </div>
        </div>
        <div
          onClick={() => handlemenu(5)}
          className={
            check === 5 ? 'menu-admin-item actives-menu' : 'menu-admin-item '
          }
        >
          <div className='menu-admin-item-flex'>
            <div
              className={
                check === 5
                  ? 'menu-admin-item-flex-left active-left'
                  : 'menu-admin-item-flex-left'
              }
            >
              <i className='fa-solid fa-right-from-bracket'></i>
            </div>
            <div className='menu-admin-item-flex-right'>Đăng xuất</div>
          </div>
        </div>
      </div>
      <img style={{ borderRadius: '15px', margin: '12px 0' }} src={bg} alt='' />
    </Container>
  )
}
