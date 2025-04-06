import React, { useState, useRef, useEffect } from "react";
import "./editpayment.css";
import EditPayment from "./editpayment";
import "./paymentupdatedelete.css";
import { deletePayment } from "../../store/paymentArraySlice"; 
import { useDispatch

 } from "react-redux";
export default function PaymentUpdateDelete({ closePopup, payment }) {
  const [editMode, setEditMode] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closePopup();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup]);

  const handleUpdate = () => {
    setEditMode(true);
  };

  const dispatch = useDispatch();

  const handleDelete = async () => {
      dispatch(deletePayment(payment._id));
  };

  if (editMode) {
    return <EditPayment closePopup={closePopup} payment={payment} />;
  }

  return (
    <div className="update-payment-container" ref={containerRef}>
      <div className="update-options">
        <button className="update-button" onClick={handleUpdate}>Update</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
