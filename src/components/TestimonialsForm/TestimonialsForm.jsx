import { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { postRequest } from '../../services/apiService';
import axios from 'axios';
import { GetTestimonialById } from '../../services/testimonials';

const TestimonialsForm = ({ id, handleEdit, handleCreate }) => {
    const { testimonial } = GetTestimonialById({ id });
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [errors, seterrors] = useState({});

    useEffect(() => {
        if (testimonial?.name) {
            setName(testimonial?.name);
            setContent(testimonial?.content);
        }
    }, [testimonial]);

    const handleName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, name: null });
        setName(e.target.value);
    }

    const handleContent = (event, editor) => {
        const data = editor.getData();
        if (data) seterrors({ ...errors, content: null });
        setContent(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < 3) seterrors(prev => ({ ...prev, name: 'El nombre debe contener al menos 3 caracteres' }));
        if (!content) seterrors(prev => ({ ...prev, content: 'Debe ingresar un contenido' }));
        if (errors.name || errors.content) return;

        /* TODO
        añadir envío de imagen a endpoint para subir archivos al servidor*/

        const newTestimonial = {
            name,
            content
        }

        if (testimonial !== null) {

            axios.put(`http://localhost:3000/testimonials/${id}`, newTestimonial)
                .then(res => {
                    seterrors({});
                    handleEdit();
                })
                .catch(err => {
                    console.log(err);
                })
        } else {

            postRequest('http://localhost:3000/testimonials', newTestimonial)
                .then(res => {
                    setName('');
                    setContent('');
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
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={handleContent}
                />
            </Form.Group>
            {errors.content && <Alert variant="danger">{errors.content}</Alert>}

            {
                testimonial!== null &&
                <Button variant="primary" type="submit">
                    Actualizar Testimonio
                </Button>
            }
            {
                testimonial === null &&
                <Button variant="primary" type="submit">
                    Crear Testimonio
                </Button>
            }

        </Form>
    );
}


export default TestimonialsForm;
