/* eslint-disable */
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import banner from '../../image/bgproduct.png'
import iconleft from '../../image/iconleft.png'
import iconright from '../../image/iconright.png'
import { getMovieScroll } from '../../service/movieallservice'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'
import { ProductItem } from './ProductItem'
import './productlist.css'

export interface IAppProps {}

export function ProductList(props: IAppProps) {
  const queryString = window.location.search
  const searchParams = new URLSearchParams(queryString)
  const id = searchParams.get('id')
  const name = searchParams.get('gender')
  const { ref, inView } = useInView()

  let { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'scrollmovie',
      async ({ pageParam = 0 }) => {
        let responseData = await getMovieScroll(id, pageParam)

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
    <div>
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
          marginTop: '150px',
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
          <h1>{name}</h1>
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
