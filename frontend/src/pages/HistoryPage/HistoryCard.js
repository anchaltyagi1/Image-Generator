import React from "react";
import { Link } from "react-router-dom";

const HistoryCard = (props) => {
  const item = props.item;
  return (
    <div key={item.id} className="history-item">
      <p>{item.createdAt}</p>
      <img src={item.image} alt={item.query} />
    </div>
  );
};

export default HistoryCard;
