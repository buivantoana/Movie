import React, { useEffect, useState } from "react";
import video from "../../image/background.mp4";
import "./home.css";
import { Container } from "./Container";
function Background({ name1, name2, marin1, marin2, space, data1, data2 }) {
  return (
    <div className='video-js' style={{ marginTop: space }}>
      <div
        className=''
        style={{
          position: "relative",
          width: "100%",
          height: "117vh",
          boxShadow: "black -1px -66px 5rem inset, black -6px 83px 5rem inset",
        }}></div>
      <video width={"100%"} height={"100%"} controls='' autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
      <Container name={name1} data={data1} marin={marin1} />
      <Container name={name2} data={data2} marin={marin2} />
    </div>
  );
}

export default Background;
