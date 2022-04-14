import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import { getUserByToken } from '../services/authByToken';

import Header from '../components/Header';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import NewsCard from '../components/news/NewsCard';
import Category from '../pages/category';

const AppRoutes = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    getUserByToken().then(res => {
      dispatch(login(res));
    })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<NewsCard />} />
        <Route path="/category" element={<Category />} /> {/* TODO: ruta rol administrador */}
        <Route path="/category/:id" element={<Category />} />{/* TODO: ruta rol administrador */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
