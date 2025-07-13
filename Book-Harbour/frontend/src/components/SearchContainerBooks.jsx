import React from "react";
import { Form, useSubmit, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/DashboardFormPage";

import { useAllBooksContext } from "../pages/AllBooks";
import { FormRow, FormRowSelect } from "./";
import { BOOK_STATUS, BOOK_TYPES, BOOK_SORT_BY } from "../utils/constants";

export default function SearchContainerBooks() {
  const { searchValues } = useAllBooksContext();
  const {
    search: initSearch = "",
    status: initStatus = "all",
    type: initType = "all",
    sort: initSort = BOOK_SORT_BY.NEWEST_FIRST,
  } = searchValues;

  const submit = useSubmit();

 
  const handleFormChange = (e) => {
    const form = e.currentTarget;
    submit(form, { method: "get", replace: true });
  };

  return (
    <Wrapper>
      <Form
        className="form"
        method="get"
        action="/dashboard/all-books"
        onChange={handleFormChange}
      >
        <h5 className="form-title">search books</h5>
        <div className="form-center">
          {/* Title or Author */}
          <FormRow
            type="search"
            name="search"
            labelText="Title or Author"
            defaultValue={initSearch}
          />

          {/* Status */}
          <FormRowSelect
            name="status"
            labelText="status"
            defaultValue={initStatus}
            list={["all", ...Object.values(BOOK_STATUS)]}
          />

          {/* Type */}
          <FormRowSelect
            name="type"
            labelText="type"
            defaultValue={initType}
            list={["all", ...Object.values(BOOK_TYPES)]}
          />

          {/* Sort */}
          <FormRowSelect
            name="sort"
            labelText="sort"
            defaultValue={initSort}
            list={Object.values(BOOK_SORT_BY)}
          />

          {/* Reset */}
          <Link to="/dashboard/all-books" className="btn form-btn delete-btn">
            Reset
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
}
