import React, { useEffect, useState } from 'react'
import './home.css';
import Slider from '../slider/Slider';
import {dataNews  } from "./dataNews";   
import NewsCard from '../news/NewsCard';
import HomeTitle from './HomeTitle';


const Home = ({welcome,news}) => {
    const [data,setData]= useState({welcome:"",news:[]});
 
    useEffect(() => {        
        setData({
            welcome:welcome,
            news: dataNews.slice(-4)
        })
        //console.log(data.news);
       }
    , [])
    
  return (
    <div className='layout'>
        <HomeTitle  text={data.welcome}/>
        <Slider />
        <div className='news-container'>
            <h2>Novedades</h2>
            <div className='news-container-inner'>
            {
                data.news?.map((news,index)=>{
                    return (  <NewsCard data={news} key={index}/>                       
                    )
                })
            }       
            </div>
        </div>
    </div>
  )
}

export default Home