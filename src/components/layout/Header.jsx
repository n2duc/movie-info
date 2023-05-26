import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
    const activeStyle = ({isActive}) => isActive ? "text-primary" : "";
    return (
        <header className="header flex items-center justify-center gap-x-5 text-white py-8 mb-5">
            <NavLink to="/" className={activeStyle}>Homes</NavLink>
            <NavLink to="/movies" className={activeStyle}>Movies</NavLink>
        </header>
    );
};

export default Header;
