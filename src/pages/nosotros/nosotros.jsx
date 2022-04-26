import './nosotros.css'
import { GetAllMembers } from './../../services/memebers';
const Nosotros = () => {
    const { members } = GetAllMembers();
    return (
        <div className="nosotros">
            <div className="nosotros__container">
                <div className="nosotros__container__title">
                    <h1>Nosotros</h1>
                </div>
                <div className="nosotros__container__text">
                    <p>
                        Buscamos contribuir a una sociedad que se reconoce como responsable de su propio bienestar, y trabaja de manera articulada con otras instituciones, entidades y organizaciones para lograrlo.
                        Tenemos 15 años de experiencia diseñando e implementando procesos innovadores de construcción colectiva que generen espacios de confianza, y favorezcan una adecuada relación entre diversos actores.
                    </p>
                </div>
                <div className="members__container__title">
                    <h3>Historia</h3>
                </div>
                <div className="nosotros__container__text">
                    <p>
                        Somos Más inicia como un grupo de voluntariado creado en el año 2.000 en la Universidad de los Andes, liderado por Jefferson Ramírez y Nicolás Martín, dos estudiantes de ingeniería de sistemas que estando en tercer semestre buscan cómo desde su profesión pueden apoyar iniciativas de impacto social. Después de un par de semestres, y el apoyo de profesores como Roberto Gutiérrez, Ernesto Lleras, Iván Darío Lobo y Andrés Dussán,  el grupo creció a involucrar a más de 100 voluntarios, incluyendo estudiantes de otras carreras. Con este grupo se desarrollaron acciones como la creación de un portal informativo para ONGs, donde éstas podían registrarse y publicar la información de sus organizaciones, al igual que enviar noticias y eventos relevantes de su trabajo. Este portal logra consolidarse como el principal directorio de organizaciones, noticias y eventos de organizaciones del sector social para la época, con alrededor de 3.000 organizaciones inscritas.
                    </p>
                    <p>
                        A medida que evoluciona el grupo y se desarrollan diversas actividades de apoyo a organizaciones sociales, toma fuerza una inquietud que motiva la orientación del trabajo de ahí en adelante: ¿cómo facilitar la articulación de esfuerzos entre iniciativas sociales, para que tengan mayor impacto colectivo? Con esta orientación se escoge el nombre “Somos Más” y se constituye legalmente en el año 2003 como una Corporación sin fines de lucro, con orientación de empresa social, buscando generar impacto social de forma sostenible sin necesidad de depender de donaciones.
                    </p>

                    <p>
                        Durante los primeros años de trabajo, Somos Más subsiste de desarrollar proyectos de tecnología para organizaciones sociales, lo que le permite invertir en iniciativas de fortalecimiento de redes de organizaciones sociales. En el 2005 deja de depender de proyectos de tecnología, y empieza a generar recursos que permiten enfocar el trabajo hacia el apoyo de redes de organizaciones sociales que trabajan en diversas temáticas, incluyendo protección a la infancia, adulto mayor, víctimas del conflicto, pobreza extrema, emprendimiento, innovación social, entre otros.
                    </p>
                    <p>
                        A partir del trabajo con redes de organizaciones, y viendo la relevancia del trabajo intersectorial para generar procesos transformativos, desde el 2009 Somos Más empieza a trabajar en proyectos que involucran a entidades públicas del orden local y nacional. Esto abre el camino a trabajar con iniciativas intersectoriales que permiten un mayor nivel de incidencia en políticas públicas, sostenibilidad más allá de los ciclos de cambios de gobiernos locales y nacionales, y en dinámicas de trabajo colectivo con mayor poder transformador.
                    </p>
                    <p>
                        En el 2012, Somos Más expande su trabajo a Europa, para lo cual Nicolás Martín (en el momento Director Ejecutivo) se traslada a Madrid y arma equipo con Carolina Escobar (anterior coordinadora de proyectos en Somos Más en el 2004, quien para ese entonces cuenta con varios años de experiencia como consultora en temas similares en Madrid). Entre tanto en Colombia, Ximena Lara, previa Directora Administrativa y Financiera es elegida como Directora Ejecutiva. En el 2013 Somos Más Europa abre otra sede en Bruselas, enfocada en proyectos a nivel Europeo. Luego de un período de maduración de Somos Más Europa, Nicolás regresa a Colombia y se reintegra en el equipo allí.
                    </p>
                    <p>
                        En el 2016, Ximena Lara se muda a Canadá donde continúa aportando como consultora de Somos Más, y Nicolás vuelve a ser elegido como Director Ejecutivo en Colombia.
                    </p>

            </div>
            <hr />
            <div className="members__container">
                <div className="members__container__title">
                    <h3>Nuestros Miembros</h3>
                </div>
                <div className="members__container__text">
                    <p>
                        Con un equipo de más de 180 personas, la vinculación de diversos líderes y colectivos, nuestro equipo de trabajo está constituido por comunicadores, ingenieros, administradores, psicólogos y economistas, quienes tienen como propósito  aportar desde las diferentes disciplinas para el  desarrollo de estrategias integradas de planificación y gestión de proyectos enfocados a activar la inteligencia colectiva en ecosistemas sociales.

                    </p>
                </div>

            </div>
            <div className="members__container__grid">
                {
                    members?.map(member => {
                        return (
                            <div className="member__card" key={member.id}>
                                <div className="member__card__image" style={{ backgroundImage: `url(${member.image})` }}>
                                </div>
                                <div className="member__card__name">
                                    <h3>{member.name}</h3>
                                </div>
                            </div>
                        )
                    }
                    )
                }



            </div>

        </div>
        </div >

    );
}

export default Nosotros;