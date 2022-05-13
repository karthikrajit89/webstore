import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstants"; 
import { HostConst } from "../constants/hostConstant";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_SUMMARY_REQUEST,
    ORDER_SUMMARY_SUCCESS,
  } from '../constants/orderConstant';

  export const createOrder = (order) => async (dispatch, getState)=>{


      dispatch({type : ORDER_CREATE_REQUEST, payload :order})
      try{
          const {
              userSignin:{userInfo},
          } =getState();


      let cartFinallist = [];
     
      (order.cartItems).forEach(element => {

        cartFinallist.push({"ProductId": element.product.id,
    "qty": element.qty});
          
      });

      const datatoPost={
        TotalPrice : order.totalPrice + order.shippingPrice,
        ShippingAddress : order.shippingAddress.address,
        CartFinalList : cartFinallist
          }
      let data ={}
       await Axios.post(`${HostConst}kartWebstore/CreateOrder`,datatoPost)
      .then((response => {
          
          data = response;
      }));
      dispatch({type:ORDER_CREATE_SUCCESS,payload:data});
      dispatch({type:CART_EMPTY});
      localStorage.removeItem('cartItems');
  }
  catch(error){
      dispatch({
          type: ORDER_CREATE_FAIL,
          payload:
          error.response && error.response.data.message ?
          error.response.data.message : error.message
      });
  }
};

export const detailsOrder =(orderId) => async(dispatch,getState)=>{

    dispatch({type : ORDER_DETAILS_REQUEST, payload: orderId});
    const {
        userSignin:{userInfo},
    } = getState();
    try{
        const {data} = await Axios.get(`${HostConst}kartWebstore/GetOrder/${orderId}`);
        dispatch({type :ORDER_DETAILS_SUCCESS,payload:data});
    }
    catch(error){
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message
        dispatch({type:ORDER_DELETE_FAIL,payload: message})
    }
}

export const listOrders = ()=> async(dispatch,getState)=>{
    dispatch({type:ORDER_LIST_REQUEST});
    const{
        userSignin:{userInfo},
    } =getState();
    try{
        const {data} =await Axios.get(`${HostConst}kartWebStore/GetAllOrders`);
        dispatch({type:ORDER_LIST_SUCCESS,payload:data})
    }
    catch(error){
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type : ORDER_LIST_FAIL,payload: message});
    }
};

export const deleteOrder =(orderId) => async(dispatch, getState)=>{
    dispatch({type: ORDER_DELETE_REQUEST,payload:orderId});
    const{
        userSignin :{userInfo},
    } = getState();
    try{
        const {data} =Axios.delete(`${HostConst}kartWebStore/DeleteOrder/${orderId}`);
        dispatch({type : ORDER_DELETE_SUCCESS, payload:data});
    }
    catch(error){
        const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DELETE_FAIL, payload: message });
    }
};

export const deliverOrder =(order) => async (dispatch, getState) =>{
    dispatch({type: ORDER_DELIVER_REQUEST, payload: order});
    const {
        userSignin:{userInfo},
    } = getState();
    try{
        const {data} =Axios.post(`${HostConst}kartWebStore/CreateShipping`,order);
        dispatch({type:ORDER_DELIVER_SUCCESS,payload:data});
    }
    catch(error){
        const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVER_FAIL, payload: message });
    }
}

export const summaryOrder = ()=> async(dispatch,getState)=>{
    dispatch({type:ORDER_SUMMARY_REQUEST});
    const{
        userSignin:{userInfo},
    } =getState();
    try{
        const {data} =await Axios.get(`${HostConst}kartWebStore/GetAllOrders`);
        dispatch({type:ORDER_SUMMARY_SUCCESS,payload:data})
    }
    catch(error){
        const message = error.response && error.response.data.message?
        error.response.data.message : error.message;
        dispatch({type : ORDER_CREATE_FAIL,payload: message});
    }
};