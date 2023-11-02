import { useEffect } from "react";
import "./slider.css";
import StarRatings from "react-star-ratings";
import image1 from "../../image/anh1.webp";
import image2 from "../../image/bg2copy.webp";
import image3 from "../../image/anh3.webp";
import bg1 from "../../image/bg1.webp";
import bg2 from "../../image/anh2copy.webp";
import bg3 from "../../image/bg3.webp";
import name1 from "../../image/name1.webp";
import name2 from "../../image/name2.webp";
import name3 from "../../image/name3.webp";
import hoakhey from "../../image/hoakhey.jpg";
import hoanhung from "../../image/anhde.webp";
import love from "../../image/lovedes.jpg";
export interface IAppProps {}

export function Slider(props: IAppProps) {
  return (
    <div className='container' style={{ marginTop: "30px" }}>
      <div id='slide'>
        <div
          className='item'
          style={{
            backgroundImage: `url('${bg1}')`,
            overflow: "hidden",
          }}>
          <div className='content'>
            <div
              className='name'
              style={{
                position: "relative",
              }}>
              <img src={image1} alt='' />
              <img src={name1} alt='' />
            </div>
            <div className='des'>
              <div className=''>
                <button
                  style={{
                    width: "50px",
                    height: "20px",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, rgb(0, 214, 57) 0%, rgb(0, 194, 52) 100%)",
                    lineHeight: "0",
                    color: "white",
                    textAlign: "center",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    paddingRight: "40px",
                  }}>
                  Top
                </button>
                <button
                  style={{
                    width: "150px",
                    height: "20px",
                    fontWeight: "bold",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    lineHeight: "0",
                    color: "white",
                    background: "rgba(255, 255, 255, 0.2)",
                  }}>
                  Phim đề xuất
                </button>
              </div>
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
              <div className='description'>
                <p>
                  Khanh Khanh Nhật Thường (Tân Xuyên Nhật Thường, New Life
                  Begins) kể về câu chuyện của các cô gái đến từ trời nam đất
                  bắc vì một mối ...
                </p>
              </div>
            </div>

            <i
              className='fa-solid fa-circle-play'
              style={{
                color: "#11d414",
                fontSize: "60px",
                marginLeft: "20px",
              }}></i>
          </div>
          <img
            className='post'
            src={love}
            alt=''
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div
          className='item'
          style={{
            backgroundImage: `url('${bg2}')`,
            overflow: "hidden",
          }}>
          <div className='content'>
            <div
              className='name'
              style={{
                position: "relative",
              }}>
              <img src={image2} alt='' />
              <img src={name2} alt='' />
            </div>
            <div className='des'>
              <div className=''>
                <button
                  style={{
                    width: "50px",
                    height: "20px",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, rgb(0, 214, 57) 0%, rgb(0, 194, 52) 100%)",
                    lineHeight: "0",
                    color: "white",
                    textAlign: "center",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    paddingRight: "40px",
                  }}>
                  Top
                </button>
                <button
                  style={{
                    width: "150px",
                    height: "20px",
                    fontWeight: "bold",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    lineHeight: "0",
                    color: "white",
                    background: "rgba(255, 255, 255, 0.2)",
                  }}>
                  Phim đề xuất
                </button>
              </div>
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
              <div className='description'>
                <p>
                  Khanh Khanh Nhật Thường (Tân Xuyên Nhật Thường, New Life
                  Begins) kể về câu chuyện của các cô gái đến từ trời nam đất
                  bắc vì một mối ...
                </p>
              </div>
            </div>
            <i
              className='fa-solid fa-circle-play'
              style={{
                color: "#11d414",
                fontSize: "60px",
                marginLeft: "20px",
              }}></i>
          </div>
          <img
            className='post'
            src={hoanhung}
            alt=''
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div
          className='item'
          style={{
            backgroundImage: `url('${bg3}')`,
            overflow: "hidden",
          }}>
          <div className='content'>
            <div
              className='name'
              style={{
                position: "relative",
              }}>
              <img src={image3} alt='' />
              <img src={name3} alt='' />
            </div>
            <div className='des'>
              <div className=''>
                <button
                  style={{
                    width: "50px",
                    height: "20px",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, rgb(0, 214, 57) 0%, rgb(0, 194, 52) 100%)",
                    lineHeight: "0",
                    color: "white",
                    textAlign: "center",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    paddingRight: "40px",
                  }}>
                  Top
                </button>
                <button
                  style={{
                    width: "150px",
                    height: "20px",
                    fontWeight: "bold",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    lineHeight: "0",
                    color: "white",
                    background: "rgba(255, 255, 255, 0.2)",
                  }}>
                  Phim đề xuất
                </button>
              </div>
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
              <div className='description'>
                <p>
                  Khanh Khanh Nhật Thường (Tân Xuyên Nhật Thường, New Life
                  Begins) kể về câu chuyện của các cô gái đến từ trời nam đất
                  bắc vì một mối ...
                </p>
              </div>
            </div>
            <i
              className='fa-solid fa-circle-play'
              style={{
                color: "#11d414",
                fontSize: "60px",
                marginLeft: "20px",
              }}></i>
          </div>
          <img
            className='post'
            src={hoakhey}
            alt=''
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div
          className='item'
          style={{
            backgroundImage: `url('${bg1}')`,
            overflow: "hidden",
          }}>
          <div className='content'>
            <div
              className='name'
              style={{
                position: "relative",
              }}>
              <img src={image1} alt='' />
              <img src={name1} alt='' />
            </div>
            <div className='des'>
              <div className=''>
                <button
                  style={{
                    width: "50px",
                    height: "20px",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, rgb(0, 214, 57) 0%, rgb(0, 194, 52) 100%)",
                    lineHeight: "0",
                    color: "white",
                    textAlign: "center",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    paddingRight: "40px",
                  }}>
                  Top
                </button>
                <button
                  style={{
                    width: "150px",
                    height: "20px",
                    fontWeight: "bold",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    lineHeight: "0",
                    color: "white",
                    background: "rgba(255, 255, 255, 0.2)",
                  }}>
                  Phim đề xuất
                </button>
              </div>
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
              <div className='description'>
                <p>
                  Khanh Khanh Nhật Thường (Tân Xuyên Nhật Thường, New Life
                  Begins) kể về câu chuyện của các cô gái đến từ trời nam đất
                  bắc vì một mối ...
                </p>
              </div>
            </div>
            <i
              className='fa-solid fa-circle-play'
              style={{
                color: "#11d414",
                fontSize: "60px",
                marginLeft: "20px",
              }}></i>
          </div>
          <img
            className='post'
            src={love}
            alt=''
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div
          className='item'
          style={{
            backgroundImage: `url('${bg2}')`,
            overflow: "hidden",
          }}>
          <div className='content'>
            <div
              className='name'
              style={{
                position: "relative",
              }}>
              <img src={image2} alt='' />
              <img src={name2} alt='' />
            </div>
            <div className='des'>
              <div className=''>
                <button
                  style={{
                    width: "50px",
                    height: "20px",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, rgb(0, 214, 57) 0%, rgb(0, 194, 52) 100%)",
                    lineHeight: "0",
                    color: "white",
                    textAlign: "center",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    paddingRight: "40px",
                  }}>
                  Top
                </button>
                <button
                  style={{
                    width: "150px",
                    height: "20px",
                    fontWeight: "bold",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    lineHeight: "0",
                    color: "white",
                    background: "rgba(255, 255, 255, 0.2)",
                  }}>
                  Phim đề xuất
                </button>
              </div>
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
              <div className='description'>
                <p>
                  Khanh Khanh Nhật Thường (Tân Xuyên Nhật Thường, New Life
                  Begins) kể về câu chuyện của các cô gái đến từ trời nam đất
                  bắc vì một mối ...
                </p>
              </div>
            </div>
            <i
              className='fa-solid fa-circle-play'
              style={{
                color: "#11d414",
                fontSize: "60px",
                marginLeft: "20px",
              }}></i>
          </div>
          <img
            className='post'
            src={hoanhung}
            alt=''
            width={"100%"}
            height={"100%"}
          />
        </div>
        <div
          className='item'
          style={{
            backgroundImage: `url('${bg3}')`,
            overflow: "hidden",
          }}>
          <div className='content'>
            <div
              className='name'
              style={{
                position: "relative",
              }}>
              <img src={image3} alt='' />
              <img src={name3} alt='' />
            </div>
            <div className='des'>
              <div className=''>
                <button
                  style={{
                    width: "50px",
                    height: "20px",
                    fontWeight: "bold",
                    background:
                      "linear-gradient(90deg, rgb(0, 214, 57) 0%, rgb(0, 194, 52) 100%)",
                    lineHeight: "0",
                    color: "white",
                    textAlign: "center",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    paddingRight: "40px",
                  }}>
                  Top
                </button>
                <button
                  style={{
                    width: "150px",
                    height: "20px",
                    fontWeight: "bold",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    lineHeight: "0",
                    color: "white",
                    background: "rgba(255, 255, 255, 0.2)",
                  }}>
                  Phim đề xuất
                </button>
              </div>
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
              <div className='description'>
                <p>
                  Khanh Khanh Nhật Thường (Tân Xuyên Nhật Thường, New Life
                  Begins) kể về câu chuyện của các cô gái đến từ trời nam đất
                  bắc vì một mối ...
                </p>
              </div>
            </div>
            <i
              className='fa-solid fa-circle-play'
              style={{
                color: "#11d414",
                fontSize: "60px",
                marginLeft: "20px",
              }}></i>
          </div>
          <img
            className='post'
            src={hoakhey}
            alt=''
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
}
