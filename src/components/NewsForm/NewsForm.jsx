import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import FileUploader from './FileUploader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { GetNewsById } from './../../services/news';
import { GetAllCategories } from './../../services/categories';
import Spinner from '../Spinner/Spinner';

const NewsForm = ({ id, handleEdit,handleCreate }) => {
    const token = localStorage.getItem("token");
    const { news } = GetNewsById({ id });
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [categoryId, setCategoryId] = useState();
    const [errors, seterrors] = useState({});
    const categories = GetAllCategories();
    const [loading, setLoading] = useState(false);

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

        const form = new FormData();
        form.append("name", name);
        form.append("content", content);
        form.append("image", image);
        form.append("categoryId", categoryId);

        const options = {
            method: 'POST',
            url: 'http://localhost:3000/news/',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                Authorization: token
            },
            data: form
        };

        const optionsUpdate = {
            method: 'PUT',
            url: `http://localhost:3000/news/${id}`,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
                Authorization: token
            },
            data: form
        };


        if (news.length !== 0) {
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
                    setImage(null);
                    setContent('');
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
                {categories.categories.map(category => (
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
                news.length !== 0 ?
                    <Button variant="primary" type="submit">
                        Actualizar Novedad
                    </Button>
                    :
                    <Button variant="primary" type="submit">
                        Crear Novedad
                    </Button>
            }
            {loading && <Spinner />}
        </Form>
    );
}

export default NewsForm;