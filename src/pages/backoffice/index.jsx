import './backoffice.css'
import Actividades from '../../assets/backoffice/actividades.svg'
import Categorias from '../../assets/backoffice/categorias.svg'
import Miembros from '../../assets/backoffice/miembros.svg'
import Novedades from '../../assets/backoffice/novedades.svg'
import Organizacion from '../../assets/backoffice/organizacion.svg'
import Slides from '../../assets/backoffice/slides.svg'
import Testimonios from '../../assets/backoffice/testimonios.svg'
import Usuarios from '../../assets/backoffice/usuarios.svg'
import { Link } from "react-router-dom";

const BackOffice = () => {
    return (
        <main className='backoffice'>
            <div className="backoffice__cardContainer">
                <div className="backoffice__card">
                    <h5>Actividades</h5>
                    <img src={Actividades} alt="Icono Activdades" />
                    <Link to='/backoffice/activities'>Ir</Link>
                </div>
            </div>
            <div className="backoffice__cardContainer">
                <div className="backoffice__card">
                    <h5>Categorias</h5>
                    <img src={Categorias} alt="Icono Activdades" />
                    <Link to='/backoffice/categories'>Ir</Link>
                </div>
            </div>
            <div className="backoffice__cardContainer">
                <div className="backoffice__card">
                    <h5>Miembros</h5>
                    <img src={Miembros} alt="Icono Activdades" />
                    <Link to='/backoffice/members'>Ir</Link>
                </div>
            </div>
            <div className="backoffice__cardContainer">
                <div className="backoffice__card">
                    <h5>Novedades</h5>
                    <img src={Novedades} alt="Icono Activdades" />
                    <Link to='/backoffice/news'>Ir</Link>
                </div>
            </div>
            <div className="backoffice__cardContainer">
                <div className="backoffice__card">
                    <h5>Organizacion</h5>
                    <img src={Organizacion} alt="Icono Activdades" />
                    <Link to='/backoffice/organization'>Ir</Link>
                </div>
            </div>
            <div className="backoffice__cardContainer">
                <div className="backoffice__card">
                    <h5>Slides</h5>
                    <img src={Slides} alt="Icono Activdades" />
                    <Link to='/backoffice/slides'>Ir</Link>
                </div>
            </div>
            <div className="backoffice__cardContainer">
                <div className="backoffice__card">
                    <h5>Testimonios</h5>
                    <img src={Testimonios} alt="Icono Activdades" />
                    <Link to='/backoffice/testimonials'>Ir</Link>
                </div>
            </div>
            <div className="backoffice__cardContainer">
                <div className="backoffice__card">
                    <h5>Usuarios</h5>
                    <img src={Usuarios} alt="Icono Activdades" />
                    <Link to='/backoffice/users'>Ir</Link>
                </div>
            </div>
        </main>
    );
}

export default BackOffice;