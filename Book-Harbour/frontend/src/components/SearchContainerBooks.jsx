import React from "react";
import { Form, useSubmit, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";

import { useAllBooksContext } from "../pages/AllBooks";
import { BOOK_STATUS, BOOK_TYPES, BOOK_SORT_BY } from "../utils/constants";
import { FormRow, FormRowSelect } from "./";

const SearchContainerBooks = () => {
  const { searchValues } = useAllBooksContext();
  const { search, status, type, sort } = {
    search: "",
    status: "all",
    type: "all",
    sort: "latest",
    ...searchValues,
  };
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search books</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText="Title or Author"
            defaultValue={search}
            onChange={debounce((form) => submit(form))}
          />
          <FormRowSelect
            labelText="status"
            name="status"
            list={["all", ...Object.values(BOOK_STATUS)]}
            defaultValue={status}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="type"
            name="type"
            list={["all", ...Object.values(BOOK_TYPES)]}
            defaultValue={type}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <FormRowSelect
            labelText="sort"
            name="sort"
            list={[...Object.values(BOOK_SORT_BY)]}
            defaultValue={sort}
            onChange={(e) => submit(e.currentTarget.form)}
          />
          <Link to="/dashboard/all-books" className="btn form-btn delete-btn">
            Reset
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainerBooks;
