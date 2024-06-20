import React, { useState } from "react";
import "./passbookbody.css";
import AddPayment from "./addpayment";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PastPaymentCard from "./pastpaymentcard";
import { getPaymentArray } from "../../store/paymentArraySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PassbookBody = () => {
  const [showAddPayment, setShowAddPayment] = useState(false);
  const dispatch = useDispatch();
  const paymentArray = useSelector((state) => state.paymentArray.value);
  useEffect(() => {
    dispatch(getPaymentArray());
  }, [dispatch]);
  return (
    <div className="passbookpage-body">
      <Card className="add-payment">
        <Box className="add-payment-content" p={2}>
          <Typography variant="h5">Passbook</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAddPayment(true)}
          >
            Add A Payment
          </Button>
          {showAddPayment && (
            <AddPayment closePopup={() => setShowAddPayment(false)} />
          )}
        </Box>
      </Card>
      <hr className="horizontal-line" />
      <h2>Payments</h2>
      {paymentArray.map((payment) => (
        <PastPaymentCard key={payment._id} payment={payment} />
      ))}
    </div>
  );
};

export default PassbookBody;
