import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Test from '../pages/Test';
import News from '../pages/news/News';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
