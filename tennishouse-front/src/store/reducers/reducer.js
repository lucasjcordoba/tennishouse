import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    products: [],
    totalPrice: 0,
    productToEdit: null,
    isAdmin: false,
    token: null,
    userId: null,
    error: null

}

const addProductToCart = (state, action) => {
    action.product.qty = action.product.qty ? action.product.qty : 1;
    
    let updatedProducts = state.products.concat(action.product);
    
    //Acumular productos iguales
    updatedProducts = updatedProducts.reduce((accumulator, currentProd) => {
        var found = accumulator.find(p => p.id === currentProd.id);
        if (found) {
            found.qty += 1;
        } else {
            accumulator.push(currentProd);
        }
        return accumulator;
    }, []);
    
    

    let updatedTotal = state.totalPrice + +action.product.precio

    return {
        ...state,
        products: updatedProducts,
        totalPrice: updatedTotal
    }
}

const removeProductFromCart = (state, action) => {
    const found = state.products.find( product => product.id === action.id);

    let updatedProducts = state.products.filter(product => {
        return product.id !== action.id
    })

    let updatedTotal = state.totalPrice - (action.price*found.qty);

    return {
        ...state,
        products: updatedProducts,
        totalPrice: updatedTotal
    }
}

const clearCart = (state, action) => {
    return{
        ...state,
        products: [],
        totalPrice: 0
    }
}

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true
    }
}

const authSuccess = (state, action) => {
    let admin = (action.idToken === 'admin@admin.com') ? true : false;
    return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        isAdmin: admin
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false
    }
}

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null,
        isAdmin: false
    }
}

const setProductToEdit = (state, action) => {
    return {
        ...state,
        productToEdit: action.product
    }
}

const clearProductToEdit = (state, action) => {
    return {
        ...state,
        productToEdit: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CART_ADD_PRODUCT: return addProductToCart(state, action);
        case actionTypes.CART_REMOVE_PRODUCT: return removeProductFromCart(state, action);
        case actionTypes.CART_CLEAR: return clearCart(state, action);
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.PRODUCT_TO_EDIT: return setProductToEdit(state, action)
        case actionTypes.CLEAR_PRODUCT_TO_EDIT: return clearProductToEdit(state, action)
        default: return state;
    }
}

export default reducer;