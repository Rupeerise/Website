import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./tagfullinfo.css";
import PastPaymentCard from "../passbook/pastpaymentcard";
import ProgressBar from "../../boilerplates/progressbar";
import { useNavigate } from "react-router-dom";
import TagGraph from "../graph/taggraph";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import EditTagName from "./edittagname";
import EditTarget from "./edittarget";

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
  const current = tagpaycurr.reduce((acc, payment) => acc + payment.amount, 0);
  console.log(current);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editingTarget, setEditingTarget] = useState(false);
  const onClickEdit = () => {
    setEditing(true);
    // navigate(`/tag/edit/${id}`);
  };
  const closeEdit = () => {
    setEditing(false);
    // console.log("closeEdit");
  };
  const onClickEditTarget = () => {
    setEditingTarget(true);
    // navigate(`/tag/edittarget/${id}`);
  };
  const closeEditTarget = () => {
    setEditingTarget(false);
    // console.log("closeEditTarget");
  };

  return (
    <div className="tag-full">
      <div className="tag-full-title">
        <LabelOutlinedIcon id="tag-full-label-icon" />
        <h1 className="tag-full-name">{tag?.name}</h1>
      </div>

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
      {editing && <EditTagName closeEdit={closeEdit} />}
      <div className="tag-full-edit" onClick={onClickEditTarget}>
        Edit Targets
      </div>
      {editingTarget && <EditTarget closeEditTarget={closeEditTarget} />}
      <TagGraph id={id} />
      <div className="tag-full-payments">
        <h2 className="tag-full-payments-title">Past Payments</h2>
        {tagPayments.map((payment) => (
          <PastPaymentCard key={payment._id} payment={payment} />
        ))}
      </div>
    </div>
  );
}
