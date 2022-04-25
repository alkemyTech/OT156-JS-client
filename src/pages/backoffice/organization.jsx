import './news.css'
import { useState } from 'react';
import { Link } from "react-router-dom";
import SuccessAlert from '../../components/Alerts/SuccessAlert';
import OrganizationForm from '../../components/OrganizationForm/OrganizationForm';
import { GetOrganizationById } from './../../services/organization';

const OrganizationBackOffice = () => {
    const { organization, setRefresh } = GetOrganizationById({ id: 1 })
    const [showEdit, setShowEdit] = useState(false);
    const [sendComplete, setSendComplete] = useState({
        error: false,
        success: false,
        msg: '',
    });

    const handleEdit = () => {
        setSendComplete({
            error: false,
            success: true,
            msg: 'Organización Actualizado Correctamente.',
        });
        setShowEdit(false);
        setRefresh(true);
        setTimeout(() => {
            setSendComplete({
                error: false,
                success: false,
                msg: 'Organización Actualizado Correctamente.',
            });
        }, 2000);
    }

    const handleShowEdit = (id) => {
        setShowEdit(true);
    }

    const handleBack = () => {
        setShowEdit(false);
        setRefresh(true);
    }


    return (
        <div className="tableContainer">
            <div className="backButton">
                <div>
                    <Link to='/backoffice'>🏠 Backoffice</Link>
                </div>
                {
                    showEdit
                        ? <button className='cancelBtn' onClick={handleBack}>✖ Cancelar</button>
                        : <button onClick={handleShowEdit}>🏤 Editar Organización</button>
                }
            </div>
            <h3>Organización</h3>

            {showEdit ?
                <OrganizationForm
                    organization={organization}
                    edit={true}
                    handleEdit={handleEdit}
                />
                : <OrganizationForm
                    organization={organization}
                />

            }

            {sendComplete.success && (
                <SuccessAlert title={sendComplete.msg}>

                </SuccessAlert>
            )}

        </div>
    );
}

export default OrganizationBackOffice;