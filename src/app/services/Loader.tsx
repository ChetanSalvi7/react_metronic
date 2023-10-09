import React from "react";
import {toAbsoluteUrl} from '../../_metronic/helpers'

export function Loader({message = ''}) {
    return (
        <div className={'page-loading '} >
            <div  className="page-loader flex-column bg-dark position-absolute bg-opacity-25">
                <span className="spinner-border text-primary" role="status"></span>
                <span className="text-gray-800 fs-6 fw-semibold mt-5">Loading...</span>
            </div>
            <div className="loader">
                <div className="loader_inner">
                    <img
                        src={toAbsoluteUrl("/media/spinner.gif")}
                        alt="Loading"
                    />

                    {(() => {
                        if (message !== '') {
                            return (<p>{message}</p>)
                        }
                    })()}
                </div>
            </div>
        </div>
    );
}
