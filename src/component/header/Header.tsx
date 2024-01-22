/* eslint-disable */
import './header.css'
import { useState } from 'react'
import { Login } from './Login'
import { topsearch } from '../../service/apimovietmdb'
import { useDispatch, useSelector } from 'react-redux'
import { reselectGender } from '../../redux/reselect/reselectGender'
import { Box } from '@mui/material'
import bg from '../../image/profilebg.jpg'
import { deleteHistoyMovie, getHistoyMovie } from '../../service/custumer'
import history from '../../image/history.png'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IGender } from '@/interface/Gender'
import { reselectDataUser } from '../../redux/reselect/reselectAuth'
import { logoutUser } from '../../redux/action/actionLoginReduxThunk'
import { IUser } from '@/interface/User'
import { IDataMovie, IMovie } from '@/interface/Movie'
import { toast } from 'react-toastify'
export function Header() {
  let [search, setsearch] = useState<boolean>(false)
  let [login, setlogin] = useState<boolean>(false)
  let [value, setvalue] = useState<string>('')
  let datagender: IGender[] = useSelector(reselectGender)

  let user: IUser = useSelector(reselectDataUser)

  let queryClient = useQueryClient()
  let dispath = useDispatch<any>()
  const { data: datatop } = useQuery('topsearch', {
    queryFn: () => topsearch(),
  })

  const { data: dataMovie }: { data?: IDataMovie } = useQuery(
    'getmoviehistory',
    {
      queryFn: () => {
        if (user.id) {
          return getHistoyMovie(user.id)
        }
      },
      refetchOnWindowFocus: false,
    },
  )

  const deleteItem = useMutation(deleteHistoyMovie, {
    onSettled: () => {
      queryClient.invalidateQueries('getmoviehistory')
    },
  })

  function handleHistory() {
    queryClient.prefetchQuery('getmoviehistory', {
      queryFn: () => getHistoyMovie(user.id),
    })
  }

  function hanldesearch() {
    setsearch(true)
  }

  function handleclose() {
    setsearch(false)
  }
  function handlelogin() {
    setlogin(!login)
  }

  async function handleLogout() {
    try {
      let check = dispath(logoutUser())
      if (check)
        toast.success('🦄 Bạn đã đăng xuất', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
    } catch (error) {}
  }

  function handleDeleteHistory(id: number) {
    deleteItem.mutate({ id: user.id, movie_id: id })
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          width: 'calc(100% - 40px)',
          top: 0,
          padding: '  20px',
          display: 'flex',
          background:
            'linear-gradient(black, black, black,black, rgba(0, 0, ,0,.02))',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: '.5s',
          zIndex: '2',
        }}
      >
        <div
          className='left'
          style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
        >
          <Link to={'/'}>
            <img
              src='https://motphimtw.com/motphimtv.png'
              alt=''
              className='logo'
            />
          </Link>
          <ul className='menu'>
            <li>Đề xuất</li>
            <li className='genderhover'>
              Thể loại <i className='fa-solid fa-caret-down'></i>
              <div className='gender'>
                {datagender &&
                  datagender.length &&
                  datagender.map((item: IGender) => {
                    return (
                      <div key={item.id} className='gender-item'>
                        <a href={`/movieall?id=${item.id}&gender=${item.name}`}>
                          <p>{item.name}</p>
                        </a>
                      </div>
                    )
                  })}
              </div>
            </li>
          </ul>
        </div>

        <div
          className='right'
          style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
        >
          <div
            className='search'
            style={search ? { position: 'relative', zIndex: '1002' } : {}}
          >
            <input
              onClick={hanldesearch}
              type='text'
              value={value}
              onChange={(e) => setvalue(e.target.value)}
              placeholder='Hoa Mộc Lan'
            />
            <a href={`/search?search=${value}`}>
              <i className='fa-solid fa-magnifying-glass'></i>
            </a>
          </div>
          <div className='itemheader history' onMouseEnter={handleHistory}>
            <i className='fa-regular fa-clock'></i>
            <span style={{ display: 'block' }}>Lịch sử xem</span>
            <div className='hover-history'>
              {user && user.email ? (
                <div>
                  {dataMovie?.data && dataMovie.data[0] ? (
                    <div className='hover-history-container'>
                      {dataMovie?.data &&
                        dataMovie.data.length &&
                        dataMovie.data.map((item: IMovie) => {
                          return (
                            <div key={item.id} className='hover-history-item'>
                              <img
                                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                                alt=''
                              />
                              <p>
                                {' '}
                                {item.title.length > 40
                                  ? item.title.slice(0, 40) + '...'
                                  : item.title}
                              </p>
                              <i
                                className='fa-solid fa-xmark'
                                onClick={() => handleDeleteHistory(item.id)}
                              ></i>
                            </div>
                          )
                        })}
                    </div>
                  ) : (
                    <div>
                      <img src={history} width={70} height={70} alt='' />
                      <div>Chưa có lịch sử xem nào </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ padding: '15px' }}>
                  <img src={history} width={70} height={70} alt='' />
                  <p>Đăng nhập để lưu lịch sử xem</p>
                </div>
              )}
            </div>
          </div>
          <div className='itemheader languagehover'>
            <i className='fa-solid fa-earth-asia'></i>
            <span style={{ display: 'block' }}>Ngôn ngữ</span>
            <div className='language'>
              <div className='language-item'>
                <p>Tiếng Việt</p>
              </div>
              <div className='language-item'>
                <p>EngLish</p>
              </div>
            </div>
          </div>
          <div
            className='itemheader profilehover'
            style={{ marginRight: '15px' }}
          >
            <i className='fa-regular fa-user'></i>
            <span style={{ display: 'block' }}>Của tôi</span>
            <div className='profile'>
              {user && user.email ? (
                <div>
                  <div
                    style={{
                      padding: '10px',
                      backgroundImage: `url(${bg})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    <Box>
                      <img
                        src='https://images.vexels.com/media/users/3/147102/isolated/preview/082213cb0f9eabb7e6715f59ef7d322a-instagram-profile-icon-by-vexels.png'
                        width={50}
                        height={50}
                        alt=''
                      />
                    </Box>
                    <Box
                      mt={'10px'}
                      display={'flex'}
                      px={'15px'}
                      gap={'8px'}
                      alignItems={'center'}
                    >
                      <p>Email :</p>
                      <p style={{ fontWeight: '700' }}>
                        {user.email.length > 20
                          ? user.email.slice(0, 20) + '...'
                          : user.email}
                      </p>
                    </Box>
                  </div>

                  <Box mt={'10px'} display={'flex'} flexDirection={'column'}>
                    {user.role === 'ADMIN' || user.role === 'MANAGER' ? (
                      <Link to={`/homeadmin`}>
                        <Box
                          className='hoverprofile'
                          height={'40px'}
                          padding={'0 20px'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                        >
                          <Box
                            display={'flex'}
                            alignItems={'center'}
                            gap={'10px'}
                          >
                            <i className='fa-solid fa-plus'></i>
                            <p style={{ margin: 0 }}>Quản trị</p>
                          </Box>
                          <Box>
                            <i className='fa-solid fa-angle-right'></i>
                          </Box>
                        </Box>
                      </Link>
                    ) : (
                      <Link to={`/albums?id=${user.id}`}>
                        <Box
                          className='hoverprofile'
                          height={'40px'}
                          padding={'0 20px'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                        >
                          <Box
                            display={'flex'}
                            alignItems={'center'}
                            gap={'10px'}
                          >
                            <i className='fa-solid fa-plus'></i>
                            <p style={{ margin: 0 }}>Albums</p>
                          </Box>
                          <Box>
                            <i className='fa-solid fa-angle-right'></i>
                          </Box>
                        </Box>
                      </Link>
                    )}
                    <Box
                      className='hoverprofile'
                      height={'40px'}
                      padding={'0 20px'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                        <i className='fa-solid fa-key'></i>
                        <p style={{ margin: 0 }}>Reset Password</p>
                      </Box>
                      <Box>
                        <i className='fa-solid fa-angle-right'></i>
                      </Box>
                    </Box>
                    <Box
                      onClick={handleLogout}
                      className='hoverprofile'
                      height={'40px'}
                      padding={'0 20px'}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                        <i className='fa-solid fa-right-from-bracket'></i>
                        <p style={{ margin: 0 }}>Logout</p>
                      </Box>
                      <Box>
                        <i className='fa-solid fa-angle-right'></i>
                      </Box>
                    </Box>
                  </Box>
                </div>
              ) : (
                <div className='profile-title'>
                  <p>Đăng nhập để theo dõi các nội dung mới nhất</p>
                  <button onClick={handlelogin} style={{ marginTop: '12px' }}>
                    Đăng nhập
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className='search-detail'
          style={search ? { opacity: '1', pointerEvents: 'all' } : {}}
        >
          <div className='search-close' onClick={handleclose}></div>
          <div className='search-detail-container'>
            <p>Tìm kiếm hot</p>
            <div className='search-detail-container-flex'>
              {datatop?.data.results.slice(0, 10) &&
                datatop.data.results.slice(0, 10).length &&
                datatop.data.results
                  .slice(0, 10)
                  .map((item: IMovie, index: number) => {
                    return (
                      <div
                        key={index}
                        className='search-detail-container-flex-item'
                      >
                        <div>{index + 1}</div>
                        <span>{item.title}</span>
                      </div>
                    )
                  })}
            </div>
          </div>
        </div>
        <Login check={login} toggle={handlelogin} />
      </div>
    </>
  )
}
