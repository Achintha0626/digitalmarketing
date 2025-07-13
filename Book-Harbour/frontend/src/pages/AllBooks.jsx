
import React, { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

import SearchContainerBooks from "../components/SearchContainerBooks";
import BooksContainer from "../components/BooksContainer";

export const BOOK_STATUS = {
  
};
export const BOOK_TYPES = {
 
};
export const BOOK_SORT_BY = {
  
};

const AllBooksContext = createContext();
export const useAllBooksContext = () => useContext(AllBooksContext);

export async function loader({ request }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  try {
    const { data } = await customFetch.get("/books", { params });
    return { data, searchValues: params };
  } catch (err) {
    toast.error(err.response?.data?.msg || err.message);
    return {
      data: { books: [], totalBooks: 0, numOfPages: 1 },
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
