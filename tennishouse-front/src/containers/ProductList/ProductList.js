import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom'
import axios from 'axios';
import * as actions from '../../store/actions/index'

import { CardColumns, Button } from 'react-bootstrap';
import ProductCard from '../../components/Products/ProductGroup/ProductCard/ProductCard'
import classes from './ProductList.module.css'


class ProductList extends Component {
    state = {
        products: [],
        nextPage: null,
        start: 10,
        categories: [],
        filter: 'todas las categorias'
    }
    async componentDidMount() {

        let res = await axios.get('http://localhost:3000/productos/listaCategorias')
        const categories = res.data.data

        this.getProducts(this.props.location.search);

        this.setState({ categories: categories })
    }

    componentWillReceiveProps(nextProps){
        if(this.props.location.search !== nextProps.location.search) {

            this.setState({ products: [], nextPage: null, start: 10})
            this.getProducts(nextProps.location.search);
        }
    }

    getProducts =  async (param) => {
       
        let query = param !== '' ? param : '';
        let url = `http://localhost:3000/productos${query}`
        let response = await axios.get(url);
        
        let id = query.slice(-1);
        const categoria = this.state.categories.find(category => category.id === +id);

        let filter = 'todas las categorias'
        if(categoria){
            filter = `categoria ${categoria.nombre}`
        }

        let pagination = false;
        if (response.data.pagination.next_page) {
            pagination = response.data.pagination.next_page;
        }

        this.setState({ products: response.data.data, nextPage: pagination, filter: filter})
    }

    

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

    moreProductsHandler = async () => {
        let updatedProducts = [...this.state.products];
        let query = ''
        if(this.props.location.search !== ''){
            query = this.props.location.search
        }
        
        
        let url = `http://localhost:3000/productos${this.state.nextPage}&${query.substr(1)}&`
        
        let response = await axios.get(url);
        updatedProducts = updatedProducts.concat(response.data.data);

        let pagination = false;
        let start = this.state.start + 10;

        if (response.data.pagination.next_page) {
            pagination = `?start=${start}`;
        }
        this.setState({ products: updatedProducts, start: start, nextPage: pagination })
    }

    render() {
        let products = this.state.products.map(product => (
            <ProductCard
                key={product.id}
                clickCard={() => this.onProductClickHandler(product.id)}
                product={product}
                addToCart={() => this.addToCartHandler(product)}

            />
        ))
        let categorias = this.state.categories.map(category => (
            <NavLink key={category.id} to={`/productos?categoria=${category.id}`}>{category.nombre}</NavLink>
        ))
        return (
            <>
                <div className={classes.TabbedPageLinks}>
                    <NavLink to="/productos" exact>Todos</NavLink>
                    {categorias}

                </div>
                <div className={classes.ProductList}>

                    <h2>Productos en {this.state.filter}</h2>
                    <CardColumns>
                        {products}
                    </CardColumns>
                    <Button variant="outline-success" onClick={this.moreProductsHandler} disabled={!this.state.nextPage}>Cargas mas productos..</Button>
                </div>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));