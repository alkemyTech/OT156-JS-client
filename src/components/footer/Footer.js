import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineFacebook,AiOutlineInstagram } from 'react-icons/ai'
import { FiTwitter } from 'react-icons/fi'

const Footer = () => {
  const [info, setInfo] = useState({});


  //const [result, setResult] = useState({});

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/organizations/1/public');
    const data = await res.data;
    setInfo(data);
  };

  useEffect(() => {
    // url de info de organizacion    
    getData();
    return () => {
      // guardo los datos en el state
    }
  }, [])
  
  return (
    <footer className='container bg-light ' >
        <hr />
        <section className='row '>
          <div className='link d-flex justify-content-around '>
            <section className='left-section d-flex justify-content-start '>
              <Link className='p-3 text-decoration-none' to={"/news"}>Noticias</Link>
              <Link className='p-3 text-decoration-none' to={"/news"}>Actividades</Link>
              <Link className='p-3 text-decoration-none' to={"/news"}>Novedades</Link>
            </section>
            <section className='logoSection d-flex justify-content-center'>
              <img src={info?.image} alt={info?.name} width="40px" height="40px"/>
            </section>
            <section className='rigth-section d-flex justify-content-end'>
              <div className='d-flex justify-content-around'> 
                <Link className='p-3 text-decoration-none' to={"/news"}>Testimonio</Link>
                <Link className='p-3 text-decoration-none' to={"/news"}>Nosotros</Link>
              </div>
              
            </section>
          </div>
          <hr />
            <div className='social-media d-flex justify-content-center mr-3'>
            <AiOutlineFacebook size={30}/> <AiOutlineInstagram size={30}/> <FiTwitter size={30}/>
            </div>
            <section className='disclamer d-flex justify-content-center'>
              2021 by Alkemy. All Rights Reserved.
            </section>

        </section>
    </footer>
  )
}

export default Footer