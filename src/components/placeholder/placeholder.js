import React from 'react'
import './placeholder.css'

export default function Placeholder(){
    return (
        <div className="placeholderWrap">
            <svg 
                xmlns={"http://www.w3.org/2000/svg"} 
                xmlnsXlink={"http://www.w3.org/1999/xlink" }
                style={ {margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto',} }
                width="100px" height="100px" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid"
            >
                <path d="M18 50A32 32 0 0 0 82 50A32 33.2 0 0 1 18 50" fill="#292664" stroke="none" transform="rotate(269.75 50 50.6)">
                    <animateTransform attributeName="transform" type="rotate" dur="0.78125s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50.6;360 50 50.6"></animateTransform>
                </path>
            </svg>
        </div>
    );
}