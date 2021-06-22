import React from "react";

const Carousel = () => {
  return (
    <div className="container mt-3">
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active custom-img-caresol">
            <img
              src="https://i.ibb.co/x6ZRFgy/done1.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item custom-img-caresol">
            <img
              src="https://i.ibb.co/vwVQ9My/done2.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item custom-img-caresol">
            <img
              src="https://i.ibb.co/bLTpyqc/done3.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Carousel;