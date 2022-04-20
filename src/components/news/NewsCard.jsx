import React from 'react';
import './newsCard.css';

const NewsCard = (props) => {

    const { id, imageNews, titleNews, textNews } = props;

    return (
        <article className="news-post">
            <a href='#'>
                <div className="image__top" style={{backgroundImage: `url('${imageNews}')`}}> 
                
                </div>
            </a>
            <h4 className='title'>
                <a>{titleNews}</a>
            </h4>
            <div className='post-content' >
                <div className='post-content-inner' dangerouslySetInnerHTML={{ __html: textNews }}>
                </div>
            </div>
            <div className='leer-mas'>
                <a href='#' > Leer mas. </a>
            </div>
        </article>
    )
}

export default NewsCard