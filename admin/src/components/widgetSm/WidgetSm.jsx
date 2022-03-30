import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try{
      const res = await axios.get('http://localhost:3001/api/users/?new=true',{
        headers:{
          token :JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token,
        }
      });
      setUsers(res.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUsers() 
  },[]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          users.map((user, index) => (
          <li className="widgetSmListItem" key={index}>
            <img
              src={user.img || 'https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok='}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
          ))
        }
        
       
      </ul>
    </div>
  );
}
