import { Collapse, Popconfirm, Typography } from "antd";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { categories } from "./utils/staticArrs/categories";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation, Mousewheel } from "swiper";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { Post } from "./components/Post";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useAppContext } from "./context/MyContext";
import { useDebounce } from "./utils/hooks/useDebounce";
import { useWindowSize } from "./utils/hooks/useWindowSize";
import { getSignerFunc } from "./utils/web3Actions/getSignerFunc";
import { IPost } from "./globalTypes";
import sha256 from "sha256";

export const App: FC = () => {
  const { ref, inView } = useInView();
  const { width: w } = useWindowSize();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [shownAnswers, setShownAnswers] = useState([]);
  const [openMainPop, setOpenMainPop] = useState(false);

  const {
    isAdmin,
    getAllPosts,
    allPosts,
    setAllPosts,
    handleToggleEditModal,
    setOldQuestion,
    setOldAnswer,
    setOldCateg,
    setCurrId,
  } = useAppContext();
  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const prev = document.getElementsByClassName(
      "swiper-button-prev"
    )[0] as HTMLElement;
    inView
      ? prev.setAttribute("style", "opacity:0")
      : prev.setAttribute("style", "opcity:1");
  }, [inView]);

  const handleDeletePost = async (post: IPost) => {
    try {
      const hash = sha256(String(post.question + post.answer + post.category));
      const { signedContract } = await getSignerFunc();
      const tx = await signedContract.deletePostHash(hash);
      await tx.wait();
      const data = await axios.delete(
        `http://localhost:5000/api/posts/${post._id}`
      );
      console.log(data.data);
      toast.success("Пост успешно удален");
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
    } catch (e) {
      console.error(e);
      toast.error(e?.message);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  let regexp = new RegExp(debouncedSearchTerm, "gi");

  const confirm = (post: IPost) => {
    handleDeletePost(post);
  };

  const secondText = "Вы точно-точно уверены в этом?";
  const secondDescription = "Точно приточно удалить";

  const firstText = "Вы уверены, что хотите удалить этот пост?";
  const firstDescription = "Удалить";

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
      {w > 876 ? (
        <div className="desktopPosts">
          {allPosts?.length > 0 ? (
            allPosts.map(
              ({ _id, hash, question, answer, category, timeCreated }) => {
                if (regexp.test(question)) {
                  return (
                    <div className="eachPost">
                      <h4>{question}</h4>
                      <h5
                        onClick={() => {
                          navigator.clipboard.writeText(hash);
                        }}
                      >
                        склопировать хэш
                      </h5>
                      {isAdmin === "true" && (
                        <div className="options">
                          <Popconfirm
                            placement="topLeft"
                            title={secondText}
                            description={secondDescription}
                            onConfirm={() =>
                              confirm({
                                _id,
                                hash,
                                question,
                                answer,
                                category,
                                timeCreated,
                              })
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <button
                              style={{ background: "transparent" }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Popconfirm
                                placement="bottomRight"
                                title={firstText}
                                description={firstDescription}
                                onConfirm={() => setOpenMainPop(true)}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button
                                  style={{ background: "transparent" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <DeleteOutlined
                                    style={{
                                      fontSize: "24px",
                                      color: "red",
                                    }}
                                  />
                                </button>
                              </Popconfirm>
                            </button>
                          </Popconfirm>
                          <button
                            style={{ background: "transparent" }}
                            onClick={(e) => {
                              handleToggleEditModal();
                              e.stopPropagation();
                              setOldQuestion(question);
                              setOldAnswer(answer);
                              setOldCateg(category);
                              setCurrId(_id);
                            }}
                          >
                            <EditOutlined
                              style={{
                                fontSize: "24px",
                                color: "var(--black)",
                              }}
                            />
                          </button>
                        </div>
                      )}
                      {!shownAnswers.includes(question) ? (
                        <h6
                          onClick={() =>
                            setShownAnswers([...shownAnswers, question])
                          }
                        >
                          показать ответ
                        </h6>
                      ) : (
                        <Post answer={answer} timeCreated={timeCreated} />
                      )}
                    </div>
                  );
                }
              }
            )
          ) : (
            <h1 className="someProblems">Some server problems!</h1>
          )}
          {allPosts && allPosts.every((p) => !regexp.test(p.question)) && (
            <p className="notFinded">Ничего не найдено...</p>
          )}
        </div>
      ) : (
        <Collapse ghost>
          {allPosts?.length > 0 ? (
            allPosts.map(
              ({ _id, hash, question, answer, category, timeCreated }) => {
                if (regexp.test(question)) {
                  return (
                    <Collapse.Panel
                      header={
                        <div className="collapseHeader">
                          <p>{question}</p>
                          {isAdmin === "true" && (
                            <div className="options">
                              <Popconfirm
                                placement="topLeft"
                                title={secondText}
                                description={secondDescription}
                                onConfirm={() =>
                                  confirm({
                                    _id,
                                    hash,
                                    question,
                                    answer,
                                    category,
                                    timeCreated,
                                  })
                                }
                                okText="Yes"
                                cancelText="No"
                              >
                                <button
                                  style={{ background: "transparent" }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
                                  <Popconfirm
                                    placement="bottomRight"
                                    title={firstText}
                                    description={firstDescription}
                                    onConfirm={() => setOpenMainPop(true)}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <button
                                      style={{ background: "transparent" }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                      }}
                                    >
                                      <DeleteOutlined
                                        style={{
                                          fontSize: "24px",
                                          color: "red",
                                        }}
                                      />
                                    </button>
                                  </Popconfirm>
                                </button>
                              </Popconfirm>
                              <button
                                style={{ background: "transparent" }}
                                onClick={(e) => {
                                  handleToggleEditModal();
                                  e.stopPropagation();
                                  setOldQuestion(question);
                                  setOldAnswer(answer);
                                  setOldCateg(category);
                                  setCurrId(_id);
                                }}
                              >
                                <EditOutlined
                                  style={{
                                    fontSize: "24px",
                                    color: "var(--black)",
                                  }}
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      }
                      key={_id}
                    >
                      <Post answer={answer} timeCreated={timeCreated} />
                    </Collapse.Panel>
                  );
                }
              }
            )
          ) : (
            <h1 className="someProblems">Some server problems!</h1>
          )}
          {allPosts && allPosts.every((p) => !regexp.test(p.question)) && (
            <p className="notFinded">Ничего не найдено...</p>
          )}
        </Collapse>
      )}
    </div>
  );
};
