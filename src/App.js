import React from "react";
import Header from "./components/Header";
import Product from "./components/Product";
import Footer from "./components/Footer";
import LoginGoogle from "./components/LoginGoogle";
import Error from "./components/Error";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CartTemplate from "./components/cart/CartTemplate";
import CartDetail from "./components/cart/CartDetail";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/detail/:id" component={CartDetail} />
          <Route path="/cart" component={CartTemplate} />
          <Route path="/login" component={LoginGoogle} />
          <Route exact path="/">
            <Product />
          </Route>
          <Route path="*" component={Error} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
