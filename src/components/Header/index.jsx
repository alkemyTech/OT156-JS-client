import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userState } from '../../features/user/userSlice';
import AdminMenu from '../Menu/AdminMenu';
import UserMenu from '../Menu/UserMenu';
import { useDispatch } from 'react-redux';

const Header = () => {
  const [result, setResult] = useState({});
  const user = useSelector(userState);

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

  useEffect(() => {
    user.token === null ? setUserLogged(false):setUserLogged(true)
    }, [user])
  

  const [userLogged, setUserLogged] =useState(true); 

  const UserInfo = () => {
    const user = useSelector(userState);
    const dispatch = useDispatch();
    return (<>{
                user.token !== null ? ( user.roleId ===1 ? <AdminMenu />: <UserMenu />):''
              }
    </>
    );
  }

  const MenuLogin =()=>{
    return(
      <><Nav.Link className="block-example rounded mb-0 border border-primary m-2 text-center" href="/login">
      <Link style={{ textDecoration: "none" }} to="/login">Log In</Link>
    </Nav.Link>
    <Nav.Link className="block-example rounded mb-0 border border-primary bg-primary m-2 text-center" href="/register">
      <Link style={{ textDecoration: "none", color: "white" , textalign: "center" }} to="/register">Registrate</Link>
    </Nav.Link>
      </>
    )
  }

  return (
    <Navbar collapseOnSelect expand="lg" sticky="top">
      <Container >
        
        <Navbar.Brand className="me-auto" >
          <img
            alt={result.name}
            src={result.image}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          {result.name}
        </Navbar.Brand>
        <Navbar.Toggle  aria-controls="responsive-navbar-nav"/>        
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav  className="me-auto">
            {result?.navLink?.map((nav, index) => (
              <Nav.Link key={index} href={nav.link} >
                <Link style={{ textDecoration: "none",  }} to={`${nav.link}`}>{nav.name}</Link>
              </Nav.Link>
            ))}
          </Nav>
          <Nav className="me-auto"> 
          { !userLogged ? <MenuLogin /> : <UserInfo /> }
        </Nav> 
        </Navbar.Collapse>       

      </Container>

    </Navbar>
  );
};

export default Header;
