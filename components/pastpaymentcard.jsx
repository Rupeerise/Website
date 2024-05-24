import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import "./pastpaymentcard.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SellIcon from "@mui/icons-material/Sell";
import { Button } from "@mui/material";

const MyCard = () => {
  return (
    <Card className="past-payment">
      <Box className="past-payment-left">
        <CardContent className="past-payment-details">
          <p className="past-payment-amount">Credited: 49$</p>
          <p className="past-payment-date">on 4/12/3003</p>
        </CardContent>
        <CardContent className="past-payment-tag">
          <SellIcon className="sell-icon" />
          <p className="past-payment-tag-name">Salary</p>
        </CardContent>
      </Box>
      <Box className="past-payment-right">
        <Button>
          <MoreVertIcon className="past-payment-morevert" />
        </Button>
      </Box>
    </Card>
  );
};

export default MyCard;
