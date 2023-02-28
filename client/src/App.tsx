import { Input } from "antd";
import { FC, useEffect } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { categories } from "./utils/categories";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation, Mousewheel } from "swiper";
import { useInView } from "react-intersection-observer";
import axios from "axios";

export const App: FC = () => {
  const { ref, inView } = useInView();
  // const swiperButtonRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prev = document.getElementsByClassName(
      "swiper-button-prev"
    )[0] as HTMLElement;
    console.log("inView", inView);

    inView
      ? prev.setAttribute("style", "opacity:0")
      : prev.setAttribute("style", "opcity:1");
  }, [inView]);

  return (
    <div className="main">
      <form className="mainSearch">
        <Input />
      </form>
      <Swiper
        mousewheel={true}
        scrollbar={true}
        slidesPerView={8}
        spaceBetween={10}
        freeMode={true}
        navigation={true}
        modules={[Mousewheel, FreeMode, Navigation]}
        className="swiperCategoriesList"
      >
        {categories.map((el, index) => (
          <SwiperSlide key={el.value}>
            <p ref={index === 0 ? ref : null}>{el.title}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
