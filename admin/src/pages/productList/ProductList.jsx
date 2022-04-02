import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import {getProductStart, getProductSuccess, getProductFailure, deleteProductStart, deleteProductFailure, deleteProductSuccess} from '../../redux/product';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {useEffect} from 'react';

export default function ProductList() {

  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products)
  
  const getProducts = async () => {
    dispatch(getProductStart());
    try{
      console.log('product list called')
      const res = await axios.get('http://localhost:3001/api/products');
      
      dispatch(getProductSuccess(res.data))
    }catch(err){
      console.log(err)
      dispatch(getProductFailure())
    }
  }

  
  useEffect(() => {
    
    getProducts()
  },[dispatch])
  const handleDelete = async (id) => {
      dispatch(deleteProductStart());
      try{
        const res = await axios.delete(`http://localhost:3001/api/products/${id}`,{
          headers:{
            token:JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token
          }
        })
        dispatch(deleteProductSuccess(id))
      }catch(err){
        console.log(err);
        dispatch(deleteProductFailure())
      }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
