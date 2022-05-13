import Axios from 'axios';
import{
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import { HostConst  } from '../constants/hostConstant';

export const    addToCart =(productId,qty,cur) => async (dispatch,getState) =>{
    const {data} =await Axios.get(`${HostConst}kartWebstore/GetProduct/${productId}`);
    const {
        cart: { cartItems },
      } = getState();
    
    dispatch({
        type: CART_ADD_ITEM,
        payload :{
            product : data,
            countInStock:10,
            qty :qty,
            itemsPrice:0,
            curency:cur
        },
    });
  
    localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
};

export const removeFromCart = (productId) => (dispatch,getState) =>{
    dispatch({type : CART_REMOVE_ITEM,payload:productId});
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress =(data) => (dispatch) =>{
    dispatch({type : CART_SAVE_SHIPPING_ADDRESS, payload:data});
    localStorage.setItem('shippingAddress',JSON.stringify(data));
};
