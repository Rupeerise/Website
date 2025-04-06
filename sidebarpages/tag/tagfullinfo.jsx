import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./tagfullinfo.css";
import PastPaymentCard from "../passbook/pastpaymentcard";
import ProgressBar from "../../boilerplates/progressbar";
import { useNavigate } from "react-router-dom";
import TagGraph from "../graph/taggraph";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import EditTagName from "./edittagname";
import EditTarget from "./edittarget";
import { deleteTag } from "../../store/tagArraySlice";

export default function TagFullInfo() {
  const { id } = useParams();
  const tagArray = useSelector((state) => state.tagArray.value);
  const paymentArray = useSelector((state) => state.paymentArray.value);
  const tag = tagArray.find((tag) => tag._id === id);
  const tagPayments = paymentArray.filter(
    (payment) => payment.tagid?._id === id
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
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editingTarget, setEditingTarget] = useState(false);
  const onClickEdit = () => {
    setEditing(true);
  };
  const closeEdit = () => {
    setEditing(false);
  };
  const onClickEditTarget = () => {
    setEditingTarget(true);
  };
  const closeEditTarget = () => {
    setEditingTarget(false);
  };
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTag(id));
    navigate("/tag");
  };

  return (
    <div className="tag-full-info">
      <div className="tag-full-info-title">
        <LabelOutlinedIcon id="tag-full-info-label-icon" />
        <h1 className="tag-full-info-name">{tag?.name}</h1>
      </div>

      <div className="tag-full-info-bar-top">
        <h2>Current: {current}</h2>
        <h2>Target: {target ? target.amount : 0}</h2>
      </div>
      <ProgressBar value={(current / (target ? target.amount : 1)) * 100} />
      <div className="tag-full-info-type">
        <h2>Tag Type: {tag?.tagType}</h2>
      </div>
      <div className="tag-full-info-edit" onClick={onClickEdit}>
        Edit
      </div>
      {editing && <EditTagName closeEdit={closeEdit} />}
      <div className="tag-full-info-edit" onClick={onClickEditTarget}>
        Edit Targets
      </div>
      <div className="tag-full-info-edit" onClick={handleDelete}>
        Delete
      </div>
      {editingTarget && <EditTarget closeEditTarget={closeEditTarget} />}
      <TagGraph id={id} />
      <div className="tag-full-info-payments">
        <h2 className="tag-full-info-payments-title">Past Payments</h2>
        {tagPayments.map((payment) => (
          <PastPaymentCard key={payment._id} payment={payment} />
        ))}
      </div>
    </div>
  );
}