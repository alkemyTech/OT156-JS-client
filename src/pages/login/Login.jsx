import React from 'react';
import { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { login, userState } from '../../features/user/userSlice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const user = useSelector(userState);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={(values) => {
                    let errores = {};
                    if (!values.email) {
                        errores.email = 'Ingresa un email'
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                        errores.email = 'Ingresa un email válido'
                    }
                    if (!values.password) {
                        errores.password = 'Ingrese su contraseña'
                    } else if (values.password.length < 6) {
                        errores.password = 'Su contraseña debe contener al menos 6 caracteres'
                    }
                    return errores;
                }}
                onSubmit={(values, { resetForm }) => {
                    const { email, password } = values
                    const data = {
                        email,
                        password
                    };
                    axios.post('http://localhost:3000/auth/login', data)
                        .then(res => {
                            const token = res.data.token;
                            localStorage.setItem('token', token);
                            dispatch(login(res.data));
                            resetForm();
                            navigate('/');

                        }).catch(error => {
                            handleShow()
                        });
                }}>
                {({ errors, handleChange, values, handleBlur, handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="container-sm mt-5 border border-1 rounded-3 p-3">
                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                name='email'
                                placeholder='Ingrese su email'
                                id='email'
                                onChange={handleChange}
                                value={values.email}
                                onBlur={handleBlur}
                            />
                            <Form.Text className='text-muted'>
                                <ErrorMessage name='email' component={() => (
                                    <p className='text-danger'>{errors.email}</p>
                                )} />
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type='password'
                                name='password'
                                placeholder='Ingrese su contraseña'
                                id='password'
                                onChange={handleChange}
                                value={values.password}
                                onBlur={handleBlur}
                            />
                            <Form.Text className='text-muted'>
                                <ErrorMessage name='password' component={() => (
                                    <p className='text-danger'>{errors.password}</p>
                                )} />
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Iniciar Sesión
                        </Button>
                    </Form>
                )}
            </Formik>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Error de Logueo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="danger" >
                        <p>
                            El Email o la contraseña no son correctos.
                        </p>
                    </Alert>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default Login;