import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import "./passbooklisting.css";

const PassbookListing = () => {
  let array = [
    {
      "name": "Food",
      "tag": "Ice cream",
      "amount": 35,
      "date": "2021-12-12",
      "type" : "Credit"
    }  
  ]

  return (
    <>
      <Card className='add-payment'>
        <Box className='add-payment-content' p={2}>
          <Typography variant="h5">Passbook</Typography>
          <Button variant="contained" color="primary">Add A Payment</Button>
        </Box>
      </Card>

      <hr className='horizontal-line'/>

      <h2>Upcoming Payments</h2>

      <div className='past-payment'>
        <div className='past-payment-content'>
          <div className='past-payment-left'>
            <div className='past-payment-left-text'>
              <p className="past-payment-amount">Credited or Debited: $2000</p>
              <p className='past-payment-date'>on 69/69/2069</p>
            </div>
            <div className='past-payment-left-tag'>
              Tag = Salary
            </div>
          </div>
          <div className="past-payment-right">
            <MoreVertIcon />
          </div>
        </div>
      </div>
      
      
    </>
    
    
  );
}

export default PassbookListing;