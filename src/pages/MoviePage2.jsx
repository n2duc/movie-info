import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../aipConfig/config";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import MovieCard, { MovieCardSkeleton } from "../components/movies/MovieCard";
import useDebounce from "../hooks/useDebounce";
import { v4 } from 'uuid';
import Button from "../components/button/Button";

const itemsPerPage = 20;

const MoviePage2 = () => {
    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
    const filterDebounce = useDebounce(filter, 500);
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }
    const { data, error, size, setSize } = useSWRInfinite(
        (index) => url.replace("page=1", `page=${index + 1}`),
        fetcher
    );
    const loading = !data && !error;
    const movies = data ? data.reduce((a, b) => [...a, ...b.results], []) : [];
    const isEmpty = data?.[0]?.results?.length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results?.length < itemsPerPage);
    const { page, total_pages, total_results } = data || {};
    // console.log(data)
    useEffect(() => {
        if (filterDebounce) {
            setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
        } else {
            setUrl(tmdbAPI.getMovieList("popular", nextPage));
        }
    }, [filterDebounce, nextPage]);
    // react-paginate
    const pageCount = Math.ceil(total_results / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % total_results;
        setItemOffset(newOffset);
        setNextPage(event.selected + 1);
    };
    return (
        <div className="py-10 page-container">
            <div className="flex mb-8 rounded-lg overflow-hidden">
                <div className="flex-1">
                    <input type="text" className="w-full px-5 py-4 bg-slate-800 text-white outline-none" placeholder="Search movies..."  onChange={handleFilterChange}/>
                </div>
                <button className="p-4 bg-primary text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
            { loading && <div className="grid grid-cols-4 gap-10">
                {new Array(itemsPerPage).fill(0).map(() => (
                    <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                ))}
            </div>}
            <div className="grid grid-cols-4 gap-10">
                {!loading && movies.length > 0 && movies.map((item) => (
                    <MovieCard key={item.id} item={item}></MovieCard>
                ))}
            </div>
            <div className="mt-10 text-center">
                <Button 
                    full={false} 
                    onClick={() => (isReachingEnd ? {} : setSize(size + 1))} 
                    disable={isReachingEnd}
                    className={`${isReachingEnd ? 'bg-gray-400' : 'bg-primary'}`}
                >
                    Load more
                </Button>
            </div>
        </div>
    );
};


export default MoviePage2;