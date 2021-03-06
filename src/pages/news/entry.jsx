import React from 'react';
import './entry.css';
import { GetNewsById } from './../../services/news';

const Entry = () => {
    const { news } = GetNewsById({ id: document.location.pathname.slice(9,) });
    console.log(news)
    return (
        <div className="entry__container">
            {news.name ? <>
                <div className="entry__title">
                    <h1>{news.name}</h1>
                </div>
                <div className="entry__image" style={{ backgroundImage: `url('${news.image}')` }}>
                </div>
                <hr />
                <div className="entry__content" dangerouslySetInnerHTML={{ __html: news.content }}>
                </div>
            </>
            :<>
                <h1>No se encontrĂ³ la noticia</h1>
            </>}
        </div>
    );
}

export default Entry;