import React from 'react'
import { useGetDealQuery } from '../../../Apis/dealApi';
import { MainLoader } from "../MainLoader";
import { dealProductModel } from '../../../Interface';
import { SD_Url } from '../../../Utility/SD';
export const RelatedProductSection = () => {
  const{data:deal_data,isLoading:deal_loading}=useGetDealQuery(3);
  if(deal_loading)
  {
    return <MainLoader/>
  }
  return (
     <>
    {
      deal_data!=null && deal_data?.result?.length>0 
      ?
      (
<section className="related-product-area section_gap_bottom">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-6 text-center">
        <div className="section-title">
          <h1>Deals of the Week</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-9">
        <div className="row">

         

         { 
           deal_data!=null && deal_data?.result?.length>0 && deal_data.result.map((item:dealProductModel,index:number)=>(
             <div className="col-lg-4 col-md-4 col-sm-6 mb-20" key={index}>
            <div className="single-related-product d-flex">
              <a href="#">
                <img style={{width:"70px"}} src={SD_Url.FileUploadPath+item.shopProduct?.productImage} alt="" />
              </a>
              <div className="desc">
                <a href="#" className="title">{item.shopProduct?.productName}</a>
                <div className="price">
                  <h6>${item.shopProduct?.productSellingPrice}</h6>
                  <h6 className="l-through">${item.shopProduct?.productPrice}</h6>
                </div>
              </div>
            </div>
          </div>
           )
           )
         }

         

        </div>
      </div>

      <div className="col-lg-3">
        <div className="ctg-right">
          <a href="#" target="_blank" rel="noreferrer">
            <img
              className="img-fluid d-block mx-auto"
              src="img/category/c5.jpg"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
      )
      :
      ""
    }
    
    </>


  )
}
