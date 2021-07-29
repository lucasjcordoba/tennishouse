import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        form: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    value: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            contraseña: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    value: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isLogIn: true,
        formIsValid: false
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
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, formField) => {
        const updatedForm = {
            ...this.state.form,
            [formField]: {
                ...this.state.form[formField],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.form[formField].validation),
                touched: true
            }
        }
        let formIsValid = true;
        for (let formField in updatedForm) {
            formIsValid = updatedForm[formField].valid && formIsValid;
        }
        this.setState({ form: updatedForm, formIsValid: formIsValid });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.form.email.value, this.state.form.contraseña.value, this.state.isLogIn);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isLogIn: !prevState.isLogIn }
        })
    }

    render() {
        let formElements = Object.entries(this.state.form).map(([key, val]) => {
            return <Input
                key={key}
                label={key}
                elementType={val.elementType}
                elementConfig={val.elementConfig}
                placeholder={val.elementConfig.value}
                invalid={!val.valid}
                shouldValidate={val.validation}
                touched={val.touched}
                changed={(event) => this.inputChangedHandler(event, key)} />
        });

        if (this.props.loading) {
            formElements = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error}</p>
        }
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    <h3>{this.state.isLogIn ? 'INICIAR SESION' : 'REGISTRARSE'}</h3>
                    {formElements}
                    <Button className={classes.btn} btnType="Success" disabled={!this.state.formIsValid}>ENVIAR</Button>
                </form>
                <Button
                    className={classes.btn}
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">{this.state.isLogIn ? 'REGISTRARSE' : 'INICIAR SESION'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);