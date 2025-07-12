import React, { createContext, useContext } from "react";
import { useLoaderData, useSubmit, Form, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import SearchContainerBooks from "../components/SearchContainerBooks";
import BooksContainer from "../components/BooksContainer";

// your constants
import { BOOK_STATUS, BOOK_TYPES, BOOK_SORT_BY } from "../utils/constants";

const AllBooksContext = createContext();
export const useAllBooksContext = () => useContext(AllBooksContext);


export const loader = async ({ request }) => {
  // pull ?search=&status=&type=&sort=...
  const params = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );

  try {
    const { data } = await customFetch.get("/books", { params });
    return { data, searchValues: params };
  } catch (err) {
    const msg = err.response?.data?.msg || err.message;
    toast.error(msg);
    // return empty result so UI doesn't break
    return {
      data: { books: [], totalBooks: 0, numOfPages: 1 },
      searchValues: params,
    };
  }
};

const AllBooks = () => {
  // this matches the shape { data, searchValues }
  const { data, searchValues } = useLoaderData();

  return (
    <AllBooksContext.Provider value={{ data, searchValues }}>
      {/* your search form */}
      <SearchContainerBooks />
      {/* your list of book cards */}
      <BooksContainer />
    </AllBooksContext.Provider>
  );
};

export default AllBooks;
