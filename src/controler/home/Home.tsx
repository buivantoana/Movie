import { useEffect, useState } from "react";
import { Header } from "../header/Header";
import { Slider } from "../slider/Slider";
import "./home.css";
import { Container } from "./Container";
import banner from "../../image/banner.jpg";
import Background from "./Background";
import { Perfomer, Performer } from "./Performer";
import { Footer } from "../footer/Footer";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  getnew,
  performer,
  populer,
  toprated,
  upcaming,
} from "../../service/homeservice";

export default function Home() {
  let [hotnew, sethotnew] = useState([]);
  let [pop, setpop] = useState([]);
  let [up, setup] = useState([]);
  let [top, settop] = useState([]);
  let [per, setper] = useState([]);

  async function getnewhome() {
    let res = await getnew();
    let res2 = await populer();
    let res3 = await upcaming();
    let res4 = await toprated();
    let res5 = await performer();

    if (res.data && res2.data && res3.data && res4.data && res5.data) {
      sethotnew(res.data.results);
      setpop(res2.data.results);
      setup(res3.data.results);
      settop(res4.data.results);
      setper(res5.data.results);
    }
  }

  console.log(pop);
  useEffect(() => {
    getnewhome();
  }, []);

  useEffect(() => {
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");

    const handleNextClick = () => {
      const lists = document.querySelectorAll(".item");
      const slide = document.getElementById("slide");
      if (slide) {
        slide.appendChild(lists[0]);
      }
    };

    const handlePrevClick = () => {
      const lists = document.querySelectorAll(".item");
      const slide = document.getElementById("slide");
      if (slide) {
        slide.prepend(lists[lists.length - 1]);
      }
    };

    if (nextButton) {
      nextButton.addEventListener("click", handleNextClick);
    }

    if (prevButton) {
      prevButton.addEventListener("click", handlePrevClick);
    }

    return () => {
      if (nextButton) {
        nextButton.removeEventListener("click", handleNextClick);
      }

      if (prevButton) {
        prevButton.removeEventListener("click", handlePrevClick);
      }
    };
  }, []);

  return (
    <div className='home'>
      <Header />

      <div
        style={{
          position: "relative",
          zIndex: "-1",
          top: "-44px",
        }}>
        <Slider />
      </div>
      <div
        className=''
        style={{
          // position: "absolute",
          // top: "15%",
          width: "100%",
          height: "50px",
        }}>
        <div className='buttons'>
          <button id='prev'>
            <i className='fa-solid fa-angle-left'></i>
          </button>
          <button id='next'>
            <i className='fa-solid fa-angle-right'></i>
          </button>
        </div>
      </div>
      <Background
        space='-150px'
        name1={"Phim hot"}
        data1={hotnew}
        data2={pop}
        marin1='-120px'
        name2={"Phim Hành động"}
        marin2='280px'
      />

      <div
        className=''
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          top: "-20px",
        }}>
        <img
          src={banner}
          style={{
            margin: "0px auto 0  ",
            textAlign: "center",
            borderRadius: "5px",
          }}
          width={"1393px"}
          alt=''
        />
      </div>
      <Background
        space='-80px'
        name1={"Phim lãng mạng"}
        marin1='-50px'
        name2={"Phim hoạt hình"}
        marin2='340px'
        data1={up}
        data2={top}
      />

      <Performer data={per} />
      <Footer />
    </div>
  );
}
