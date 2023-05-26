import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../aipConfig/config";
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from "../components/movies/MovieCard";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const { data, error, isLoading } = useSWR(
        tmdbAPI.getMovieDetails(movieId),
        fetcher
    );
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data || {};
    return (
        <div className="py-6 page-container">
            <div className="w-full h-[600px] relative">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
                    }}
                ></div>
            </div>
            <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
                <img src={tmdbAPI.imageOriginal(poster_path)} className="w-full h-full object-cover rounded-xl" alt="" />
            </div>
            <h1 className="text-center text-3xl font-bold text-white mb-10">{title}</h1>
            { genres.length > 0 && <div className="flex items-center justify-center gap-x-5 mb-10">
                { genres.map((item) => (
                    <span className="py-2 px-4 border border-primary rounded-full" key={item.id}>{item.name}</span>
                ))}
            </div> }
            <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">{overview}</p>
            <MovieMeta type="credits"></MovieMeta>
            <MovieMeta type="videos"></MovieMeta>
            <MovieMeta type="similar"></MovieMeta>
        </div>
    );
};

function MovieMeta({ type = "videos" }) {
    const { movieId } = useParams();
    const { data } = useSWR(
        tmdbAPI.getMovieMeta(movieId, type),
        fetcher
    );
    if (!data) return null;
    if (type === 'credits') {
        const { cast } = data || {};
        if (!cast || cast.length <= 0) return null;
        return (
            <div className="py-10">
                <h2 className="text-center text-3xl font-medium mb-10">Casts</h2>
                <div className="grid grid-cols-5 gap-5">
                    { cast.slice(0,5).map((item) => (
                        <div className="cast-item" key={item.id}>
                            <img src={tmdbAPI.imageOriginal(item.profile_path)} className="w-full h-[320px] object-cover rounded-md mb-3" alt="Actor" />
                            <h3 className="text-base text-center font-medium p-2 bg-slate-800 rounded-md border border-primary">{item.name}</h3>
                        </div>
                    )) }
                </div>
            </div>
        )
    } else {
        const { results } = data || {};
        if (!results || results.length <= 0) return null;
        if (type === 'videos') {
            return (
                <div className="py-10">
                    <div className="flex flex-col gap-10">
                        {results.slice(0, 2).map((item) => (
                            <div key={item.id} className="w-full rounded-xl overflow-hidden aspect-video">
                                <iframe width="864" height="486" src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full object-fill"></iframe>
                            </div>
                        ))}
                    </div>
                </div>
            ) 
        }
        if (type === 'similar') {
            return (
                <div className="py-10">
                    <h2 className="text-center text-2xl font-medium mb-10">Similar Movies</h2>
                    <div className="movie-list">
                        <Swiper
                            grabCursor="true" spaceBetween={30}
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
                            {results.length > 0 && results.map((item) => (
                                <SwiperSlide key={item.id}>
                                    <MovieCard item={item}></MovieCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )
        }
    }
    return null;
}

function MovieCredits() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        tmdbAPI.getMovieMeta(movieId, "credits"),
        fetcher
    );
    if (!data) return null;
    const { cast } = data || {};
    if (!cast || cast.length <= 0) return null;
    return (
        <div className="py-10">
            <h2 className="text-center text-3xl font-medium mb-10">Casts</h2>
            <div className="grid grid-cols-5 gap-5">
                { cast.slice(0,5).map((item) => (
                    <div className="cast-item" key={item.id}>
                        <img src={tmdbAPI.imageOriginal(item.profile_path)} className="w-full h-[320px] object-cover rounded-md mb-3" alt="Actor" />
                        <h3 className="text-base text-center font-medium p-2 bg-slate-800 rounded-md bg-opacity-60">{item.name}</h3>
                    </div>
                )) }
            </div>
        </div>
    )
}

function MovieVideos() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        tmdbAPI.getMovieMeta(movieId, "videos"),
        fetcher
    );
    if (!data) return null;
    const { results } = data || {};
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10">
            <div className="flex flex-col gap-10">
                {results.slice(0, 2).map((item) => (
                    <div key={item.id} className="w-full rounded-xl overflow-hidden aspect-video">
                        <iframe width="864" height="486" src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full object-fill"></iframe>
                    </div>
                ))}
            </div>
        </div>
    )
};

function MovieSimilar() {
    const { movieId } = useParams();
    const { data, error } = useSWR(
        tmdbAPI.getMovieMeta(movieId, "similar"),
        fetcher
    );
    if (!data) return null;
    const { results } = data || {};
    if (!results || results.length <= 0) return null;
    return (
        <div className="py-10">
            <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
            <div className="movie-list">
                <Swiper grabCursor="true" spaceBetween={30} slidesPerView="auto">
                    {results.length > 0 && results.map((item) => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default MovieDetailsPage;
