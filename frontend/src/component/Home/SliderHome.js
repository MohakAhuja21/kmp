import React from "react";
import "./Slider.css";

function Slider() {
  const slides = [
    "https://www.abbott.co.in/etc.clientlibs/abbott-platform/clientlibs/clientlib-site/resources/images/abbott-logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Cipla_logo.svg/2560px-Cipla_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/3f/Mankind_Serving_Life.png",
    "https://ddnews.gov.in/sites/default/files/Zydus-Cadila.jpg",
    "https://www.leefordonline.in/images/logo.png?v=1.2",
    "https://drmorepen.com/wp-content/uploads/2021/02/logo.png",
    "https://iphex-india.com/uploads/company_logo_2018/173_Knoll_Healthcare_Pvt._Ltd._comp_logo_20180405154647.jpg",
    "https://static.wixstatic.com/media/1b134f_082f6de6917e431ab3915ee6a724fbd1~mv2.png/v1/fill/w_340,h_340,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Luen%20Cheong%20Hong%20LCH%20Logo.png",
  ];

  const slideDuration = slides.length * 6;

  return (
    <div className="sliderCon">
      <div
        className="slide-track"
        style={{ animationDuration: `${slideDuration}s` }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            <img src={slide} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
