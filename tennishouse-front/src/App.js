import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './containers/Home/Home'
import ShoppingCart from './containers/ShoppingCart/ShoppingCart';
import CreateProduct from './components/Products/CreateProduct/CreateProduct';
import ProductDetail from './components/Products/ProductDetail/ProductDetail';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Orders from './containers/Orders/Orders'
import ProductList from './containers/ProductList/ProductList';
import * as actions from './store/actions/index'


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/productos" exact component={ProductList} />
        <Route path="/productos/:id" component={ProductDetail} />
        <Route path="/" exact component={Home} />
        <Redirect to='/' />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/productos" exact component={ProductList} />
          <Route path="/productos/:id" component={ProductDetail} />
          <Route path="/carrito" component={ShoppingCart} />
          <Route path="/compras" component={Orders} />
          <Route path="/" exact component={Home} />
          <Redirect to='/' />
        </Switch>
      )
    }
    if (this.props.isAdmin) {
      routes = (
        <Switch>
          <Route path="/crearProducto" component={CreateProduct} />
          <Route path="/logout" component={Logout} />
          <Route path="/productos" exact component={ProductList} />
          <Route path="/productos/:id/editar" component={CreateProduct} />
          <Route path="/productos/:id" component={ProductDetail} />
          <Route path="/carrito" component={ShoppingCart} />
          <Route path="/compras" component={Orders} />
          <Route path="/" exact component={Home} />
          <Redirect to='/' />
        </Switch>
      )
    }
    


    return (
      <div>
        <Layout>
          {routes}
        </Layout>

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
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
