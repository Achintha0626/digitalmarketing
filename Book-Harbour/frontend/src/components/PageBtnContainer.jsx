
import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllBooksContext } from "../pages/AllBooks";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
    searchValues,
  } = useAllBooksContext();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(search);
    params.set("page", pageNumber);
    // keep limit & any other filters
    navigate(`${pathname}?${params.toString()}`);
  };

  const addPageButton = ({ pageNumber, active }) => (
    <button
      className={`btn page-btn ${active ? "active" : ""}`}
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const renderPageButtons = () => {
    const pages = [];

    // First
    pages.push(addPageButton({ pageNumber: 1, active: currentPage === 1 }));

    // Leading dots
    if (currentPage > 3) {
      pages.push(
        <span className="page-btn dots" key="dots-prev">
          ...
        </span>
      );
    }
    // Prev page
    if (currentPage > 2) {
      pages.push(addPageButton({ pageNumber: currentPage - 1, active: false }));
    }
    // Current middle
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pages.push(addPageButton({ pageNumber: currentPage, active: true }));
    }
    // Next page
    if (currentPage < numOfPages - 1) {
      pages.push(addPageButton({ pageNumber: currentPage + 1, active: false }));
    }
    // Trailing dots
    if (currentPage < numOfPages - 2) {
      pages.push(
        <span className="page-btn dots" key="dots-next">
          ...
        </span>
      );
    }
    // Last
    pages.push(
      addPageButton({
        pageNumber: numOfPages,
        active: currentPage === numOfPages,
      })
    );

    return pages;
  };

  return (
    <Wrapper>
      <button
        className="prev-btn"
        onClick={() =>
          handlePageChange(currentPage === 1 ? numOfPages : currentPage - 1)
        }
      >
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">{renderPageButtons()}</div>

      <button
        className="next-btn"
        onClick={() =>
          handlePageChange(currentPage === numOfPages ? 1 : currentPage + 1)
        }
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
