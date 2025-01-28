import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../../store/paymentArraySlice";
import "./addpayment.css";

export default function AddPayment({ closePopup }) {
  const dispatch = useDispatch();
  const paymentTypeEnum = ["paid", "received"];
  const tagArray = useSelector((state) => state.tagArray.value);
  const loanArray = useSelector((state) => state.loanArray.value);

  const [combinedArray, setCombinedArray] = useState([
    ...tagArray.map((tag) => ({ ...tag, type: "tag" })),
    ...loanArray.map((loan) => ({ ...loan, type: "loan" })),
  ]);

  const [form, setForm] = useState({
    id: combinedArray.length > 0 ? combinedArray[0]._id : "",
    idType: combinedArray.length > 0 ? combinedArray[0].type : "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paymentType: paymentTypeEnum[0],
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

    if (paymentType === "paid") {
      filteredArray = filteredArray.filter(
        (tag) =>
          tag.tagType === "expense" ||
          tag.tagType === "loan" ||
          tag.tagType === "emi" ||
          tag.tagType === "investment"
      );
    } else if (paymentType === "received") {
      filteredArray = filteredArray.filter(
        (tag) => tag.tagType === "income" || tag.tagType === "investment"
      );
    } else {
      setError("Please select a payment type.");
    }

    setCombinedArray(filteredArray);

    if (filteredArray.length > 0) {
      handleChange("id", filteredArray[0]._id);
      handleChange("idType", filteredArray[0].type);
    } else {
      setError(
        "No matching tags found for the selected payment type. Please add a tag or loan."
      );
    }
  };

  const handleAddPayment = (event) => {
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
    dispatch(addPayment(paymentData));
    closePopup(); // Close the modal after adding the payment
    setForm({
      id: "",
      idType: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      paymentType: paymentTypeEnum[0],
    });
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

  return (
    <div className="add-payment-container" ref={formRef}>
      <form onSubmit={handleAddPayment}>
        <div className="add-payment-header">Add New Payment</div>
        <label className="add-payment-label">Payment Type</label>
        <select
          name="paymentType"
          className="add-payment-input-box"
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
            <label className="add-payment-label">Tag</label>
            <select
              name="id"
              className="add-payment-input-box"
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

            <label className="add-payment-label">Amount</label>
            <input
              type="text"
              name="amount"
              className="add-payment-input-box"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />

            <label className="add-payment-label">Date</label>
            <input
              type="date"
              name="date"
              className="add-payment-input-box"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />

            {error && <div className="add-payment-error">{error}</div>}

            <div className="payment-button-container">
              <button type="submit" className="add-payment-button">
                Add Payment
              </button>
              <button
                type="button"
                onClick={closePopup}
                className="close-payment-button"
              >
                Close
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
