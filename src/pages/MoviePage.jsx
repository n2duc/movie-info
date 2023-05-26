import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../aipConfig/config";
import useSWR from "swr";
import MovieCard from "../components/movies/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from 'react-paginate';

const itemsPerPage = 20;

const MoviePage = () => {
    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [itemOffset, setItemOffset] = useState(0);
    const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
    const filterDebounce = useDebounce(filter, 500);
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }
    const { data, error, isLoading } = useSWR(url, fetcher)
    const loading = !data && !error;
    const { page, total_pages, total_results } = data || {};
    const movies = data?.results || [];
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
            { loading && <div className="h-10 w-10 mx-auto rounded-full border-4 border-primary border-t-transparent border-top-4 animate-spin"></div> }
            <div className="grid grid-cols-4 gap-10">
                {!loading && movies.length > 0 && movies.map((item) => (
                    <MovieCard key={item.id} item={item}></MovieCard>
                ))}
            </div>
            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>
        </div>
    );
};

export default MoviePage;
