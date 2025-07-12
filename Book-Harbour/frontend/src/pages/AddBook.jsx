
import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, redirect, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import FormRow from "../components/FormRow";
import { FormRowSelect, SubmitBtn } from "../components";
import { BOOK_TYPES, BOOK_STATUS } from "../utils/constants";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    
    await customFetch.post("/books", formData);
    toast.success("Book added successfully!");
    return redirect("/dashboard/all-books");
  } catch (err) {
    const msg = err.response?.data?.msg || err.message || "Failed to add book";
    toast.error(msg);
    
    return { error: msg };
  }
};

const AddBook = () => {
  
  const actionData = useActionData();

  return (
    <Wrapper>
      <Form method="post" encType="multipart/form-data" className="form">
        <h4 className="form-title">Add Book</h4>

        {actionData?.error && <p className="form-error">{actionData.error}</p>}

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
