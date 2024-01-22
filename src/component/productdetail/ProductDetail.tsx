/* eslint-disable */
import { useState } from 'react'
import Slider from 'react-slick'
import StarRatings from 'react-star-ratings'
import YouTube from 'react-youtube'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'
import Video from './Video'
import './productdetail.css'

import { useSelector } from 'react-redux'
import { reselectGender } from '../../redux/reselect/reselectGender'
import { getoneperformer } from '../../service/apimovietmdb'
import { addAlbum } from '../../service/custumer'
import { getonemovie } from '../../service/detailmovieservice'
import { actionmovie } from '../../service/homeservice'
import { Loading } from '../loading/Loading'

import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { reselectUpcomming } from '../../redux/reselect/reselectUpcomming'

import { reselectDataUser } from '../../redux/reselect/reselectAuth'
import { Comment } from './Comment'
import { IDataMovie, IMovie } from '@/interface/Movie'
import { IGender } from '@/interface/Gender'
import { toast } from 'react-toastify'

function ProductDetail() {
  const queryString = window.location.search
  const searchParams = new URLSearchParams(queryString)
  const id = searchParams.get('id')
  const gender = searchParams.get('gender')
  let [state, setstate] = useState<Boolean>(false)
  let [check, setcheck] = useState<Boolean>(false)
  let [traler, settraler] = useState<Boolean>(false)
  let user = useSelector(reselectDataUser)
  let datagender = useSelector(reselectGender)
  let dataUpcomming = useSelector(reselectUpcomming)

  const { data: datavi, isLoading }: { data?: IDataMovie; isLoading: boolean } =
    useQuery('getonemovie', {
      queryFn: () => getonemovie(id),
      refetchOnWindowFocus: false,
    })
  const { data: dataper } = useQuery('getperfomer', {
    queryFn: () => getoneperformer(Number(id)),
    refetchOnWindowFocus: false,
  })
  const { data: datasimilar }: { data?: IDataMovie } = useQuery('getsimilar', {
    queryFn: () => {
      return actionmovie(Number(gender))
    },
    refetchOnWindowFocus: false,
  })

  function handleclick() {
    setstate(!state)
  }

  function handlecheck(id: number) {
    if (id === 1) {
      setcheck(false)
    } else {
      setcheck(true)
    }
  }

  async function handleAlbum() {
    let res = await addAlbum({ id: user.id, movie_id: id })

    if (res.status === 0) {
      toast.success('🦄 Bạn đã thêm vào anlbums', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    } else {
      toast.warning('🦄 Bạn đã có phim này trong anlbums rồi!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    }
  }

  const NextArrow = (props: any) => {
    const { className, onClick } = props
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          right: '0px',
          top: '39%',
          fontSize: '40px',
          border: '1px solid grey',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          textAlign: 'center',
          lineHeight: 1.2,
          background: 'rgba(0,0,0,.6)',
        }}
        onClick={onClick}
      >
        <i
          className='fa-solid fa-angle-right'
          style={{ color: ' #ffffff' }}
        ></i>{' '}
      </div>
    )
  }

  const PrevArrow = (props: any) => {
    const { className, onClick } = props

    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          position: 'absolute',
          left: '0px',
          top: '42%',
          fontSize: '40px',
          zIndex: '2',
          border: '1px solid grey',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          textAlign: 'center',
          lineHeight: 1.2,
          background: 'rgba(0,0,0,.6)',
        }}
      >
        <i className='fa-solid fa-angle-left' style={{ color: ' #ffffff' }}></i>{' '}
      </div>
    )
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=''>
          <Header />
          <div
            style={{ color: 'white', padding: '0 40px', marginTop: '150px' }}
          >
            <div className={`modalsearch ${traler ? 'visible' : 'hidden'}`}>
              <div
                className='traler'
                style={!traler ? { display: 'none' } : { display: 'block' }}
              >
                <div
                  className=''
                  onClick={() => settraler(!traler)}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <i className='fa-solid fa-xmark'></i>
                </div>

                {datavi && datavi.data.length && (
                  <div className='traler-container'>
                    <YouTube
                      videoId={datavi?.data[0].video} // The YouTube video ID
                      key={'AIzaSyAXpO60lQbL9eDA_LlpRURLT2HgyqwS4cc'}
                      style={{ alignSelf: 'stretch', height: '524px' }}
                      opts={{
                        height: '100%',
                        width: '100%',
                        playerVars: {
                          autoplay: 1, // Tự động phát video khi nạp
                          controls: 1, // Tắt control
                          mute: 1, // Tắt tiếng
                          showinfo: 0, // Vô hiệu hóa thông tin video
                          rel: 0,
                          start: 10,
                          fs: 0,
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className='product-detail-flex'>
              <div className='product-detail-flex-left'>
                <h2>
                  {datavi?.data && datavi?.data.length && datavi?.data[0].title}
                </h2>
                <div className='des'>
                  <div className='raiting'>
                    <StarRatings
                      rating={1}
                      starRatedColor='rgb(28, 199, 73)'
                      numberOfStars={1}
                      name='rating'
                      starDimension='15px'
                    />
                    <p>9.5</p>
                    <div
                      className=''
                      style={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                      {datavi?.data.length &&
                        datavi.data[0].genre_ids.map((item1: any) => {
                          const genres =
                            datagender &&
                            datagender.length &&
                            datagender.find((item: IGender) => {
                              return item.id === item1
                            })

                          return <span>{genres.name}</span>
                        })}
                    </div>
                  </div>
                  <div
                    className='description'
                    style={{ maxHeight: state ? '400px' : '200px' }}
                  >
                    <p>
                      <span
                        style={{
                          color: 'rgb(169, 169, 172)',
                          fontSize: '14px',
                        }}
                      >
                        Đạo diễn :
                      </span>
                      Kin-lung-Lam
                    </p>
                    <p>
                      <span
                        style={{
                          color: 'rgb(169, 169, 172)',
                          fontSize: '14px',
                        }}
                      >
                        Diễn viên chính :
                      </span>
                      {dataper &&
                        dataper?.data.cast.slice(0, 10) &&
                        dataper?.data.cast.slice(0, 10).length &&
                        dataper?.data.cast.slice(0, 10).map((item: any) => {
                          return (
                            <span key={item} style={{ margin: '0 3px' }}>
                              {item.name},
                            </span>
                          )
                        })}
                      ...
                    </p>
                    <p style={{ paddingBottom: '30px' }}>
                      <span
                        style={{
                          color: 'rgb(169, 169, 172)',
                          fontSize: '14px',
                        }}
                      >
                        Miêu tả :
                      </span>
                      {datavi?.data &&
                        datavi?.data.length &&
                        datavi?.data[0].overview}
                    </p>
                    <div className='xem-them' onClick={handleclick}>
                      <p>
                        {state ? 'Thu gọn' : 'Hiển thị thêm'}
                        <i
                          className={
                            state
                              ? 'fa-solid fa-chevron-up'
                              : 'fa-solid fa-chevron-down'
                          }
                        ></i>
                      </p>
                    </div>
                  </div>
                  <div className='product-detail-play'>
                    <Link to={`/projection?id=${datavi?.data[0].id}`}>
                      <div className='product-detail-play-item'>
                        <i className='fa-solid fa-play'></i>
                        Chiếu phát
                      </div>
                    </Link>

                    <div className='anlbum'>
                      <button onClick={handleAlbum}>
                        <i className='fa-solid fa-plus'></i> Sưu tập
                      </button>

                      <button
                        onClick={() => settraler(!traler)}
                        style={{
                          background: 'rgb(28, 199, 73)',
                          marginLeft: '15px',
                          cursor: 'pointer',
                        }}
                      >
                        Xem Traler
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='product-detail-flex-right'>
                <Video data={datavi?.data} />
              </div>
            </div>
            <div className='product-detail-flex2'>
              <div className='product-detail-flex2-left'>
                <div className='product-detail-flex2-left-header'>
                  <p
                    onClick={() => handlecheck(1)}
                    style={
                      !check
                        ? {
                            color: 'white',
                            borderBottom: '4px solid rgb(28, 199, 73)',
                          }
                        : {
                            color: 'rgb(169, 169, 172)',
                            borderBottom: 'none',
                          }
                    }
                  >
                    Bình luận
                  </p>
                  <p
                    onClick={() => handlecheck(2)}
                    style={
                      check
                        ? {
                            color: 'white',
                            borderBottom: '4px solid rgb(28, 199, 73)',
                          }
                        : {
                            color: 'rgb(169, 169, 172)',
                            borderBottom: 'none',
                          }
                    }
                  >
                    Diễn viên
                  </p>
                </div>

                <div
                  className='product-detail-flex2-left-container'
                  style={{ marginTop: '10px' }}
                >
                  {!check ? (
                    <Comment id={id} />
                  ) : (
                    <div>
                      {' '}
                      <div
                        className='performer-flex'
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          marginTop: '10px',
                        }}
                      >
                        {dataper &&
                          dataper?.data.cast.slice(0, 10) &&
                          dataper?.data.cast.slice(0, 10).length &&
                          dataper?.data.cast.slice(0, 10).map((item: any) => {
                            return (
                              <div
                                style={{ flexBasis: '20%' }}
                                className='performer-flex-item'
                              >
                                <img
                                  style={{ objectFit: 'cover' }}
                                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                                  alt=''
                                />
                                <p>{item.name}</p>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className='product-detail-flex2-right'>
                <h3
                  style={{
                    margin: '0',
                    color: 'yellow',
                    textAlign: 'center',
                    width: '100%',
                    paddingBottom: '10px',
                    marginBottom: '20px',
                    borderBottom: '3px dashed grey',
                  }}
                >
                  Các phim sắp chiếu
                </h3>
                <div className='product-detail-flex2-right-container'>
                  {dataUpcomming &&
                    dataUpcomming.length &&
                    dataUpcomming.map((item: any) => {
                      return (
                        <div className='product-detail-flex2-right-container-item'>
                          <img
                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                            alt=''
                          />
                          <div>
                            <h5>{item.title}</h5>
                            <p>{item.release_date}</p>
                            <StarRatings
                              rating={item.vote_average}
                              starRatedColor='rgb(28, 199, 73)'
                              numberOfStars={5}
                              name='rating'
                              starDimension='14px'
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            <div
              className='home-container'
              style={{
                padding: '0',
                height: '400px',
                position: 'relative',
                top: 0,
              }}
            >
              <h2>Các phim tương tự</h2>

              <Slider className='slider-home' {...settings}>
                {datasimilar?.data &&
                  datasimilar?.data.length &&
                  datasimilar?.data
                    .filter((item: any) => {
                      return item.id !== Number(id)
                    })
                    .map((item: any) => {
                      return (
                        <div>
                          <div
                            className='home-container-flex-item'
                            style={{
                              backgroundImage: `url('https://image.tmdb.org/t/p/w500${item.poster_path}')`,
                            }}
                          >
                            <div className='home-container-flex-item-hover'>
                              <div
                                className='home-container-flex-item-hover-play'
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',

                                  imageRendering: 'pixelated',
                                }}
                              >
                                <img
                                  src={`https://image.tmdb.org/t/p/w500${
                                    item.backdrop_path || item.poster_path
                                  }`}
                                  width='100%'
                                  height={'100%'}
                                  style={{ objectFit: 'cover' }}
                                  alt=''
                                />
                              </div>
                              <div className='home-container-flex-item-hover-des'>
                                <a href={`/moviedetail?id=${item.id}`}>
                                  <h3>{item.title}</h3>
                                </a>

                                <div className='raiting'>
                                  <StarRatings
                                    rating={1}
                                    starRatedColor='rgb(28, 199, 73)'
                                    numberOfStars={1}
                                    name='rating'
                                    starDimension='15px'
                                  />
                                  <p>{item.vote_average}</p>
                                </div>
                                <div className='raiting'>
                                  {item.genre_ids.map((item1: any) => {
                                    const genres =
                                      datagender &&
                                      datagender.length &&
                                      datagender.find((item: any) => {
                                        return item.id === item1
                                      })

                                    return <span>{genres.name}</span>
                                  })}
                                </div>
                                <div className='description'>
                                  <div
                                    className=''
                                    style={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    <i
                                      className='fa-solid fa-circle-play'
                                      style={{
                                        color: '#11d414',
                                        fontSize: '30px',

                                        margin: '10px',
                                      }}
                                    ></i>
                                    <p
                                      style={{
                                        position: 'relative',

                                        color: 'rgb(28, 199, 73)',
                                        margin: '0 -10px',
                                        width: 'max-content',
                                        padding: '14.5px 0',
                                      }}
                                    >
                                      Xem thêm{' '}
                                      <i
                                        style={{
                                          fontSize: '9px',
                                          marginRight: '7px',
                                        }}
                                        className='fa-solid fa-chevron-right'
                                      ></i>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <h3 className='home-container-flex-item-title'>
                              {item.title}
                            </h3>
                          </div>
                        </div>
                      )
                    })}
              </Slider>
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default ProductDetail
