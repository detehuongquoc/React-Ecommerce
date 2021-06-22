import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cartSelector } from "../store/reducers/cartSlice";
import { userSelector } from "../store/reducers/userSlice";
import { getAllProduct, SearchFilter } from "../store/reducers/productSlice";
import { IsLogout } from "../store/reducers/userSlice";
const Header = () => {
  const item = useSelector(cartSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const ComeBackHome = () => {
    dispatch(getAllProduct());
  };

  //useState
  const handleSearch = (event) => {
    dispatch(SearchFilter(event.target.value));
  };
  return (
    <div className="header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-4">
              <Link to="/" className="brand-wrap custom-ducdete">
                <button className="btn btn-link">
                  <h3>DucEcommerce</h3>
                </button>
              </Link>
            </div>
            <div className="col-lg-6 col-sm-12">
              <form action="#" className="search">
                <div className="input-group w-100 custom-input-header">
                  <input
                    onChange={handleSearch}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                  <div className="input-group-append">
                    <button disabled className="btn btn-primary">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4 col-sm-6 col-12">
              <div className="widgets-wrap float-md-right custom-big-cart">
                <div className="custom-cart">
                  <div className="widget-header">
                    <Link
                      to="/cart"
                      className="icon icon-sm rounded-circle border custom-icon ml-4"
                    >
                      <i className="fas fa-shopping-cart"></i>
                    </Link>
                    <span className="badge badge-pill badge-danger notify custom-number-cart">
                      {item.length}
                    </span>
                  </div>
                </div>
                <div className="custom-login">
                  <div className="text">
                    <div>
                      {user.login == true ? (
                        <>
                          <span>
                            Hello{" "}
                            {user.givenName.slice(user.givenName.length - 6)} |
                          </span>
                          <Link
                            onClick={() => {
                              dispatch(IsLogout());
                              alert("logout succes");
                            }}
                          >
                            <span>Logout</span>
                          </Link>
                        </>
                      ) : (
                        <Link to="/login">Login</Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div></div>
    </div>
  );
};

export default Header;
