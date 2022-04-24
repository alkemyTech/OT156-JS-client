import './news.css'
import { useState } from 'react';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import { GetAllSlides , deleteSlide } from './../../services/slides';
import SlidesForm from './../../components/SlidesForm/SlidesForm';

const SlidesBackOffice = () => {
    const { slides, setRefresh } = GetAllSlides();
    const [showEdit, setShowEdit] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [id, setId] = useState(null);
    const [showTable, setShowTable] = useState(true);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [sendComplete, setSendComplete] = useState({
        error: false,
        success: false,
        msg: '',
    });

    const handleEdit = () => {
        setSendComplete({
            error: false,
            success: true,
            msg: 'Slide Actualizado Correctamente.',
        });

        setShowTable(true);
        setId(null);
        setShowEdit(false);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Slide Actualizado Correctamente.',
            });
        }, 2000);
    }

    const handleShowEdit = (id) => {
        setId(id);
        setShowEdit(true);
        setShowTable(false);
    }

    const handleShowModalDelete = (id) => {
        setId(id);
        setShowModalDelete(true);
    }
    const handleDelete = () => {
        deleteSlide(id).then(res => {
            setSendComplete({
                error: false,
                success: true,
                msg: 'Slide Actualizado Correctamente.',
            });

            setId(null);
            setRefresh(true);
            setShowModalDelete(false);
            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Slide Actualizado Correctamente.',
                });
            }, 2000);
        }).catch(err => {
            setSendComplete({
                error: true,
                success: false,
                msg: 'Error al eliminar el Slide.',
            });

            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Error al eliminar el Slide.',
                });
            }, 2000);
        });

    }

    const handleNewTestimonial = () => {
        setShowCreate(true);
        setShowTable(false);
    }

    const handleCreate = () => {
        setSendComplete({
            error: false,
            success: true,
            msg: 'Slide Creado Correctamente.',
        });
        setShowCreate(false);
        setShowTable(true);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Slide Creado Correctamente.',
            });
        }, 2000);
    }

    const handleBack = () => {
        setShowEdit(false);
        setShowCreate(false);
        setShowTable(true);
        setId(null);
        setRefresh(true);
        setShowModalDelete(false);
    }


    return (
        <div className="tableContainer">
            <div className="backButton">
                <div>
                    <Link to='/backoffice'>🏠 Backoffice</Link>
                </div>
                {
                    showCreate || showEdit
                        ? <button className='cancelBtn' onClick={handleBack}>✖ Cancelar</button>
                        : <button onClick={handleNewTestimonial}>📰 Crear Slide</button>
                }
            </div>
            <h3>Slides</h3>
            {
                    showTable &&
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Texto</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        slides?.map(slide => {
                            return (
                                <tr key={slide.id}>
                                    <td>{slide.id}</td>
                                    <td>{slide.text}</td>
                                    <td><img src={slide.imageUrl} alt={slide.text}/></td>
                                    <td>
                                        <div className="table__buttons">
                                            <button
                                                onClick={() => handleShowEdit(slide.id)}
                                                className="btn btn-primary">Edit</button>
                                            <button
                                                onClick={() => handleShowModalDelete(slide.id)}
                                                className="btn btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>}
            {id && showEdit &&
                <SlidesForm
                    id={id}
                    handleEdit={handleEdit}
                />}

            {showCreate &&
                <SlidesForm
                    handleCreate={handleCreate}
                />
            }

            {sendComplete.success && (
                <SuccessAlert title={sendComplete.msg}>

                </SuccessAlert>
            )}
            {showModalDelete && <div className="modalDelete">
                <div className="modalDelete__container">
                    <h3>Está seguro de eliminar el slide?</h3>
                    <div className="modalDelete__container__buttons">
                        <button className="btn btn-success" onClick={() => setShowModalDelete(false)}>No, Volver</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Si, Eliminar</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default SlidesBackOffice;