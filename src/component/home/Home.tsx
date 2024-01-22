/* eslint-disable */
import { Header } from '../header/Header'
import { Slider } from '../slider/Slider'
import './home.css'

import banner from '../../image/banner.jpg'

import { Performer } from './Performer'
import { Footer } from '../footer/Footer'

import { getAllMovie, actionmovie } from '../../service/homeservice'
import { performer } from '../../service/performer'
import { Loading } from '../loading/Loading'
import { useQuery } from 'react-query'
import { Container } from './Container'
import { IDataMovie } from '@/interface/Movie'

export default function Home() {
  const {
    data: dataAll,
    isLoading,
  }: { data?: IDataMovie; isLoading: boolean } = useQuery('all', {
    queryFn: () => {
      return getAllMovie()
    },
    refetchOnWindowFocus: false,
  })

  const {
    data: datHoror,
    isLoading: isLogingHoror,
  }: { data?: IDataMovie; isLoading: boolean } = useQuery('horror', {
    queryFn: () => {
      return actionmovie(Number(27))
    },
    refetchOnWindowFocus: false,
  })
  const {
    data: dataRomantic,
    isLoading: isLogingRomatic,
  }: { data?: IDataMovie; isLoading: boolean } = useQuery('romantic', {
    queryFn: () => {
      return actionmovie(Number(10749))
    },
    refetchOnWindowFocus: false,
  })
  const {
    data: dataCartoon,
    isLoading: isLogingCartoon,
  }: { data?: IDataMovie; isLoading: boolean } = useQuery('cartoon', {
    queryFn: () => {
      return actionmovie(Number(16))
    },
    refetchOnWindowFocus: false,
  })
  const { data: dataPer, isLoading: isLoadingPer } = useQuery('perfomer', {
    queryFn: () => {
      return performer()
    },
    refetchOnWindowFocus: false,
  })

  if (
    isLoading ||
    isLogingHoror ||
    isLogingRomatic ||
    isLogingCartoon ||
    isLoadingPer
  ) {
    return <Loading />
  }

  return (
    <>
      <div className='home'>
        <Header />

        <div
          style={{
            position: 'relative',
            zIndex: '-1',
            top: '-44px',
          }}
        >
          <Slider />
        </div>
        <div
          className=''
          style={{
            // position: "absolute",
            // top: "15%",
            width: '100%',
            height: '50px',
          }}
        >
          <div className='buttons'>
            <button id='prev'>
              <i className='fa-solid fa-angle-left'></i>
            </button>
            <button id='next'>
              <i className='fa-solid fa-angle-right'></i>
            </button>
          </div>
        </div>
        <div className='' style={{ position: 'relative', top: '-100px' }}>
          <Container name={'Phim hot'} data={dataAll?.data} marin={'20px'} />
          <Container name={'Phim hot'} data={datHoror?.data} marin={'20px'} />
          <div
            className=''
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              // position: "relative",
              // zIndex: 1,
              top: '-20px',
            }}
          >
            <img
              src={banner}
              style={{
                margin: '0px auto 0  ',
                textAlign: 'center',
                borderRadius: '5px',
              }}
              width={'1393px'}
              alt=''
            />
          </div>
          <Container
            name={'Phim hot'}
            data={dataRomantic?.data}
            marin={'20px'}
          />
          <Container
            name={'Phim hot'}
            data={dataCartoon?.data}
            marin={'20px'}
          />
          <Performer data={dataPer?.data.results} />
        </div>

        <Footer />
      </div>
    </>
  )
}
