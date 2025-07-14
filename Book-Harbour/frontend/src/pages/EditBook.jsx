import React, { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, redirect, useLoaderData, useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import FormRow from "../components/FormRow";
import { FormRowSelect, SubmitBtn } from "../components";
import { BOOK_TYPES, BOOK_STATUS } from "../utils/constants";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/books/${params.id}`);
    return data; 
  } catch (err) {
    toast.error(err.response?.data?.msg || err.message);
    return redirect("/dashboard/all-books");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  try {
    await customFetch.patch(`/books/${params.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Book updated successfully!");
    return redirect("/dashboard/all-books");
  } catch (err) {
    const msg =
      err.response?.data?.msg || err.message || "Failed to update book";
    toast.error(msg);
    return { error: msg };
  }
};

const EditBook = () => {
  const { book } = useLoaderData();
  const actionData = useActionData();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    type: "",
    status: "",
  });
  const [selectedFileName, setSelectedFileName] = useState("");

  
  useEffect(() => {
    setFormData({
      title: book.title,
      author: book.author,
      type: book.type,
      status: book.status,
    });
    setSelectedFileName("");
  }, [book]);

 
  useEffect(() => {
    if (actionData?.error) {
      setSelectedFileName("");
      setFormData({
        title: book.title,
        author: book.author,
        type: book.type,
        status: book.status,
      });
    }
  }, [actionData, book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFileName(file ? file.name : "");
  };

  return (
    <Wrapper>
      <Form method="patch" encType="multipart/form-data" className="form">
        <h4 className="form-title">Edit Book</h4>
        {actionData?.error && <p className="form-error">{actionData.error}</p>}

        <div className="form-center">
          {/* Image chooser */}
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Book Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-input"
              onChange={handleImageChange}
            />
            {selectedFileName && (
              <span className="file-name">{selectedFileName}</span>
            )}
          </div>

          {/* Text fields */}
          <FormRow
            type="text"
            name="title"
            labelText="Title"
            value={formData.title}
            onChange={handleChange}
          />
          <FormRow
            type="text"
            name="author"
            labelText="Author"
            value={formData.author}
            onChange={handleChange}
          />

          {/* Selects */}
          <FormRowSelect
            name="type"
            labelText="Type"
            list={Object.values(BOOK_TYPES)}
            value={formData.type}
            onChange={handleChange}
          />
          <FormRowSelect
            name="status"
            labelText="Status"
            list={Object.values(BOOK_STATUS)}
            value={formData.status}
            onChange={handleChange}
          />

          <SubmitBtn formBtn text="Save Changes" />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditBook;
