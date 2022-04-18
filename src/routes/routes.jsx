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
import BackOffice from './../pages/backoffice/index';
import RegistrationForm from './../pages/register/RegistrationForm';
import NewsBackoffice from './../pages/backoffice/news';
import CategoriesBackOffice from '../pages/backoffice/categories';
import ContactsBackoffice from '../pages/backoffice/contacts';

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
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/news" element={<NewsCard />} />
        <Route path="/backoffice" element={<BackOffice />} /> {/* TODO: ruta rol administrador */}
        <Route path="/backoffice/news" element={<NewsBackoffice />} /> {/* TODO: ruta rol administrador */}
        <Route path="/backoffice/categories" element={<CategoriesBackOffice />} /> {/* TODO: ruta rol administrador */}
        <Route path="/category" element={<Category />} /> {/* TODO: ruta rol administrador */}
        <Route path="/category/:id" element={<Category />} />{/* TODO: ruta rol administrador */}
        <Route path="/backoffice/contacts" element={<ContactsBackoffice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
