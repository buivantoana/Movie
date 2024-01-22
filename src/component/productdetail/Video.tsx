/* eslint-disable */
import { useState } from 'react'
import './productdetail.css'
import YouTube from 'react-youtube'
export interface video {
  data?: {
    backdrop_path: string
    id: Number
    release_date: string
    video: string
  }[]
}
function Video({ data }: video) {
  return (
    <div className=''>
      <div className='video'>
        <div className='traler-container'>
          <YouTube
            videoId={data && data[0].video} // The YouTube video ID
            key={'AIzaSyAXpO60lQbL9eDA_LlpRURLT2HgyqwS4cc'}
            style={{ alignSelf: 'stretch', height: '524px' }}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 1, 
                controls: 1, 
                mute: 1, 
                showinfo: 0, 
                rel: 0,
                start: 10,
                fs: 0,
              },
            }}
          />
        </div>

        <div className='box-shadow'></div>
      </div>
    </div>
  )
}

export default Video
