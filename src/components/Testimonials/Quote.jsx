import './styles.css'
import QuotesIcon from '../../assets/QuotesIcon.svg'

const Quote = ({ setTouchStart, handleSlide, testimonial, testimonials, handleMouse }) => {
    return (
        <div className="testimonials__quote"
            onTouchStart={e => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={handleSlide}
            onMouseDown={e => setTouchStart(e.clientX)}
            onMouseUp={handleMouse}>
            <div className="quote__image" style={{backgroundImage:`url(${testimonial?.image})`}}>
            </div>
            <img src={QuotesIcon} alt="quotes" />
            <blockquote>
                {testimonial?.content}
            </blockquote>
            <p className="testimonials__quote__author">
                ~ {testimonial?.name} ~
            </p>
            <div className="testimonials__quote__navigation">
                {
                    testimonials?.map(testimonials => {

                        if (testimonial?.id === testimonials?.id) {

                            return (<div className="element__circle active" key={testimonials?.id}>
                            </div>)
                        }
                        else {
                            return (<div className="element__circle" key={testimonials?.id}>
                            </div>)
                        }

                    })}
            </div>
        </div>
    );
}

export default Quote;