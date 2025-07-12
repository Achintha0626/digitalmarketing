// src/components/Book.jsx
import React from "react";
import { FaCalendarAlt, FaTag, FaClipboardList } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job"; 
import BookInfo from "./BookInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Book = ({ _id, title, author, type, status, createdAt, coverImage }) => {
  const date = day(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          {coverImage ? (
            <img
              src={coverImage}
              alt={`Cover of ${title}`}
              className="cover-img"
            />
          ) : (
            title.charAt(0)
          )}
        </div>
        <div className="info">
          <h5>{title}</h5>
          <p>{author}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <BookInfo icon={<FaClipboardList />} text={type} />
          <BookInfo icon={<FaCalendarAlt />} text={date} />
          <BookInfo icon={<FaTag />} text={status} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer className="actions">
          <Link to={`../edit-book/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-book/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Book;
