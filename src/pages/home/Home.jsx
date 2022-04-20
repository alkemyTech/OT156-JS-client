import React, { useEffect, useState } from 'react';
import Slider from '../../components/slider/Slider';
import NewsCard from '../../components/news/NewsCard';
import HomeTitle from './HomeTitle';
import { dataNews } from './dataNews';
import './home.css';
import News from './../../components/news/News';

const Home = ({ welcome, news }) => {
  const [data, setData] = useState({ welcome: '', news: [] });

  useEffect(() => {
    setData({
      welcome: welcome,
      news: dataNews.slice(-4),
    });
  }, []);

  return (
    <div className="layout">
      <HomeTitle text={data.welcome} />
      <Slider />
      <News/>
    </div>
  );
};

export default Home;
