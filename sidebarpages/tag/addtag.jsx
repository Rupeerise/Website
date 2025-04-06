import React, { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { addTag } from "../../store/tagArraySlice"
import { addLoan } from "../../store/loanArraySlice"
import { HexColorPicker } from "react-colorful"
import "./addtag.css"

function AddTag({ closePopup }) {
  const [form, setForm] = useState({
    name: "",
    target: "",
    tagType: "income",
    amount: "",
    interestRate: "",
    color: "#7C11E7",
  })

  const dispatch = useDispatch()
  const formRef = useRef(null)

  const TagTypeEnum = ["income", "expense", "emi", "loan", "investment"]

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }))
  }

  const handleAddNewTag = (event) => {
    event.preventDefault()
    if (["loan", "emi", "investment"].includes(form.tagType)) {
      dispatch(addLoan(form))
    } else {
      dispatch(addTag(form))
    }
    onRequestClosed()
  }

  const onRequestClosed = () => {
    setForm({
      name: "",
      target: "",
      tagType: "income",
      amount: "",
      interestRate: "",
      color: "#7C11E7",
    })
    closePopup()
  }

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      closePopup()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="add-tag-container" ref={formRef}>
      <form onSubmit={handleAddNewTag}>
        <div className="add-tag-header">Add New Tag</div>

        <select
          name="tagType"
          className="add-tag-input-box"
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
            className="add-tag-color-input"
          />
        </div>

        <input
          type="text"
          name="name"
          className="add-tag-input-box"
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        {["income", "expense"].includes(form.tagType) && (
          <input
            type="text"
            name="target"
            className="add-tag-input-box"
            placeholder="Target"
            value={form.target}
            onChange={(e) => handleChange("target", e.target.value)}
          />
        )}

        {["emi", "loan", "investment"].includes(form.tagType) && (
          <>
            <input
              type="text"
              name="amount"
              className="add-tag-input-box"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
            <input
              type="text"
              name="interestRate"
              className="add-tag-input-box"
              placeholder={
                form.tagType === "investment"
                  ? "Expected returns in %"
                  : "Interest Rate in %"
              }
              value={form.interestRate}
              onChange={(e) => handleChange("interestRate", e.target.value)}
            />
          </>
        )}

        <div className="tag-button-container">
          <button type="submit" className="add-tag-button-form">
            Add New Tag
          </button>
          <button
            type="button"
            onClick={onRequestClosed}
            className="close-tag-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTag;
