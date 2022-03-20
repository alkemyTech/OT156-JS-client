import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';

const Login = () => {

    return (

        <>
            <Formik

                initialValues={{
                    email: '',
                    password: ''
                }}

                //Function responsible for validate inputs
                validate={(values) => {

                    let errores = {};

                    //Check that we have a valid email
                    if (!values.email) {
                        errores.email = 'Ingresa un email'
                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                        errores.email = 'Ingresa un email válido'
                    }

                    //Check if the password has at least 6 characters
                    if (!values.password) {
                        errores.password = 'Ingrese su contraseña'
                    } else if (values.password.length < 6) {
                        errores.password = 'Su contraseña debe contener al menos 6 caracteres'
                    }

                    //Return the object that contains the errors of each input
                    return errores;

                }}

                //Function responsible for submitting the form
                onSubmit={(values, { resetForm }) => {

                    const { email, password } = values

                    //Save the input data for later sending to the API
                    const data = {
                        email,
                        password
                    };

                    //Reset the form
                    resetForm();

                }}

            >

                {({ errors, handleChange, values, handleBlur, handleSubmit}) => (

                    <Form onSubmit={handleSubmit} className="container-sm mt-5 border border-1 rounded-3 p-3">

                        <Form.Group className="mb-3" controlId="formBasicEmail">

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

                        <Form.Group className="mb-3" controlId="formBasicEmail">

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

        </>

    );
}

export default Login;