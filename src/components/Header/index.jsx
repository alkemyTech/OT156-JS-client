import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const [result, setResult] = useState({});

  const getData = async () => {
    const res = await axios.get('http://localhost:3000/organizations/1/public');
    const data = await res.data;
    setResult(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt={result.name}
            src={result.image}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          {result.name}
        </Navbar.Brand>
        <Nav className="me-auto">
          {result?.navLink?.map((nav, index) => (
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
