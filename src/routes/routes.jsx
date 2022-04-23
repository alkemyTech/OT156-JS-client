import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from '../components/Header';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Category from '../pages/category';
import BackOffice from './../pages/backoffice/index';
import Footer from '../components/footer/Footer';
import RegistrationForm from './../pages/register/RegistrationForm';
import NewsBackoffice from './../pages/backoffice/news';
import CategoriesBackOffice from '../pages/backoffice/categories';
import TestimonialsBackOffice from '../pages/backoffice/testimonials';
import News from '../components/news/News';
import Entry from '../pages/news/entry';

const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/news" element={<News />} />
        <Route path="/novedad/:id" element={<Entry />} />
        <Route path="/backoffice" element={<BackOffice />} /> {/* TODO: ruta rol administrador */}
        <Route path="/backoffice/news" element={<NewsBackoffice />} /> {/* TODO: ruta rol administrador */}
        <Route path="/backoffice/categories" element={<CategoriesBackOffice />} /> {/* TODO: ruta rol administrador */}
        <Route path="/backoffice/testimonials" element={<TestimonialsBackOffice />} /> {/* TODO: ruta rol administrador */}
        <Route path="/category" element={<Category />} /> {/* TODO: ruta rol administrador */}
        <Route path="/category/:id" element={<Category />} />{/* TODO: ruta rol administrador */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRoutes;
