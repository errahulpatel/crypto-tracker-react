import React from 'react'
import "./Coin.css";

// Purpose: Separate component which can be re-use in different pages
// Created By: RP 
const Coin = ({ coin }) => {
    return (
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img src={coin.image} alt="crypto"/>
                    <h1>{coin.name}</h1>
                    <p className="coin-symbol">{coin.symbol}</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">${coin.current_price}</p>
                    <p className="coin-volume">${coin.total_volume === null ? '0' : coin.total_volume.toLocaleString()}</p>

                    {coin.market_cap_change_percentage_24h === null ? '-' : coin.market_cap_change_percentage_24h < 0 ? (
                        <p className="coin-percent red">
                            {coin.market_cap_change_percentage_24h.toFixed(2)}%
                        </p>
                    ): (
                        <p className="coin-percent green">
                            {coin.market_cap_change_percentage_24h.toFixed(2)}%
                        </p>
                    )}
                    <p className="coin-marketcap">
                        ${coin.market_cap === null ? '0' : coin.market_cap.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Coin
 