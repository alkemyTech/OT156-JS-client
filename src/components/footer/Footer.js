import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFacebook, AiOutlineInstagram } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const [info, setInfo] = useState({});

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
    };
  }, []);

  return (
    <footer className="container bg-light ">
      <hr />
      <section className="row">
        <div className="link d-flex justify-content-around ">
          <section className=" d-flex col-sm justify-content-around ">
            <Link className="p-3 text-decoration-none" to={'/news'}>
              Noticias
            </Link>
            <Link className="p-3 text-decoration-none" to={'/news'}>
              Actividades
            </Link>
            <Link className="p-3 text-decoration-none" to={'/news'}>
              Novedades
            </Link>
          </section>
          <section className="col-sm-2 d-flex justify-content-center logoSection ">
            <img
              src={info?.image}
              alt={info?.name}
              width="40px"
              height="40px"
            />
          </section>
          <section className="d-flex col-sm row justify-content-between ">
            <div className="d-flex justify-content-evenly">
              <Link className="p-3 text-decoration-none" to={'/news'}>
                Testimonio
              </Link>
              <Link className="p-3 text-decoration-none" to={'/news'}>
                Nosotros
              </Link>
            </div>
          </section>
        </div>
        <hr />
        <div className="social-media d-flex justify-content-center m-3 px-2 mb-3">
          <a
            href={info?.Facebook?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineFacebook size={30} />
          </a>
          <a
            href={info?.Instagram?.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineInstagram size={30} />
          </a>
        </div>
        <section className="disclamer d-flex justify-content-center mb-3">
          2021 by Alkemy. All Rights Reserved.
        </section>
      </section>
    </footer>
  );
};

export default Footer;
