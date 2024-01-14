import React from "react"
import "./footer.css"

export default function footer(){
  return(
    <div className="footer">
      <div className="container">
        <div className="row">
          {/* column 1 */}
          <div className="column">
            <h4>RupeeRise</h4>
            <ul className="list">
              <li>4206969</li>
              <li>Mumbai, India</li>
              <li>221B, Baker Street</li>
            </ul>
          </div>
          <div className="column">
            <h4>Something</h4>
            <ul className="list">
              <li>Memes</li>
              <li>Co-Founder</li>
              <li>CEO</li>
            </ul>
          </div>
          <div className="column">
            <h4>Something</h4>
            <ul className="list">
              <li>Memes</li>
              <li>Co-Founder</li>
              <li>CEO</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} RupeeRise | All Rights Reserved | Terms of Service
          </p>
        </div>
      </div>
    </div>
  )
}