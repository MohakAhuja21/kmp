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
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, error]);

  const resetFilters = () => {
    setCategory("");
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
      name: "Ointment",
      image:
        "https://hips.hearstapps.com/netdoctor.cdnds.net/15/51/1450185971-g-corticosteroid-478186895.jpg",
    },
    
  ];

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="categoryBox">
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
