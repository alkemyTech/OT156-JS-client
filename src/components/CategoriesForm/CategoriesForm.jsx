import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CategoriesForm = ({ handleCreate }) => {
    const [name, setName] = useState('');
    const [errors, seterrors] = useState({});

    const handleName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, name: null });
        setName(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < 3) seterrors(prev => ({ ...prev, name: 'El nombre debe contener al menos 3 caracteres' }));
        if (errors.name || errors.content) return;

        const newCategory = {
            name
        }

        axios.post('http://localhost:3000/categories', newCategory,
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setName('');
                seterrors({});
                handleCreate();
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
                    name='name'
                    placeholder='Nombre'
                    id='name'
                    onChange={handleName}
                    value={name}
                />
            </Form.Group>
            {errors.name && <Alert variant="danger">{errors.name}</Alert>}


            <Button variant="primary" type="submit">
                Crear Categoría
            </Button>

        </Form>
    );
}


export default CategoriesForm;
