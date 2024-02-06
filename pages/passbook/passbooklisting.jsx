import React from "react";
import "./passbooklisting.css";

function Passbooklisting({ payment }) {
  console.log(payment);
  const date = new Date(payment.date);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  let id = payment._id;
  const handleDelete = async () => {
    let backendUrl = import.meta.env.VITE_TEST_BACKEND;
    // Perform delete operation here
    try {
      const response = await fetch(backendUrl + `/deletepayment/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        //refresh
        window.location.reload();
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="passbook-listings">
      <div className="passbook-listings-amount">{payment.amount}</div>
      <div>
        <div className="passbook-listings-name">{payment.trackingid.name}</div>
        <div className="passbook-listings-date">{formattedDate}</div>
        <div
          onClick={handleDelete}
          style={{
            cursor: "pointer",
            padding: "10px",
            width: "100px",
            backgroundColor: "red",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default Passbooklisting;
