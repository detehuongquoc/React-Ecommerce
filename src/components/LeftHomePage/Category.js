import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categorySelector,
  getAllCategory,
} from "../../store/reducers/categorySlice";
import {
  getAllProduct,
  getProductByCategory,
} from "../../store/reducers/productSlice";

const Category = ({
  FilterPrice,
  EmtyFilterPrice,
  RemoveALLFittler,
  HandleLowToHight,
  HandleHighttoLow,
}) => {
  const categorys = useSelector(categorySelector);
  // const [categoryss, setCategoryss] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  const GetAllProduct = () => {
    dispatch(getAllProduct());
  };
  const GetProductByCategory = (category) => {
    EmtyFilterPrice();
    dispatch(getProductByCategory(category));
  };
  const setStartValue = (event) => {
    event.preventDefault();
    setStart(event.target.value);
  };
  const setEndValue = (event) => {
    event.preventDefault();
    setEnd(event.target.value);
  };

  return (
    <>
      <aside className="col-md-3 mt-3">
        <div className="card">
          <article className="filter-group custom-category">
            {/* <div>
              <div class="input-group">
                <button type="button" class="btn btn-primary">
                  <i class="fas fa-search"></i>
                </button>
                <div class="form-outline">
                  <input type="search" id="form1" class="form-control" />
                </div>
              </div>
            </div> */}
            <header className="card-header title">
              <h6 className="title">Category</h6>
            </header>
            <div className="filter-content collapse show" id="collapse_1">
              <div className="card-body">
                <ul className="list-menu">
                  <li onClick={GetAllProduct} className="custom-category">
                    Home
                  </li>
                  {categorys.map((category) => (
                    <li
                      onClick={GetProductByCategory.bind(this, category)}
                      key={category.index}
                      className="custom-category"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <h6 className="title">Sort By </h6>
            </header>
            <div className="filter-content collapse show" id="collapse_2">
              <div className="custom-fitter-sort-price">
                <ul>
                  <li onClick={HandleLowToHight}>Price : Low to Hight</li>
                  <li onClick={HandleHighttoLow}>Price : Hight to Low</li>
                </ul>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <h6 className="title">Price range </h6>
            </header>
            <div className="filter-content collapse show" id="collapse_3">
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Min</label>
                    <input
                      onChange={setStartValue}
                      value={start}
                      className="form-control"
                      placeholder="$0"
                      type="number"
                      name="topText"
                    />
                  </div>
                  <div className="form-group text-right col-md-6">
                    <label>Max</label>
                    <input
                      onChange={setEndValue}
                      value={end}
                      className="form-control"
                      placeholder="$1,0000"
                      type="number"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-block btn-primary"
                  onClick={FilterPrice.bind(this, start, end)}
                >
                  Apply
                </button>
              </div>
            </div>
          </article>
        </div>
        <button
          className="btn btn-danger btn-block btn-primary mt-3"
          onClick={() => {
            EmtyFilterPrice();
            RemoveALLFittler();
          }}
        >
          Clear All
        </button>
      </aside>
    </>
  );
};

export default Category;
