import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import FileUploader from '../NewsForm/FileUploader';

const OrganizationForm = ({ organization, edit, handleEdit }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState('');
    const [welcomeText, setWelcomeText] = useState('');
    const [errors, seterrors] = useState({});

    useEffect(() => {
        if (organization) {
            setName(organization.name)
            setImage(organization.image)
            setPhone(organization.phone)
            setAddress(organization.address)
            setWelcomeText(organization.welcomeText)
        }
    }, [organization])

    const handleName = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, name: null });
        setName(e.target.value);
    }

    const handleImage = (e) => {
        if (e.target.files[0]) seterrors({ ...errors, image: null });
        setImage(e.target.files[0]);
    }

    const handlePhone = (e) => {
        if (e.target.value > 99999) seterrors({ ...errors, phone: null });
        setPhone(e.target.value);
    }

    const handleAddress = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, address: null });
        setAddress(e.target.value);
    }

    const handleWelcomeText = (e) => {
        if (e.target.value.length > 3) seterrors({ ...errors, welcomeText: null });
        setWelcomeText(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < 3) seterrors(prev => ({ ...prev, name: 'El nombre debe contener al menos 3 caracteres' }));
        if (!image) seterrors(prev => ({ ...prev, image: 'Debe seleccionar una imagen' }));
        if (phone < 99999) seterrors(prev => ({ ...prev, phone: 'El numero de telefono debe ser correcto' }));
        if (address.length < 3) seterrors(prev => ({ ...prev, address: 'La dirección debe contener al menos 3 caracteres' }));
        if (welcomeText.length < 3) seterrors(prev => ({ ...prev, welcomeText: 'El texto de bienvenida debe contener al menos 3 caracteres' }));
        if (errors.name || errors.content) return;

        const newOrganization = {
            name,
            image: image.name ?? image,
            phone,
            address,
            welcomeText
        }

        axios.put('http://localhost:3000/organizations/1', newOrganization,
            {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                seterrors({});
                handleEdit();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>

            <Form onSubmit={handleSubmit} className="container-sm mt-5 border border-1 rounded-3 p-3">
                {
                    edit ?
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

                        :
                        <div className="organization__image">
                            <img src={image} alt={name} />
                        </div>

                }

                {errors.image && <Alert variant="danger">{errors.image}</Alert>}

                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        placeholder='Nombre'
                        id='name'
                        onChange={handleName}
                        value={name}
                        disabled={!edit}
                    />
                </Form.Group>
                {errors.name && <Alert variant="danger">{errors.name}</Alert>}


                <Form.Group className="mb-3">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                        type='number'
                        name='phone'
                        placeholder='Nombre'
                        id='phone'
                        onChange={handlePhone}
                        value={phone}
                        disabled={!edit}
                    />
                </Form.Group>
                {errors.phone && <Alert variant="danger">{errors.phone}</Alert>}

                <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        type='text'
                        name='address'
                        placeholder='Nombre'
                        id='address'
                        onChange={handleAddress}
                        value={address}
                        disabled={!edit}
                    />
                </Form.Group>
                {errors.address && <Alert variant="danger">{errors.address}</Alert>}

                <Form.Group className="mb-3">
                    <Form.Label>Texto de Bienvenida</Form.Label>
                    <Form.Control
                        type='text'
                        name='welcomeText'
                        placeholder='Nombre'
                        id='welcomeText'
                        onChange={handleWelcomeText}
                        value={welcomeText}
                        disabled={!edit}
                    />
                </Form.Group>
                {errors.welcomeText && <Alert variant="danger">{errors.welcomeText}</Alert>}

                {edit &&
                    <Button variant="primary" type="submit">
                        Editar Organización
                    </Button>}

            </Form>

        </>

    );
}


export default OrganizationForm;
