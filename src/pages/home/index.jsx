import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/Header";
import Home from '../../components/home/Home';

const HomePage = () => {
  return (<> 
  <Header />
  <Home welcome={"Bienvenidos"}/>
  <Footer />
  </>)
};

export default HomePage;
