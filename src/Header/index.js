import React from "react";
import pic2 from "../assets/blue-home-icon.png";
import pic3 from "../assets/Watchlist_icon.png";
import './index.css';

const Header = ({ watchListObj, openWatchList, homePage }) => {
    return (
        <div className="header">
            <img onClick={() => homePage()} src={pic2} className="pic2" />
            <h2 onClick={() => homePage()} className="headertxt" >Champions</h2>
            <img src={pic3} onClick={() => openWatchList()} title="open watch list" className="pic2 pic3" />
            <span className="badge">{watchListObj.length}</span>

        </div>
    )
};

export default Header;