import React from "react";

const Pointer = () => {
    return (
        <svg style={{display: "none"}}>
            <defs>
                <g id="handle" strokeWidth="2" fill="#fff" stroke="#000">
                    <g transform="translate(-20.000000, -17.000000)">
                        <path
                            stroke="#fff"
                            strokeWidth="3"
                            fill="transparent"
                            d="M21 1c-18.367.496-21.456 24.648-.461 35.76.284.15.638.15.922 0C42.456 25.648 39.367 1.496 21 1z"
                        />
                    </g>
                </g>
            </defs>
        </svg>
    );
};

export default Pointer;
