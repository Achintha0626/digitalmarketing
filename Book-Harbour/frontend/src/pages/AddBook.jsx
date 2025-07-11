import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import FormRow from "../components/FormRow";
import { FormRowSelect, SubmitBtn } from "../components";
import { BOOK_TYPES, BOOK_STATUS } from "../utils/constants";

export const action = async ({ request }) => {
  const formData = await request.formData();

  console.log(" new book data:", Object.fromEntries(formData.entries()));
  toast.success("Book added successfully!");

  return redirect("/all-books");
};

const AddBook = () => {
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">add book</h4>
        <div className="form-center">
          <FormRow type="file" name="image" labelText="Book Image" />

          <FormRow type="text" name="title" labelText="Title" />
          <FormRow type="text" name="author" labelText="Author" />

          <FormRowSelect
            name="type"
            labelText="Type"
            defaultValue={BOOK_TYPES.FANTASY}
            list={Object.values(BOOK_TYPES)}
          />
          <FormRowSelect
            name="status"
            labelText="Status"
            defaultValue={BOOK_STATUS.TO_READ}
            list={Object.values(BOOK_STATUS)}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddBook;
