import React from "react"
import TagObject from "./TagObject"
import AddTagButton from "./addtagbutton"
import "./tag.css"
import { useSelector } from "react-redux"
import IndividualLoan from "./individualloan"

function TagBody() {
  const tagArray = useSelector((state) => state.tagArray.value)
  const loanArray = useSelector((state) => state.loanArray.value)
  

  return (
    <div className="tagbody">
      <AddTagButton />
      {tagArray && tagArray.length > 0 ? (
        tagArray.map((tagObject) => (
          <TagObject key={tagObject._id} tagObject={tagObject} />
        ))
      ) : (
        <></>
      )}
      {loanArray && loanArray.length > 0 ? (
        loanArray.map((loanObject) => (
          <IndividualLoan key={loanObject._id} loanObject={loanObject} />
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

export default TagBody;
