
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllBooksContext } from "../pages/AllBooks";

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllBooksContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => (
    <button
      className={`btn page-btn ${activeClass && "active"}`}
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );
    if (currentPage > 3)
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          …
        </span>
      );
    if (currentPage > 2)
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      );
    if (currentPage !== 1 && currentPage !== numOfPages)
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      );
    if (currentPage < numOfPages - 1)
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      );
    if (currentPage < numOfPages - 2)
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          …
        </span>
      );
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="prev-btn"
        onClick={() =>
          handlePageChange(currentPage - 1 < 1 ? numOfPages : currentPage - 1)
        }
      >
        <HiChevronDoubleLeft /> prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="next-btn"
        onClick={() =>
          handlePageChange(currentPage + 1 > numOfPages ? 1 : currentPage + 1)
        }
      >
        next <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
