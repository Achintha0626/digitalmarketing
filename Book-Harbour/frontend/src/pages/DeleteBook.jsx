import React from "react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/books/${params.id}`);
    return data;
  } catch (err) {
    const msg = err.response?.data?.msg || err.message;
    toast.error(msg);
    return redirect("/dashboard/all-books");
  }
};

export const action = async ({ params }) => {
  try {
    await customFetch.delete(`/books/${params.id}`);
    toast.success("Book deleted successfully!");
    return redirect("/dashboard/all-books");
  } catch (err) {
    const msg =
      err.response?.data?.msg || err.message || "Failed to delete book";
    console.error("Delete Error:", err.response ? err.response.data : err);
    toast.error(msg);
    return redirect("/dashboard/all-books");
  }
};

const DeleteBook = () => {
  const { book } = useLoaderData();

  return (
    <div className="delete-container">
      <h4>Confirm Delete</h4>
      <p>
        Are you sure you want to delete "{book.title}" by {book.author}?
      </p>
      <Form method="delete" className="delete-form">
        <button type="submit" className="btn btn-danger">
          Yes, Delete
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
      </Form>
    </div>
  );
};

export default DeleteBook;
