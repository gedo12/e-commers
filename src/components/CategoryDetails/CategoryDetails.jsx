import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Discuss } from 'react-loader-spinner';

export default function CategoryDetails() {
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  let {id} = useParams()
  async function getCategoryDetails(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    setDetails(data.data)
    setLoading(false)
  }
  useEffect(()=>{
    getCategoryDetails(id)
  },[])
  return <>
  <div className="container">
  {loading? 
     <div className="row justify-content-center aline-item-center vh-100">
     <Discuss
 visible={true}
 height="80"
 width="80"
 ariaLabel="discuss-loading"
 wrapperStyle={{}}
 wrapperClass="discuss-wrapper"
 color="#fff"
 backgroundColor="#F4442E"
 />
 </div> : <div className="row align-items-center flex-column">
  <div className="col-md-12">
    <div className="img bg-light mt-5 p-5 shadow-lg d-flex align-items-center ">
      <img src={details.image} className='w-25' alt="" />
      <div className='text'>
      <h4 className='ms-5'>{details.name}</h4>
      <h5 className='ms-5'>Sub Categories:</h5>
      </div>
    </div>
    
  </div>
</div>}
  </div>

  </>
}
