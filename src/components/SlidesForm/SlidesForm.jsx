import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FileUploader from '../NewsForm/FileUploader';
import { postRequest } from '../../services/apiService';
import axios from 'axios';
import { GetSlidesById } from '../../services/slides';
import Spinner from '../Spinner/Spinner';

const SlidesForm = ({ id, handleEdit, handleCreate }) => {
    const token = localStorage.getItem("token");
    const { slide } = GetSlidesById({ id });
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [errors, seterrors] = useState({});
    const [loading, setLoading] = useState(false);

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

        const form = new FormData();
        form.append("text", name);
        form.append("image", image);

        const options = {
            method: 'POST',
            url: 'http://localhost:3000/slides/',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                Authorization: token
            },
            data: form
        };

        const optionsUpdate = {
            method: 'PUT',
            url: `http://localhost:3000/slides/${id}`,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                Authorization: token
            },
            data: form
        };

        if (slide) {
            setLoading(true);
            axios.request(optionsUpdate)
                .then(res => {
                    seterrors({});
                    handleEdit();
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            setLoading(true);
            axios.request(options)
                .then(res => {
                    setName('');
                    seterrors({});
                    handleCreate();
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
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
            {loading && <Spinner />}

        </Form>
    );
}

export default SlidesForm;