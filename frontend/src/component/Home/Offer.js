import React, { useEffect, useState } from "react";
import "./Offer.css";
import { Link } from "react-router-dom";

const Offer = () => {
  const testimonials = [
    {
      name: "ELECTRAL POWDER",
      scheme: "28+2",
      image:
        "https://newassets.apollo247.com/pub/media/catalog/product/e/l/ele0012.jpg",
      productId: "644e006eb9e1261b11398bee", // Add productId for linking
    },
    {
      name: "ELECTRAL LIQUID",
      scheme: "5+1",
      image: "https://www.electral.co.in/images/products/tetrapakimg.png",
      productId: "644e0165b9e1261b11398df5",
    },
    {
      name: "QUADRIDERM RF CREAM",
      scheme: "5+1",
      image:
        "https://res.fkhealthplus.com/incom/images/product/Quadriderm-RF-1669985958-10000666-1.jpg",
      productId: "6479cbf53fdabf22e0e7013b",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + testimonials.length - 1) % testimonials.length
    );
  };

  useEffect(() => {
    const loader = document.getElementById("loader");
    const box = document.getElementById("box");
    loader.style.display = "none";
    box.style.display = "block";
  }, []);

  const { name, scheme, image, productId } = testimonials[currentSlide];

  return (
    <div className="OfferCon">
      <div id="loader"></div>
      <div id="box">
        <div className="wrapper">
          <div className={`testimonial-container`} id="testimonial-container">
            <div
              className={`testimonial1 active ${isLoading ? "loading" : ""}`}
            >
              <h1 className="offerCon_head">Ongoing scheme</h1>
              <Link
                style={{ textDecoration: "none" }}
                to={`/product/${productId}`}
              >
                <div className="image-wrapper">
                  <img
                    src={image}
                    alt="Testimonial"
                    onLoad={() => setIsLoading(false)}
                    className={isLoading ? "hidden" : "visible"}
                  />
                  {isLoading && (
                    <div className="loading-overlay">Loading...</div>
                  )}
                </div>
                {!isLoading && (
                  <>
                    <h3>{name}</h3>
                    <p>
                      scheme: <span>{scheme}</span>
                    </p>
                  </>
                )}
              </Link>
            </div>
          </div>
          <button id="prev" onClick={prevSlide}>
            &lt;
          </button>
          <button id="next" onClick={nextSlide}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
