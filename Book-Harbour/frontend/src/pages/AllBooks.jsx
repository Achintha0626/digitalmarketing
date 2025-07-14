import React, { createContext, useContext } from "react";
import { useLoaderData, useSubmit, Form, Link } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import SearchContainerBooks from "../components/SearchContainerBooks";
import BooksContainer from "../components/BooksContainer";
import { BOOK_STATUS, BOOK_TYPES, BOOK_SORT_BY } from "../utils/constants";

const AllBooksContext = createContext();
export const useAllBooksContext = () => useContext(AllBooksContext);

export async function loader({ request }) {
 
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());

  
  if (!params.page) params.page = "1";
  if (!params.limit) params.limit = "10";

  try {
    const { data } = await customFetch.get("/books", { params });
   
    return { data, searchValues: params };
  } catch (err) {
    toast.error(err.response?.data?.msg || err.message);
    return {
      data: { books: [], totalBooks: 0, numOfPages: 1, currentPage: 1 },
      searchValues: params,
    };
  }
}

export default function AllBooks() {
  const { data, searchValues } = useLoaderData();
  return (
    <AllBooksContext.Provider value={{ data, searchValues }}>
      <SearchContainerBooks />
      <BooksContainer />
    </AllBooksContext.Provider>
  );
}
