import './news.css'
import { GetAllActivities } from '../../services/activities';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ActivitiesForm from '../../components/ActivitiesForm/ActivitiesForm';
import { useState } from 'react';
import axios from 'axios';
import SuccessAlert from '../../components/Alerts/SuccessAlert';

const ActivitiesBackoffice = () => {
    const token = localStorage.getItem("token");
    const { activities, setRefresh } = GetAllActivities();
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
            msg: 'Actividad Actualizada Correctamente.',
        });

        setShowTable(true);
        setId(null);
        setShowEdit(false);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Actividad Actualizada Correctamente.',
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
        axios.delete(`http://localhost:3000/activities/${id}`,
        {
            headers: {
                Authorization: `${token}`
            }
        }
        ).then(res => {
            setSendComplete({
                error: false,
                success: true,
                msg: 'Actividad Eliminada Correctamente.',
            });

            setShowTable(true);
            setId(null);
            setRefresh(true);
            setShowModalDelete(false);
            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Actividad Eliminada Correctamente.',
                });
            }, 2000);
        }).catch(err => {
            setSendComplete({
                error: true,
                success: false,
                msg: 'Error al eliminar la novedad.',
            });

            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Error al eliminar la novedad.',
                });
            }, 2000);
        });

    }

    const handleNewNews = () => {
        setShowCreate(true);
        setShowTable(false);
    }

    const handleCreate = () => {
        setSendComplete({
            error: false,
            success: true,
            msg: 'Actividad Creada Correctamente.',
        });
        setShowCreate(false);
        setShowTable(true);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Actividad Creada Correctamente.',
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
        <>
            <div className="tableContainer">
                <div className="backButton">
                    <div>
                        <Link to='/backoffice'>🏠 Backoffice</Link>
                    </div>

                    {
                        showCreate || showEdit
                            ? <button className='cancelBtn' onClick={handleBack}>✖ Cancelar</button>
                            : <button onClick={handleNewNews}>🏃‍♂️ Crear Actividad</button>
                    }
                </div>
                <h3>Actividades</h3>
                {
                    showTable &&
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                activities.map(activity => {
                                    return (
                                        <tr key={activity.id}>
                                            <td>{activity.id}</td>
                                            <td>{activity.name}</td>
                                            <td><img src={activity.image} alt="activity" /></td>
                                            <td>{activity.createdAt}</td>
                                            <td>
                                                <div className="table__buttons">
                                                    <div className="table__buttons">
                                                        <button
                                                            onClick={() => handleShowEdit(activity.id)}
                                                            className="btn btn-primary">Edit</button>
                                                        <button
                                                            onClick={() => handleShowModalDelete(activity.id)}
                                                            className="btn btn-danger">Delete</button>
                                                    </div>
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>}

                    {id && showEdit &&
                    <ActivitiesForm
                        id={id}
                        handleEdit={handleEdit}
                    />}

                {showCreate &&
                    <ActivitiesForm
                        handleCreate={handleCreate}
                    />
                }
                {sendComplete.success && (
                    <SuccessAlert title={sendComplete.msg}>

                    </SuccessAlert>
                )}

            </div>
            {showModalDelete && <div className="modalDelete">
                <div className="modalDelete__container">
                    <h3>Está seguro de eliminar la novedad?</h3>
                    <div className="modalDelete__container__buttons">
                        <button className="btn btn-success" onClick={() => setShowModalDelete(false)}>No, Volver</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Si, Eliminar</button>
                    </div>
                </div>
            </div>}

        </>
    );
}

export default ActivitiesBackoffice;