import axios from "axios";
import { useEffect, useState } from "react";
import "./widgetLg.css";
import {format} from 'timeago.js';

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
 
  const fetchOrders = async () => {
    try{
      const res = await axios.get('http://localhost:3001/api/orders',{
        headers:{
          token:JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token
        },
      })
      setOrders(res.data);
      
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    fetchOrders();

    
  },[])
  // console.log(orders);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {
          orders.map((order, index) => (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <img
                  src='https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok='
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgName">{order.userName}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}
