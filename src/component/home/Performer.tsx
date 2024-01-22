/* eslint-disable */
import Slider from 'react-slick'

import './home.css'
import { Perfomer } from '@/interface/Perfomer'

export function Performer({ data }: Perfomer) {
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
    slidesToShow: 7,
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
    <div className='performer'>
      <h2 style={{ margin: '20px 0' }}>Diễn viên nổi tiếng</h2>
      <div className='performer-flex'>
        <Slider {...settings}>
          {data &&
            data.length &&
            data.map((item, index) => {
              return (
                <div className='performer-flex-item'>
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
  )
}
