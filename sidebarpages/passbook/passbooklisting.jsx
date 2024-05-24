import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import MyCard from "../../components/pastpaymentcard";

import "./passbooklisting.css";

const PassbookListing = () => {
  let array = [
    {
      name: "Food",
      tag: "Ice cream",
      amount: 35,
      date: "2021-12-12",
      type: "Credit",
    },
  ];

  return (
    <>
      <div className="passbookpage-body">
        <Card className="add-payment">
          <Box className="add-payment-content" p={2}>
            <Typography variant="h5">Passbook</Typography>
            <Button variant="contained" color="primary">
              Add A Payment
            </Button>
          </Box>
        </Card>

        <hr className="horizontal-line" />
        <h2>Payments</h2>
        <MyCard />
      </div>
    </>
  );
};

export default PassbookListing;
