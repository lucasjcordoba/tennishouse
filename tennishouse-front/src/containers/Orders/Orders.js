import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Orders extends Component {
    state = {
        carts: null
    }

    async componentDidMount() {
        let response = await axios.get(`http://localhost:3000/carrito?userId=${this.props.userId}`);
        if (response.data.data.length > 0) {

            this.setState({ carts: response.data.data })
        }

    }

    render() {
        const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        let carts = <h3>No tienes compras confirmadas</h3>
        if (this.state.carts !== null) {
            carts = this.state.carts.map(cart => (

                <div key={cart.id}>
                    <section id="cart-view">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Fecha de compra: {cart.fecha_compra}</th>
                                                    <th>Total: ${toThousand(cart.total)}</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>


                /*
                <div key={cart.id}>
                    <p>Fecha de compra: {cart.fecha_compra}</p>
                    <p style={{ fontWeight: 'bold' }}>Total: ${toThousand(cart.total)}</p>
                </div> */

            )
            )
        }
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2 className="compras">Compras</h2>
                            <br></br>
                            {carts}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        userId: state.userId,
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps)(Orders);