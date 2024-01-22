/* eslint-disable */
import { useEffect, useState } from 'react'
import { Header } from '../header/Header'
import './projection.css'
import playing from '../../image/playing.gif'
import playinggrey from '../../image/playinggray.gif'
import dexuat from '../../image/dexuat.jpg'
import loadinggif from '../../image/loading2.gif'
import StarRatings from 'react-star-ratings'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { addHistoy } from '../../service/custumer'
import { getonemovie } from '../../service/detailmovieservice'
import { reselectGender } from '../../redux/reselect/reselectGender'
import { getoneperformer } from '../../service/apimovietmdb'
import { reselectUpcomming } from '../../redux/reselect/reselectUpcomming'
import { Footer } from '../footer/Footer'
import { reselectDataUser } from '../../redux/reselect/reselectAuth'
import { IUser } from '@/interface/User'
import { IGender } from '@/interface/Gender'
import { IDataMovie, IMovie } from '@/interface/Movie'

export interface IAppProps {}

export function Projection(props: IAppProps) {
  let [loading, setloading] = useState<boolean>(false)
  let [toggle, settonggle] = useState<boolean>(false)
  let [state, setstate] = useState<boolean>(false)
  const [hasAddedData, setHasAddedData] = useState<boolean>(false)
  let [statehover, setstatehover] = useState<number>(1)
  const queryString = window.location.search
  const searchParams = new URLSearchParams(queryString)
  const id = searchParams.get('id')
  let user: IUser = useSelector(reselectDataUser)
  let datagender: IGender[] = useSelector(reselectGender)
  let dataUpcomming: IMovie[] = useSelector(reselectUpcomming)

  async function add() {
    let res = await addHistoy({ id: user.id, movie_id: id })
    if (res.status === 0) {
      setHasAddedData(true)
    }
  }
  if (!hasAddedData) {
    if (user.email) {
      add()
    }
  }
  const { data: datavi, isLoading }: { data?: IDataMovie; isLoading: boolean } =
    useQuery('getonemovie', {
      queryFn: () => getonemovie(id),
      refetchOnWindowFocus: false,
    })
  const { data: dataper } = useQuery('getperfomer', {
    queryFn: () => getoneperformer(Number(id)),
    refetchOnWindowFocus: false,
  })

  function handleclick() {
    setstate(!state)
  }

  useEffect(() => {
    let id = setTimeout(() => {
      setloading(true)
    }, 5000)
    return () => clearTimeout(id)
  }, [])

  function handletoggle(id: number) {
    if (id == 1) {
      settonggle(false)
    } else {
      settonggle(true)
    }
  }

  function handlehove(id: number) {
    setstatehover(id)
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
        {/* Đổi chữ "Prev" thành "Quay lại" */}
      </div>
    )
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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
    <div>
      <Header />
      <div className='' style={{ padding: '0 120px', marginTop: '120px' }}>
        <div
          className='projection-flex'
          style={{ background: 'rgb(26, 28, 34)' }}
        >
          <div className='projection-left'>
            {loading ? (
              <div style={{ padding: '57.25% 0 0 0', position: 'relative' }}>
                <div className=''>
                  <iframe
                    src='https://player.vimeo.com/video/870304370?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                    allow='autoplay; fullscreen; picture-in-picture'
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '9px',
                      width: '98%',
                      height: '541px',
                    }}
                  ></iframe>
                </div>
                <script src='https://player.vimeo.com/api/player.js'></script>
              </div>
            ) : (
              <div style={{ padding: '57.25% 0 0 0', position: 'relative' }}>
                <div
                  style={{
                    width: '946px',
                    height: '546px',
                    position: 'absolute',
                    top: '12px',
                    left: '9px',
                    border: '1.5px solid white',
                  }}
                >
                  <img src={loadinggif} width={'100%'} height={'100%'} alt='' />
                </div>
              </div>
            )}

            <div className='projection-album'>
              <p>
                <i className='fa-solid fa-plus'></i> Sưu tập
              </p>
              <p>
                <i className='fa-solid fa-share-from-square'></i> Chia sẻ
              </p>
            </div>
          </div>
          <div className='projection-right'>
            <h4>{datavi && datavi.data[0].title}</h4>
            <div className='projection-right-header'>
              <button
                onClick={() => handletoggle(1)}
                style={
                  !toggle
                    ? {
                        zIndex: 1,
                        color: 'rgb(28, 199, 73)',
                        background: 'rgb(45, 47, 52)',
                      }
                    : {
                        zIndex: 0,
                        color: 'rgb(169, 169, 172)',
                        background: 'rgb(35, 37, 43)',
                      }
                }
              >
                <img
                  src={!toggle ? playing : playinggrey}
                  style={{ marginRight: '5px' }}
                  alt=''
                />{' '}
                Đề xuất
              </button>
            </div>

            <p> Đề xuất liên quan </p>
            <div className='scroll'>
              <div className='propose'>
                <div className='propose-item'>
                  <img src={dexuat} alt='' />
                  <p>Thư Kiếm Ân Cửu Lục</p>
                </div>
                <div className='propose-item'>
                  <img src={dexuat} alt='' />
                  <p>Thư Kiếm Ân Cửu Lục</p>
                </div>
                <div className='propose-item'>
                  <img src={dexuat} alt='' />
                  <p>Thư Kiếm Ân Cửu Lục</p>
                </div>
                <div className='propose-item'>
                  <img src={dexuat} alt='' />
                  <p>Thư Kiếm Ân Cửu Lục</p>
                </div>
                <div className='propose-item'>
                  <img src={dexuat} alt='' />
                  <p>Thư Kiếm Ân Cửu Lục</p>
                </div>
                <div className='propose-item'>
                  <img src={dexuat} alt='' />
                  <p>Thư Kiếm Ân Cửu Lục</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='projection-container'>
          <div className='projection-container-left'>
            <h2>{datavi && datavi.data[0].title}</h2>
            <div className='des'>
              <div className='raiting'>
                <StarRatings
                  rating={1}
                  starRatedColor='rgb(28, 199, 73)'
                  numberOfStars={1}
                  name='rating'
                  starDimension='15px'
                />
                <p>{datavi && Math.floor(datavi.data[0].vote_average)}</p>
                <div className='' style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {datavi?.data.length &&
                    datavi.data[0].genre_ids.map((item1: any) => {
                      const genres =
                        datagender &&
                        datagender.length &&
                        datagender.find((item: IGender) => {
                          return item.id === item1
                        })
                      if (genres) return <span>{genres.name}</span>
                    })}
                </div>
              </div>
              <div
                className='description'
                style={{ maxHeight: state ? '400px' : '200px' }}
              >
                <p>
                  <span
                    style={{ color: 'rgb(169, 169, 172)', fontSize: '14px' }}
                  >
                    Đạo diễn :
                  </span>
                  Kin-lung-Lam
                </p>
                <p>
                  <span
                    style={{ color: 'rgb(169, 169, 172)', fontSize: '14px' }}
                  >
                    Diễn viên chính :
                  </span>
                  {dataper &&
                    dataper?.data.cast.slice(0, 10) &&
                    dataper?.data.cast.slice(0, 10).length &&
                    dataper?.data.cast.slice(0, 10).map((item: any) => {
                      return (
                        <span
                          key={item}
                          style={{ margin: '0 3px', fontSize: '15px' }}
                        >
                          {item.name},
                        </span>
                      )
                    })}
                  ...
                </p>
                <p style={{ paddingBottom: '30px' }}>
                  <span
                    style={{ color: 'rgb(169, 169, 172)', fontSize: '14px' }}
                  >
                    Miêu tả :
                  </span>
                  <p style={{ fontSize: '15px' }}>
                    {datavi && datavi.data[0].overview}
                  </p>
                </p>
              </div>
            </div>
            <div className='star-performer'>
              <h4>Ngôi sao</h4>
              <div className='performer-flex'>
                <Slider {...settings}>
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
                </Slider>
              </div>
            </div>
          </div>
          <div className='projection-container-right'>
            <h3>Bảng xếp hạng</h3>
            <div className='projection-container-right-item'>
              {dataUpcomming &&
                dataUpcomming.length &&
                dataUpcomming.map((item: any, index: number) => {
                  return (
                    <div
                      className='projection-container-right-item-hover'
                      onMouseEnter={() => handlehove(index + 1)}
                      style={
                        statehover === index + 1
                          ? {
                              maxHeight: '400px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: 'rgb(28, 199, 73)',
                            }
                          : { maxHeight: '9px' }
                      }
                    >
                      <div
                        className=''
                        style={{ display: 'flex', gap: '15px' }}
                      >
                        <p>{index + 1}</p>
                        <p>{item.title}</p>
                      </div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt=''
                      />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
