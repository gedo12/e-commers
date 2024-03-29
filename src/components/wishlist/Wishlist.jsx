import { useContext } from "react"
import { wishlistContext } from "../../context/wishlistContext"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { cartContext } from "../../context/cartContext";


export default function Wishlist() {
  const { addProductToCart } = useContext(cartContext);
  

  const {wishlistProducts , numOfWishlistItems , removeWishItem ,setWishlistStatus } = useContext(wishlistContext)

    async function removeItemFromWish(id){

       const res =  await removeWishItem(id)

       console.log(res);

        if(res.status === "success"){
          setWishlistStatus(prevStatus =>({...prevStatus,[id]:false}))
        toast.success("Deleted from Wishlist", {
position: "top-right",
autoClose: 4000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
      }
      else{
         toast.error("error happened" , {
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
       
      console.log(wishlistProducts);
    console.log(numOfWishlistItems);
    }
    
    

     if(wishlistProducts=== null){

     return <div className='container px-3 py-5'>

        <h2>Wishlist </h2>

        <Link className='text-success' to={'/products'}>press to Add some to wishlist </Link>
      </div>

  }

  if(wishlistProducts.length === 0){

    return <>
    <Helmet>
      <title>Wishlist</title>
    </Helmet>

      <div className='container px-3 py-5'>

        <h2>Wishlist </h2>

        <Link className='text-success' to={'/products'}>press to Add some to wishlist </Link>
      </div>
    
    
    </>

  }
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




  return <>
  <Helmet>
      <title>Wishlist</title>
    <link rel="apple-touch-icon" href="../src/images/apple-touch-icon.png" />
        <link rel="icon" href="../src/images/favicon.ico" />


    </Helmet>
  <div className="container">
    <div className="row">
        {wishlistProducts.map(( wish , index )=>
        {
            console.log(wish);
            
            return <div key={index} className="col-lg-12 py-3 border-bottom">
            <div className="inner d-flex justify-content-between align-items-center">
                <img style={{width:"100px"}}  src={wish.imageCover} alt="" />
                <div className="d-flex align-items-center">
                    <p className="fw-bold m-0">{wish.title}</p>
                    <button onClick={()=>{removeItemFromWish(wish.id)}} className="ms-2 btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                    <button onClick={()=>{addProduct(wish.id)}} className="ms-2 btn btn-success">Add To Cart</button>
                </div>
            </div>
        </div>})}
    </div>
  </div>
  
  
  
  </>
  
}
