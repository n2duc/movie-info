import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../aipConfig/config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
    const { title, release_date, poster_path, vote_average, id } = item || {};
    const navigate = useNavigate();
    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <img
                src={tmdbAPI.image500(poster_path)}
                alt=""
                className="w-full h-[250px] object-cover rounded-lg mb-3"
            />
            <div className="flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-3">{title}</h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-5">
                    <span>{new Date(release_date).getFullYear().toString()}</span>
                    <span>{vote_average}</span>
                </div>
                <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
            </div>
        </div>
    );
};
MovieCard.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        release_date: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        id: PropTypes.number,
    }),
};
function ErrorFallback() {
    return (
        <p className="bg-red-50 text-red-500">
            Something went wrong: MovieCard component
        </p>
    );
}
export const MovieCardSkeleton = () => {
    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <LoadingSkeleton width="100%" height="250px" borderRadius="8px" className="mb-3"></LoadingSkeleton>
            <div className="flex flex-col flex-1">
                <LoadingSkeleton width="100%" height="20px" borderRadius="4px" className="mb-3"></LoadingSkeleton>
                <div className="flex items-center justify-between text-sm opacity-50 mb-5">
                    <LoadingSkeleton width="50px" height="12px" borderRadius="4px"></LoadingSkeleton>
                    <LoadingSkeleton width="32px" height="12px" borderRadius="4px"></LoadingSkeleton>
                </div>
                <LoadingSkeleton width="100%" height="40px" borderRadius="8px"></LoadingSkeleton>
            </div>
        </div>
    )
}
export default withErrorBoundary(MovieCard, { FallbackComponent: ErrorFallback });
