import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userState ,logout } from '../../features/user/userSlice';

const UserMenu = () => {
    const user = useSelector(userState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser =()=>{
        localStorage.removeItem("persist:root");
        window.localStorage.removeItem("token");
        dispatch(logout());
    }
  
    return (
      <NavDropdown title={`Bienvenido ${user.lastName} ${user.firstName}`} id='basic-nav-dropdown'>
          <NavDropdown.Item>
          <Link to='/myprofile' className='links'>
          Ir a mi perfil
         </Link>
          </NavDropdown.Item>
          <NavDropdown.Divider />
        <NavDropdown.Item className='links d-flex justify-content-center'>
          <button className='btn btn-primary  btn-lg btn-block text-white' onClick={logoutUser}>
            Cerrar sesión
          </button>
        </NavDropdown.Item>
      </NavDropdown>
      )
}

export default UserMenu