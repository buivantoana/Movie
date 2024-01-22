import { Header } from '../header/Header'
import banner from '../../image/bgproduct.png'
import iconleft from '../../image/iconleft.png'
import iconright from '../../image/iconright.png'
import { useEffect } from 'react'
import { Footer } from '../footer/Footer'
import { ProductItem } from '../productlist/ProductItem'
import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import { getAlbumScroll } from '../../service/custumer'

export function Albums() {
  const { ref, inView } = useInView()
  const queryString = window.location.search
  const searchParams = new URLSearchParams(queryString)
  const id = searchParams.get('id')
  let { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      'scrollalbum',
      async ({ pageParam = 0 }) => {
        let responseData = await getAlbumScroll(id, pageParam)

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
          <h1 style={{ fontSize: '22px' }}>Albums của tôi</h1>
          <img
            style={{ width: '23px', height: '42px' }}
            src={iconright}
            alt=''
          />
        </div>
      </div>

      {data?.pages[0].status === 1 ? (
        <div className='' style={{ height: '33vh' }}>
          <h2 style={{ textAlign: 'center', color: 'white' }}>
            Chưa có bộ phim nào trong Albums
          </h2>
        </div>
      ) : (
        <ProductItem data={data} />
      )}

      {data?.pages[0].status === 1 ? (
        ''
      ) : (
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
      )}
      <Footer />
    </div>
  )
}
