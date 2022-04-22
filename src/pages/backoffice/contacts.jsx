import React, { useEffect } from 'react'
import './contacts.css'
import GetAllContacts from './../../services/getAllContacts';
import { Table } from "react-bootstrap";
import { useState } from 'react';
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import axios from 'axios';
import { Link } from "react-router-dom";

const ContactsBackoffice = () => {
    const [ contacts, setContacts ] = useState({});
    const [ showTable, setShowTable] = useState(true);
    const [ sendComplete, setSendComplete] = useState({
        error: false,
        success: false,
        msg: '',
    });
    useEffect(() => {
      setContacts(GetAllContacts());    
      return () => {
        
      }
    }, [])    

    return (
        <>
            <div className="tableContainer">
                <div className="backButton">
                    <div>
                        <Link to='/backoffice'>🏠 Backoffice</Link>
                    </div>
                </div>
                <h3>Contactos</h3>
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
                                contacts?.map(news => {
                                    return (
                                        <tr key={news.id}>
                                            <td>{news.id}</td>
                                            <td>{news.name}</td>
                                            <td><img src={news.image} alt="news" /></td>
                                            <td>{news.createdAt}</td>
                                            <td>
                                                <div className="table__buttons">
                                                    <button
                                                        
                                                        className="btn btn-primary">Edit</button>
                                                    <button
                                                        
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
            </div>
        </>
    );
}
export default ContactsBackoffice