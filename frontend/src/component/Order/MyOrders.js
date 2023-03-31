import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { order} = useSelector((state) => state.orderDetails);
  const [intervalId, setIntervalId] = useState(null);

  const whatsAppPhoneNumber = "9871265216";

  const sendOrderDetailsToWhatsApp = (orderId) => {
    const order = orders.find((item) => item._id === orderId);
    let orderDetails = `Order Id: ${order._id}%0A%0A`;
    orderDetails += `Delivery Address%0A`;
    orderDetails += `Name: ${order.user.name}%0A`;
    orderDetails += `Phone: ${order.shippingInfo.phoneNo}%0A`;
    orderDetails += `Address: ${order.shippingInfo.address}, ${order.shippingInfo.state}, ${order.shippingInfo.country}%0A%0A`;
    orderDetails += `Payment%0A`;
    orderDetails += `Status: ${order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}%0A`;
    orderDetails += `Amount: ₹${order.totalPrice.toFixed(2)}%0A%0A`;
    orderDetails += `Order Status%0A`;
    orderDetails += `Status: ${order.orderStatus}%0A%0A`;
    orderDetails += `Order Items%0A`;
    orderDetails += order.orderItems.map((item) => `${item.name}: ${item.quantity} X ₹${item.price} = ₹${item.price * item.quantity}%0A`).join("");
    orderDetails += `FOR USER: If you have used coupon code for discount, pay us that amount only.%0A`;
  
    const url = `https://wa.me/${whatsAppPhoneNumber}?text=${orderDetails}`;
    window.open(url);
  }

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "actions",
      flex: 1,
      headerName: "Actions",
      minWidth: 300,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <WhatsAppIcon onClick={() => sendOrderDetailsToWhatsApp(params.getValue(params.id, "id"))} style={{ marginRight: '5px', cursor: 'pointer', color:"green" }} />
            <span onClick={() => sendOrderDetailsToWhatsApp(params.getValue(params.id, "id"))} style={{ cursor: "pointer" }}>Send order details on WhatsApp</span>
          </div>
        );
      },      
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }
      dispatch(myOrders());
    
      const id = setInterval(() => {
        dispatch(myOrders());
      }, 5000); // poll every 5 seconds
    
      setIntervalId(id);
    
      return () => clearInterval(intervalId); // stop polling when the component unmounts
    }, []); // empty dependency array ensures this only runs once on mount     

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
            responsive
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
