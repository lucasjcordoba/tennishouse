import React from 'react';
import { Card, Button } from 'react-bootstrap';
import classes from './ProductCard.module.css';

const ProductCard = (props) => (


<Card className={classes.ProductCard} key={props.product.id} >
        <Card.Img className={classes.Clickable} variant="top" src={props.product.imagen} onClick={props.clickCard} />
        <Card.Body className={classes.Clickable} onClick={props.clickCard}>
            <Card.Title>{props.product.nombre}</Card.Title>
            <Card.Text>Marca: {props.product.marca.nombre}</Card.Text>
            <Card.Text>Categoria: {props.product.categoria.nombre}</Card.Text>
            <Card.Text>Rating: {props.product.rating}</Card.Text>
            <Card.Title>Precio: ${props.product.precio}</Card.Title>
        </Card.Body>
        <Card.Footer>
            <Button variant='outline-success' onClick={props.addToCart}>Agregar al carrito</Button>
        </Card.Footer>
    </Card> 
)

export default ProductCard;

/* <Card key={product.id} onClick={() => this.onProductClickHandler(product.id)}>
                <Card.Img variant="top" src={product.imagen} />
                <Card.Body>
                    <Card.Title>{product.nombre}</Card.Title>
                    <Card.Text>{product.descripcion}</Card.Text>
                    <Card.Title>Precio: {product.precio}</Card.Title>
                </Card.Body>
                <Card.Footer>
                <Button onClick={() => this.addToCartHandler(product)}>Agregar al carrito</Button>
                </Card.Footer>
            </Card> */