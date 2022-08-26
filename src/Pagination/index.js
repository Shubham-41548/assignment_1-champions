import React from "react";
import './index.css'

const Pagination = ({ recordsPerPage, totalRecords, paginate, currentPage }) => {
    const pageNumber = [];

    // calculate page number
    for (let index = 1; index <= Math.ceil(totalRecords / recordsPerPage); index++) {
        pageNumber.push(index);

    }

    // function to get jsx for Pagination component
    function getPaginationJSX() {
        if (recordsPerPage <= totalRecords) {
            return <nav className="pgNav">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" onClick={() => paginate('previous')} >&laquo;</a></li>
                    {pageNumber.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} className={`page-link ${number == currentPage ? "page-number-focus" : ""}`} >
                                {number}
                            </a>
                        </li>
                    ))}
                    <li className="page-item"><a className="page-link" onClick={() => paginate('next', pageNumber.length)} >&raquo;</a></li>
                </ul>
            </nav>
        }
    }
    return (
        <div>{getPaginationJSX()}</div>

    )
};

export default Pagination;