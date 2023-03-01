import { Collapse, Input } from "antd";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { categories } from "./utils/categories";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation, Mousewheel } from "swiper";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Post } from "./components/Post";
import { mockArr } from "./utils/mockArr";
import { useWindowSize } from "./utils/useWindowSize";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { IPost } from "./globalTypes";
import { useAppContext } from "./context/MyContext";

export const App: FC = () => {
  const { ref, inView } = useInView();
  const { width: w } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState("");
  // const [showCount, setShowCount] = useState(0);
  const { isAdmin, setIsAdmin, getAllPosts, allPosts, setAllPosts } =
    useAppContext();
  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prev = document.getElementsByClassName(
      "swiper-button-prev"
    )[0] as HTMLElement;
    console.log("inView", inView);
    inView
      ? prev.setAttribute("style", "opacity:0")
      : prev.setAttribute("style", "opcity:1");
  }, [inView]);

  const handleDeletePost = async (id: string) => {
    try {
      const data = await axios.delete(`http://localhost:5000/api/posts/${id}`);
      console.log(data.data);
      toast.success("post successfully deleted");
    } catch (e) {
      console.error(e);
      toast.error("failed to delete post");
    }
    getAllPosts();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleFilterPosts = async (category: string) => {
    try {
      const data = await axios.get(
        `http://localhost:5000/api//posts/filtered/${category}`
      );
      setAllPosts(data.data.body);
      console.table("Post filtered successfully!", data.data);
      toast.success("Post filtered successfully!");
    } catch (e) {
      console.error(e);
      toast.error(e?.message);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // const handleEditPost = async (post: IPost) => {
  //   try {
  //     const data = await axios.put("http://localhost:5000/api/posts", post);
  //     console.log(data.data);
  //     toast.success("post successfully updated");
  //   } catch (e) {
  //     console.error(e);
  //     toast.error(e?.message);
  //   } finally {
  //     getAllPosts();
  //   }
  // };

  let showCount = 0;

  return (
    <div className="main">
      <form className="mainSearch">
        <label htmlFor="main">
          <SearchOutlined style={{ fontSize: "50px" }} />
        </label>
        <input
          value={searchTerm}
          onChange={handleSearch}
          id="main"
          className="visibleInput"
          ref={inpRef}
          type="text"
        />
        <input type="submit" hidden />
      </form>
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
          <p onClick={getAllPosts}>ALL</p>
        </SwiperSlide>
        {categories.map((el, index) => (
          <SwiperSlide key={el.value}>
            <p
              onClick={() => handleFilterPosts(el.value)}
              ref={index === 0 ? ref : null}
            >
              {el.title}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
      <Collapse ghost>
        {allPosts?.length > 0 &&
          allPosts.map(({ _id, question, answer, timeCreated }, index) => {
            let regexp = new RegExp(searchTerm, "gi");
            if (regexp.test(question)) {
              showCount++;
              return (
                <Collapse.Panel
                  header={
                    <div className="collapseHeader">
                      <p>{question}</p>
                      {isAdmin && (
                        <div className="options">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(_id);
                            }}
                          >
                            <DeleteOutlined
                              style={{
                                fontSize: "20px",
                                color: "red",
                              }}
                            />
                          </button>
                          {/* <button
                          onClick={(e) => {
                            handleEditPost({
                              _id,
                              question,
                              answer,
                              category,
                              timeCreated,
                            });
                            e.stopPropagation();
                          }}
                        >
                          <EditOutlined style={{ fontSize: "20px" }} />
                        </button> */}
                        </div>
                      )}
                    </div>
                  }
                  key={index}
                >
                  <Post answer={answer} timeCreated={timeCreated} />
                </Collapse.Panel>
              );
            } else if (index !== 0 && showCount !== 0) {
              return <p className="notFinded">Не найдено...</p>;
            } else {
              return;
            }
          })}
      </Collapse>
    </div>
  );
};
