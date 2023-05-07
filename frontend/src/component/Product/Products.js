import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { toast } from "react-hot-toast";

const Products = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");

  const {
    products,
    loading,
    productCount,
    resultPerPage,
    filterProductCount,
    error,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filterProductCount;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, category, manufacturer));
  }, [dispatch, keyword, currentPage, category, manufacturer, error]);

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
      image: "https://scontent.fdel27-4.fna.fbcdn.net/v/t39.30808-6/272283216_489479505865760_7753547163186870560_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=_VyJxvpoWocAX_-Btz2&_nc_ht=scontent.fdel27-4.fna&oh=00_AfAmdlvUt5POV03kHx4QJZsSrgbbSYxZSYF7NkPxgjCI2w&oe=645D2691",
    },
    {
      name: "CADILA PHARMACEUTICALS LTD",
      image: "https://scontent.fdel27-5.fna.fbcdn.net/v/t1.6435-9/49296051_582202098920282_6533187247729016832_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wD59-xhNDbAAX9d5J2d&_nc_ht=scontent.fdel27-5.fna&oh=00_AfAaKrA0u6m4VojHd3dDx_94S8c3gi8R7RwIRdVkhq2cYQ&oe=647F197E",
    },
    {
      name: "Intas",
      image: "https://scontent.fdel27-5.fna.fbcdn.net/v/t39.30808-6/307202510_212955981061827_794165621425815895_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=_fTCRcPqZ6MAX83PUj5&_nc_ht=scontent.fdel27-5.fna&oh=00_AfBPwEbRrW7QUujpmAcvfQGeWvnLkZw574qD94J8GwTgZg&oe=645BD0FB",
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

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
