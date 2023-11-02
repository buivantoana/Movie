import { useState } from "react";
//
import "./productdetail.css";
import YouTube from "react-youtube";
export interface video {
  data: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }[];
  bg: string;
}
function Video({ data, bg }: video) {
  let [state, setstate] = useState(true);

  function handleclick() {
    setstate(!state);
  }

  return (
    <div className=''>
      {data && data[0] ? (
        <div className='video'>
          <div className='traler-container'>
            <YouTube
              videoId={data[data.length - 1].key} // The YouTube video ID
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

          <div className='box-shadow'></div>
        </div>
      ) : (
        <div className='video'>
          <div
            className='traler-container'
            style={{
              height: "533px",
              display: "flex",
              justifyContent: "center",
            }}>
            <img src={`https://image.tmdb.org/t/p/w500${bg}`} alt='' />
          </div>

          <div className='box-shadow'></div>
        </div>
      )}
    </div>
  );
}

export default Video;
