import axios from 'axios'
import React, { useContext } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import HomeSlider from '../homeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { cartContext } from '../../context/cartContext'
import {  toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { wishlistContext } from '../../context/wishlistContext'




export default function Products() {

  const { addProductToCart } = useContext(cartContext);
  const {addProductToWishlist , wishlistStatus,setWishlistStatus } = useContext(wishlistContext)
  
  
  async function addProduct(id){
   
    const res = await addProductToCart(id)
   if(res.status === "success"){
         toast.success(res.message , {
position: "top-right",
autoClose: 4000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
      }else{
         toast.error(res.message , {
position: "top-right",
autoClose: 3500,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
      }
      
  }

  async function addToWishlist(id){
    const res = await addProductToWishlist(id);
    
     if(res.status === "success"){
      setWishlistStatus(prevStatus => ({...prevStatus , [id]:true}))
         toast.success(res.message , {
position: "top-right",
autoClose: 4000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
      }else{
         toast.error(res.message , {
position: "top-right",
autoClose: 3500,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
      }
  }

  
  // using react query to get api

  function getAllProducts(){


    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

const {data , isLoading  } = useQuery("allProduct" , getAllProducts)





  if(isLoading){

    return  <div className='vh-100 d-flex justify-content-center align-items-center'>

  <ThreeDots
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />

  </div>

  }

  return <>
    <Helmet>
      <title>All products</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />

    </Helmet>
    <div  className='container py-5'>

    <div className="row g-0 mb-4">
      <div className="col-md-9 col-sm-12 mb-5">
        <HomeSlider />
      </div>

      <div className="col-md-3 col-sm-12">
        <img style={{ width : "100%" , height : "250px" }}  src={require('../../images/grocery-banner.png')} alt="" />
        <img style={{ width : "100%" , height : "250px" }} src={require('../../images/grocery-banner-2.jpeg')} alt="" />
      </div>

    </div>


   <CategorySlider />

    <div className="row g-4 mt-5">


      {data?.data.data.map((product , index) => {return <div key={index} className="col-md-4  col-lg-3 ">
        
            <div className="product position-relative">
              <Link to={`/productDetails/${product.id}`}>

          <img className='w-100'  src={product.imageCover} alt="product" />
          <h5 className='main-color'>{product.title.split(" ").slice(0,3).join(" ") }</h5>
          <h6>{product.category.name}</h6>
          <div className='d-flex justify-content-between align-items-center'>
            <p className='mb-0'>{product.price} EGP</p>
            <span>{product.ratingsAverage} <i className="fa-solid fa-star rateColor"></i></span> 
          </div>

              </Link>

              <button onClick={()=> addProduct(product.id)} className='mt-2   w-100 main-bg-color p-1 rounded-1 border-0 text-white'>+ ADD To Cart</button>
              <button style={{right:"20px" , backgroundColor:"transparent" , color: wishlistStatus[product.id]? "red" : "black"}} onClick={()=> addToWishlist(product.id)} className='mt-2   p-1 rounded-1 border-0  position-absolute top-0 '><i class="fa-solid fa-heart"></i></button>

             </div>
        
      </div> })}


    </div>
  </div> 
</>
}
