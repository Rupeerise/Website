import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTag } from "../../store/tagArraySlice";
import "./edittagname.css";
import { HexColorPicker } from "react-colorful";

export default function EditTagName({ closeEdit }) {
  const { id } = useParams();
  const tagArray = useSelector((state) => state.tagArray.value);
  const tag = tagArray.find((tag) => tag._id === id);

  const [form, setForm] = useState({
    name: "",
    tagType: "",
    color: "",
    _id: "",
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (tag) {
      setForm({
        name: tag.name || "",
        tagType: tag.tagType || "",
        color: tag.color || "",
        _id: tag._id || "",
      });
    }
  }, [tag]);

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleColorChange = (color) => {
    setForm((prevForm) => ({
      ...prevForm,
      color: color,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTag(form));
    closeEdit();
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closeEdit();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="edit-tagname-container" ref={formRef}>
      <form onSubmit={handleSubmit}>
        <div className="edit-tagname-header">Edit Tag Name</div>
        <HexColorPicker
          color={form.color}
          onChange={handleColorChange}
          className="edit-tagname-color-input"
        />
        <input
          type="text"
          name="name"
          className="edit-tagname-input-box"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tagType"
          className="edit-tagname-input-box"
          placeholder="Tag Type"
          value={form.tagType}
          readOnly
        />
        <div className="tagname-button-container">
          <button type="submit" className="edit-tagname-button-form">
            Submit
          </button>
          <button
            type="button"
            onClick={closeEdit}
            className="close-tagname-button"
          >
           Close
          </button>
        </div>
      </form>
    </div>
  );
}