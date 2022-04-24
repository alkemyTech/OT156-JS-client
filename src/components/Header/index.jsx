import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  const [result, setResult] = useState({});

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/organizations/1/public');
      const data = await res.data;
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData().catch(null);
  }, []);

  return (
    <Navbar>
      <Container>
        <Navbar.Brand >
          <img
            alt={result.name}
            src={result.image}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          {result.name}
        </Navbar.Brand>
        <Nav className="mx-auto">
          {result?.navLink?.map((nav, index) => (
            <Nav.Link key={index} href={nav.link} >
              <Link style={{ textDecoration: "none",  }} to={`${nav.link}`}>{nav.name}</Link>
            </Nav.Link>
          ))}
        </Nav>
        <Nav className="">
          <Nav.Link className="block-example rounded mb-0 border border-primary" href="/login">
            <Link style={{ textDecoration: "none" }} to="/login">Log In</Link>
          </Nav.Link>
          <Nav.Link className="block-example rounded mb-0 border border-primary bg-primary mx-2" href="/register">
            <Link style={{ textDecoration: "none", color: "white" }} to="/register">Registrate</Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
