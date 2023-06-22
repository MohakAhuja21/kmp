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
import { Link } from "react-router-dom";
import Offer from "./Offer";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  const handlePhoneCall = () => {
    window.location.href = "tel:+919213632255";
  };

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
                  <h1 className="movie-title">
                    Pharmaceutical<br></br> Distributor
                  </h1>
                  <ul className="movie-des">
                    <li>
                    Experience competitive prices, fast delivery, and trusted reliability with our wide range of medicines.
                    </li>
                    <li>
                    Partner with us today for convenience and peace of mind.
                    </li>
                  </ul>
                </div>
                <img
                  className="home__img"
                  src="https://res.cloudinary.com/db4oba9mb/image/upload/v1683206984/banner_gji4n2.jpg"
                />
              </div>
            </div>
          </div>
          <Slider />
          <Offer />
          <div className="container">
            {products &&
              products
                .slice(0, 12)
                .map((product) => <Product product={product} />)}
          </div>

          <div className="card__products">
            <Link style={{ textDecoration: "none" }} to="/products">
              Shop all Products
            </Link>
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
