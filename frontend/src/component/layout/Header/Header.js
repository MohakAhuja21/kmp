import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { logout } from "../../../actions/userAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-hot-toast";

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // mobile navbar
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
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
    setKeyword(e.target.value);
    getSuggestions(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion.name);
    setSuggestions([]);
    navigate(`/products/${suggestion.name}`);
    setKeyword("");
  };

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholders = [
    "Search for medicine",
    "Search for Pain Balm",
    "Search for Baby Soap",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((placeholderIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholderIndex, placeholders.length]);

  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }

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
        <SearchIcon className="header__searchIcon" />
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
              <span className="header__optionLineOne">{user?.name}</span>
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
              <FavoriteIcon style={{ fontSize: "26px", color: "red" }} />
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
            <FavoriteIcon style={{ fontSize: "26px", color: "red" }} />
          </div>
        </Link>
      )}
    </div>
  );
}

const header = document.querySelector(".header");

export default Header;
