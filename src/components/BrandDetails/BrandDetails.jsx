import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Discuss } from 'react-loader-spinner';

export default function BrandDetails() {
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  let {id} = useParams()
  async function getBrandDetails(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    setDetails(data.data)
    setLoading(false)
  }
  useEffect(()=>{
    getBrandDetails(id)
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
 </div> : <div className="row align-items-center">
  <div className="col-md-12">
    <div className="img bg-light mt-5 p-5 shadow-lg d-flex align-items-center ">
      <img src={details.image} className='w-25' alt="" />
      <h4 className='ms-5'>{details.name}</h4>
    </div>
  </div>
</div>}
  </div>
    
  </>
}
