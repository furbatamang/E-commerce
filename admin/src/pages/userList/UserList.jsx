import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserFailure, getUserSuccess, getUserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../../redux/user";
import { useDispatch, useSelector } from "react-redux";
export default function UserList() {
  const dispatch = useDispatch()
  const [data, setData] = useState(userRows);
  const users = useSelector(state => state.user.users);
  console.log(users)
  const fetchUsers = async () => {
    dispatch(getUserStart())
    try{
      const res = await axios.get('http://localhost:3001/api/users', {
        headers:{
          token:JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token
        }
      })
      dispatch(getUserSuccess(res.data))
      // console.log(res.data)
    }catch(err){
      console.log(err);
      dispatch(getUserFailure())
    }
  }
  const handleDelete = async (id) => {
    dispatch(deleteUserStart())
    try{
      const res = await axios.delete(`http://localhost:3001/api/users/${id}`,{
        headers:{
          token:JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token
        }
      });
      console.log(res)
      dispatch(deleteUserSuccess(id))
    }catch(err){
      console.log(err);
      dispatch(deleteUserFailure())
    }
  }
  
 useEffect(() => {
  fetchUsers();
  },[])
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img || 'https://media.istockphoto.com/illustrations/blank-man-profile-head-icon-placeholder-illustration-id1298261537?k=20&m=1298261537&s=612x612&w=0&h=8plXnK6Ur3LGqG9s-Xt2ZZfKk6bI0IbzDZrNH9tr9Ok='} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 220,
    },
   
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
