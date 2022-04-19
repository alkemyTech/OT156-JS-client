import './news.css'
import { GetAllNews } from './../../services/news';
import { Table } from "react-bootstrap";
import { useState } from 'react';
import NewsForm from '../../components/NewsForm/NewsForm';
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import axios from 'axios';
import { Link } from "react-router-dom";

const NewsBackoffice = () => {
    const { news, setRefresh } = GetAllNews();
    const [showEdit, setShowEdit] = useState(false);
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
            msg: 'Novedad Actualizada Correctamente.',
        });

        setShowTable(true);
        setId(null);
        setShowEdit(false);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Novedad Actualizada Correctamente.',
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
        axios.delete(`http://localhost:3000/news/${id}`).then(res => {
            setSendComplete({
                error: false,
                success: true,
                msg: 'Novedad Eliminada Correctamente.',
            });

            setShowTable(true);
            setId(null);
            setRefresh(true);
            setShowModalDelete(false);
            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Novedad Eliminada Correctamente.',
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

    return (
        <>
            <div className="tableContainer">
                <div className="backButton">
                    <div>
                        <Link to='/backoffice'>🏠 Backoffice</Link>
                    </div>
                </div>
                <h3>Novedades</h3>
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
                                news.map(news => {
                                    return (
                                        <tr key={news.id}>
                                            <td>{news.id}</td>
                                            <td>{news.name}</td>
                                            <td><img src={news.image} alt="news" /></td>
                                            <td>{news.createdAt}</td>
                                            <td>
                                                <div className="table__buttons">
                                                    <button
                                                        onClick={() => handleShowEdit(news.id)}
                                                        className="btn btn-primary">Edit</button>
                                                    <button
                                                        onClick={() => handleShowModalDelete(news.id)}
                                                        className="btn btn-danger">Delete</button>
                                                </div>
                                            </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                }

                {id && showEdit &&
                    <NewsForm
                        id={id}
                        handleEdit={handleEdit}
                    />}
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

export default NewsBackoffice;