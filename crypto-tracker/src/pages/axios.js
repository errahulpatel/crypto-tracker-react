import React, { useState, useEffect } from 'react'
import axios from "axios";
import Coin from "../components/Coin";
import { Link } from 'react-router-dom';

// Purpose: Functional component created with React-Hooks to bind listing 
// Created By: RP 
function CallAxios() {

    // Purpose: Get/Set State values 
    // Created By: RP 
    const [page, setPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const [coins, setCoins] = useState([]);
    const [search, setSeatch] = useState('');

    // Purpose: Called useEffect to call 3rd Party API and get the response in JSON
    // Created By: RP 
    useEffect (() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${recordsPerPage}&page=${page}&sparkline=false`)
        .then(res => {
            setCoins(res.data);
        })
        .catch(error => console.log(error))
    });

    // Purpose: handle Change event to get the text value from search box
    // Created By: RP 
    const handleChange = e => {
        setSeatch(e.target.value);
    }

    // Purpose: Filter the latest datasource with search parameter
    // Created By: RP 
    const filterdCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

    // Purpose: Creating HTML to bind View 
    // Created By: RP 
    return (
        <div className="coin-app">
            <div className="coin-search coin-row">
                <form>
                    <input type="text" className="coin-input" placeholder="Search a currency" onChange={handleChange}/>
                </form>
                <Link to="/" className="link-item">Back</Link>
            </div>
            <div className="coin-main">
                <div className="coin-container">
                    <div className="coin-row">
                        <div className="coin">
                            <h1>Name</h1>
                            <p className="coin-symbol">Symbol</p>
                        </div>
                        <div className="coin-data">
                            <p className="coin-price">Current Price</p>
                            <p className="coin-volume">Total Volume</p>
                            <p className="coin-percent">Mkt cap %</p>
                            <p className="coin-marketcap">Market Cap</p>
                        </div>
                    </div>
                </div>
                {/* Purpose: Loop for binding Coin component
                    Created By: RP  */}
                {filterdCoins.length === 0 ? (
                        <div className="norecord">No Records Found.</div>
                    ) 
                    : filterdCoins.map(coin => {
                    return (
                        <Coin key={coin.id} coin={coin} />
                    )
                })} 
            </div>
        </div>
    )
}

export default CallAxios
