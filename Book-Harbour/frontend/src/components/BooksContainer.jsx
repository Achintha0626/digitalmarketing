import React from "react";
import Wrapper from "../assets/wrappers/BookContainer"; 
import BookCard from "./BookCard";
import PageBtnContainer from "./PageBtnContainer";
import { useAllBooksContext } from "../pages/AllBooks";

const BooksContainer = () => {
  const {
    data: { books, totalBooks, numOfPages },
  } = useAllBooksContext();

  if (books.length === 0) {
    return (
      <Wrapper>
        <h2>No books to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalBooks} book{books.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {books.map((book) => (
          <BookCard key={book._id} {...book} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default BooksContainer;
