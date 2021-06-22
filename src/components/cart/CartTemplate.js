import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import {
  addProductToCart,
  cartSelector,
  DeleteProductToCart,
  DeleteAllProduct,
} from "../../store/reducers/cartSlice";
import { userSelector } from "../../store/reducers/userSlice";

const CartTemplate = () => {
  const history = useHistory();
  const user = useSelector(userSelector);
  const productCarts = useSelector(cartSelector);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    if (user.login) {
      alert("mua hang thanh cong");
      history.push("/");
    } else {
      alert("vui long dang nhap");
      history.push("/login");
    }
  };

  const minusQuantity = (product, quantity) => {
    if (quantity > 1) {
      const hello = {
        ...product,
        quantity: -1,
      };
      dispatch(addProductToCart(hello));
      console.log(product);
    }
  };
  const sumQuantity = (product, quantity) => {
    const hello = {
      ...product,
      quantity: +1,
    };
    dispatch(addProductToCart(hello));
    console.log(product);
  };
  const deleteProductToCart = (id) => {
    dispatch(DeleteProductToCart(id));
  };
  return (
    <div className="container mb-4 ">
      <div className="row ">
        <div className="col-12 custom-cart-template">
          <div className="table-responsive">
            <table className="table table-striped custom-table-parent">
              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">Product</th>
                  <th style={{ textAlign: "center" }} scope="col">
                    Quantity
                  </th>
                  <th scope="col" className="text-right">
                    Price
                  </th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {productCarts.length != 0 ? (
                  productCarts.map((product) => (
                    <>
                      <tr>
                        <td>
                          <img
                            className="img-custom-cart"
                            src={product.image}
                          />
                        </td>
                        <td>{product.title.slice(0, 20)}</td>
                        <td>
                          <div class="qty custom-qty">
                            <span
                              onClick={minusQuantity.bind(
                                this,
                                product,
                                product.quantity
                              )}
                              class="minus bg-dark"
                            >
                              -
                            </span>
                            <input
                              className="form-control custom-input-cart-template ml-2 mr-2"
                              type="number"
                              value={product.quantity}
                            />
                            <span
                              onClick={sumQuantity.bind(
                                this,
                                product,
                                product.quantity
                              )}
                              class="plus bg-dark"
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td className="text-right">
                          {(product.price * product.quantity).toFixed(2)}$
                        </td>
                        <td className="text-right">
                          <button
                            onClick={deleteProductToCart.bind(this, product.id)}
                            className="btn btn-sm btn-danger"
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td></td>
                    <h1 className="text-center custom-emty">Empty Cart</h1>
                    <td></td>
                    <td></td>
                  </tr>
                )}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td className="text-right">
                    <p>
                      {productCarts
                        .reduce((accumulator, currentValue) => {
                          return (
                            accumulator +
                            currentValue.quantity * currentValue.price
                          );
                        }, 0)
                        .toFixed(2)}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col mb-2">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="btn btn-lg btn-block btn-primary btn-custom">
                  Continue Shopping
                </button>
              </Link>
            </div>
            <div className="col-sm-12 col-md-6 text-right">
              <button
                data-toggle="modal"
                data-target="#exampleModalCenter"
                type="button"
                // onClick={handleCheckout}
                className="btn btn-lg btn-block btn-primary"
              >
                Checkout
              </button>
              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Checkout
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <PayPalButton
                        amount={parseFloat(
                          productCarts
                            .reduce((accumulator, currentValue) => {
                              return (
                                accumulator +
                                currentValue.quantity * currentValue.price
                              );
                            }, 0)
                            .toFixed(2)
                        )}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={(details, data) => {
                          alert(
                            "Transaction completed by " +
                              details.payer.name.given_name
                          );
                          dispatch(DeleteAllProduct());

                          // OPTIONAL: Call your server to save the transaction
                          return fetch("/paypal-transaction-complete", {
                            method: "post",
                            body: JSON.stringify({
                              orderId: data.orderID,
                            }),
                          });
                        }}
                        options={{
                          clientId:
                            "AWX62hFSJm7g_PsitCEPZiFfhU8RQm9d0dPyJTijaS_aTBTTOapZpKMZK7ooZqU2TkToPg45lV0FGJ8t",
                        }}
                      />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTemplate;
