//import { Button } from '@mui/material'
import React from 'react'
import '../pages/home/Home.scss'

const Hero = () => {
  return (
    <div className='video-div'>
        <video autoPlay muted loop src='https://cdn.dribbble.com/uploads/39417/original/49dbf46eae15d227fc95a69cee31251e.mp4?1657824906'></video>
        <div className='middiv'><h2>Explore the world’s leading <br/>design portfolios</h2>
        <h4>Millions of designers and agencies around the world showcase their portfolio work <br/>on Dribbble - the home to the world’s best design and creative professionals.</h4>
        <div><button className='home-btn'>Animation</button>
        <button className='home-btn'>Discover</button>
        <button className='home-btn'>Branding</button>
        <button className='home-btn'>Mobile</button>
        <button className='home-btn'>Print</button>
        <button className='home-btn'>Web Design</button>
        </div>
        </div>
    </div>
  )
}

export default Hero