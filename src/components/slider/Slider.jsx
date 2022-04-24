import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'
import { GetAllSlides } from '../../services/slides';

import './slider.css';

const Slider = () => {
    const { slides } = GetAllSlides();
    const [data, setData] = useState([]);
    const [current, setCurrent] = useState(0);
    const delay = 5000;

    useEffect(() => {
        if(slides.length > 0) {
            setData(slides);
        }
    }, [slides])

    const prevSlide = () => {
        setCurrent(current === 0 ? data.length - 1 : current - 1)
    }
    const nextSlide = () => {
        setCurrent(current === data.length - 1 ? 0 : current + 1)
    }
    useEffect(() => {
        const id = setTimeout(() => nextSlide(), delay);
        return () => clearTimeout(id);
    }, [current]);

    if (!Array.isArray(data) || data.length <= 0) {
        return null;
    };
    return (
        <section className='slider'>
            <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
            <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
            {
                data?.map((slide, index) => {
                    return (
                        <div className={index === current ? 'slide active' : 'slide'} key={index} >
                            {index === current && <div>
                                <img src={slide.imageUrl} alt={slide.text} className='image' />
                                <h3>{slide.text}</h3>
                            </div>}
                        </div>)
                })}
        </section>
    )
}

export default Slider