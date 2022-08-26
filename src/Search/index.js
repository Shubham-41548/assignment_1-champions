import React, { useState } from "react";
import './index.css'
import options from './data';

const Search = ({ searchKey }) => {
    const [query, setQuery] = useState("");

    function OptionList(IsShow) {
        var element = document.getElementById("autocomplete-container");
        if (element) {
            if (IsShow) {
                element.classList.remove("hide");
                element.classList.add("show");
            }
            else {
                element.classList.remove("show");
                element.classList.add("hide");
            }
        }
    }

    document.body.addEventListener('click', myHandler);

    function myHandler() {
        OptionList(0);
    };

    return (
        <div>
            <div className="form-outline">
            <input onChange={event => {
                OptionList(1);
                setQuery(event.target.value)
                searchKey(event.target.value)
            }}
                type="search" id="search-box" className="form-control" placeholder="Search for champions" />
                <div className="autocomplete-items hide" id="autocomplete-container" >

                    {options.filter(Option => {
                        if (query === '') {
                            return Option;
                        } else if (Option.name.toString().toLowerCase().includes(query.toLowerCase())) {
                            return Option;
                        }
                    }).map(Option => (
                        <div key={Option.id}
                            onClick={() => {
                                document.getElementById("search-box").value = Option.name
                                searchKey(document.getElementById("search-box").value)
                            }} className="box">
                            <p>{Option.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Search;
