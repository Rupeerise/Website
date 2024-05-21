import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./pastpaymentcard.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SellIcon from '@mui/icons-material/Sell';
import { Button } from '@mui/material';

const MyCard = () => {
  return (
    <Card className='past-payment'>
      <Box display="flex">
        <Box className='past-payment-left' p={1} flexBasis="95%">
          <CardContent className='past-payment-details'>
            <p className='past-payment-amount'>Credited: 69$</p>
            <p className='past-payment-date'>
              on 69/69/6969
            </p>
          </CardContent>
          <CardContent className='past-payment-tag'>
            <SellIcon className='sell-icon' />
            <p className='past-payment-tag-name'>Salary</p>
          </CardContent>
        </Box>
        <Box className='past-payment-right' p={2} flexBasis="5%">
          <CardContent>
            <Button><MoreVertIcon className='past-payment-morevert'/></Button>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
}

export default MyCard;