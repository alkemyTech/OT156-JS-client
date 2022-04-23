import './news.css'
import { useState } from 'react';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import { deleteTestimonials, GetAllTestimonials } from '../../services/testimonials';

const TestimonialsBackOffice = () => {
    const { testimonials, setRefresh } = GetAllTestimonials();
    const [id, setId] = useState(null);
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
        deleteTestimonials(id).then(res => {
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
                    msg: 'Testimonio Eliminado Correctamente.',
                });
            }, 2000);
        }).catch(err => {
            setSendComplete({
                error: true,
                success: false,
                msg: 'Error al eliminar el Testimonio.',
            });

            setTimeout(() => {
                setSendComplete({
                    error: false,
                    success: false,
                    msg: 'Error al eliminar el Testimonio.',
                });
            }, 2000);
        });

    }
    return (
        <div className="tableContainer">
            <div className="backButton">
                <div>
                    <Link to='/backoffice'>🏠 Backoffice</Link>
                </div>
            </div>
            <h3>Testimonios</h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Contenido</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        testimonials?.map(testimonial => {
                            return (
                                <tr key={testimonial.id}>
                                    <td>{testimonial.id}</td>
                                    <td>{testimonial.name}</td>
                                    <td>{testimonial.content}</td>
                                    <td>
                                        <button
                                            onClick={() => handleShowModalDelete(testimonial.id)}
                                            className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {sendComplete.success && (
                <SuccessAlert title={sendComplete.msg}>

                </SuccessAlert>
            )}
            {showModalDelete && <div className="modalDelete">
                <div className="modalDelete__container">
                    <h3>Está seguro de eliminar el testimonio?</h3>
                    <div className="modalDelete__container__buttons">
                        <button className="btn btn-success" onClick={() => setShowModalDelete(false)}>No, Volver</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Si, Eliminar</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default TestimonialsBackOffice;