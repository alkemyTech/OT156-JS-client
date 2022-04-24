import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FileUploader from '../NewsForm/FileUploader';
import { postRequest } from '../../services/apiService';
import axios from 'axios';
import { GetSlidesById } from '../../services/slides';

const SlidesForm = ({ id, handleEdit, handleCreate }) => {
    const token = localStorage.getItem("token");
    const { slide } = GetSlidesById({ id });
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [errors, seterrors] = useState({});
    console.log(image)
    useEffect(() => {
        if (slide?.text) {
            setName(slide?.text);
            setImage(slide?.imageUrl);
        }
    }, [slide]);

    const handleName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, name: null });
        setName(e.target.value);
    }

    const handleImage = (e) => {
        if (e.target.files[0]) seterrors({ ...errors, image: null });
        setImage(e.target.files[0]);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < 3) seterrors(prev => ({ ...prev, name: 'El nombre debe contener al menos 3 caracteres' }));
        if (!image) seterrors(prev => ({ ...prev, image: 'Debe seleccionar una imagen' }));
        if (errors.name || errors.image || errors.content) return;

        /* TODO
        añadir envío de imagen a endpoint para subir archivos al servidor*/

        const newSlides = {
            text: name,
            imageurl: image.name ?? image,
        }

        if (slide) {
            axios.put(`http://localhost:3000/slides/${id}`,
                { body: newSlides },
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
            postRequest('http://localhost:3000/slides', newSlides)
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
                <Form.Label>Texto</Form.Label>
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

            {
                image && typeof image === 'string' ?
                    <>
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type='text'
                                name='image'
                                placeholder='Imagen'
                                id='image'
                                value={image}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <button
                                className="btn btn-danger"
                                onClick={() => setImage(null)}
                            >Cambiar Imagen</button>
                        </Form.Group>

                    </>

                    :
                    <FileUploader
                        handleImage={handleImage}
                        image={image}
                    />

            }

            {errors.image && <Alert variant="danger">{errors.image}</Alert>}


            {
                slide ?
                    <Button variant="primary" type="submit">
                        Actualizar Slide
                    </Button>
                    :
                    <Button variant="primary" type="submit">
                        Crear Slide
                    </Button>
            }

        </Form>
    );
}

export default SlidesForm;