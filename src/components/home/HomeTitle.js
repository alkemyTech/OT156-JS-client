import React from 'react';
import './hometitle.css';

const HomeTitle = ({text}) => {
  return (
    <div className='home-title'>
        <h1>{text}</h1>
    </div>
  )
}

export default HomeTitle