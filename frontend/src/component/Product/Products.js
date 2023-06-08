import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import {useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { toast } from "react-hot-toast";

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  const {
    products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, category, manufacturer));
  }, [dispatch, keyword, category, manufacturer, error]);
  
  const resetFilters = () => {
    setCategory("");
    setManufacturer("");
  };

  const categories = [
    {
      name: "Syrup",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/cough-syrup-1588614852.png",
    },
    {
      name: "OralRehydrationSalt",
      image:
        "https://rukminim1.flixcart.com/image/850/850/kpinwy80/energy-sport-drink-mix/d/v/4/ors-ready-to-drink-oral-rehydration-contains-vital-electrolytes-original-imag3qzbf4x3hvgj.jpeg?q=20",
    },
    {
      name: "EyeDrops",
      image:
        "https://www.warbyparker.com/learn/wp-content/uploads/2022/10/eye-drops-for-dry-eyes-hero.jpg",
    },
    {
      name: "Injection",
      image:
        "https://handsots.com/wp-content/uploads/2022/08/Why-Didnt-My-Cortisone-Injection-Work-for-My-Pain_-png-1024x724.png",
    },
    {
      name: "Ointment",
      image:
        "https://hips.hearstapps.com/netdoctor.cdnds.net/15/51/1450185971-g-corticosteroid-478186895.jpg",
    },
  ];

  const manufacturers = [
    {
      name: "Cipla Ltd",
      image: "https://theobservatory.in/wp-content/uploads/2019/05/3-25.png",
    },
    {
      name: "Leeford",
      image: "https://lh3.googleusercontent.com/p/AF1QipNPUEy_6KpadYNMWiT7tJQ-wIdZ_cFmpxizvnqp=w1080-h608-p-no-v0",
    },
    {
      name: "CADILA PHARMACEUTICALS LTD",
      image: "https://pbs.twimg.com/profile_images/1083224246866886656/HivE540A_400x400.jpg",
    },
    {
      name: "Intas",
      image: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1475737686/wtt9mg7b07ekoygavdks.png",
    },
    {
      name: "Agrawal Drugs PVt. Ltd",
      image:
        "https://cdn.shopify.com/s/files/1/0508/5210/2328/files/ADPL_300x300.png?v=1662967587",
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="categoryBox">
          <p className="box__title">Shop By Category</p>
            {categories.map((category) => (
              <li
                className="category-link"
                key={category.name}
                onClick={() => setCategory(category.name)}
              >
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
              </li>
            ))}
          </div>
          <div className="manufacturerBox">
            <p className="box__title">Shop By Manufacturer</p>
            {manufacturers.map((manufacturer) => (
              <li
                className="manufacturer-link"
                key={manufacturer.name}
                onClick={() => setManufacturer(manufacturer.name)}
              >
                <img src={manufacturer.image} alt={manufacturer.name} />
              </li>
            ))}
          </div>

          <div className="resetButton">
            <Typography>
              <Button onClick={resetFilters}>
                <RestartAltIcon />
                Reset Page
              </Button>
            </Typography>
          </div>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
