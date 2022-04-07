import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FileUploader from './FileUploader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { postRequest } from '../../services/apiService';
import axios from 'axios';

const TestimonialsForm = ({ testimony }) => {
    const [name, setName] = useState(testimony ? testimony.name : '');
    const [image, setImage] = useState(testimony ? testimony.image : '');
    const [content, setContent] = useState(testimony ? testimony.content : '');
    const [errors, seterrors] = useState({});

    const handleName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, name: null });
        setName(e.target.value);
    }

    const handleImage = (e) => {
        if (e.target.files[0]) seterrors({ ...errors, image: null });
        setImage(e.target.files[0]);
    }

    const handleContent = (event, editor) => {
        const data = editor.getData();
        if (data) seterrors({ ...errors, content: null });
        setContent(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < 3) seterrors(prev => ({ ...prev, name: 'El nombre debe contener al menos 3 caracteres' }));
        if (!image) seterrors(prev => ({ ...prev, image: 'Debe seleccionar una imagen' }));
        if (!content) seterrors(prev => ({ ...prev, content: 'Debe ingresar un contenido' }));
        if (errors.name || errors.image || errors.content) return;

        /* TODO
        añadir envío de imagen a endpoint para subir archivos al servidor*/

        const testimonial = {
            name,
            image: image.name,
            content
        }
        if (testimony) {
            axios.patch(`http://localhost:3000/testimonials/${testimony.id}`, testimonial)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            postRequest('http://localhost:3000/testimonials', testimonial)
                .then(res => {
                    setName('');
                    setImage(null);
                    setContent('');
                    seterrors({});
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="container-sm mt-5 border border-1 rounded-3 p-3">

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
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

            <FileUploader
                handleImage={handleImage}
            />
            {errors.image && <Alert variant="danger">{errors.image}</Alert>}
            <Form.Group className="mb-3">
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={handleContent}
                />
            </Form.Group>
            {errors.content && <Alert variant="danger">{errors.content}</Alert>}

            {
                testimony ?
                    <Button variant="primary" type="submit">
                        Actualizar Testimonio
                    </Button>
                    :
                    <Button variant="primary" type="submit">
                        Crear Testimonio
                    </Button>
            }

        </Form>
    );
}

export default TestimonialsForm;
