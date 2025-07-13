
import React from "react";
import { FaBook, FaBookReader, FaCheckCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatItem from "./StatItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "to read",
      count: defaultStats.toRead,
      icon: <FaBook />,
      color: "#f59e0b",
      bcg: "#fef3c7",
    },
    {
      title: "reading",
      count: defaultStats.reading,
      icon: <FaBookReader />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "finished",
      count: defaultStats.finished,
      icon: <FaCheckCircle />,
      color: "#22c55e",
      bcg: "#dcfce7",
    },
  ];

  return (
    <Wrapper>
      {stats.map((item) => (
        <StatItem key={item.title} {...item} />
      ))}
    </Wrapper>
  );
};

export default StatsContainer;
