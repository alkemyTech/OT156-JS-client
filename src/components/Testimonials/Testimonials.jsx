import './styles.css'
import { useEffect, useState } from 'react';
import Quote from './Quote';
import { GetAllTestimonials } from '../../services/testimonials';

const Testimonials = () => {
    const { testimonials } = GetAllTestimonials();
    const [testimonial, setTestimonial] = useState();
    const [touchStart, setTouchStart] = useState(0);

    useEffect(() => {
        if (testimonials.length > 0) {
            setTestimonial(testimonials[0]);
        }

    }, [testimonials]);

    setTimeout(() => {
        nextQuote()
    }, 4000);
    
    const prevQuote = () => {
        if (testimonial.id === 1) {
            setTestimonial(testimonials[testimonials.length - 1])
        } else {
            setTestimonial(testimonials[testimonial.id - 2])
        }
    }

    const nextQuote = () => {
        if (testimonial.id === testimonials.length) {
            setTestimonial(testimonials[0])
        } else {
            setTestimonial(testimonials[testimonial.id])
        }
    }


    const handleSlide = (e) => {
        if (touchStart - e.changedTouches[0].clientX >= 60) {
            prevQuote()
        } else if (e.changedTouches[0].clientX - touchStart >= 60) {
            nextQuote()
        }
    }

    const handleMouse = (e) => {
        if (e.clientX - touchStart >= 60) {
            nextQuote()
        } else if (touchStart - e.clientX >= 60) {
            prevQuote()
        }
    }

    return (
        <div className="testimonials">
            <Quote
                setTouchStart={setTouchStart}
                handleSlide={handleSlide}
                testimonial={testimonial}
                testimonials={testimonials}
                handleMouse={handleMouse}
            />
        </div>
    );
}

export default Testimonials;