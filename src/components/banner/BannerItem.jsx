import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const BannerItem = ({ item }) => {
    const { title, poster_path, id } = item || {};
    const navigate = useNavigate();
    return (
        <div className="w-full h-full rounded-lg relative overflow-hidden">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-black"></div>
            <img
                src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                alt=""
                className="w-full h-full object-cover object-center"
            />
            <div className="content absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-3">{title}</h2>
                <div className="flex items-center gap-x-3 mb-8 text-sm">
                    <span className="py-1 px-2 border border-white rounded">
                        Marvel
                    </span>
                    <span className="py-1 px-2 border border-white rounded">
                        Action
                    </span>
                    <span className="py-1 px-2 border border-white rounded">
                        Marvel
                    </span>
                </div>
                <Button onClick={() => navigate(`/movie/${id}`)} full={false} >Watch now</Button>
            </div>
        </div>
    );
};

export default BannerItem;
