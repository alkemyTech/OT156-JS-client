import { useState } from 'react';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import { deleteUsers, GetAllUsers  } from '../../services/users';
import EditUser from '../../components/EditUser/EditUser';

const UsersBackOffice = () => {
    const { users, setRefresh } = GetAllUsers();
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
            msg: 'Ususario Actualizado Correctamente.',
        });

        setShowTable(true);
        setId(null);
        setShowEdit(false);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Ususario Actualizado Correctamente.',
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
        deleteUsers(id).then(res => {
            setSendComplete({
                error: false,
                success: true,
                msg: 'Ususario Eliminado Correctamente.',
            });

            setId(null);
            setRefresh(true);
            setShowModalDelete(false);
            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Ususario Eliminado Correctamente.',
                });
            }, 2000);
        }).catch(err => {
            setSendComplete({
                error: true,
                success: false,
                msg: 'Error al eliminar el Ususario.',
            });

            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Error al eliminar el Ususario.',
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
            msg: 'Ususario Creado Correctamente.',
        });
        setShowCreate(false);
        setShowTable(true);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Ususario Creado Correctamente.',
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
                        && <button className='cancelBtn' onClick={handleBack}>✖ Cancelar</button>
                }
            </div>
            <h3>Usuarios</h3>
            {
                    showTable &&
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className="table__buttons">
                                            <button
                                                onClick={() => handleShowEdit(user.id)}
                                                className="btn btn-primary">Edit</button>
                                            <button
                                                onClick={() => handleShowModalDelete(user.id)}
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
                <EditUser
                    id={id}
                    handleEdit={handleEdit}
                    role={'admin'}
                />}

            {showCreate &&
                <EditUser
                    handleCreate={handleCreate}
                    role={'admin'}
                />
            }

            {sendComplete.success && (
                <SuccessAlert title={sendComplete.msg}>

                </SuccessAlert>
            )}
            {showModalDelete && <div className="modalDelete">
                <div className="modalDelete__container">
                    <h3>Está seguro de eliminar el Ususario?</h3>
                    <div className="modalDelete__container__buttons">
                        <button className="btn btn-success" onClick={() => setShowModalDelete(false)}>No, Volver</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Si, Eliminar</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default UsersBackOffice;