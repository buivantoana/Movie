import { Header } from "../header/Header";

import banner from "../../image/bgproduct.png";
import iconleft from "../../image/iconleft.png";
import iconright from "../../image/iconright.png";

import { useEffect, useState } from "react";
import { Footer } from "../footer/Footer";
import { gender } from "../../service/movieallservice";
import { search } from "../../service/searchservice";
import { ProductItem } from "../productlist/ProductItem";

export interface IAppProps {}

export function MovieSearch(props: IAppProps) {
  let [movie, setmovie] = useState([]);
  let [total, settotal] = useState(0);
  let [page, setpage] = useState(1);
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);

  const name = searchParams.get("search");
  async function getall() {
    let res = await search(name);
    if (res.data) {
      setmovie(res.data.results);
      settotal(res.data.total_pages);
    }
  }

  function handlepage(id: number) {
    setpage(id);
  }
  useEffect(() => {
    getall();
  }, [page]);

  return (
    <div>
      <Header />

      <div
        className='banner-movie-all'
        style={{
          backgroundImage: `url('${banner}')`,
          boxShadow: "black -1px -60px 5rem inset, black -6px 60px 5rem inset",
          width: "100%",
          height: "200px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          display: "flex",
          justifyContent: "center",
        }}>
        <div
          className=''
          style={{
            color: "white",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}>
          <img
            style={{ width: "23px", height: "42px" }}
            src={iconleft}
            alt=''
          />
          <h1 style={{ fontSize: "17px" }}>
            Từ khóa tìm kiếm :
            <p
              style={{
                color: "rgb(28, 199, 73)",
                display: "inline-block",
                padding: "0 10px",
                fontSize: "24px",
              }}>
              {" "}
              {name}
            </p>
          </h1>
          <img
            style={{ width: "23px", height: "42px" }}
            src={iconright}
            alt=''
          />
        </div>
      </div>
      <ProductItem data={movie} handle={handlepage} total={total} />
      <Footer />
    </div>
  );
}
