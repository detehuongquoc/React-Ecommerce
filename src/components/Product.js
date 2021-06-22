import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  productSelector,
  searchSelector,
} from "../store/reducers/productSlice";
import Carousel from "./Carousel";
import Category from "./LeftHomePage/Category";
import SingleProduct from "./SingleProduct";

const Product = () => {
  //State Component
  const productss = useSelector(productSelector);
  const searchvalue = useSelector(searchSelector);
  const [products, setProducts] = useState([]);
  const [FitterPrice, setFitterPrice] = useState("");

  //Set product
  useEffect(() => {
    setProducts(productss);
  }, [productss]);

  //dispatch GetALLProduct
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const RemoveALLFittler = () => {
    // dispatch(getAllProduct());
    FilterPrice();
  };
  //set empty FiiterPrice
  const EmtyFilterPrice = () => {
    setFitterPrice("");
  };

  //add product to cart

  // fillter Price
  const FilterPrice = (start = 0, end = 0) => {
    if (start < 0 || end < 0) {
      alert("wrong price");
    } else {
      parseFloat(start) > parseFloat(end)
        ? console.log(typeof start, end)
        : setFitterPrice(
            products.filter((product) => {
              console.log(product.price);
              console.log(product.start);
              console.log(product.end);
              return product.price > start && product.price < end;
            })
          );
      // if (FitterPrice == null) setFitterPrice("");
    }
  };

  //Load more
  const [limit, setLimit] = useState(6);
  const SetLimit = () => {
    setLimit(limit + 6);
  };

  //filter Search
  // const FilterSearch = (valueSearch) => {
  //   console.log(state.allProduct);
  //   const searchTest = state.allProduct.filter((product) =>
  //     product.title.includes(action.payload)
  //   );
  //   console.log(searchTest);
  // };

  // Click fillter price low to hight //
  const HandleLowToHight = () => {
    setProducts(
      products.slice().sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    );
  };
  const HandleHighttoLow = () => {
    setProducts(
      products.slice().sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    );
  };

  return (
    <>
      <div className="App">
        <section className="section-content padding-y">
          <div className="container">
            <Carousel />
            <div className="row custom-homepage-main">
              <Category
                product={products}
                FilterPrice={FilterPrice}
                EmtyFilterPrice={EmtyFilterPrice}
                RemoveALLFittler={RemoveALLFittler}
                HandleLowToHight={HandleLowToHight}
                HandleHighttoLow={HandleHighttoLow}
              />
              <main className="col-md-9">
                <header className="border-bottom mb-4 pb-3"></header>
                <div className="row">
                  {FitterPrice != ""
                    ? FitterPrice.filter((product) => {
                        return product.title
                          .toLowerCase()
                          .includes(searchvalue.toLowerCase());
                      }).map((product) => (
                        <SingleProduct
                          id={product.id}
                          title={product.title}
                          price={product.price}
                          image={product.image}
                          key={product.id}
                        />
                      ))
                    : products
                        .slice(0, limit)
                        .filter((product) => {
                          return product.title
                            .toLowerCase()
                            .includes(searchvalue.toLowerCase());
                        })
                        .map((product) => (
                          <SingleProduct
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            key={product.id}
                          />
                        ))}
                </div>
                <div className="warrapber-button">
                  <button
                    disabled={limit >= products.length}
                    className={` "button-loadmore"
                      ${FitterPrice ? "display : none" : "display : none"}`}
                    onClick={SetLimit}
                  >
                    Load more
                  </button>
                </div>
              </main>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Product;
