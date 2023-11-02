import { Slider } from "../slider/Slider";
import "./header.css";
import dexuat from "../../image/dexuat.jpg";
import { useEffect, useState } from "react";
import { Login } from "./Login";
import { genre } from "../../service/homeservice";
import { topsearch } from "../../service/searchservice";

export interface IAppProps {}

export function Header() {
  let [search, setsearch] = useState(false);
  let [login, setlogin] = useState(false);
  let [gen, setgen]: any = useState([]);
  let [value, setvalue]: any = useState("");
  let [top, settop]: any = useState([]);
  let [scroll, setscroll] = useState(0);

  async function getgen() {
    let res = await genre();
    let res2 = await topsearch();
    if (res.data && res2.data) {
      setgen(res.data.genres);
      settop(res2.data.results.slice(0, 10));
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", function (e) {
      const scrollTop = document.documentElement.scrollTop;
      setscroll(scrollTop);
    });
    getgen();
  }, []);

  function hanldesearch() {
    setsearch(true);
  }

  function handleclose() {
    setsearch(false);
  }
  function handlelogin() {
    setlogin(!login);
  }
  return (
    <>
      <div
        style={
          scroll > 100
            ? {
                position: "fixed",
                width: "calc(100% - 40px)",
                top: 0,
                padding: " 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "black",
                transition: ".4s",
                zIndex: "10000",
                boxShadow: "0 16px 23px black",
              }
            : {
                position: "fixed",
                width: "calc(100% - 40px)",
                top: 0,
                padding: "  20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: ".5s",
                zIndex: "10000",
              }
        }>
        <div
          className='left'
          style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <img
            src='https://motphimtw.com/motphimtv.png'
            alt=''
            className='logo'
          />
          <ul className='menu'>
            <li>Đề xuất</li>
            <li className='genderhover'>
              Thể loại <i className='fa-solid fa-caret-down'></i>
              <div className='gender'>
                {gen &&
                  gen.length &&
                  gen.map((item: any) => {
                    return (
                      <div className='gender-item'>
                        <a href={`/movieall?id=${item.id}&gender=${item.name}`}>
                          <p>{item.name}</p>
                        </a>
                      </div>
                    );
                  })}
              </div>
            </li>
          </ul>
        </div>

        <div
          className='right'
          style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <div
            className='search'
            style={search ? { position: "relative", zIndex: "1002" } : {}}>
            <input
              onClick={hanldesearch}
              type='text'
              value={value}
              onChange={(e) => setvalue(e.target.value)}
              placeholder='Hoa Mộc Lan'
            />
            <a href={`/search?search=${value}`}>
              <i className='fa-solid fa-magnifying-glass'></i>
            </a>
          </div>
          <div className='itemheader history'>
            <i className='fa-regular fa-clock'></i>
            <span style={{ display: "block" }}>Lịch sử xem</span>
            <div className='hover-history'>
              <div className='hover-history-container'>
                <div className='hover-history-item'>
                  <img src={dexuat} alt='' />
                  <p>Thương Lan Quyết</p>
                </div>
                <div className='hover-history-item'>
                  <img src={dexuat} alt='' />
                  <p>Thương Lan Quyết</p>
                </div>
                <div className='hover-history-item'>
                  <img src={dexuat} alt='' />
                  <p>Thương Lan Quyết</p>
                </div>
                <div className='hover-history-item'>
                  <img src={dexuat} alt='' />
                  <p>Thương Lan Quyết</p>
                </div>
                <div className='hover-history-item'>
                  <img src={dexuat} alt='' />
                  <p>Thương Lan Quyết</p>
                </div>
                <div className='hover-history-item'>
                  <img src={dexuat} alt='' />
                  <p>Thương Lan Quyết</p>
                </div>
              </div>
            </div>
          </div>
          <div className='itemheader languagehover'>
            <i className='fa-solid fa-earth-asia'></i>
            <span style={{ display: "block" }}>Ngôn ngữ</span>
            <div className='language'>
              <div className='language-item'>
                <p>Tiếng Việt</p>
              </div>
              <div className='language-item'>
                <p>EngLish</p>
              </div>
            </div>
          </div>
          <div
            className='itemheader profilehover'
            style={{ marginRight: "15px" }}>
            <i className='fa-regular fa-user'></i>
            <span style={{ display: "block" }}>Của tôi</span>
            <div className='profile'>
              <div className='profile-title'>
                <p>Đăng nhập để theo dõi các nội dung mới nhất</p>
                <button onClick={handlelogin}>Đăng nhập</button>
              </div>
            </div>
          </div>
        </div>

        <div
          className='search-detail'
          style={search ? { opacity: "1", pointerEvents: "all" } : {}}>
          <div className='search-close' onClick={handleclose}></div>
          <div className='search-detail-container'>
            <p>Tìm kiếm hot</p>
            <div className='search-detail-container-flex'>
              {top &&
                top.length &&
                top.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className='search-detail-container-flex-item'>
                      <div>{index + 1}</div>
                      <span>{item.title}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <Login check={login} toggle={handlelogin} />
      </div>
    </>
  );
}
