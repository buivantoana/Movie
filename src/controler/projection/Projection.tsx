import { useEffect, useState } from "react";
import { Header } from "../header/Header";
import "./projection.css";
import playing from "../../image/playing.gif";
import playinggrey from "../../image/playinggray.gif";
import dexuat from "../../image/dexuat.jpg";
import loadinggif from "../../image/loading2.gif";
import StarRatings from "react-star-ratings";
import { Footer } from "../footer/Footer";
import hover from "../../image/hover.webp";
import dienvien1 from "../../image/dienvien1.jpg";
import Slider from "react-slick";

export interface IAppProps {}

export function Projection(props: IAppProps) {
  let [loading, setloading] = useState(false);
  let [toggle, settonggle] = useState(false);
  let [state, setstate] = useState(false);
  let [statehover, setstatehover] = useState(1);

  function handleclick() {
    setstate(!state);
  }

  useEffect(() => {
    let id = setTimeout(() => {
      setloading(true);
    }, 5000);
    return () => clearTimeout(id);
  }, []);

  function handletoggle(id: number) {
    if (id == 1) {
      settonggle(false);
    } else {
      settonggle(true);
    }
  }

  function handlehove(id: number) {
    setstatehover(id);
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
    slidesToShow: 5,
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
    <div>
      <Header />
      <div className='' style={{ padding: "0 120px" }}>
        <div
          className='projection-flex'
          style={{ background: "rgb(26, 28, 34)" }}>
          <div className='projection-left'>
            {loading ? (
              <div style={{ padding: "57.25% 0 0 0", position: "relative" }}>
                <div className=''>
                  <iframe
                    src='https://player.vimeo.com/video/870304370?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479'
                    allow='autoplay; fullscreen; picture-in-picture'
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "9px",
                      width: "98%",
                      height: "541px",
                    }}></iframe>
                </div>
                <script src='https://player.vimeo.com/api/player.js'></script>
              </div>
            ) : (
              <div style={{ padding: "57.25% 0 0 0", position: "relative" }}>
                <div
                  style={{
                    width: "946px",
                    height: "546px",
                    position: "absolute",
                    top: "12px",
                    left: "9px",
                    border: "1.5px solid white",
                  }}>
                  <img src={loadinggif} width={"100%"} height={"100%"} alt='' />
                </div>
              </div>
            )}

            <div className='projection-album'>
              <p>
                <i className='fa-solid fa-plus'></i> Sưu tập
              </p>
              <p>
                <i className='fa-solid fa-share-from-square'></i> Chia sẻ
              </p>
            </div>
          </div>
          <div className='projection-right'>
            <h4>Thương lan quyết</h4>
            <div className='projection-right-header'>
              <button
                onClick={() => handletoggle(1)}
                style={
                  !toggle
                    ? {
                        zIndex: 1,
                        color: "rgb(28, 199, 73)",
                        background: "rgb(45, 47, 52)",
                      }
                    : {
                        zIndex: 0,
                        color: "rgb(169, 169, 172)",
                        background: "rgb(35, 37, 43)",
                      }
                }>
                <img
                  src={!toggle ? playing : playinggrey}
                  style={{ marginRight: "5px" }}
                  alt=''
                />{" "}
                Chọn tập
              </button>
              <button
                onClick={() => handletoggle(2)}
                style={
                  toggle
                    ? {
                        zIndex: 1,
                        color: "rgb(28, 199, 73)",
                        background: "rgb(45, 47, 52)",
                      }
                    : {
                        zIndex: 0,
                        color: "rgb(169, 169, 172)",
                        background: "rgb(35, 37, 43)",
                      }
                }>
                Đề xuất
              </button>
            </div>

            <p>{toggle ? "Đề xuất liên quan" : "Chọn tập 1-36"}</p>
            <div className='scroll'>
              {toggle ? (
                <div className='propose'>
                  <div className='propose-item'>
                    <img src={dexuat} alt='' />
                    <p>Thư Kiếm Ân Cửu Lục</p>
                  </div>
                  <div className='propose-item'>
                    <img src={dexuat} alt='' />
                    <p>Thư Kiếm Ân Cửu Lục</p>
                  </div>
                  <div className='propose-item'>
                    <img src={dexuat} alt='' />
                    <p>Thư Kiếm Ân Cửu Lục</p>
                  </div>
                  <div className='propose-item'>
                    <img src={dexuat} alt='' />
                    <p>Thư Kiếm Ân Cửu Lục</p>
                  </div>
                  <div className='propose-item'>
                    <img src={dexuat} alt='' />
                    <p>Thư Kiếm Ân Cửu Lục</p>
                  </div>
                  <div className='propose-item'>
                    <img src={dexuat} alt='' />
                    <p>Thư Kiếm Ân Cửu Lục</p>
                  </div>
                </div>
              ) : (
                <div className='projection-right-list'>
                  <div className='projection-right-list-item'>
                    <p style={{ color: "rgb(28, 199, 73)" }}>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                  <div className='projection-right-list-item'>
                    <p>1</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='projection-container'>
          <div className='projection-container-left'>
            <h2>Thương Lan Quyết</h2>
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
                <span>Trung quốc</span>
                <span>Lãng mạng</span>
                <span>Tình yêu ngọt ngào</span>
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
                  Liao Jinfeng, Ma Yue, Vin Zhang, Wang Yilun, Wang Youshuo, Xu
                  Lu, Zhang Yazhuo, Zheng Hehuizi
                </p>
                <p style={{ paddingBottom: "30px" }}>
                  <span
                    style={{ color: "rgb(169, 169, 172)", fontSize: "14px" }}>
                    Miêu tả :
                  </span>
                  "Nguyệt Ca Hành" do Lâm Kiến Long làm đạo diễn, với sự tham
                  gia của Trương Bân Bân,Từ Lộ, Vương Hữu Thạc,Trịnh Hợp Huệ Tử,
                  Vương Dĩ Quan. Bộ phim dựa trên cuốn tiểu thuyết "Bay lên mặt
                  trăng" của Thục Khách. Cô gái trẻ Liễu Sao đã đánh đổi số phận
                  cuộc đời mình để có được niềm vui ở bên một người đàn ông bí
                  ẩn trong ba ngày, và kể từ đó, cô đã trải qua rất nhiều thăng
                  trầm và một mối quan hệ đầy chông gai. Để bảo vệ tính mạng,
                  bảo vệ người thân, họ đã phải trải qua rất nhiều khó khăn gian
                  khổ, cống hiến cả cuộc đời mình để thực hiện lời hứa của quý
                  nhân. Liệu họ có thể vượt qua số phận của mình và thay đổi cái
                  kết không? Bộ phim sẽ được phát sóng trực tuyến trên iQiyi
                  Quốc tế (iq.com).
                </p>
              </div>
            </div>
            <div className='star-performer'>
              <h4>Ngôi sao</h4>
              <div className='performer-flex'>
                <Slider {...settings}>
                  <div className='performer-flex-item'>
                    <img src={dienvien1} alt='' />
                    <p>Hoàng Cảnh Du</p>
                  </div>
                  <div className='performer-flex-item'>
                    <img src={dienvien1} alt='' />
                    <p>Hoàng Cảnh Du</p>
                  </div>
                  <div className='performer-flex-item'>
                    <img src={dienvien1} alt='' />
                    <p>Hoàng Cảnh Du</p>
                  </div>
                  <div className='performer-flex-item'>
                    <img src={dienvien1} alt='' />
                    <p>Hoàng Cảnh Du</p>
                  </div>
                  <div className='performer-flex-item'>
                    <img src={dienvien1} alt='' />
                    <p>Hoàng Cảnh Du</p>
                  </div>
                  <div className='performer-flex-item'>
                    <img src={dienvien1} alt='' />
                    <p>Hoàng Cảnh Du</p>
                  </div>
                  <div className='performer-flex-item'>
                    <img src={dienvien1} alt='' />
                    <p>Hoàng Cảnh Du</p>
                  </div>
                  <div className='performer-flex-item'>
                    <img src={dienvien1} alt='' />
                    <p>Hoàng Cảnh Du</p>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
          <div className='projection-container-right'>
            <h3>Bảng xếp hạng</h3>
            <div className='projection-container-right-item'>
              <div
                className='projection-container-right-item-hover'
                onMouseEnter={() => handlehove(1)}
                style={
                  statehover === 1
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>1</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 2
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(2)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>2</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 3
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(3)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>3</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 4
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(4)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>4</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 5
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(5)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>5</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 6
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(6)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>6</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 7
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(7)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>7</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 8
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(8)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>8</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 9
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(9)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>9</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
              <div
                className='projection-container-right-item-hover'
                style={
                  statehover === 10
                    ? {
                        maxHeight: "400px",
                        background: "rgba(255, 255, 255, 0.05)",
                        color: "rgb(28, 199, 73)",
                      }
                    : { maxHeight: "9px" }
                }
                onMouseEnter={() => handlehove(10)}>
                <div className='' style={{ display: "flex", gap: "15px" }}>
                  <p>10</p>
                  <p>Anh ấy bước ra từ lửa</p>
                </div>
                <img src={hover} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
