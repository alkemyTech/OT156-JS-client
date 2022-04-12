import React, { useEffect, useState } from 'react';
import Slider from '../../components/slider/Slider';
import NewsCard from '../../components/news/NewsCard';
import HomeTitle from './HomeTitle';
import { dataNews } from './dataNews';
import './home.css';

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
      <div className="news-container">
        <h2>Novedades</h2>
        <div className="news-container-inner">
          {data.news?.map((news, index) => {
            return <NewsCard data={news} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
