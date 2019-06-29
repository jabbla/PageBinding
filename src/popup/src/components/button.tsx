import React from 'react';
import './button.scss';

interface IFuncComp {
    className?: string;
    onClick: () => void;
}

export const Button: React.SFC<IFuncComp> = ({ onClick, className, children }) => {
    return (
        <button
            className={`learn-more ${className}`}
            onClick={onClick}
        >
            <div className="circle">
            <span className="icon arrow"></span>
            </div>
            <p className="button-text">{children}</p>
        </button>
        // <button
        //     className={`blob-btn ${className}`}
        //     onClick={onClick}
        // >
        //     {children}
        //     <span className="blob-btn__inner">
        //     <span className="blob-btn__blobs">
        //         <span className="blob-btn__blob"></span>
        //         <span className="blob-btn__blob"></span>
        //         <span className="blob-btn__blob"></span>
        //         <span className="blob-btn__blob"></span>
        //     </span>
        //     </span>
        // </button>
    );
}