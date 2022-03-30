import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import {useEffect, useState} from 'react'
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import { updateProductsStart, updateProductSuccess, updateProductFailure, getProductSuccess } from "../../redux/product";
export default function Product() {
    const dispatch = useDispatch()
    const id = useLocation().pathname.split('/')[2]
    const product = useSelector(state => state.product.products.find(product => product._id === id));
    console.log(product)
    
    
    const [user, setUser] = useState(
        {
            ...product,
            title:product.title,
            description:product.description,
            price:product.price,
            inStock:product.inStock
        }
    )

    const changeHandler = (e) =>{
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleUpdate =async (e) => {
        e.preventDefault()
        dispatch(updateProductsStart())
        try{
            const res = await axios.put(`http://localhost:3001/api/products/${id}`, user, {
                headers:{
                    token:JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token
                }
            });
            console.log(res)
            dispatch(updateProductSuccess({id, user}))

        }catch(err){
            console.log(err);
            dispatch(updateProductFailure)
        }
        
    }
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">price:</span>
                      <span className="productInfoValue">${product.price}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock ? 'Yes' : 'No'}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" placeholder={product.title} onChange={changeHandler} value={user.title} name='title'/>
                  <label>Product Description</label>
                  <input type="text" placeholder={product.description} onChange={changeHandler} value={user.description} name='description'/>
                  <label>Price</label>
                  <input type="text" placeholder={product.price} onChange={changeHandler} value={user.price} name='price'/>
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton" onClick={handleUpdate}>Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
