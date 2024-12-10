import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addTag } from "../../store/tagArraySlice";
import { addLoan } from "../../store/loanArraySlice";
import { HexColorPicker } from "react-colorful";
import "./addtracking.css";

export default function AddTracking({ closePopup }) {
  const [form, setForm] = useState({
    name: "",
    target: "",
    tagType: "income",
    amount: 0,
    interestRate: 0,
    color: "#7C11E7", // Pre-selected color
  });

  const dispatch = useDispatch();
  const formRef = useRef(null);

  const TagTypeEnum = ["income", "expense", "emi", "loan", "investment"];

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleAddNewTag = (event) => {
    event.preventDefault();
    if (
      form.tagType === "loan" ||
      form.tagType === "emi" ||
      form.tagType === "investment"
    ) {
      dispatch(addLoan(form));
    } else {
      dispatch(addTag(form));
    }
    onRequestClosed();
  };

  const onRequestClosed = () => {
    handleChange("name", "");
    handleChange("target", "");
    handleChange("tagType", "income");
    handleChange("amount", 0);
    handleChange("interestRate", 0);
    handleChange("color", "#7C11E7");
    closePopup();
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="add-tracking-container" ref={formRef}>
      <form onSubmit={handleAddNewTag}>
        <div className="add-tracking-header">Add New Tag</div>
        <select
          name="tagType"
          className="add-tracking-input-box"
          value={form.tagType}
          onChange={(e) => handleChange("tagType", e.target.value)}
        >
          {TagTypeEnum.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="color-picker-container">
          <HexColorPicker
            color={form.color}
            onChange={(color) => handleChange("color", color)}
            className="add-tracking-color-input"
          />
        </div>

        <input
          type="text"
          name="name"
          className="add-tracking-input-box"
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        {["income", "expense"].includes(form.tagType) && (
          <>
            <input
              type="text"
              name="target"
              className="add-tracking-input-box"
              placeholder="Target"
              value={form.target}
              onChange={(e) => handleChange("target", e.target.value)}
            />
          </>
        )}

        {["emi", "loan", "investment"].includes(form.tagType) && (
          <>
            <input
              type="text"
              name="amount"
              className="add-tracking-input-box"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
            {["emi", "loan"].includes(form.tagType) && (
              <>
                <input
                  type="text"
                  name="interestRate"
                  className="add-tracking-input-box"
                  placeholder="Interest Rate in %"
                  value={form.interestRate}
                  onChange={(e) => handleChange("interestRate", e.target.value)}
                />
              </>
            )}
            {["investment"].includes(form.tagType) && (
              <>
                <input
                  type="text"
                  name="interestRate"
                  className="add-tracking-input-box"
                  placeholder="Expected returns in %"
                  value={form.interestRate}
                  onChange={(e) => handleChange("interestRate", e.target.value)}
                />
              </>
            )}
          </>
        )}

        <div className="tracking-button-container">
          <button type="submit" className="add-tracking-button-form">
            Add New Tag
          </button>
          <button
            type="button"
            onClick={onRequestClosed}
            className="close-tracking-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
