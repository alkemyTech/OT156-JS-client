import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { postRequest } from '../../services/apiService';
import axios from 'axios';
import SuccessAlert from '../Alerts/SuccessAlert';
import ErrorAlert from '../Alerts/ErrorAlert';

const ContactForm = () => {
    const { contact } = useState({});
    const [name, setName] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [errors, seterrors] = useState({});

    const handleName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, name: null });
        setName(e.target.value);
    }
    const handleApellido = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, apellido: null });
        setApellido(e.target.value);
    }

    const handleEmail = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, email: null });
        setEmail(e.target.value);
    }

    const handleContent = (event, editor) => {
        const data = editor.getData();
        if (data) seterrors({ ...errors, content: null });
        setContent(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < 3) seterrors(prev => ({ ...prev, name: 'El nombre debe contener al menos 3 caracteres' }));
        if (apellido.length < 3) seterrors(prev => ({ ...prev, apellido: 'El apellido debe contener al menos 3 caracteres' }));
        if (!content) seterrors(prev => ({ ...prev, content: 'Debe ingresar un contenido' }));
        if (errors.name || errors.apellido || errors.content) return;

        /* TODO
        añadir envío de imagen a endpoint para subir archivos al servidor*/

        const newContact = {
            name,
            apellido,
            email,
            content
        }

        if (contact !== null) {
            postRequest('http://localhost:3000/contacts', newContact)
                .then(res => {
                    setName('');
                    setApellido('');
                    setEmail('');
                    setContent('');
                    seterrors({});
                    SuccessAlert({title:'Contacto guardado correctamente'});
                })
                .catch(err => {
                    ErrorAlert({title:'Hay errores al guardar el Contacto intentelo nuevamente'});
                    console.log(err);
                })
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="container-sm mt-5 col-8 border border-1 rounded-3 p-3">
            <h2 className='m-3 mb-5'>Contacte con nosotros</h2>
            <Form.Group className="mb-3 d-flex col ">
                <Form.Group className="col px-3 ">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        placeholder='Nombre'
                        id='name'
                        onChange={handleName}
                        value={name}
                    />
                </Form.Group >
                
                <Form.Group className='col px-3'>
                <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type='text'
                        name='apellido'
                        placeholder='Apellido'
                        id='apellido'
                        onChange={handleApellido}
                        value={apellido}
                    />
                </Form.Group>
               
            </Form.Group>
            {errors.name && <Alert className='col' variant="danger">{errors.name}</Alert>}
            {errors.apellido && <Alert className='col' variant="danger">{errors.apellido}</Alert>}
            <Form.Group className='px-3 mb-3'>
            <Form.Label>Email</Form.Label>
                <Form.Control
                    type='text'
                    name='email'
                    placeholder='Email'
                    id='email'
                    onChange={handleEmail}
                    value={email}
                />

            </Form.Group>          
            <Form.Group className="mb-3 p-3">
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={handleContent}
                />
            </Form.Group>
            {errors.content && <Alert variant="danger">{errors.content}</Alert>}
            <Button className='btn-lg m-3' variant="primary" type="submit">
                Enviar
            </Button>

        </Form>
    );
}


export default ContactForm;
