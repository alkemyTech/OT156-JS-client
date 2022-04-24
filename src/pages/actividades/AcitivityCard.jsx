import React from 'react';
import './ActivityCard.css';
import { Link } from 'react-router-dom';
const AcitivityCard = (props) => {
    const { id, name, image, content } = props;
    return (
        <article className="activity-post">
            <Link to={`/actividad/${id}`}>
                <div className="image__top" style={{ backgroundImage: `url('${image}')` }}>

                </div>
            </Link>

            <div className="title">
                <Link to={`/actividad/${id}`}>

                    {name}

                </Link>
            </div>

            <div className='post-content' >
                <div className='post-content-inner' dangerouslySetInnerHTML={{ __html: content }}>
                </div>
            </div>
            <div className='leer-mas'>
                <Link to={`/actividad/${id}`}>
                    Leer mas
                </Link>
            </div>
        </article>
    );
}

export default AcitivityCard;