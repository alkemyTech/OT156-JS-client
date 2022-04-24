import { GetAllActivities } from '../../services/activities';
import AcitivityCard from './AcitivityCard';
import './actividades.css'
const Actividades = () => {
    const {activities} = GetAllActivities();

    return (
        <main className='actividades'>
            <h1>Actividades</h1>
            <div className="actividades__container">
                {
                    activities.map(item => {
                        return (
                            <AcitivityCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                content={item.content}
                            />
                        )
                    })
                }
            </div>
        </main>
    );
}

export default Actividades;