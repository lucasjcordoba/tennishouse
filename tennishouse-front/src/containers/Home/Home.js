import React, { Component } from 'react'
import axios from 'axios'


import { withRouter } from 'react-router-dom'
import classes from './Home.module.css';

import ProductGroup from '../../components/Products/ProductGroup/ProductGroup';
import CarouselBanner from './CarouselBanner';
import MarcasBanner from './MarcasBanner';
import Spinner from '../../components/UI/Spinner/Spinner'

// import Prueba from '../../components/Products/ProductGroup/ProductCard/Prueba'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'


class Home extends Component {
    state = {
        topProducts: {
            all: [],
            group: [],
            slide: 1
        },
        newProducts: {
            all: [],
            group: [],
            slide: 1
        },
        loading: true
    }

    async componentDidMount() {

        
        try {
            // this.setState({loading: true});
            let updatedTopProducts = { ...this.state.topProducts }
            let res = await axios.get('http://localhost:3000/productos/top')
            updatedTopProducts.all = res.data.data;
            updatedTopProducts.group = res.data.data.slice(0, 3);
            

            let updatedNewProducts = { ...this.state.newProducts }
            res = await axios.get('http://localhost:3000/productos/new')
            updatedNewProducts.all = res.data.data;
            updatedNewProducts.group = res.data.data.slice(0, 3);

            this.setState({ topProducts: updatedTopProducts, newProducts: updatedNewProducts, loading: false })
        } catch (err) {
            console.log(err)
        }
    }

    updateGroupHandler = (group, slide, type) => {
        let updatedGroupProducts = { ...this.state[type] }
        updatedGroupProducts.group = group;
        updatedGroupProducts.slide = slide;
        this.setState({ [type]: updatedGroupProducts })
    }

    carouselNextHandler = (type) => {
        let updateGroup = [];
        let slide = null;
        switch (this.state[type].slide) {
            case 1:
                updateGroup = this.state[type].all.slice(3, 6);
                slide = this.state[type].slide % 3 + 1;
                return this.updateGroupHandler(updateGroup, slide, type);
            case 2:
                updateGroup = this.state[type].all.slice(6, 9);
                slide = this.state[type].slide % 3 + 1;
                return this.updateGroupHandler(updateGroup, slide, type);
            case 3:
                updateGroup = this.state[type].all.slice(0, 3);
                slide = this.state[type].slide % 3 + 1;
                return this.updateGroupHandler(updateGroup, slide, type);
            default: return;
        }
    }

    carouselPrevHandler = (type) => {

        let updateGroup = [];
        let slide = null;
        switch (this.state[type].slide) {
            case 1:
                updateGroup = this.state[type].all.slice(3, 6);
                slide = 3;
                return this.updateGroupHandler(updateGroup, slide, type);
            case 2:
                updateGroup = this.state[type].all.slice(6, 9);
                slide = this.state[type].slide - 1;
                return this.updateGroupHandler(updateGroup, slide, type);
            case 3:
                updateGroup = this.state[type].all.slice(0, 3);
                slide = this.state[type].slide - 1;
                return this.updateGroupHandler(updateGroup, slide, type);
            default: return;
        }
    }

    render() {

        return (
            <>  
            {this.state.loading ? <Spinner /> : (
                <>
                <CarouselBanner />

                <div className={classes.Products}>

                    <h3>TOP RANKEADOS</h3>

                    <div className={classes.CarouselProducts}>
                        <div className={classes.CarouselSpacers}>
                            <div className={classes.CarouselBtn}>
                                <FontAwesomeIcon onClick={() => this.carouselPrevHandler('topProducts')} icon={faArrowCircleLeft} size="4x" />
                            </div>
                        </div>
                        <ProductGroup products={this.state.topProducts.group} />
                        <div className={classes.CarouselSpacers}>
                            <div className={classes.CarouselBtn}>
                                <FontAwesomeIcon onClick={() => this.carouselNextHandler('topProducts')} icon={faArrowCircleRight} size="4x" />
                            </div>
                        </div>
                    </div>

                    <h3>NUEVOS INGRESOS</h3>

                    <div className={classes.CarouselProducts}>
                        <div className={classes.CarouselSpacers}>
                            <div className={classes.CarouselBtn}>
                                <FontAwesomeIcon onClick={() => this.carouselPrevHandler('newProducts')} icon={faArrowCircleLeft} size="4x" />
                            </div>
                        </div>
                        <ProductGroup products={this.state.newProducts.group} />
                        <div className={classes.CarouselSpacers}>
                            <div className={classes.CarouselBtn}>
                                <FontAwesomeIcon onClick={() => this.carouselNextHandler('newProducts')} icon={faArrowCircleRight} size="4x" />
                            </div>
                        </div>
                    </div>

                </div>

                
                
                <div className={classes.MarcasBanner}>
                    <MarcasBanner />
                </div>
                </>
            )}
                            
                


            </>
        )
    }
}


export default withRouter(Home);