/* eslint-disable */
import { Header } from '../header/Header'
import banner from '../../image/bgproduct.png'
import iconleft from '../../image/iconleft.png'
import iconright from '../../image/iconright.png'
import { useEffect, useState } from 'react'
import { Footer } from '../footer/Footer'
import { ProductItem } from '../productlist/ProductItem'
import { useInfiniteQuery } from 'react-query'
import { getSearchScroll } from '../../service/searchservice'
import { useInView } from 'react-intersection-observer'

export function MovieSearch() {
  const queryString = window.location.search
  const searchParams = new URLSearchParams(queryString)
  const { ref, inView } = useInView()
  const name = searchParams.get('search')

  let { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'scrollsearchmovie',
      async ({ pageParam = 0 }) => {
        let responseData = await getSearchScroll(name, pageParam)

        return responseData
      },
      {
        getPreviousPageParam: (firstPage: any) => {
          return firstPage.previousId ?? undefined
        },
        getNextPageParam: (lastPage: any) => {
          return lastPage.nextId ?? undefined
        },
      },
    )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div style={{ marginTop: '100px' }}>
      <Header />

      <div
        className='banner-movie-all'
        style={{
          backgroundImage: `url('${banner}')`,
          boxShadow: 'black -1px -60px 5rem inset, black -6px 60px 5rem inset',
          width: '100%',
          height: '200px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className=''
          style={{
            color: 'white',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <img
            style={{ width: '23px', height: '42px' }}
            src={iconleft}
            alt=''
          />
          <h1 style={{ fontSize: '22px' }}>
            Từ khóa tìm kiếm :
            <p
              style={{
                color: 'rgb(28, 199, 73)',
                display: 'inline-block',
                padding: '0 10px',
                fontSize: '24px',
              }}
            >
              {' '}
              {name}
            </p>
          </h1>
          <img
            style={{ width: '23px', height: '42px' }}
            src={iconright}
            alt=''
          />
        </div>
      </div>
      <ProductItem data={data} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
        }}
      >
        <button
          style={{
            padding: '10px 20px',
            color: 'white',
            background: 'transparent',
            border: '1px solid white',
            borderRadius: '10px',
          }}
          ref={ref}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
        </button>
      </div>
      <Footer />
    </div>
  )
}
