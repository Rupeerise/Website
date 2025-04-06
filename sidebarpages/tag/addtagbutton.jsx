import React, { useState } from "react"
import "./addbutton.css"
import AddTag from "./addtag"

function AddTagButton() {
  const [showPopup, setShowPopup] = useState(false)

  const handleClick = () => {
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <div className="add-tag-button-container">
      <div className="add-tag-title">Tags</div>
      <div onClick={handleClick} className="add-tag-button">
        Add Tag
      </div>
      {showPopup && (
        <div className={`tag-popup ${showPopup ? "" : "hide"}`}>
          <AddTag closePopup={closePopup} />
        </div>
      )}
    </div>
  )
}

export default AddTagButton;
