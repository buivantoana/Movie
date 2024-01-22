/* eslint-disable */
import StarRatings from 'react-star-ratings'

import React from 'react'

import './productlist.css'

import { useSelector } from 'react-redux'
import { reselectGender } from '../../redux/reselect/reselectGender'
import { IMovie } from '@/interface/Movie'
import { IGender } from '@/interface/Gender'

export function ProductItem({ data }: any) {
  let datagender = useSelector(reselectGender)

  return (
    <div className=''>
      <div
        style={{
          padding: '0 40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        {data?.pages &&
          data.pages.map((page: any) => (
            <React.Fragment key={page.nextId}>
              {page.data.map((item: IMovie) => (
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
                        <a href={`/moviedetail?id=${item.id}`}>
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
                        <div className='raitings'>
                          {item.genre_ids.map((item1: any) => {
                            const genres =
                              datagender &&
                              datagender.length &&
                              datagender.find((item: IGender) => {
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
              ))}
            </React.Fragment>
          ))}
        {/* {data &&
          data.length &&
          data.map((item, index) => {
            return (
              
            );
          })} */}
      </div>
    </div>
  )
}
