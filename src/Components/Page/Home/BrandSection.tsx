import React from 'react'
import { useGetBrandsQuery } from '../../../Apis/brandApi'
import { MainLoader } from '../MainLoader';
import { brandModel } from '../../../Interface';
import { SD_Url } from '../../../Utility/SD';

export const BrandSection = () => {
  const{data:brand_data,isLoading:brand_loading,error:brand_error}=useGetBrandsQuery(null);
  if(brand_loading)
  {
      <MainLoader/>
  }
  else
  {
    console.log(brand_data);
  }
  return (
<section className="brand-area section_gap" style={{paddingTop:"0px"}}>
  <div className="container">
    <div className="row">
      {
        brand_data!=null && brand_data.result!=null && brand_data.result.length>0 && brand_data.result.map((item:brandModel,index:number)=>(
          <a className="col single-img" href="#" key={index}>
            <img className="img-fluid d-block mx-auto" src={SD_Url.FileUploadPath+item.brandImage} alt=""/>
          </a>
        ))
      }
    </div>
  </div>
</section>

  )
}
