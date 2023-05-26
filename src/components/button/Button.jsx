import React from "react";

const Button = ({ onClick, className, children, type = "button", disable = false,  bgColor, full = true }) => {
    let bgClassName = 'bg-primary';
    switch (bgColor) {
        case "primary":
            bgClassName = 'bg-primary';
            break;
        case "secondary":
            bgClassName = 'bg-secondary';
            break;
        default:
            break;
    }
    return (
        <button
            type={type}
            className={`${full ? 'w-full' : ''} py-3 px-6 rounded-lg capitalize bg-primary mt-auto ${className}`}
            onClick={onClick}
            disabled={disable}
        >
            {children}
        </button>
    );
};

export default Button;
