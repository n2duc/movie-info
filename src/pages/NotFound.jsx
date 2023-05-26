import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";

const NotFound = () => {
    return (
        <main className="h-[586px] w-full flex flex-col justify-center items-center bg-slate-800 rounded-lg select-none border border-primary">
            <h1 className="text-9xl font-bold text-white tracking-widest">
                404
            </h1>
            <div className="bg-primary px-2 text-lg rounded rotate-12 absolute">
                Page Not Found
            </div>
            <NavLink to="/">
                <Button>Go Home</Button>
            </NavLink>
        </main>
    );
};

export default NotFound;
