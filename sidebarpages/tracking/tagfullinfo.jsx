import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./tagfullinfo.css";
import PastPaymentCard from "../passbook/pastpaymentcard";
import ProgressBar from "../../boilerplates/progressbar";
import { useNavigate } from "react-router-dom";

export default function Tagfullinfo() {
  const { id } = useParams();
  const tagArray = useSelector((state) => state.tagArray.value);
  const paymentArray = useSelector((state) => state.paymentArray.value);
  const tag = tagArray.find((tag) => tag._id === id);
  const tagPayments = paymentArray.filter(
    (payment) => payment.tagid._id === id
  );

  const targets = tag?.targets || [];
  const thismonth = new Date().getMonth();
  const thisyear = new Date().getFullYear();
  const target = targets.find(
    (target) => target.month === thismonth && target.year === thisyear
  );
  const tagpaycurr = tagPayments.filter(
    (payment) =>
      new Date(payment.date).getMonth() === thismonth &&
      new Date(payment.date).getFullYear() === thisyear
  );
  const current = tagpaycurr.reduce((acc, payment) => {
    if (payment.paymentType === "credit") {
      return acc + payment.amount;
    } else {
      return acc - payment.amount;
    }
  }, 0);
  const navigate = useNavigate();
  const onClickEdit = () => {
    navigate(`/tag/edit/${id}`);
  };

  return (
    <div className="tag-full">
      <h1 className="tag-full-name">{tag?.name}</h1>

      <div className="tag-full-bar-top">
        <h2>Current: {current}</h2>
        <h2>Target: {target ? target.amount : 0}</h2>
      </div>
      <ProgressBar value={(current / (target ? target.amount : 1)) * 100} />
      <div className="tag-full-type">
        <h2>Tag Type: {tag?.tagType}</h2>
      </div>
      <div className="tag-full-edit" onClick={onClickEdit}>
        Edit
      </div>
      <div>
        {tagPayments.map((payment) => (
          <PastPaymentCard key={payment._id} payment={payment} />
        ))}
      </div>
    </div>
  );
}
