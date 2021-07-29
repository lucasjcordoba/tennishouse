import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import { Card, Button } from 'react-bootstrap';
import * as actions from '../../../store/actions/index';
import classes from './ProductDetail.module.css'

class ProductDetail extends Component {

    state = {
        product: null,
        error: true
    }


    async componentDidMount() {

        try {
            let res = await axios.get('http://localhost:3000/productos/' + this.props.match.params.id);
            if (res.data.meta.status !== 404) {
                const producto = res.data.data;
                this.setState({ product: producto, error: false })
            }

        } catch (err) {
            console.log(err)
        }
    }
    addToCartHandler = (product) => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/login')
        } else{
            this.props.onAddToCart(product);
        }   
    }
    deleteProductHandler = async id => {
        let url = `http://localhost:3000/productos/${id}/eliminar`;
        await axios.delete(url);
        this.props.history.push('/');
    }
    editProductHandler = (product) => {
        //redirect to /productos/id/editar. Crear vista
        this.props.onEditProduct(product);
        this.props.history.push(`/productos/${product.id}/editar`);
    }

    render() {

        const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let error = this.state.error ? <h2>Producto no encontrado</h2> : null;
        let product = null;
        if (this.state.product) {
            product = (<Card>
                <Card.Img className={classes.Img} variant="top" src={this.state.product.imagen} />
                <Card.Body>
                    <Card.Title>{this.state.product.nombre}</Card.Title>
                    <h5>Descripcion: </h5>
                    <Card.Text>{this.state.product.descripcion}</Card.Text>
                    <Card.Text>Marca: {this.state.product.marca.nombre}</Card.Text>
                    <Card.Text>Categoria: {this.state.product.categoria.nombre}</Card.Text>
                    <Card.Title>Precio: ${toThousand(this.state.product.precio * 1)}</Card.Title>
                </Card.Body>
                <Card.Footer style={{textAlign:'center'}}>
                    <Button variant="outline-success" onClick={() => this.addToCartHandler(this.state.product)}>Agregar al carrito</Button>
                    
                </Card.Footer>
            </Card>)
        }
        let adminPanel = null;
        if (this.props.isAdmin && product) {
            adminPanel = (
                <div className="panelAdminProduct">
                    <h3>PANEL ADMINISTRADOR</h3>
                    <Button variant='outline-danger' onClick={() => this.editProductHandler(this.state.product)}>Editar Producto</Button>
                    <Button variant='outline-danger' onClick={() => this.deleteProductHandler(this.state.product.id)}>Eliminar Producto</Button>
                </div>
            )
        }
        return (
            <div className={classes.ProductDetail}>
                {product}
                {error}
                {adminPanel}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAdmin: state.isAdmin,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (product) => dispatch(actions.addProductToCart(product)),
        onEditProduct: (product) => dispatch(actions.setProductToEdit(product))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));