import { useEffect } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation, Mousewheel } from "swiper";
import { useWindowSize } from "../utils/hooks/useWindowSize";
import { categories } from "../utils/staticArrs/categories";
import { useAppContext } from "../context/MyContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useInView } from "react-intersection-observer";

export const Categories = () => {
  const { ref, inView } = useInView();
  const { width: w } = useWindowSize();
  const { getAllPosts, setAllPosts, setActiveCateg, activeCateg } =
    useAppContext();

  useEffect(() => {
    const prev = document.getElementsByClassName(
      "swiper-button-prev"
    )[0] as HTMLElement;
    inView
      ? prev.setAttribute("style", "opacity:0")
      : prev.setAttribute("style", "opcity:1");
  }, [inView]);

  const handleFilterPosts = async (category: string) => {
    try {
      const data = await axios.get(
        `http://localhost:5000/api//posts/filtered/${category}`
      );
      setAllPosts(data.data.body);
      setActiveCateg(category);
      console.table("Post filtered successfully!", data.data);
    } catch (e) {
      console.error(e);
      toast.error(e?.message);
    }
  };

  return (
    <Swiper
      mousewheel={true}
      scrollbar={true}
      slidesPerView={w > 1200 ? 8 : w > 900 ? 6 : w > 576 ? 4 : 2}
      spaceBetween={10}
      freeMode={true}
      navigation={true}
      modules={[Mousewheel, FreeMode, Navigation]}
      className="swiperCategoriesList"
    >
      <SwiperSlide>
        <p
          className={activeCateg === "all" ? "activeCateg" : "eachCateg"}
          onClick={getAllPosts}
        >
          ALL
        </p>
      </SwiperSlide>
      {categories.map(({ title, value }, index) => (
        <SwiperSlide key={value}>
          <p
            className={activeCateg === value ? "activeCateg" : "eachCateg"}
            onClick={() => handleFilterPosts(value)}
            ref={index === 0 ? ref : null}
          >
            {title}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
