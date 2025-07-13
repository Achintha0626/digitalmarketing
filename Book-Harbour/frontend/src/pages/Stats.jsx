
import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import StatsContainer from "../components/StatsContainer";

export async function loader() {
  try {
    const { data } = await customFetch.get("/books/stats");
    return data.defaultStats;
  } catch (err) {
    toast.error(err.response?.data?.msg || err.message);
    return { toRead: 0, reading: 0, finished: 0 };
  }
}

const Stats = () => {
  const defaultStats = useLoaderData();
  return <StatsContainer defaultStats={defaultStats} />;
};

export default Stats;
