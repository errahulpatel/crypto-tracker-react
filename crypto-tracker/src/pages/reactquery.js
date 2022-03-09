import React, { useState } from 'react'
import { useQuery } from "react-query"
import { Link } from 'react-router-dom';
import Coin from '../components/Coin';
import { ReactQueryDevtools } from "react-query/devtools";

// Purpose: API will called from useQuery hook and provide the response
// Created By: RP 
const fetchCurrencyData = async (page, recordsPerPage) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${recordsPerPage}&page=${page}&sparkline=false`);
    return res.json();
}

// Purpose: Functional component created with React-Hooks to bind listing 
// Created By: RP 
function ReactQuery() {
    // Purpose: Get/Set State values 
    // Created By: RP 
    let filterdCoins = null;
    const [page, setPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(100);
    const [search, setSeatch] = useState('');

    // Purpose: Called useQuery method to call 3rd Party API and get the response in JSON
    // Created By: RP 
    const { 
        status, 
        data, 
        isPreviousData,
    } = useQuery(["repoData", page, recordsPerPage], () => fetchCurrencyData(page, recordsPerPage), { keepPreviousData : true });

    // Purpose: handle Change event to get the text value from search box
    // Created By: RP 
    const handleChange = e => {
        setSeatch(e.target.value);
    }

    // Purpose: Filter the latest datasource with search parameter
    // Created By: RP 
    if(data !== undefined){
        filterdCoins = data.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Purpose: Creating HTML to bind View 
    // Created By: RP 
    return (
        <>
            <div className="coin-app">
                {status === "error" && (
                    <div>Error fetching data... </div>
                )}
                {status === "loading" && (
                    <div>Loading data... </div>
                )}
                {status === "success" && (
                    <>
                    <div className="coin-search coin-row">
                        <form>
                            <input type="text" className="coin-input" placeholder="Search a currency" onChange={handleChange}/>
                        </form>
                        <Link to="/" className="link-item">Back</Link>
                    </div>
                    <div className="coin-main">
                         {/* Purpose: Implemented pagination related code to show Previous and Next page
                        Created By: RP  */}
                        <div className="pagination-main">
                            <span>Current Page: {page}</span>
                            <button className="button-item"
                                onClick={() => setPage(old => Math.max(old - 1, 1))}
                                disabled={page === 1}
                            >
                                Previous Page
                            </button>{' '}
                            <button className="button-item"
                                onClick={() => {
                                if (!isPreviousData) {
                                    setPage(old => old + 1)
                                }
                                }}
                                // Disable the Next Page button until we know a next page is available
                                disabled={page === 64}
                            >
                                Next Page
                            </button> 
                        </div>
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
                    </>
                )}
            </div>
            <ReactQueryDevtools initialIsOpen={false}/>
        </>
    )
}

export default ReactQuery
