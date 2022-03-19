import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './slider.css';
/*
const dataTest =[
    {imageUrl:"https://somosmas.org/wp-content/uploads/2018/03/procesos-innovadores.jpg",
        text:"Procesos innovadores"},
    { imageUrl:"https://somosmas.org/wp-content/uploads/2018/03/como-lo-hacemos.jpg" , 
        text:"Como lo hacemos"},
    { imageUrl :"https://somosmas.org/wp-content/uploads/2018/03/historia.jpg", 
        text:"Historia"}
]
*/
const Slider = (props) => {
  return (
    <div>
        <Carousel fade>
            {
                props?.dataTest?.map( (item,index)=>{
                    return(
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={item.imageUrl}
                                alt={item.text}/>
                            <Carousel.Caption className='bg-text'>
                                <h3>{item.text}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>    
                    )
                })
            }           
        </Carousel>
    </div>
  )
}

export default Slider