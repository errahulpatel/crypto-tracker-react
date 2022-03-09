import React from 'react'

// Purpose: Include router dom package for Link tag
// Created By: RP CIPL
import { Link } from 'react-router-dom'
import AxiosLogo from "../content/logo/axios_logo_white.svg"
import ReactQueryLogo from "../content/logo/react-query-white.svg"

function Main() {
    return (
        <div className="main-container">
            <div className="main-wrapper">
                <Link to="/axios" className="link-item-withlogo" id="axiosID"> 
                    <img src={AxiosLogo} alt="Axios Logo" className="img-item" />
                </Link>

                <Link to="/reactquery" className="link-item-withlogo" id="reactQueryID"> 
                    <img src={ReactQueryLogo} alt="React-Query Logo" className="img-item"/>
                </Link>
            </div>
        </div>
    )
}

export default Main
