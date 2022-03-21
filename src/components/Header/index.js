import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [navLink, setNavLink] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/organizations/1/public',
    }).then((res) => {
      setName(res?.name);
      setImage(res?.image);
      setNavLink(res?.nav);
      console.log(res);
    });
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt={name}
            src={image}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          {name}
        </Navbar.Brand>
        <Nav className="me-auto">
          {navLink?.map((nav, index) => (
            <Nav.Link key={index} href={nav}>
              <Link to={`./${nav.link}`}>{nav.name}</Link>
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
