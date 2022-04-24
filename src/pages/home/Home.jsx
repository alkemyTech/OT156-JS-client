import React, { useEffect, useState } from 'react';
import Slider from '../../components/slider/Slider';
import NewsCard from '../../components/news/NewsCard';
import HomeTitle from './HomeTitle';
import { dataNews } from './dataNews';
import './home.css';
import { GetAllNews } from '../../services/news';

const Home = ({ welcome }) => {
  const [data, setData] = useState({ welcome: '' });
  const { news } = GetAllNews();

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
      <main className='news'>
            <h1>Ultimas Novedades</h1>
            <div className="news__container">
                {
                    news.slice(-3).reverse().map(item => {
                        return (
                            <NewsCard
                                key={item.id}
                                id={item.id}
                                titleNews={item.name}
                                imageNews={item.image}
                                textNews={item.content}
                            />
                        )
                    })
                }
            </div>
        </main>
    </div>
  );
};

export default Home;
