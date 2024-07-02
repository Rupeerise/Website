import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./tagfullinfo.css";

export default function Tagfullinfo() {
  const { id } = useParams();
  const tagArray = useSelector((state) => state.tagArray.value);
  const tag = tagArray.find((tag) => tag._id === id);
  console.log(tag);
  return (
    <div className="tag-full">
      <h1 className="tag-full-name">{tag?.name}</h1>
    </div>
  );
}
