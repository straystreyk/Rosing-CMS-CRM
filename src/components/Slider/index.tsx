import * as React from "react";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

import { ImageProps } from "../ImageUploader";
import { useRef } from "react";

interface SliderProps {
  images: ImageProps[];
  showSlider: boolean;
  setShowSlider: any;
}

export const Slider: React.FC<SliderProps> = ({ images, showSlider, setShowSlider }) => {
  const [swiper, setSwiper] = React.useState<any>(null);
  const prev = useRef(null);
  const next = useRef(null);
  const bullets = useRef(null);

  const hideSlider = () => {
    setShowSlider(false);
  };

  React.useEffect(() => {
    if (showSlider) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          hideSlider();
        }
      });
    }
  }, [showSlider]);

  if (!showSlider) return null;

  return (
    <div className="ModalSlider">
      <div className="ModalContent">
        <Swiper
          onSwiper={setSwiper}
          modules={[Navigation, Pagination]}
          navigation={{ prevEl: prev.current, nextEl: next.current }}
          pagination={{
            clickable: true,
            el: bullets.current,
          }}
          spaceBetween={50}
          slidesPerView={1}
          grabCursor
        >
          {images.map((image) => {
            return (
              <SwiperSlide key={image.id}>
                <img src={image.file} alt={image.kind} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button className="sliderButton sliderPrev" ref={prev}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="10"
              cy="10.5"
              r="7.35"
              transform="rotate(90 10 10.5)"
              stroke="white"
              strokeWidth="1.3"
            />
            <line
              x1="10.4665"
              y1="13.1162"
              x2="7.85022"
              y2="10.4999"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="0.65"
              y1="-0.65"
              x2="4.35"
              y2="-0.65"
              transform="matrix(-0.707107 0.707107 0.707107 0.707107 11.3858 7.88379)"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="sliderButton sliderNext" ref={next}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="10"
              cy="10.5"
              r="7.35"
              transform="rotate(-90 10 10.5)"
              stroke="white"
              strokeWidth="1.3"
            />
            <line
              x1="9.5335"
              y1="7.88379"
              x2="12.1498"
              y2="10.5001"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="0.65"
              y1="-0.65"
              x2="4.35"
              y2="-0.65"
              transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 8.61426 13.1162)"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="ModalCloseButton" onClick={hideSlider}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1884 0.816152L0.793945 11.2106M11.2067 11.1845L0.812208 0.790039"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="sliderBullets" ref={bullets}></div>
      </div>
    </div>
  );
};
