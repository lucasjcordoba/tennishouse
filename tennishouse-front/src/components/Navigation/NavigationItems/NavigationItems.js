import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/productos">Productos</NavigationItem>
        {props.isAdmin
            ? <NavigationItem link="/crearProducto">Crear Producto</NavigationItem>
            : null
        }
        {props.isAuthenticated ? <NavigationItem link="/compras">Mis Compras</NavigationItem> : null}
        {props.isAuthenticated ? <NavigationItem link="/carrito">Carrito</NavigationItem> : null }
        {!props.isAuthenticated
            ? <NavigationItem link="/login">Iniciar sesion</NavigationItem>
            : <NavigationItem link="/logout">Cerrar sesion</NavigationItem>
        }
    </ul>
);
const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        isAdmin: state.isAdmin
    }
}

export default connect(mapStateToProps)(navigationItems);

