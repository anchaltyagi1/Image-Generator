import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./HistoryPage.css";
import HistoryCard from "./HistoryCard";

const BACKEND_URL = process.env.BACKEND_URL;

const HistoryPage = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/images`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });
      const obj = await response.json();
      setData(obj.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar page="history" />
      <div className="history-main-container">
        {data?.map((item) => (
          <div className="history-image-container" key={item._id}>
            <HistoryCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
