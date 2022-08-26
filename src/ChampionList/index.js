import React, { useState, useEffect } from "react";
import './index.css';
import pic1 from "../assets/Watchlist_icon.png";
import pic2 from "../assets/Watchlist_added_icon.png";
import pic3 from "../assets/sort.svg";
import pic4 from "../assets/sort_desc.svg";
import ChampionDetails from "../ChampionDetails";



const ChampionList = ({ List, Loading, handleWatchlist, isWatchList }) => {
    const [sortState, setSortState] = useState("none");
    const [watchList, setwatchList] = useState([]);
    const [showModalPopup, setshowModalPopup] = useState(false);
    const [currentChampion, setcurrentChampion] = useState([]);

    useEffect(() => {
        handleWatchlist(watchList);
    },[watchList]);

    // function to sort the list of champions
    const sortMethods = {
        none: { method: (a, b) => null },
        ascending: { method: (a, b) => (a.name > b.name ? 1 : -1) },
        descending: { method: (a, b) => (a.name > b.name ? -1 : 1) },
    };

    const addremoveWatchlist = (e, champion) => {
        e.stopPropagation();
        var element = document.getElementById(champion.id);
        if (element.classList[1] == "hide") {
            // 👇️ push to end of state array
            setwatchList(current => [...current, champion]);
            element.classList.remove("hide");
            element.classList.add("show");
        }
        else {
            // 👇️ remove from state state array
            setwatchList(current =>
                current.filter(watchList => {
                    return watchList.id !== champion.id;
                }),
            );
            element.classList.remove("show");
            element.classList.add("hide");
            if(isWatchList)
            {
                var element1 = document.getElementById('div_'+champion.id);
                element1.classList.add("hide"); 
            }
        }
    }

    const checkDetails = (champion) => {
        setshowModalPopup(true);
        setcurrentChampion(champion);
    }

    if (Loading) {
        return 'wait...'
    }
    var renderedList = '';
    if (List.length > 0) {
         renderedList = List.sort(sortMethods[sortState].method).map((champion) => {
            if (champion.id === -1) { return <div key='-1' className="emptyMsg">{champion.text}</div> }
            const liList =
                <div id={`div_${champion.id}`} key={champion.id}>
                    <div onClick={() => checkDetails(champion)} className="col card h-100">
                        <div>
                            <img src={pic2} onClick={(e) => addremoveWatchlist(e, champion)} className="Watchlist_added_icon" title="click to add or remove from watch list" />
                            <img src={pic1} onClick={(e) => e.stopPropagation()} className={`Watchlist_icon ${watchList.find(obj => obj.id === champion.id) ? "show" : "hide"}`} id={champion.id} title="added to watch list" />
                        </div>
                        <img src={champion.image_url} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{champion.name}</h5>
                        </div>
                    </div>
                </div>
            return liList;

        })
    }
    else if(isWatchList){
        renderedList = <div className="emptyMsg">No items</div>
    }

    const isShowPopup = (status) => {
        setshowModalPopup(status);
    };

    return (
        <div>
            <div className="sort_container">
                <img src={pic3} onClick={() => { setSortState("ascending") }} className="sort" title="sort the champions in ascending order" />
                <img src={pic4} onClick={() => { setSortState("descending") }} className="sort ml" title="sort the champions in descending order" />
            </div>
            <div className="row row-cols-1 row-cols-md-6 g-4 m-10">
                {renderedList}
            </div>
            <ChampionDetails
                showModalPopup={showModalPopup}
                onPopupClose={isShowPopup}
                currentChampion={currentChampion}
            ></ChampionDetails>
        </div>
    );
};

export default ChampionList;