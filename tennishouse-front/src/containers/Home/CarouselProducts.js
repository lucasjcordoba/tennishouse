import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'

class CarouselProducts extends Component {

    render() {

        return (
                <div>
                 <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./img/banner01.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>


                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./img/banner02.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>


                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="./img/banner03.jpg"
                        alt="Third slide"
                        />
                        <Carousel.Caption>


                        </Carousel.Caption>
                    </Carousel.Item>
                 </Carousel>
                </div>          
        )
    }
}
export default CarouselProducts;