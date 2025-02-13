export function processGraphData({
  tagArray,
  loanArray,
  paymentArray,
  startdate,
  enddate,
  graphType,
}) {
  startdate = new Date(startdate);
  enddate = new Date(enddate);

  paymentArray = paymentArray.filter((payment) => {
    const paymentdate = new Date(payment.date);
    return paymentdate >= startdate && paymentdate <= enddate;
  });

  const paid = paymentArray.filter((payment) => payment.paymentType === "paid");
  const received = paymentArray.filter(
    (payment) => payment.paymentType === "received"
  );

  const idandamount = [
    ...tagArray.map((tag) => ({
      name: tag.name,
      id: tag?._id,
      amount: 0,
      color: tag.color,
    })),
    ...loanArray.map((loan) => ({
      name: loan.name,
      id: loan?._id,
      amount: 0,
      color: loan.color,
    })),
  ];

  const paidBins = idandamount.map((tag) => tag.amount);
  const receivedBins = idandamount.map((tag) => tag.amount);

  paid.forEach((payment) => {
    const index = idandamount.findIndex(
      (item) =>
        item.id === payment.tagid?._id || item.id === payment.loanid?._id
    );
    if (index !== -1) {
      paidBins[index] += payment.amount;
    }
  });

  received.forEach((payment) => {
    const index = idandamount.findIndex(
      (item) =>
        item.id === payment.tagid?._id || item.id === payment.loanid?._id
    );
    if (index !== -1) {
      receivedBins[index] += payment.amount;
    }
  });

  const filteredPaid = idandamount.filter((item, index) => paidBins[index] > 0);
  const filteredReceived = idandamount.filter(
    (item, index) => receivedBins[index] > 0
  );

  const labelsPaid = filteredPaid.map((item) => item.name);
  const labelsReceived = filteredReceived.map((item) => item.name);

  const dataPaid = filteredPaid.map(
    (item, index) => paidBins[idandamount.indexOf(item)]
  );
  const dataReceived = filteredReceived.map(
    (item, index) => receivedBins[idandamount.indexOf(item)]
  );

  const colorsPaid = filteredPaid.map((item) => item.color);
  const colorsReceived = filteredReceived.map((item) => item.color);

  return {
    labelsPaid,
    dataPaid,
    colorsPaid,
    labelsReceived,
    dataReceived,
    colorsReceived,
  };
}
