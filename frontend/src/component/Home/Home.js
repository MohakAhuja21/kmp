import React, { Fragment, useEffect } from "react";
import "./Home.css";
import Product from "./ProductCard.js";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/Metadata";
import Slider from "./SliderHome";
import Footer from "../layout/Footer/Footer";
import { toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Kamal Medicos: online medical store" />
          <div className="carousel-container">
            <div className="carousel">
              <div className="slider">
                <div className="slide-content">
                  <h1 className="movie-title">Kamal Medicos
                  <br></br>
                  Pharma</h1>
                  <ul className="movie-des">
                    <li>Trusted Partner for Wholesale Medicine Supply</li>
                    <li>
                      We offer a wide range of medicines at competitive prices.
                      With our fast and reliable service, you can rest assured
                      that you will receive your order on time, every time.
                      Partner with us today to experience the convenience and
                      reliability of working with a trusted medicine wholesaler.
                    </li>
                  </ul>
                </div>
                <img
                  className="home__img"
                  src="https://images.unsplash.com/photo-1576091358783-a212ec293ff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
                />
              </div>
            </div>
          </div>
          <Slider />
          <div className="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
          {/* <div className="home__intro">
        Search for :
        <ReactRotatingText
          className="textA"
          items={["Medicines", "Pain Balm", "Health Drinks"]}
          typingInterval={40}
        />
      </div> */}
        </Fragment>
      )}
      <Footer />
    </Fragment>
  );
};

export default Home;
