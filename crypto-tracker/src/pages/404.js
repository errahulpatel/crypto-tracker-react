import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="coin-app">
            <div className="coin-search">
                <Link to="/" className="link-item">Back</Link>
                <h1 className="coin-text">Page Not Found</h1>
            </div>
        </div>
    )
}

export default NotFound;