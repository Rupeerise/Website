import React from 'react';
import "./passbooklisting.css";

export default function Passbooklisting(){

  let array = [
    {
      "name": "Food",
      "tag": "Ice cream",
      "amount": 35,
      "date": "2021-12-12"
    }  
  ]

  return (
    <>
      <div className="card">
        {array.map((item, index) => (
          <div key={index} className="card">
            <h2 className='card-name'>{item.name}</h2>
            <p className='card-tag'>{item.tag}</p>
            <p className='card-date'>{item.date}</p>
            <p className='card-amount'>{item.amount}</p>
          </div>
        ))}
      </div>
    </>
  )
}
