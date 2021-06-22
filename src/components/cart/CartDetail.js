import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addProductToCart } from "../../store/reducers/cartSlice";
import {
  emtySingleProduct,
  getSingleProduct,
  singleProductSelector,
} from "../../store/reducers/productSlice";
import Loading from "../cart/Loading";
import "./CartDetail.css";

const CartDetail = () => {
  const { id } = useParams();
  const singleProducts = useSelector(singleProductSelector);
  const [singleProduct, setSingleProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  //sum quantity
  const ChangeQuantity = (event) => {
    setQuantity(parseInt(event.target.value));
    console.log(quantity);
  };
  const sumQuantity = () => {
    setQuantity(quantity + 1);
  };
  const minusQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  useEffect(() => {
    setSingleProduct(singleProducts);
  }, [singleProducts]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emtySingleProduct());
    dispatch(getSingleProduct(id));
  }, [dispatch]);
  if (singleProduct.length == 0) {
    return <Loading />;
  }
  const ProductCart = {
    ...singleProduct,
    quantity,
  };
  //Add product to cart
  const AddProductToCart = (ProductCart) => {
    // const ProductAdd = singleProducts.filter((product) => product.id == id);
    dispatch(addProductToCart(ProductCart));
    alert("Add sucessfull");
  };
  return (
    <div className="container">
      <div className="card custom-detail">
        <div className="container-fliud">
          <div className="wrapper row custom-detail-wrapper">
            <div className="preview col-md-6">
              <div className="preview-pic tab-content">
                <div className="tab-pane active" id="pic-1">
                  <img src={singleProduct.image} />
                </div>
              </div>
            </div>
            <div className="details col-md-6">
              <h3 className="product-title mb-3">{singleProduct.title}</h3>
              <p className="product-description mb-3">
                Descripsion : {singleProduct.description}
              </p>
              <h4 className="price">
                Price: <span>{singleProduct.price}$</span>
              </h4>
              <div class="qty mt-2 mb-3">
                <span onClick={minusQuantity} class="minus bg-dark">
                  -
                </span>
                <input
                  onChange={ChangeQuantity}
                  type="number"
                  className="count"
                  value={quantity}
                />
                <span onClick={sumQuantity} class="plus bg-dark">
                  +
                </span>
              </div>
              <div className="action">
                <button
                  onClick={() => {
                    AddProductToCart(ProductCart);
                  }}
                  className="btn btn-lg btn-primary mr-3"
                  type="button"
                >
                  Add To Cart
                </button>
                <Link to="/">
                  <button className="btn btn-lg btn-primary" type="button">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
