import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePayment } from "../../store/paymentArraySlice";
import "./editpayment.css";
import { deletePayment } from "../../store/paymentArraySlice"; 

export default function EditPayment({ closePopup, payment }) {
  console.log(payment);
  // const dispatch = useDispatch();
  const tagArray = useSelector((state) => state.tagArray.value);
  const loanArray = useSelector((state) => state.loanArray.value);
  const paymentTypeEnum = ["paid", "received"];

  const [combinedArray, setCombinedArray] = useState([
    ...tagArray.map((tag) => ({ ...tag, type: "tag" })),
    ...loanArray.map((loan) => ({ ...loan, type: "loan" })),
  ]);

  const initialId = payment?.tagid?._id || payment?.loanid?._id || "";
  const initialIdType = payment?.tagid ? "tag" : payment?.loanid ? "loan" : "";

  const [form, setForm] = useState({
    _id: payment?._id, // Ensure _id is included in the form state
    id: initialId,
    idType: initialIdType,
    amount: String(payment.amount),
    date: new Date(payment.date).toISOString().split("T")[0],
    paymentType: payment.paymentType,
  });

  const [error, setError] = useState("");
  const [paymentTypeSelected, setPaymentTypeSelected] = useState(false);

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const tagTypefilter = (paymentType) => {
    let filteredArray = [
      ...tagArray.map((tag) => ({ ...tag, type: "tag" })),
      ...loanArray.map((loan) => ({ ...loan, type: "loan" })),
    ];

    if (paymentType === "credit") {
      filteredArray = filteredArray.filter(
        (tag) => tag.tagType === "income" || tag.tagType === "investment"
      );
    } else if (paymentType === "debit") {
      filteredArray = filteredArray.filter(
        (tag) =>
          tag.tagType === "loan" ||
          tag.tagType === "expense" ||
          tag.tagType === "investment" ||
          tag.tagType === "emi"
      );
    } else {
      setError("Please select a payment type.");
    }

    setCombinedArray(filteredArray);

    if (filteredArray.length > 0) {
      handleChange("id", filteredArray[0]._id);
      handleChange("idType", filteredArray[0].type);
    } else {
      setError("No matching ids found for the selected payment type.");
    }
  };

  const handleUpdatePayment = (event) => {
    event.preventDefault();
    if (!form.id) {
      setError("Please select either a tag or a loan.");
      return;
    }
    if (form.amount === "") {
      setError("Please enter an amount.");
      return;
    }
    const paymentData = {
      ...form,
      tagid: form.idType === "tag" ? form.id : "",
      loanid: form.idType === "loan" ? form.id : "",
    };
    setError("");
    dispatch(updatePayment(paymentData));
    closePopup(); // Close the modal after updating the payment
  };

  useEffect(() => {
    setPaymentTypeSelected(false); // Reset payment type selection when modal is opened
  }, []);

  useEffect(() => {
    if (form.paymentType) {
      setPaymentTypeSelected(true);
    }
  }, [form.paymentType]);

  const formRef = useRef(null);

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

  const dispatch = useDispatch();

  const handleDelete = async () => {
      dispatch(deletePayment(payment._id));
  };


  return (
    <div className="edit-payment-container" ref={formRef}>
      <form onSubmit={handleUpdatePayment}>
        <div className="edit-payment-header">
        <h2>Edit Payment</h2>
        <button
                type="button"
                onClick={closePopup}
                className="close-payment-button"
              >
                Close
        </button>
        </div>
        <label className="edit-payment-label">Payment Type</label>
        <select
          name="paymentType"
          className="edit-payment-input-box"
          value={form.paymentType}
          onChange={(e) => {
            handleChange("paymentType", e.target.value);
            tagTypefilter(e.target.value);
          }}
        >
          {paymentTypeEnum.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {paymentTypeSelected && (
          <>
            <label className="edit-payment-label">Tag</label>
            <select
              name="id"
              className="edit-payment-input-box"
              value={form.id}
              onChange={(e) => {
                const selectedIndex = e.target.selectedIndex;
                handleChange("id", e.target.value);
                handleChange("idType", combinedArray[selectedIndex].type);
              }}
            >
              {combinedArray.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <label className="edit-payment-label">Amount</label>
            <input
              type="text"
              name="amount"
              className="edit-payment-input-box"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />

            <label className="edit-payment-label">Date</label>
            <input
              type="date"
              name="date"
              className="edit-payment-input-box"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
              onClick={(e) => e.target.showPicker && e.target.showPicker()} 
            />

            {error && <div className="edit-payment-error">{error}</div>}

            <div className="payment-button-container">
              <button type="submit" className="edit-payment-button">
                Update Payment
              </button>
              <button className="delete-payment-button" onClick={handleDelete}>Delete</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
