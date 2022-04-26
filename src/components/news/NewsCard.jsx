import React from 'react';
import './newsCard.css';
import { Link } from 'react-router-dom';
const NewsCard = (props) => {

    const { id, imageNews, titleNews, textNews } = props;

    return (
        <article className="news-post">
            <Link to={`/novedad/${id}`}>
                <div className="image__top" style={{ backgroundImage: `url('${imageNews}')` }}>

                </div>
            </Link>

            <div className="title">
                <Link to={`/novedad/${id}`}>

                    {titleNews}

                </Link>
            </div>

            <div className='post-content' >
                <div className='post-content-inner' dangerouslySetInnerHTML={{ __html: textNews }}>
                </div>
            </div>
            <div className='leer-mas'>
                <Link to={`/novedad/${id}`}>
                    Leer mas.
                </Link>
            </div>
        </article>
    )
}

export default NewsCard