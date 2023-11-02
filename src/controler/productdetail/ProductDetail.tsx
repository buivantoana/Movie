import StarRatings from "react-star-ratings";
import { Header } from "../header/Header";
import "./productdetail.css";
import { useEffect, useState } from "react";
import Video, { video } from "./Video";
import { Footer } from "../footer/Footer";

import dienvien1 from "../../image/dienvien1.jpg";
import { Container } from "../home/Container";
import hoakhey from "../../image/hoakhey.jpg";
import Slider from "react-slick";
import hoanhung from "../../image/anhde.webp";
import sapchieu from "../../image/sapchieu.jpg";
import YouTube from "react-youtube";
import { useParams } from "react-router-dom";
import {
  getmoviesimilar,
  getmovieupcoming,
  getonemovie,
  getonemovieus,
  getoneperformer,
} from "../../service/moviedetailservice";
import { genre } from "../../service/homeservice";

function ProductDetail() {
  let [state, setstate]: any = useState(false);
  let [check, setcheck]: any = useState(false);
  let [traler, settraler]: any = useState(false);
  let [datavi, setdatavi]: any = useState([]);
  let [dataus, setdataus]: any = useState([]);
  let [per, setper]: any = useState([]);
  let [similar, setsimilar]: any = useState([]);
  let [gen, setgen]: any = useState([]);
  let [upcoming, setupcoming]: any = useState([]);
  let [bg, setbg]: any = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);

    const id = searchParams.get("id");

    async function getall() {
      if (id) {
        let data = await getonemovie(id);
        let data1 = await getonemovieus(id);
        let dataper = await getoneperformer(id);
        let datasimilar = await getmoviesimilar(id);
        let res = await genre();
        let dataupcoming = await getmovieupcoming();

        if (
          data.data &&
          dataper.data &&
          datasimilar.data &&
          res.data &&
          dataupcoming.data &&
          data1.data
        ) {
          setdatavi(data.data);
          setdataus(data1.data.videos.results);
          setper(dataper.data.cast.slice(0, 10));
          setsimilar(datasimilar.data.results);
          setgen(res.data.genres);
          let newarray = dataupcoming.data.results.slice(0, 5);
          setupcoming(newarray);
          setbg(data1.data.poster_path);
        }
      }
    }
    getall();
  }, []);

  let filterfake = dataus;

  let filter = filterfake.filter((item: any) => {
    if (item.name === "Official Trailer" || item.name === "Trailer") {
      return item;
    }
    return item;
  });
  let filter2 = [dataus[0]];
  console.log(filter, filter2);
  function handleclick() {
    setstate(!state);
  }

  function handlecheck(id: number) {
    if (id === 1) {
      setcheck(false);
    } else {
      setcheck(true);
    }
  }
  const NextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{
          position: "absolute",
          right: "0px",
          top: "39%",
          fontSize: "40px",
          border: "1px solid grey",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          textAlign: "center",
          lineHeight: 1.2,
          background: "rgba(0,0,0,.6)",
        }}
        onClick={onClick}>
        <i
          className='fa-solid fa-angle-right'
          style={{ color: " #ffffff" }}></i>{" "}
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, onClick } = props;

    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          position: "absolute",
          left: "0px",
          top: "42%",
          fontSize: "40px",
          zIndex: "2",
          border: "1px solid grey",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          textAlign: "center",
          lineHeight: 1.2,
          background: "rgba(0,0,0,.6)",
        }}>
        <i className='fa-solid fa-angle-left' style={{ color: " #ffffff" }}></i>{" "}
        {/* Đổi chữ "Prev" thành "Quay lại" */}
      </div>
    );
  };
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
  };

  return (
    <div className=''>
      <Header />
      <div style={{ color: "white", padding: "0 40px", marginTop: "150px" }}>
        <div className={`modalsearch ${traler ? "visible" : "hidden"}`}>
          <div
            className='traler'
            style={!traler ? { display: "none" } : { display: "block" }}>
            <div
              className=''
              onClick={() => settraler(!traler)}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                cursor: "pointer",
              }}>
              <i className='fa-solid fa-xmark'></i>
            </div>

            {filter && filter[0] && (
              <div className='traler-container'>
                <YouTube
                  videoId={filter[filter.length - 1].key} // The YouTube video ID
                  key={"AIzaSyAXpO60lQbL9eDA_LlpRURLT2HgyqwS4cc"}
                  style={{ alignSelf: "stretch", height: "524px" }}
                  opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: {
                      autoplay: 1, // Tự động phát video khi nạp
                      controls: 1, // Tắt control
                      mute: 1, // Tắt tiếng
                      showinfo: 0, // Vô hiệu hóa thông tin video
                      rel: 0,
                      start: 10,
                      fs: 0,
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className='product-detail-flex'>
          <div className='product-detail-flex-left'>
            <h2>{Object.keys(datavi).length !== 0 && datavi.title}</h2>
            <div className='des'>
              <div className='raiting'>
                <StarRatings
                  rating={1}
                  starRatedColor='rgb(28, 199, 73)'
                  numberOfStars={1}
                  name='rating'
                  starDimension='15px'
                />
                <p>9.5</p>
                <div className='' style={{ display: "flex", flexWrap: "wrap" }}>
                  {Object.keys(datavi).length !== 0 &&
                    datavi.genres.map((item: any) => {
                      return <span>{item.name}</span>;
                    })}
                </div>
              </div>
              <div
                className='description'
                style={{ maxHeight: state ? "400px" : "200px" }}>
                <p>
                  <span
                    style={{ color: "rgb(169, 169, 172)", fontSize: "14px" }}>
                    Đạo diễn :
                  </span>
                  Kin-lung-Lam
                </p>
                <p>
                  <span
                    style={{ color: "rgb(169, 169, 172)", fontSize: "14px" }}>
                    Diễn viên chính :
                  </span>
                  {per &&
                    per.length &&
                    per.map((item: any) => {
                      return (
                        <span key={item} style={{ margin: "0 3px" }}>
                          {item.name},
                        </span>
                      );
                    })}
                  ...
                </p>
                <p style={{ paddingBottom: "30px" }}>
                  <span
                    style={{ color: "rgb(169, 169, 172)", fontSize: "14px" }}>
                    Miêu tả :
                  </span>
                  {Object.keys(datavi).length !== 0 && datavi.overview}
                </p>
                <div className='xem-them' onClick={handleclick}>
                  <p>
                    {state ? "Thu gọn" : "Hiển thị thêm"}
                    <i
                      className={
                        state
                          ? "fa-solid fa-chevron-up"
                          : "fa-solid fa-chevron-down"
                      }></i>
                  </p>
                </div>
              </div>
              <div className='product-detail-play'>
                <div className='product-detail-play-item'>
                  <i className='fa-solid fa-play'></i>
                  Chiếu phát
                </div>
                <div className='anlbum'>
                  <button>
                    <i className='fa-solid fa-plus'></i> Sưu tập
                  </button>
                  {filter[0] ? (
                    <button
                      onClick={() => settraler(!traler)}
                      style={{
                        background: "rgb(28, 199, 73)",
                        marginLeft: "15px",
                        cursor: "pointer",
                      }}>
                      Xem Traler
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='product-detail-flex-right'>
            <Video data={!filter ? filter2 : filter} bg={bg} />
          </div>
        </div>
        <div className='product-detail-flex2'>
          <div className='product-detail-flex2-left'>
            <div className='product-detail-flex2-left-header'>
              <p
                onClick={() => handlecheck(1)}
                style={
                  !check
                    ? {
                        color: "white",
                        borderBottom: "4px solid rgb(28, 199, 73)",
                      }
                    : {
                        color: "rgb(169, 169, 172)",
                        borderBottom: "none",
                      }
                }>
                Nội dung phim
              </p>
              <p
                onClick={() => handlecheck(2)}
                style={
                  check
                    ? {
                        color: "white",
                        borderBottom: "4px solid rgb(28, 199, 73)",
                      }
                    : {
                        color: "rgb(169, 169, 172)",
                        borderBottom: "none",
                      }
                }>
                Diễn viên
              </p>
            </div>

            <div
              className='product-detail-flex2-left-container'
              style={{ marginTop: "10px" }}>
              {!check ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<p>Nguyệt ca hành (2022): Có gì ở bộ phim cổ trang tiên hiệp mới của Trung Quốc
POSTED ON THÁNG MƯỜI HAI 23, 2022 BY XUÂN LAN</p>
<p>Nguyệt ca hành là bộ phim cổ trang tiên hiệp mới của Trung Quốc và hiện đang nhận được khá nhiều sự quan tâm từ khán giả. Phim được thực hiện dưới sự chỉ đạo của đạo diễn Lâm Kiện Long với sự tham gia của Trương Bân Bân, Từ Lộ. Vương Hữu Thạc, Vương Dĩ Luân,…</p>
<p>Thông tin phim Nguyệt ca hành
Nguyệt ca hành, review phim Nguyệt ca hành, diễn viên Nguyệt ca hành, nội dung Nguyệt ca hành
Tên tiếng Trung: 月歌行 (Song of the Moon)</p>
<p>Thể loại: Cổ trang, tiên hiệp, tình cảm</p>
<p>Đạo diễn: Lâm Kiện Long</p>
<p>Số tập: 40 tập</p>
<p>Quốc gia: Trung Quốc</p>
<p>Khởi chiếu: 15/12/2022</p>
<p>Diễn viên: Trương Bân Bân, Từ Lộ, Vương Hữu Thạc, Trịnh Hợp Huệ Tử, Vương Dĩ Luân, Mã Nguyệt</p>
<p>Tóm tắt nội dung phim Nguyệt ca hành
Nguyệt ca hành là bộ phim kể về mối tình bi thương giữa Lục Ly/Lạc Ca/Nguyệt Quang thượng thần với Liễu Tiêu/Diệu Linh thượng thần. Liễu Tiêu là thiếu nữ bị cha mẹ bỏ rơi, khi còn nhỏ cô đã gặp được một tiên nhân thần bí và đã chấp nhận cuộc giao dịch đổi vận mệnh cả đời để lấy 3 ngày du ngoạn. Mười năm sau, vận mệnh thay đổi như cuộc giao dịch trước đây của Liễu Tiêu cũng đã xảy ra, lúc này sức mạnh thần bí trong cơ thể khiến Liễu Tiêu không thể khống chế được nó nên cô đã buộc phải trốn đến Vũ Vương hầu phủ để học võ công.</p>
`,
                  }}></div>
              ) : (
                <div>
                  {" "}
                  <div
                    className='performer-flex'
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      marginTop: "10px",
                    }}>
                    {per &&
                      per.length &&
                      per.map((item: any) => {
                        return (
                          <div
                            style={{ flexBasis: "20%" }}
                            className='performer-flex-item'>
                            <img
                              style={{ objectFit: "cover" }}
                              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                              alt=''
                            />
                            <p>{item.name}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='product-detail-flex2-right'>
            <h3
              style={{
                margin: "0",
                color: "yellow",
                textAlign: "center",
                width: "100%",
                paddingBottom: "10px",
                marginBottom: "20px",
                borderBottom: "3px dashed grey",
              }}>
              Các phim sắp chiếu
            </h3>
            <div className='product-detail-flex2-right-container'>
              {upcoming &&
                upcoming.length &&
                upcoming.map((item: any) => {
                  return (
                    <div className='product-detail-flex2-right-container-item'>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt=''
                      />
                      <div>
                        <h5>{item.title}</h5>
                        <p>{item.release_date}</p>
                        <StarRatings
                          rating={item.vote_average}
                          starRatedColor='rgb(28, 199, 73)'
                          numberOfStars={5}
                          name='rating'
                          starDimension='14px'
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div
          className='home-container'
          style={{
            padding: "0",
            height: "400px",
            position: "relative",
            top: 0,
          }}>
          <h2>Các phim tương tự</h2>

          <Slider className='slider-home' {...settings}>
            {similar &&
              similar.length &&
              similar.map((item: any) => {
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
                            src={`https://image.tmdb.org/t/p/w500${
                              item.backdrop_path || item.poster_path
                            }`}
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
                          <div className='raiting'>
                            {item.genre_ids.map((item1: any) => {
                              const genres =
                                gen &&
                                gen.length &&
                                gen.find((item: any) => {
                                  return item.id === item1;
                                });

                              return <span>{genres.name}</span>;
                            })}

                            {/* <span>Lãng mạng</span>
                        <span>Tình yêu</span> */}
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
                                  style={{
                                    fontSize: "9px",
                                    marginRight: "7px",
                                  }}
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
          </Slider>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ProductDetail;
