import React from "react";
import Wrapper from "../assets/wrappers/BookInfo";

const BookInfo = ({ icon, text }) => (
  <Wrapper>
    <span className="job-icon">{icon}</span>
    <span className="job-text">{text}</span>
  </Wrapper>
);

export default BookInfo;
