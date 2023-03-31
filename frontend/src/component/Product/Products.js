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

const categories = [
  {
    name: "Hajmola",
    image:
      "https://mishry.com/wp-content/uploads/2021/09/hajmola-candy-review.jpg",
  },
  // add more categories here
];

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
