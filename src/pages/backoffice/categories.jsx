import './news.css'
import { useState } from 'react';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import { deleteCategory, GetAllCategories } from '../../services/categories';
import CategoriesForm from '../../components/CategoriesForm/CategoriesForm';

const CategoriesBackOffice = () => {
    const { categories, setRefresh } = GetAllCategories();
    const [id, setId] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [showTable, setShowTable] = useState(true);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [sendComplete, setSendComplete] = useState({
        error: false,
        success: false,
        msg: '',
    });

    const handleShowModalDelete = (id) => {
        setId(id);
        setShowModalDelete(true);
    }
    const handleDelete = () => {
        deleteCategory(id).then(res => {
            setSendComplete({
                error: false,
                success: true,
                msg: 'Categoria Eliminada Correctamente.',
            });

            setId(null);
            setRefresh(true);
            setShowModalDelete(false);
            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Categoria Eliminada Correctamente.',
                });
            }, 2000);
        }).catch(err => {
            setSendComplete({
                error: true,
                success: false,
                msg: 'Error al eliminar la Categoria.',
            });

            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Error al eliminar la Categoria.',
                });
            }, 2000);
        });

    }

    const handleNewCategory = () => {
        setShowCreate(true);
        setShowTable(false);
    }

    const handleCreate = () => {
        setSendComplete({
            error: false,
            success: true,
            msg: 'Categoria Creada Correctamente.',
        });
        setShowCreate(false);
        setShowTable(true);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Categoria Creada Correctamente.',
            });
        }, 2000);
    }

    const handleBack = () => {
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
                    showCreate
                        ? <button className='cancelBtn' onClick={handleBack}>✖ Cancelar</button>
                        : <button onClick={handleNewCategory}>📰 Crear Categoría</button>
                }
            </div>
            <h3>Categorias</h3>
            {
                showTable &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Categoria</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(category => {
                                return (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <button
                                                onClick={() => handleShowModalDelete(category.id)}
                                                className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>}
            {sendComplete.success && (
                <SuccessAlert title={sendComplete.msg}>

                </SuccessAlert>
            )}
            {showCreate &&
                <CategoriesForm
                    handleCreate={handleCreate}
                />
            }
            {showModalDelete && <div className="modalDelete">
                <div className="modalDelete__container">
                    <h3>Está seguro de eliminar la Categoria?</h3>
                    <div className="modalDelete__container__buttons">
                        <button className="btn btn-success" onClick={() => setShowModalDelete(false)}>No, Volver</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Si, Eliminar</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default CategoriesBackOffice;