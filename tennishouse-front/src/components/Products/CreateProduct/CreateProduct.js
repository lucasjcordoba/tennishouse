import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner'
import Button from '../../UI/Button/Button'
import classes from './CreateProduct.module.css'



class CreateProduct extends Component {
    state = {
        productForm: {
            nombre: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    value: 'Nombre del producto'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            descripcion: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    value: 'Descripcion'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            precio: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    value: 'Precio'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            rating: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    value: 'Rating'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    isRating: true,
                    maxLength: 4
                },
                valid: false,
                touched: false
            },
            marca_id: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            categoria_id: {
                elementType: 'select',
                elementConfig: {
                    options: []
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            atributos: {
                elementType: 'checkbox',
                elementConfig: {
                    options: []
                },
                value: [],
                validation: {
                    required: false
                },
                valid: false
            },
            imagen: {
                elementType: 'image',
                elementConfig: {
                    type: 'file'
                },
                value: null,
                validation: {
                    required: false
                },
                valid: false
            }
        },
        formIsValid: false,
        loading: false
    }

    async componentDidMount() {

        try {
            const updatedProductForm = { ...this.state.productForm }
            let res = await axios.get('http://localhost:3000/productos/listaMarcas')
            const brands = await res.data.data
            res = await axios.get('http://localhost:3000/productos/listaCategorias')
            const categories = res.data.data
            res = await axios.get('http://localhost:3000/productos/listaAtributos')
            const attributes = res.data.data


            let updatedFormElement = { ...updatedProductForm['marca_id'] }
            updatedFormElement.elementConfig.options = brands;
            updatedProductForm['marca_id'] = updatedFormElement;

            updatedFormElement = { ...updatedProductForm['categoria_id'] }
            updatedFormElement.elementConfig.options = categories;
            updatedProductForm['categoria_id'] = updatedFormElement;

            updatedFormElement = { ...updatedProductForm['atributos'] }
            updatedFormElement.elementConfig.options = attributes;
            updatedProductForm['atributos'] = updatedFormElement;

            this.setState({ productForm: updatedProductForm })

        } catch (err) {
            console.log(err)
        }


        if (this.props.isEdit) {
            
            let atributos = this.props.product.atributos.map(atributo => `${atributo.id}`);
            
            this.setState(state => {
                state.productForm.nombre.value = this.props.product.nombre
                state.productForm.nombre.valid = true
                state.productForm.descripcion.value = this.props.product.descripcion
                state.productForm.descripcion.valid = true
                state.productForm.precio.value = this.props.product.precio
                state.productForm.precio.valid = true
                state.productForm.rating.value = this.props.product.rating
                state.productForm.rating.valid = true
                state.productForm.categoria_id.value = this.props.product.categoria_id
                state.productForm.categoria_id.valid = true
                state.productForm.marca_id.value = this.props.product.marca_id
                state.productForm.marca_id.valid = true
                state.productForm.atributos.value = atributos
                state.productForm.atributos.valid = true
                state.productForm.imagen.value = this.props.product.imagen
                
                state.productForm.atributos.elementConfig.options.forEach(option => {
                   
                    if(this.props.product.atributos.find(atributo => atributo.id === option.id)){
                        option.isChecked = true;
                    }
                })
                state.formIsValid = true
                return state
            })
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            // const pattern = /^\d+$/;
            // isValid = pattern.test(value) && isValid
            isValid = !isNaN(parseFloat(value)) && isFinite(value)
        }

        if (rules.isRating) {
            isValid = (value <= 10 && value >= 1) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedProductForm = {
            ...this.state.productForm
        }
        const updatedFormElement = { ...updatedProductForm[inputIdentifier] }
        if (inputIdentifier === 'atributos') {
            updatedFormElement.value.push(event.target.value)
            
        } else if (inputIdentifier === 'imagen') {
            
            updatedFormElement.value = event.target.files[0];
        } else {
            updatedFormElement.value = event.target.value;
        }
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedProductForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        for (let inputIdentifier in updatedProductForm) {
            formIsValid = updatedProductForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ productForm: updatedProductForm, formIsValid: formIsValid })
    }


    createProductHandler = async (event) => {
        event.preventDefault();

        let formData = new FormData();
        for (let formElementIdentifier in this.state.productForm) {
            
            if(formElementIdentifier === 'atributos'){
                formData.append(formElementIdentifier, JSON.stringify(this.state.productForm[formElementIdentifier].value))
            }else{
                formData.append(formElementIdentifier, this.state.productForm[formElementIdentifier].value)
            }
            // formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
        }
        
        this.setState({loading: true});
        let url = 'http://localhost:3000/productos/crearProducto';
        if(this.props.isEdit){
            url = `http://localhost:3000${this.props.location.pathname}`
            await axios.put(url, formData)
        }else{
            await axios.post(url, formData) 
        }
        this.setState(prevState => {
            return {
            ...prevState,
            loading: false
            }
        })

        this.props.history.push('/')
    }


    componentWillUnmount() {
        this.props.clearEdit();
    }

    render() {

        const formElements = Object.entries(this.state.productForm).map(([key, val], index) => {
            return <Input
                key={index}
                label={key}
                elementType={val.elementType}
                elementConfig={val.elementConfig}
                placeholder={val.elementConfig.value}
                value={val.value}
                invalid={!val.valid}
                shouldValidate={val.validation}
                touched={val.touched}
                changed={(event) => this.inputChangedHandler(event, key)} />
        });

        let form = (
            <form onSubmit={this.createProductHandler} encType='multipart/form-data'>
                {formElements}
                <Button className={classes.btn} btnType="Success" disabled={!this.state.formIsValid}>{this.props.isEdit ? 'Editar' : 'Crear Producto'}</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.CreateProduct}>
                <h4>Ingresa los datos del producto</h4>
                {form}
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isEdit: state.productToEdit !== null,
        product: state.productToEdit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearEdit: () => dispatch(actions.clearProductToEdit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);


