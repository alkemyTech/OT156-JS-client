import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FileUploader from './FileUploader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { postRequest } from '../../services/apiService';
import axios from 'axios';
import GetNewsById from './../../services/getNewsById';

const NewsForm = ({ id,handleEdit }) => {
    const { news } = GetNewsById({ id });
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState();
    const [errors, seterrors] = useState({});
    const categories = [{
        id: 1,
        name: 'Noticias'
    }, {
        id: 2,
        name: 'Eventos'
    }, {
        id: 3,
        name: 'Deportes'
    }];
    useEffect(() => {
        if (news.name) {
            setName(news?.name);
            setImage(news?.image);
            setContent(news?.content);
            setCategoryId(news?.categoryId);
        }
    }, [news]);

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

    const handleCategoryId = (e) => {
        seterrors({ ...errors, categoryId: null });
        setCategoryId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < 3) seterrors(prev => ({ ...prev, name: 'El nombre debe contener al menos 3 caracteres' }));
        if (!image) seterrors(prev => ({ ...prev, image: 'Debe seleccionar una imagen' }));
        if (!content) seterrors(prev => ({ ...prev, content: 'Debe ingresar un contenido' }));
        if (errors.name || errors.image || errors.content) return;

        /* TODO
        añadir envío de imagen a endpoint para subir archivos al servidor*/

        const news = {
            name,
            image: image.name??image,
            content,
            categoryId
        }

        if (news) {
            axios.put(`http://localhost:3000/news/${id}`, news)
                .then(res => {
                    seterrors({});
                    handleEdit();
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            postRequest('http://localhost:3000/news', news)
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
                <Form.Label>Titulo</Form.Label>
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

            <Form.Label>Categoría</Form.Label>

            <Form.Select
                aria-label="Select Category"
                onChange={handleCategoryId}
                value={categoryId}
            >
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </Form.Select>
            <br />

            <Form.Group className="mb-3">
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={handleContent}
                />
            </Form.Group>
            {errors.content && <Alert variant="danger">{errors.content}</Alert>}

            {
                news ?
                    <Button variant="primary" type="submit">
                        Actualizar Novedad
                    </Button>
                    :
                    <Button variant="primary" type="submit">
                        Crear Novedad
                    </Button>
            }

        </Form>
    );
}

export default NewsForm;