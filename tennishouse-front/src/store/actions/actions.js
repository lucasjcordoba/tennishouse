import * as actionTypes from './actionTypes';
import axios from 'axios';

//RECORDAR PARA ASYNC CODE USAR RETURN DISPATCH (INSTALAR REDUX-THUNK)

export const addProductToCart = (product) => {
    return {
        type: actionTypes.CART_ADD_PRODUCT,
        product: product
    }
}
export const removeProductFromCart = (id, price) => {
    return {
        type: actionTypes.CART_REMOVE_PRODUCT,
        id: id,
        price: price
    }
}

export const clearCart = () => {
    return {
        type: actionTypes.CART_CLEAR
    }
}


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isLogIn) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            contraseña: password,
        };
        let url = 'http://localhost:3000/usuario/login';
        if (!isLogIn) {
            url = 'http://localhost:3000/usuario/registrarse';
        }
        axios.post(url, authData)
            .then(response => {
                
                if (response.data.meta.status === 401 || response.data.meta.status === 422) {

                    dispatch(authFail(response.data.meta.message))
                } else {
                    let token = response.data.data.email;
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', response.data.data.id)
                    dispatch(authSuccess(token, response.data.data.id));
                }

            })
            .catch(err => {
                dispatch(authFail(err.message));
            })
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));

        }
    }
}

export const setProductToEdit = (product) => {
    return {
        type: actionTypes.PRODUCT_TO_EDIT,
        product: product
    }
}

export const clearProductToEdit = () => {
    return {
        type: actionTypes.CLEAR_PRODUCT_TO_EDIT
    }
}


