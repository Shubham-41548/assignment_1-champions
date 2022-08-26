import React, { useState, useEffect } from "react";
import axios from "axios";
import ChampionList from "./ChampionList";
import pic1 from "./assets/home_wallpaper.png"
import Header from "./Header";
import Search from "./Search";
import Pagination from "./Pagination";


const App = () => {

    const [list, setList] = useState([]);
    const [loading, setloading] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [recordsPerPage] = useState(18);
    const [searchRecords, setsearchRecords] = useState([]);
    const [watchList, setwatchList] = useState([]);
    const [isWatchList, setisWatchList] = useState(false);
    const [currentList, setcurrentList] = useState([]);

    useEffect(() => {
        const GetChampionsList = async () => {
            setloading(true);
            try {
                const response = await
                    axios.get("https://api.pandascore.co/lol/champions?token="
                        + process.env.REACT_APP_CHAMPIONS_API_KEY);
                setList(response.data);
                setloading(false);
            } catch (error) {
                window.alert("There is some error in products API:" + error.message);
            }

        };
        GetChampionsList();
    }, []);

    //get current records
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    var currentrecords = isWatchList || currentList.length > 0 ? currentList.slice(indexOfFirstRecord, indexOfLastRecord) : list.slice(indexOfFirstRecord, indexOfLastRecord);

    //change page
    const paginate = (pageNumber,totalPages) => {
        if (pageNumber == 'previous' && currentPage != 1) {
            setcurrentPage(currentPage - 1);
        }
        else if (pageNumber == 'next' && currentPage != totalPages) {
            setcurrentPage(currentPage + 1);
        }
        else if (Number.isInteger(pageNumber)) {
            setcurrentPage(pageNumber);
        }
    };

    //serach functionality
    const searchKey = (keyword) => {
        setcurrentPage(1);
        var filteredObj = [];
        const emptyObj = [{
            id: -1,
            text: "No champion with name :" + keyword + " on this page."
        }];
        // Find multiple objects that satisfy condition
        if (keyword.length === 0) {
            isWatchList ? setcurrentList(watchList) : setcurrentList(list);
            setsearchRecords([])  
        } else {
            const Searchlist = isWatchList ? watchList : list;
            filteredObj = Searchlist.filter((obj) => obj.name.toLowerCase().includes(keyword.toLowerCase()));
            if(filteredObj.length > 0){
                setsearchRecords(filteredObj)  
                setcurrentList(filteredObj)
            }
            else{
                setsearchRecords(emptyObj)
            } 
        }  
        
    };

    // handling of watch list
    const handleWatchlist = (obj) => {
        setwatchList(obj);
        if(obj.length == 0 && isWatchList){
            setcurrentList(obj);
        }
    };

    //function when click on open watch list
    const openWatchList = () => {
        setisWatchList(true);
        setcurrentPage(1);
        setcurrentList(watchList);
    };

    //function when click on home page
    const homePage = () => {
        var element = document.getElementById("search-box");
        if(element!=null){
            element.value = '';
        }
        setsearchRecords([]);
        setisWatchList(false);
        setcurrentList(list);
    };


    return (
        <div>
            <div style={{ backgroundImage: `url(${pic1})`, backgroundPosition: "center" }}>
                <Header
                    watchListObj={watchList}
                    openWatchList={openWatchList}
                    homePage={homePage} />
                <Search
                    searchKey={searchKey}/>
            </div>
            <ChampionList
                List={currentrecords}
                Loading={loading}
                handleWatchlist={handleWatchlist}
                isWatchList={isWatchList} />
            <Pagination
                recordsPerPage={recordsPerPage}
                totalRecords={(isWatchList && searchRecords.length == 0) ? watchList.length : (searchRecords.length == 0) ? list.length : searchRecords.length  } 
                paginate={paginate}
                currentPage={currentPage} />

        </div>
    );
};

export default App;