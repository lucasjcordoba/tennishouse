import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { CardGroup } from 'react-bootstrap';
import * as actions from '../../../store/actions/index';

import ProductCard from './ProductCard/ProductCard';


class ProductGroup extends Component {

    addToCartHandler = (product) => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/login')
        } else {
            this.props.onAddToCart(product);
        }
    }


    onProductClickHandler = id => {
        this.props.history.push('/productos/' + id)
    }

    render() {
        let products = this.props.products.map(product => (

            <ProductCard
                key={product.id}
                clickCard={() => this.onProductClickHandler(product.id)}
                product={product}
                addToCart={() => this.addToCartHandler(product)}

            />

        ))

        return (
            <div>
                <CardGroup>
                    {products}
                </CardGroup>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (product) => dispatch(actions.addProductToCart(product))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductGroup));