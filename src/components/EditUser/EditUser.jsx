import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { postRequest } from '../../services/apiService';
import axios from 'axios';
import { GetUserById } from './../../services/users';

const EditUser = ({ id, handleEdit, handleCreate ,role }) => {
    const token = localStorage.getItem("token");
    const { user } = GetUserById({ id });
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState(2);

    console.log(user)

    const [errors, seterrors] = useState({});
    useEffect(() => {
        if (user?.firstName) {
            setName(user?.firstName);
            setLastName(user?.lastName);
            setEmail(user?.email);
            setRoleId(user?.roleId);
        }
    }, [user]);

    const handleName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, name: null });
        setName(e.target.value);
    }

    const handleLastName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, name: null });
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) seterrors({ ...errors, email: null });
        setEmail(e.target.value);
    }

    const handleRole = (e) => {
        setRoleId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (name.length < 3) seterrors(prev => ({ ...prev, name: 'El nombre debe contener al menos 3 caracteres' }));
        if (lastName.length < 3) seterrors(prev => ({ ...prev, lastName: 'El apellido debe contener al menos 3 caracteres' }));
        if (!re.test(String(email).toLowerCase())) seterrors(prev => ({ ...prev, email: 'El email debe ser valido' }));
        if (errors.name || errors.lastName || errors.email ) return;

        /* TODO
        añadir envío de imagen a endpoint para subir archivos al servidor*/

        const newUser = {
            firstName: name,
            lastName,
            email,
            roleId
        }

        if (user) {
            axios.put(`http://localhost:3000/users/${id}`,
                newUser ,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                })
                .then(res => {
                    seterrors({});
                    handleEdit();
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            postRequest('http://localhost:3000/users', newUser)
                .then(res => {
                    setName('');
                    seterrors({});
                    handleCreate();
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="container-sm mt-5 border border-1 rounded-3 p-3">

            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type='text'
                    name='name'
                    placeholder='Nombre'
                    id='name'
                    onChange={handleName}
                    value={name}
                />
            </Form.Group>
            {errors.name && <Alert variant="danger">{errors.name}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                    type='text'
                    name='lastName'
                    placeholder='Apellido'
                    id='lastName'
                    onChange={handleLastName}
                    value={lastName}
                />
            </Form.Group>
            {errors.lastName && <Alert variant="danger">{errors.lastName}</Alert>}

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='email'
                    name='email'
                    placeholder='Email'
                    id='email'
                    onChange={handleEmail}
                    value={email}
                />
            </Form.Group>
            {errors.email && <Alert variant="danger">{errors.email}</Alert>}

            {role === 'admin' &&
                <Form.Group className="mb-3">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select value={roleId} onChange={handleRole} aria-label="Default select example">
                        <option value="1">Administrador</option>
                        <option value="2">Standard</option>
                        <option value="3">Regular</option>
                    </Form.Select>
                </Form.Group>
            }

            {
                user ?
                    <Button variant="primary" type="submit">
                        Actualizar Usuario
                    </Button>
                    :
                    <Button variant="primary" type="submit">
                        Crear Usuario
                    </Button>
            }

        </Form>
    );
}

export default EditUser;