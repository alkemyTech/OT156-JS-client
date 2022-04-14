import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from '../components/Header';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import NewsCard from '../components/news/NewsCard';
import Category from '../pages/category';
import BackOffice from './../pages/backoffice/index';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<NewsCard />} />
        <Route path="/backoffice" element={<BackOffice />} /> {/* TODO: ruta rol administrador */}
        <Route path="/category" element={<Category />} /> {/* TODO: ruta rol administrador */}
        <Route path="/category/:id" element={<Category />} />{/* TODO: ruta rol administrador */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
