import './news.css'
import { useState } from 'react';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import { deleteCategory, GetAllCategories } from '../../services/categories';
import { GetAllMembers } from './../../services/memebers';

const MembersBackOffice = () => {
    const { members, setRefresh } = GetAllMembers();

    return (
        <div className="tableContainer">
            <div className="backButton">
                <div>
                    <Link to='/backoffice'>🏠 Backoffice</Link>
                </div>
            </div>
            <h3>Miembros</h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        members.map(member => {
                            return (
                                <tr key={member.id}>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>
                                        <img src={member.image} alt={member.name} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default MembersBackOffice;