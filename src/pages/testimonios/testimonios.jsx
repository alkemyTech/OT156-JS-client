import './testimonios.css';
import { useEffect, useState } from 'react';
import { GetAllTestimonials } from '../../services/testimonials';
import Quote from '../../components/Testimonials/Quote';

const Testimonios = () => {
    const { testimonials } = GetAllTestimonials();

    return (
        <div className="testimonios">
            <div className="testimonios__container">

                <div className="testimonios__container__title">
                    <h1>Testimonios</h1>
                </div>

                <div className="testimonios__container__quotes">
                    <div className="testimonios__container__quotes__quote">

                        {
                            testimonials?.map(testimonial => (
                                <Quote
                                    testimonial={testimonial}
                                    testimonials={testimonials}
                                />
                            ))

                        }

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Testimonios;