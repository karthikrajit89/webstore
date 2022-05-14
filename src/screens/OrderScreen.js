import Axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder } from '../actions/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  
} from '../constants/orderConstant';

export default function OrderScreen(props) {
  const params = useParams();
  const { id: orderId } = params;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;


  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();  
  
  useEffect(() =>{

    dispatch(detailsOrder(orderId));
  },[dispatch,orderId])
  
  
 
  const deliverHandler = () => {
    dispatch(deliverOrder(orderId));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order  Id </h1> <p>{order?.id}</p>
      <div className="row top">
       
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong> {order?.shippingAddress},
                </p>
               
              </div>
            </li>
            <li>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.cartFinalList?.map((item) => (
                    <li key={item.productId}>
                      <div className="row">
                        <div className="min-30">
                          <Link to={`/product/${item.productId}`}>
                            {item.productId}
                          </Link>
                        </div>
                        <div>
                         Quantity (inc Shipping) {item.qty} = ${order?.totalPrice}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order?.shippingPrice?.toFixed(2)}</div>
                </div>
              </li>
              
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order?.totalPrice?.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <div className="row">
                <li>
                 <p>
                    <strong>Order Successfully Created, Thank you</strong>
                  </p>
                  </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
