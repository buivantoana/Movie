/* eslint-disable */
import './container.css'
import StarRatings from 'react-star-ratings'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { reselectGender } from '../../redux/reselect/reselectGender'
import { Icontainer } from '@/interface/Container'
import { IGender } from '@/interface/Gender'

export function Container({ name, marin, data }: Icontainer) {
  let datagender: IGender[] = useSelector(reselectGender)
  const NextArrow = (props: any) => {
    const { className, onClick } = props
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          right: '10px',
          top: '39%',
          fontSize: '27px',
          border: '1px solid grey',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          textAlign: 'center',
          lineHeight: 1.5,
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
          fontSize: '27px',
          zIndex: '2',
          border: '1px solid grey',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          textAlign: 'center',
          lineHeight: 1.5,
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
    <div className='home-container' style={{ marginTop: `${marin}` }}>
      <h2>{name}</h2>

      <Slider className='slider-home' {...settings}>
        {data &&
          data.length &&
          data.map((item) => {
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
                        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                        width='100%'
                        height={'100%'}
                        style={{ objectFit: 'cover' }}
                        alt=''
                      />
                    </div>
                    <div className='home-container-flex-item-hover-des'>
                      <a
                        href={`/moviedetail?id=${item.id}&gender=${item.genre_ids[0]}`}
                      >
                        <h3>
                          {item.title.length > 40
                            ? item.title.slice(0, 40) + '...'
                            : item.title}
                        </h3>
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
                        {item.genre_ids.map((item1) => {
                          const genres =
                            datagender &&
                            datagender.length &&
                            datagender.find((item: IGender) => {
                              return item.id === item1
                            })
                          if (genres) return <span>{genres.name}</span>
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
                              style={{ fontSize: '9px', marginRight: '7px' }}
                              className='fa-solid fa-chevron-right'
                            ></i>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className='home-container-flex-item-title'>
                    {item.title.length > 40
                      ? item.title.slice(0, 40) + '...'
                      : item.title}
                  </h3>
                </div>
              </div>
            )
          })}
      </Slider>
    </div>
  )
}
