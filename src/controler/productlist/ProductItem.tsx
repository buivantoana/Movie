import StarRatings from "react-star-ratings";

import { useEffect, useState } from "react";
import { genre } from "../../service/homeservice";
import ReactPaginate from "react-paginate";
import "./productlist.css";
import loadingimg from "../../image/Dual Ring-0.6s-257px (1).gif";

interface IAppProps {
  data: {
    backdrop_path: string;
    genre_ids: [];
    id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total: number;
  handle: any;
}

export function ProductItem({ data, total, handle }: IAppProps) {
  let [gen, setgen]: any = useState([]);
  let [loading, setloading] = useState(false);
  async function get() {
    let res = await genre();

    if (res.data) {
      setgen(res.data.genres);
    }
  }
  useEffect(() => {
    get();
    setTimeout(() => {
      setloading(true);
    }, 2000);
  }, [loading]);
  const handlePageChange = async (id: number) => {
    handle(id);
    setloading(false);
  };
  return (
    <div className=''>
      {loading ? (
        <div
          style={{
            padding: "0 40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "24px",
          }}>
          {data &&
            data.length &&
            data.map((item, index) => {
              return (
                <div>
                  <div
                    className='home-container-flex-item'
                    style={{
                      backgroundImage: `url('https://image.tmdb.org/t/p/w500${item.poster_path}')`,
                    }}>
                    <div className='home-container-flex-item-hover'>
                      <div
                        className='home-container-flex-item-hover-play'
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",

                          imageRendering: "pixelated",
                        }}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                          width='100%'
                          height={"100%"}
                          style={{ objectFit: "cover" }}
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
                        <div className='raitings'>
                          {item.genre_ids.map((item1) => {
                            const genres =
                              gen &&
                              gen.length &&
                              gen.find((item: any) => {
                                return item.id === item1;
                              });

                            return <span>{genres.name}</span>;
                          })}
                        </div>
                        <div className='description'>
                          <div
                            className=''
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}>
                            <i
                              className='fa-solid fa-circle-play'
                              style={{
                                color: "#11d414",
                                fontSize: "30px",

                                margin: "10px",
                              }}></i>
                            <p
                              style={{
                                position: "relative",

                                color: "rgb(28, 199, 73)",
                                margin: "0 -10px",
                                width: "max-content",
                                padding: "14.5px 0",
                              }}>
                              Xem thêm{" "}
                              <i
                                style={{ fontSize: "9px", marginRight: "7px" }}
                                className='fa-solid fa-chevron-right'></i>
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
              );
            })}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}>
          <img src={loadingimg} width={80} height={80} alt='' />
        </div>
      )}
      <ReactPaginate
        pageCount={total}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={(data) => handlePageChange(data.selected + 1)}
        containerClassName={"pagination"}
        activeClassName={"actives"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />
    </div>
  );
}
