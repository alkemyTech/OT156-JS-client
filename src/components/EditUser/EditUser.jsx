import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const EditUser = ({ user, role }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [roleId, setRoleId] = useState(user.roleId);
    const [errors, seterrors] = useState({});

    const handleFirstName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, firstName: null });
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, lastName: null });
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
        if (firstName.length < 3) seterrors(prev => ({ ...prev, firstName: 'El nombre debe contener al menos 3 caracteres' }));
        if (lastName.length < 3) seterrors(prev => ({ ...prev, lastName: 'El apellido debe contener al menos 3 caracteres' }));
        if (!re.test(String(email).toLowerCase())) seterrors(prev => ({ ...prev, email: 'El email debe ser valido' }));

        if (errors.name) return;

        const user = {
            firstName,
            lastName,
            email,
            image: user.image,
            roleId            
        }
            axios.patch(`http://localhost:3000/users/${user.id}`, user)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
    }

    return (
        <Form onSubmit={handleSubmit} className="container-sm mt-5 border border-1 rounded-3 p-3">

            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type='text'
                    name='firstName'
                    placeholder='Nombre'
                    id='firstName'
                    onChange={handleFirstName}
                    value={firstName}
                />
            </Form.Group>
            {errors.firstName && <Alert variant="danger">{errors.firstName}</Alert>}

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


            <Button variant="primary" type="submit">
                Actualizar Usuario
            </Button>

        </Form>
    );
}

export default EditUser;
