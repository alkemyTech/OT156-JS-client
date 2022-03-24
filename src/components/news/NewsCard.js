import React from 'react';
import './newsCard.css';

const NewsCard = (props) => {

    const { id , imageNews , titleNews , textNews } = props.data;

    return (
        <article className = "news-post ">
            <a href = '#'>
                <img className = 'news-image' 
                    src = {imageNews} 
                    alt = {titleNews} 
                    height = "200px" 
                    width = "300px"
                />
            </a>
            <h2 className = 'title'>
                <a>{ titleNews }</a>
            </h2>
            <div className = 'post-content' >
                <div className = 'post-content-inner' >
                    <p> { textNews } </p>
                </div>
            </div>
            <div>
                <a className = 'leer-mas' href = '#' > Leer mas. </a>
            </div>
        </article>
    )
}

export default NewsCard