import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "../components/ReviewCard/ReviewCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper";

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/reviews`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        setReviews([]);
      })
      .then((data) => {
        setReviews(data.response.reviews);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setReviews([]);
      });
  }, [setReviews]);

  return (
    <div className="reviews-carousel">
      <h2 className="text-center">Client's reviews</h2>
      {reviews.length === 0 ? (
        <h2>No review found...</h2>
      ) : (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {reviews.map((item) => (
            <SwiperSlide key={item._id}>
              <ReviewCard Review={item} />
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      )}
    </div>
  );
};

export default Home;
