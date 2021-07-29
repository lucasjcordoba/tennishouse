import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classes from './ShoppingCart.module.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import * as actions from '../../store/actions/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class ShoppingCart extends Component {

    removeFromCartHandler = product => {
        this.props.removeFromCart(product.id, product.precio)
    }

    createCartHandler = async () => {

        let data = {
            usuario_id: this.props.userId,
            fecha_compra: new Date(),
            total: this.props.totalPrice
        }
        await axios.post('http://localhost:3000/carrito/crear', data);
        this.props.clearCart();
        this.props.history.push('/compras')
    }

    render() {
        const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let productsInCart = this.props.products.map(product => (

            <tr key={product.id}>
                <td className="remove" onClick={() => this.removeFromCartHandler(product)}><FontAwesomeIcon icon={faTrashAlt} /></td>
                <td><img alt="alt-text" src={product.imagen} /></td>
                <td className="aa-cart-title">{product.nombre}</td>
                <td>${toThousand(product.precio * 1 )}</td>
                <td>{product.qty}</td>
                <td>${toThousand(product.precio * product.qty)}</td>
            </tr>
            // <div key={product.id}>
            //     <p>{product.nombre}</p>
            //     <p>Precio: ${toThousand(product.precio)}</p>
            //     <p>Cantidad: {product.qty}</p>
            //     <Button className='btn btn-warning' onClick={() => this.removeFromCartHandler(product)}>Eliminar del carrito</Button>
            // </div>
        ))
        let qty = this.props.products.reduce((accum, prod) => {
            return accum + prod.qty;
        }, 0)

        return (
            
            <div>
                <section id="cart-view">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="cart-view-area">
                                    <div className="cart-view-table">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th><FontAwesomeIcon icon={faTrashAlt} /></th>
                                                        <th></th>
                                                        <th>Nombre</th>
                                                        <th>Precio</th>
                                                        <th>Cantidad</th>
                                                        <th>Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productsInCart}
                                                </tbody>
                                            </table>
                                        </div>
                                        <br></br>
                                        <div className="cart-view-total">
                                            <h4>Total</h4>
                                            <table className="aa-totals-table">
                                                <tbody>
                                                <tr>
                                                        <th>Cantidad de productos</th>
                                                        <td>{qty}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total</th>
                                                        <td>${toThousand(this.props.totalPrice)}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                            <br></br>
                                            <Button variant="success" onClick={this.createCartHandler}>Confirmar Compra</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            /*
            <div className={classes.ShoppingCart}>
                {productsInCart}
                <h4>Cantidad de productos: {qty}</h4>
                <h3 className={classes.Total}>Total Carrito: ${toThousand(this.props.totalPrice)}</h3>
                <Button className='btn btn-success' onClick={this.createCartHandler}>Confirmar Carrito</Button>
            </div>
            */
        )

    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        totalPrice: state.totalPrice,
        userId: state.userId
    }
}


const mapDispatchToProps = dispatch => {
    return{
        removeFromCart: (id, price) => dispatch(actions.removeProductFromCart(id, price)),
        clearCart: () => dispatch(actions.clearCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
