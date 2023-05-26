import React, { useEffect, useState } from "react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetcher, tmdbAPI } from "../../aipConfig/config";
import useSWR from "swr";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

const MoiveList = ({ type = "now_playing" }) => {
    const { data, error, isLoading } = useSWR(
        tmdbAPI.getMovieList(type),
        fetcher
    );
    const moives = data?.results || [];
    return (
        <div className="movie-list">
            {isLoading && <>
                <Swiper
                    grabCursor="true"
                    spaceBetween={30}
                    slidesPerView={4}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                </Swiper>
            </>}
            {!isLoading && <Swiper
                grabCursor="true"
                spaceBetween={30}
                slidesPerView={4}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                    },
                    480: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {moives.length > 0 &&
                    moives.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
            </Swiper> }
        </div>
    );
};

MoiveList.propTypes = {
    type: PropTypes.string.isRequired,
};

function ErrorFallback() {
    return (
        <p className="bg-red-50 text-red-500">
            Something went wrong: MoiveList component
        </p>
    );
}

export default withErrorBoundary(MoiveList, {
    FallbackComponent: ErrorFallback,
});
