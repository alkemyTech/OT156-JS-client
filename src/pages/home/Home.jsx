import React, { useEffect, useState } from 'react';
import Slider from '../../components/slider/Slider';
import NewsCard from '../../components/news/NewsCard';
import HomeTitle from './HomeTitle';
import { dataNews } from './dataNews';
import './home.css';
import { GetAllNews } from '../../services/news';
import Testimonials from '../../components/Testimonials/Testimonials';
import { GetUser } from '../../services/users';
import { userState } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AdminMenu from '../../components/Menu/AdminMenu';
import UserMenu from '../../components/Menu/UserMenu';

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
      <section className='news'>
        <h1>Ultimas Novedades</h1>
        <div className="news__container">
          {
            news.slice(0,3).map(item => {
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
      </section>
      <section className='news'>
        <h1>Testimonios</h1>
        <div className="news__container">
          <Testimonials />
        </div>
      </section>


    </div>
  );
};

export default Home;
