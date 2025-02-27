import { toast } from "react-toastify";
import {
  addTag,
  updateTag,
  deleteTag,
  getTagArray,
  addTarget,
  updateTarget,
  getLoanArray,
  addLoan,
  deleteLoan,
  updateLoan,
  getPaymentArray,
  addPayment,
  deletePayment,
  updatePayment,
} from "./index";

const toastMiddleware = (storeAPI) => (next) => (action) => {
  if (
    addTag.pending.match(action) ||
    updateTag.pending.match(action) ||
    deleteTag.pending.match(action) ||
    addTarget.pending.match(action) ||
    updateTarget.pending.match(action)
  ) {
    const promise = new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        const state = storeAPI.getState();
        if (
          state.tagArray.status === "success" ||
          state.tagArray.status === "failed"
        ) {
          clearInterval(interval);
          if (state.tagArray.status === "success") {
            resolve(state.messages.successMessage);
          } else {
            reject(state.messages);
          }
        }
      }, 100);
    });

    toast.promise(promise, {
      //console the message;
      pending: "Pending...",
      success: {
        render: (message) => {
          return message.data;
        },
      },
      error: {
        render: (message) => {
          console.log(message.data);
          return (
            message.data.errorMessage + " ERROR:" + message.data.errorStatus
          );
        },
      },
    });
  }
  return next(action);
};

export default toastMiddleware;
