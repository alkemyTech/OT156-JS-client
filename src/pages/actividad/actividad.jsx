import React from 'react';
import '../news/entry.css';
import { GetActivitiesById } from '../../services/activities';

const Actividad = () => {
    const { activity } = GetActivitiesById({ id: document.location.pathname.slice(11,) });

    return (
        <div className="entry__container">
            {activity.name ? <>
                <div className="entry__title">
                    <h1>{activity.name}</h1>
                </div>
                <div className="entry__image" style={{ backgroundImage: `url('${activity.image}')` }}>
                </div>
                <hr />
                <div className="entry__content" dangerouslySetInnerHTML={{ __html: activity.content }}>
                </div>
            </>
                : <>
                    <h1>No se encontró la actividad</h1>
                </>}
        </div>
    );
}

export default Actividad;