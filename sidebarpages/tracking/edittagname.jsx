import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTag } from "../../store/tagArraySlice";
import { useNavigate } from "react-router-dom";

export default function EditTagName() {
  const { id } = useParams();
  //   console.log(id);
  const tagArray = useSelector((state) => state.tagArray.value);
  const tag = tagArray.find((tag) => tag._id === id);
  console.log(tag);
  const [form, setForm] = useState({
    name: "",
    tagType: "",
    timeperiod: "",
    _id: "",
  });
  useEffect(() => {
    if (tag) {
      setForm({
        name: tag.name || "", // Provide a default empty string
        tagType: tag.tagType || "", // Provide a default empty string
        timeperiod: tag.timeperiod || "", // Provide a default empty string
        _id: tag._id || "", // Assuming you want to handle _id similarly
      });
    }
  }, [tag]);

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTag(form));
    navigate(`/tag/${id}`);
  };
  const dispatch = useDispatch();
  const tagTypeEnum = [
    "income",
    "variable expense",
    "emi",
    "loan",
    "investment",
  ];

  return (
    <>
      <div>Edit Tag Name</div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Tag Type:
          <select name="tagType" value={form.tagType} onChange={handleChange}>
            {tagTypeEnum.map((tagType) => (
              <option key={tagType} value={tagType}>
                {tagType}
              </option>
            ))}
          </select>
        </label>
        <label>
          Time Period:
          <input
            type="text"
            name="timeperiod"
            value={form.timeperiod}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
