import React from 'react';
import './newsCard.css';

const NewsCard = (props) => {
    const {id, imageNews , titleNews , textNews} = props.data;
    //
  return (
    <article className="news-post ">
        <a href='#'>
            <img className='news-image' src={imageNews} alt={titleNews} height="200px" width="300px"/></a>
        <h2 className='title'>
            <a>{titleNews}</a>
        </h2>
        <div className='post-content' >
            <div className='post-content-inner'>
                <p>{textNews}</p>
            </div>
        </div>
        <div>
            <a className='leer-mas' href='#'>Leer mas.</a>
        </div>
    </article>
  )
}

export default NewsCard



 //src="https://i0.wp.com/somosmas.org/wp-content/uploads/2020/04/vaki-1.jpg" 

 //<img loading="lazy" src="https://i0.wp.com/somosmas.org/wp-content/uploads/2020/04/vaki-1.jpg?resize=400%2C250&amp;ssl=1" alt="Juntos por el Poder Colectivo" class="" srcset="https://i0.wp.com/somosmas.org/wp-content/uploads/2020/04/vaki-1.jpg?fit=2468%2C1000&amp;ssl=1 479w, https://i0.wp.com/somosmas.org/wp-content/uploads/2020/04/vaki-1.jpg?resize=400%2C250&amp;ssl=1 480w " sizes="(max-width:479px) 479px, 100vw " width="400" height="250">