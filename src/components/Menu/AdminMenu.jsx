import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { login, userState ,logout } from '../../features/user/userSlice';
import './menu.css';

const AdminMenu = () => {
    const user = useSelector(userState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser =()=>{
        localStorage.removeItem("persist:root");
        window.localStorage.removeItem("token");
        dispatch(logout());
    }
  return (
    <> 
    <NavDropdown title={`Bienvenido ${user.lastName} ${user.firstName}`} className='text-white'>
    <NavDropdown.Item className='links'>
      <Link to='/backoffice' className='links'>
        BackOffice
      </Link>
      </NavDropdown.Item>
    <NavDropdown.Item className='links'>
      <Link to='/backoffice/news' className='links'>
        Novedades
      </Link>
      </NavDropdown.Item>
      <NavDropdown.Item className='links'>
      <Link to='/backoffice/categories' className='links'>
        Categorias
      </Link>
      </NavDropdown.Item>
      <NavDropdown.Item>
      <Link to='/backoffice/testimonials' className='links'>
        Testimonios
      </Link>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item className='links d-flex justify-content-center '>
        <button className='btn btn-primary  btn-lg btn-block text-white ' onClick={logoutUser}>
          Cerrar sesión
        </button>
      </NavDropdown.Item>
    </NavDropdown>
    </>
  )
}

export default AdminMenu    