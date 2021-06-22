import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";

const SingleProduct = ({ id, title, price, image }) => {
  title = title.slice(0, 30);
  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push(`/detail/${id}`),
    [history]
  );
  return (
    <div onClick={handleOnClick} className="col-md-4 col-4 mb-4">
      <figure className="card card-product-grid modifed-figure">
        <div className="img-wrap">
          <img
            src={image}
            width="150px"
            height="150px"
            className="center mt-4 mb-4"
          />
          {/* <a className="btn-overlay" href="#">
            <i className="fa fa-search-plus"></i> Quick view
          </a> */}
        </div>
        <figcaption className="info-wrap">
          <div className="fix-height">
            <Link to={`/detail/${id}`} className="title">
              {title}
            </Link>
            <div className="price-wrap mt-2">
              <span className="price">{price}$</span>
            </div>
          </div>

          <Link className="Link-modified" to={`/detail/${id}`}>
            <button className="btn btn-block btn-primary button-modified">
              Product Detail
            </button>
          </Link>
        </figcaption>
      </figure>
    </div>
  );
};

export default SingleProduct;
