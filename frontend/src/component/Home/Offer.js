import React, { useEffect, useState } from 'react';
import './Offer.css';
import { Link } from "react-router-dom";

const Offer = () => {
  const testimonials = [
    {
      name: 'ELECTRAL POWDER',
      scheme: '28+2',
      image: 'https://newassets.apollo247.com/pub/media/catalog/product/e/l/ele0012.jpg',
      productId: '644e006eb9e1261b11398bee', // Add productId for linking
      // testimonial:
      //   'Neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur',
    },
    {
      name: 'ELECTRAL LIQUID',
      scheme: '5+1',
      image: 'https://www.electral.co.in/images/products/tetrapakimg.png',
      productId:'644e0165b9e1261b11398df5',
      // testimonial:
      //   'Elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet nulla',
    },
    {
      name: 'QUADRIDERM RF CREAM',
      scheme: '4+1',
      image: 'https://res.fkhealthplus.com/incom/images/product/Quadriderm-RF-1669985958-10000666-1.jpg',
      productId:'6479cbf53fdabf22e0e7013b',
      // testimonial:
      //   'Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod in pellentesque massa placerat duis ultricies lacus sed turpis',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      (prevSlide + testimonials.length - 1) % testimonials.length
    );
  };

  useEffect(() => {
    // This code will be executed when the component is mounted
    document.getElementById('loader').style.display = 'none';
    document.getElementById('box').style.display = 'block';
  }, []);

  return (
    <div className="OfferCon">
      <div id="loader"></div>
      <div id="box">
        <div className="wrapper">
          <div className="testimonial-container" id="testimonial-container">
            <div id="testimonial1" className="active">
        <h1 className='offerCon_head'>Ongoing Offers</h1>
        <Link style={{textDecoration:"none"}} to={`/product/${testimonials[currentSlide].productId}`}>
              <img
                src={testimonials[currentSlide].image}
                alt="Testimonial"
              />
              <h3>{testimonials[currentSlide].name}</h3>
              <p>scheme: <span>{testimonials[currentSlide].scheme}</span></p>
              {/* <p>{testimonials[currentSlide].testimonial}</p> */}
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
