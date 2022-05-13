import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsProduct } from '../actions/productAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: productId } = params;

  const [qty, setQty] = useState(1);
  const [fromCurrency, selectCurrency] = useState(1);
  
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() =>{

    dispatch(detailsProduct(productId));
  },[dispatch,productId])
  
  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}&cur=${fromCurrency}`);
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={`../images/${product.imageUrl}`}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                
                <li>Pirce : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  
                  <li>
             <div className="row">
              <h2>
                Select Currency
              </h2>
              
                          
                          <div>
                            <select
                              value={fromCurrency}
                              onChange={(e) => selectCurrency(e.target.value)}
                            >
                              <option key="AUD" value={1}>AUD</option>
                              <option key="NZ" value={1.10}>NZ</option>
                              <option key="USD" value ={0.69}>USD</option>
                              
                            </select>
                          </div>
                        </div>  
            </li>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(10).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                        
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                   
                 
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) ;
}
