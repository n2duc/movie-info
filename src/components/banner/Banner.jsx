import React from "react";
import { fetcher } from "../../aipConfig/config";
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from "swr";
import BannerItem from "./BannerItem";

const Banner = () => {
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=e00bb48683aa6a7ef51d803c09e9bf9a`, fetcher);
    const movies = data?.results || [];
    return (
        <section className="banner h-[500px] page-container mb-10 overflow-hidden">
            <Swiper grabCursor slidesPerView="auto" >
                { movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}></BannerItem>
                    </SwiperSlide>
                )) }
            </Swiper>
        </section>
    );
};

export default Banner;
