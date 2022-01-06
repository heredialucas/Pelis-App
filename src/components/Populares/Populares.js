import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoviePopular } from "../../redux/actions/actions";
import Imagen from "../../assets/images/noimg.jpg";
import { Link } from "react-router-dom";
import s from "./Populares.module.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import SwiperCore, { Pagination } from "swiper";

SwiperCore.use([Pagination]);

export default function Pop() {
  const dispatch = useDispatch();
  const moviesPop = useSelector((state) => state.moviesPop);

  useEffect(() => {
    dispatch(getMoviePopular());
  }, [dispatch]);

  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={50}
      pagination={{
        clickable: true,
      }}
      className={s.swiper}
    >
      {moviesPop &&
        moviesPop.map((e, index) => {
          return (
            <SwiperSlide>
              <div className={s.card} key={index}>
                <div className={s.poster}>
                  {!e.poster_path ? (
                    <img src={Imagen} alt="Imagenesasdas" />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                      alt="Imagenes"
                    />
                  )}
                </div>
                <div className={s.details} to={`/movie/${e.id}`}>
                  <h2>
                    {e.original_title}
                    <br />
                    <p>Date: {e.release_date}</p>
                  </h2>
                  <Link className={s.btnLink} to={`/movie/${e.id}`}>
                    Details
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
