import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                type={props.elementConfig.type}
                placeholder={props.value === '' ? props.placeholder : props.value}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                type={props.elementConfig.type}
                placeholder={props.value === '' ? props.placeholder : props.value}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    defaultValue={props.value ? props.value : ''}
                    className={inputClasses.join(' ')}
                    onChange={props.changed}
                >
                   
                    {props.value==='' ? (
                    <option value='' disabled hidden>Seleccionar opcion</option>) : (
                    <option value={props.id} disabled hidden>Cambiar Categoria</option>
                    )}
                    {props.elementConfig.options.map(option => (
                        <option key={option.id} value={option.id} style={{ textTransform: 'capitalize' }}>
                            {option.nombre}
                        </option>
                    ))}
                </select>
            );
            break;
        case ('checkbox'):
            
            inputElement = (
                <fieldset onChange={props.changed} >
                    {props.elementConfig.options.map((option, i) => (
                        <React.Fragment key={option.nombre + option.id}>
                            <input type="checkbox" 
                            defaultChecked={option.isChecked}
                            value={option.id} 
                            name="attributes[]" 
                            style={{ textTransform: 'capitalize' }} />
                            <label htmlFor={option.id}>{option.nombre}</label>
                            <br></br>
                        </React.Fragment>
                    ))}
                </fieldset>
            )
            break;
        case ('image'):
            inputElement = <input
                className={inputClasses.join(' ')}
                type={props.elementConfig.type}
                placeholder={props.value}
                onChange={props.changed}
                accept='image/x-png,image/gif,image/jpeg' />;
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                type={props.elementConfig.type}
                placeholder={props.placeholder}
                onChange={props.changed} />

    }
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p style={{ textTransform: 'capitalize' }}>{props.label} invalido</p>
    }

    return (
        <div className={classes.Input}>
            <label style={{ textTransform: 'capitalize' }} className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;