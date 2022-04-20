import './news.css';
import { GetAllNews } from '../../services/news';
import NewsCard from './NewsCard';

const News = () => {
    const { news } = GetAllNews();
    return (
        <main className='news'>
            <h1>Novedades</h1>
            <div className="news__container">
                {
                    news.map(item => {
                        return (
                            <NewsCard
                                key={item.id}
                                id={item.id}
                                titleNews={item.name}
                                imageNews={item.image}
                                textNews={item.content}
                            />
                        )
                    })
                }
            </div>
        </main>

    );
}

export default News;