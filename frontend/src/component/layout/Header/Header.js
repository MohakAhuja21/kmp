import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-hot-toast";

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist_data);
  const dispatch = useDispatch();

  // mobile navbar
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState(
    JSON.parse(localStorage.getItem("recentSearches")) || []
  );
  const [isWishlistEmpty, setIsWishlistEmpty] = useState(true);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Search for medicine",
    "Search for Pain Balm",
    "Search for Baby Soap",
  ];

  const addToRecentSearches = (search) => {
    const updatedSearches = [
      search,
      ...recentSearches.filter((s) => s !== search).slice(0, 4),
    ];
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
      addToRecentSearches(keyword);
    } else {
      navigate("/products");
    }
  };

  const getSuggestions = async (keyword) => {
    if (keyword.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `/api/v1/products/suggestions?keyword=${keyword}`
      );
      const data = await res.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    getSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword("");
    setSuggestions([]);
    addToRecentSearches(suggestion.name);
    navigate(`/products/${suggestion.name}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholderIndex, placeholders.length]);

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(searches);
  }, []);

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

  useEffect(() => {
    if (wishlist && wishlist.orderItems && wishlist.orderItems.length > 0) {
      setIsWishlistEmpty(false);
    } else {
      setIsWishlistEmpty(true);
    }
  }, [wishlist]);

  return (
    <div className="header">
      <Link
        style={{
          textDecoration: "none",
          display: "inline-block",
          width: "fit-content",
        }}
        to="/"
      >
        <img
          className="header__logo"
          src="https://res.cloudinary.com/db4oba9mb/image/upload/v1676805963/website%20assets%20kmp/logo_white_ucaayf.png"
          alt="Kamal Medicos Pharma"
        />
      </Link>

      {/* searchbar */}
      <form className="header__search" onSubmit={searchSubmitHandler}>
        <input
          className="header__searchInput"
          type="text"
          placeholder={placeholders[placeholderIndex]}
          value={keyword}
          onChange={handleInputChange}
        />
        {(keyword !== '' && recentSearches.length > 0) && (
          <div className="header__recentSearches">
            <p className="header__recentSearchesTitle">Recently Searched:</p>
            <ul className="header__recentSearchesList">
              {recentSearches.map((search) => (
                <li className="header__recentSearchesItem" key={search}>
                  {search}
                  <button
                    className="header__recentSearchesCloseBtn"
                    onClick={() => {
                      const updatedSearches = recentSearches.filter(
                        (s) => s !== search
                      );
                      setRecentSearches(updatedSearches);
                      localStorage.setItem(
                        "recentSearches",
                        JSON.stringify(updatedSearches)
                      );
                    }}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {suggestions.length > 0 && keyword.trim() !== "" && (
          <ul className="header__searchSuggestion">
            {suggestions.map((suggestion) => (
              <li
                className="header__searchSuggestionInput"
                key={suggestion.name}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* adding mobile navbar functionality to header nav */}
      <div className={`header__nav ${isOpen && "open"}`}>
        {/* option 1-> sign in */}
        <Link style={{ textDecoration: "none" }} to="/products">
          <div className="header__option">
            <span
              className="header__optionLineOne"
              style={{ textTransform: "none" }}
            >
              Shop all
            </span>
            <span className="header__optionLineTwo">Products</span>
          </div>
        </Link>
        {/* login/signUp */}
        {isAuthenticated ? (
          <Link
            style={{ textDecoration: "none" }}
            to={user?.role === "admin" ? "/admin/dashboard" : "/account"}
          >
            <div className="header__option">
              <span className="header__optionLineOne">
                {user?.email.split("@")[0].replace(/[0-9]/g, "")}
              </span>
              <span className="header__optionLineTwo">
                {user?.role === "admin" ? "Dashboard" : "Your profile"}
                <button className="logout-btn" onClick={logoutUser}>
                  Logout
                </button>
              </span>
            </div>
          </Link>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <div className="header__option">
              <span className="header__optionLineOne">Hello Guest</span>
              <span className="header__optionLineTwo">Login/signup</span>
            </div>
          </Link>
        )}

        {/* option 3-> order history */}
        {isAuthenticated && (
          <Link style={{ textDecoration: "none" }} to="/orders">
            <div className="header__option">
              <span className="header__optionLineOne">returns &amp;</span>
              <span className="header__optionLineTwo">Order</span>
            </div>
          </Link>
        )}

        {/* option 5-> Cart/basket */}
        <Link style={{ textDecoration: "none" }} to="/cart">
          <div className="header_optionCart">
            <ShoppingBasketRoundedIcon style={{ fontSize: "26px" }} />
            <span className="header_optionLineTwo header_CartCount">
              {cartItems && cartItems.length !== 0 ? (
                <span className="flexCenter">{cartItems.length}</span>
              ) : (
                ""
              )}
            </span>
          </div>
        </Link>
        {/* wishlist */}
        {isAuthenticated && (
          <Link style={{ textDecoration: "none" }} to="/wishlist">
            <div className="header_optionCart header_wishlist">
              <FavoriteIcon
                style={{
                  fontSize: "26px",
                  color: isWishlistEmpty ? "whitesmoke" : "red",
                }}
              />
            </div>
          </Link>
        )}
      </div>
      {/* // mobile navbar */}
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>
      <Link style={{ textDecoration: "none" }} to="/cart">
        <div className="header_optionCartMobile">
          <ShoppingBasketRoundedIcon style={{ fontSize: "28px" }} />
          <span className="header_optionLineTwo header_CartCount">
            {cartItems && cartItems.length !== 0 ? (
              <span className="flexCenter">{cartItems.length}</span>
            ) : (
              ""
            )}
          </span>
        </div>
      </Link>
      {isAuthenticated && (
        <Link style={{ textDecoration: "none" }} to="/wishlist">
          <div className="header_optionCart header_wishlistMobile">
            <FavoriteIcon
              style={{
                fontSize: "26px",
                color: isWishlistEmpty ? "whitesmoke" : "red",
              }}
            />
          </div>
        </Link>
      )}
    </div>
  );
}

const header = document.querySelector(".header");

export default Header;
