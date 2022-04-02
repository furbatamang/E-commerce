import "./newProduct.css";
import {useState, useEffect} from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addProductSuccess } from "../../redux/product";
import { useDispatch } from "react-redux";
import app from "../../firebase";
import axios from "axios";
export default function NewProduct() {
  const dispatch = useDispatch()
  const [products, setProducts] = useState({})
  const [data, setData] = useState({
    title:'',
    description:'',
    price:0,
    stock:'yes',
  })
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null)
  const [size, setSize] = useState('S')
  const changeHandler = (e) => {
    const {name, value} = e.target;
    setData({ 
      ...data,
      [name]: value
    }) 
  }

  const handleCat = (e) => {
    setCategories(e.target.value.split(','))
  }
  const handleSize = (e) => {
    setSize(e.target.value.split(','))
  }
  const postProduct = async (product) => {
    try{
      const res = await axios.post('http://localhost:3001/api/products',product,{
        headers:{
          token:JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.token
        }
      })
      console.log('response',res)
    }catch(err){
      console.log(err)
    }
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...data,categories,img:downloadURL,size};
          dispatch(addProductSuccess(product))
          
          // setProducts(product)
          console.log(product)
          postProduct(product)
        });
      }
    );

    
  }
  
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" onSubmit={submitHandler}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input name="title" type="text" placeholder="Eg: Apple Airpods" value={data.name} onChange={changeHandler}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="description" type="text" placeholder="Eg: Desctipiton" value={data.description} onChange={changeHandler}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="Eg: 1000" value={data.price} onChange={changeHandler}/>
        </div>
        <div className="addProductItem" onChange={handleCat}>
          <label>Categories</label>
          <input type="text" placeholder="Eg: Winter, Women" />
        </div>
        <div className="addProductItem" onChange={handleSize}>
          <label>Size</label>
          <input type="text" placeholder="Eg: XL, M, XS" />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="stock" id="active" value={data.stock} onChange={changeHandler}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton" >Create</button>
      </form>
    </div>
  );
}
