import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetshopProductByIdQuery, useGetShopProductRatingByProductIdQuery, useShopProductRatingInsertMutation } from '../Apis/shopProductApi';
import { MainLoader } from '../Components/Page/MainLoader';
import { shopProductModel } from '../Interface/shopProductModel';
import { useGetPhotoGalleryByIdQuery } from '../Apis/photoGalleryApi';
import { useParams } from 'react-router-dom';
import { SD_Url } from '../Utility/SD';
import { photoGalleryModel } from '../Interface/photoGalleryModel';
import { setShopProduct } from '../Storage/Redux/shopProductSlice';
import { setPhotogallery } from '../Storage/Redux/photoGallerySlice';
import { BreadCrumbs } from '../Components/Page/BreadCrumbs';
import { useGetArticleNewByMenuIdQuery, useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { setArticleNew } from '../Storage/Redux/articleNewSlice';
import { setShoppingCart } from '../Storage/Redux/shoppingCartSlice';
import { count } from 'console';
import { shoppingCartModel, ShopProductRatingRequestDTO } from '../Interface';
// import { RootState } from '@reduxjs/toolkit/query';
import { RootState } from '../Storage/Redux/store';
import { inputHelper, toastNotify } from '../Helper';
import apiResponse from '../Interface/apiResponse';

type PageProps = {
  page_template: string;
};
export const ProductDetails = ({page_template}:PageProps) => {
   const dispatch = useDispatch();
  
  const { shopProductId } = useParams<{ shopProductId: string }>();
  const productId = Number(shopProductId);
const [shopProductRatingInsert]=useShopProductRatingInsertMutation();
  const {data:article_data,isLoading:article_loading}=useGetArticleNewByTemplateQuery(page_template);

  const { data: product_data, isLoading: product_loading } =
  useGetshopProductByIdQuery(productId);

const { data: photogallery_data, isLoading: photogallery_loading } =
  useGetPhotoGalleryByIdQuery({
    galleryTypeId: productId,
    galleryType: "shopproduct",
  });


// ================= Photo Gallery =================

const photoGalleryList: photoGalleryModel[] = useMemo(() => {
  const productImage = product_data?.result?.productImage;

  const galleryImages = photogallery_data?.result ?? [];

  // No images available
  if (!productImage && galleryImages.length === 0) {
    return [];
  }

  // Product main image
  const productImageObject: photoGalleryModel = {
    id: 0,
    title: "",
    image: productImage,
  };

  // Product image + gallery images
  return [
    ...(productImage ? [productImageObject] : []),
    ...galleryImages,
  ];
}, [product_data, photogallery_data]);

const { data: productRating_data, isLoading: productRating_loading } = useGetShopProductRatingByProductIdQuery(productId);
  

    const [overAllRating,setOverAllRating]=useState(0);
  const [productRating,setProductRating]=useState(0);  
  const unSelectedProductRating= 5-productRating;

  const handleProductRating=(val:number)=>{
    setProductRating(val);
    userInput.rating=val;
  }
   const [userInput,setUserInput]=useState(
        {
          fullName:"",
          rating:0,
          emailId:"",
          phoneNumber:"",
          message:""
        }
      ); 

     const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        const tempData=inputHelper(e,userInput);
        setUserInput(tempData);
    }
const handleSubmit=async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(!handleValidation())
      {
        return;
      }
        setLoading(true);
        
        const response:apiResponse=await shopProductRatingInsert({  
          shopProductId: productId,
          senderName: userInput.fullName,
          rating:productRating,
          emailId: userInput.emailId,
          phoneNumber: userInput.phoneNumber,
          message: userInput.message,
          createdDate: "2026-02-13T10:12:23.977Z"
        })

        if(response.data)
        {
            toastNotify("Submitted Successfully.");
           
        }
        else if(response.error){
        
        setError(response.error.data.errorMessages[0]);
        }
        setLoading(false);
    }
     const rfvFullname= useRef<HTMLParagraphElement | null>(null); 
     const rfvRating= useRef<HTMLParagraphElement | null>(null); 
      const rfvEmailId= useRef<HTMLParagraphElement | null>(null); 
      const rfvPhoneNumber= useRef<HTMLParagraphElement | null>(null);
      const rfvMessage= useRef<HTMLParagraphElement | null>(null);

    const handleValidation=()=>{
    var isValid=true;
      if (userInput.fullName === '') {
          if(rfvFullname.current) {
              rfvFullname.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvFullname.current) {
              rfvFullname.current.style.display = 'none'; 
            }
      }

       if (userInput.rating === 0) {
          if(rfvRating.current) {
              rfvRating.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvRating.current) {
              rfvRating.current.style.display = 'none'; 
            }
      }

      if (userInput.emailId === '') {
          if(rfvEmailId.current) {
              rfvEmailId.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvEmailId.current) {
              rfvEmailId.current.style.display = 'none'; 
            }
      }
      if (userInput.phoneNumber === '') {
          if(rfvPhoneNumber.current) {
              rfvPhoneNumber.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvPhoneNumber.current) {
              rfvPhoneNumber.current.style.display = 'none'; 
            }
      }
      if (userInput.message === '') {
          if(rfvMessage.current) {
              rfvMessage.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvMessage.current) {
              rfvMessage.current.style.display = 'none'; 
            }
      }
      return isValid;
    };

  const[loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const product: shopProductModel | undefined =
    product_data?.result?.[0];

  /* ================= Redux Sync ================= */

  useEffect(() => {
      if (productRating_data?.result?.length) {

    const total = productRating_data.result.reduce(
      (sum: number, item: ShopProductRatingRequestDTO) =>
        sum + item.rating,
      0
    );

    setOverAllRating(
      total / productRating_data.result.length
    );
  }
    // if (product_data) dispatch(setShopProduct(product_data));
    // if (photogallery_data) dispatch(setPhotogallery(photogallery_data));
    // if(article_data) dispatch(setArticleNew(article_data));

  }, [product_data,article_data,productRating_data, dispatch]);

//  useEffect(() => {
//   const $ = (window as any).$;
//   if (!$) return;

//   const $carousel = $(".s_Product_carousel");

//   if (!$carousel.length) return;

//   // Destroy if already initialized (StrictMode safe)
//   if ($carousel.hasClass("owl-loaded")) {
//     $carousel.trigger("destroy.owl.carousel");
//     $carousel.removeClass("owl-loaded");
//     $carousel.find(".owl-stage-outer").children().unwrap();
//   }

//   // Initialize AFTER DOM render
// $carousel.owlCarousel({
//   items: 1,
//   loop: true,
//   autoplay: true,
//   autoplayTimeout: 3000,
//   autoplayHoverPause: true,
//   nav: false,   // 👈 disable navigation
//   dots: false,  // optional
// });
// }, [photogallery_data]); // 👈 VERY IMPORTANT

// ================= Owl Carousel =================

useEffect(() => {
  const $ = (window as any).$;

  if (!$) return;

  const $carousel = $(".s_Product_carousel");

  if (!$carousel.length) return;

  // Destroy previous carousel
  if ($carousel.hasClass("owl-loaded")) {
    $carousel.trigger("destroy.owl.carousel");
  }

  // Initialize
  $carousel.owlCarousel({
    items: 1,
    loop: photoGalleryList.length > 1,
    autoplay: photoGalleryList.length > 1,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: false,
    dots: false,
  });

  // Cleanup
  return () => {
    if ($carousel.hasClass("owl-loaded")) {
      $carousel.trigger("destroy.owl.carousel");
    }
  };
}, [photoGalleryList]);


const[productCount,setProductCount]= useState(1);

const handleProductCount=(typ:any)=>{
      if(typ==="in")
      {
        const maxProductCount=product_data?.result?.productQuantity;
         if (maxProductCount == null) return;
        if(productCount<maxProductCount)
        setProductCount(productCount+1);
      }
      else if(typ==="de")
      {
        if(productCount>1)
        setProductCount(productCount-1);
      }
};



const handleCart = () => {
  dispatch(setShoppingCart({
    productId,
    count: productCount
  }));
  toastNotify("Product added to cart");
};



// useEffect(() => {
//   console.log("Updated cart:", shoppingCartFromStore);
// }, [shoppingCartFromStore]);



  /* ================= Loader ================= */
  if (product_loading || photogallery_loading || article_loading || productRating_loading) {
    return <MainLoader />;
  }
  // else
  // {
  //   console.log(photoGalleryList);
  // }
  
  return (
    <>
        
      {/* Start Banner Area */}
<BreadCrumbs article={article_data?.result}/>
{/* End Banner Area */}
    {/* ================= Single Product Area ================= */}
<div className="product_image_area">
  <div className="container">
    <div className="row s_product_inner">
      {/* <div className="col-lg-6">
        <div className="s_Product_carousel">
          {
              photogallery_data!=null && photogallery_data.result.length>0 && photogallery_data.result.map((item:photoGalleryModel)=>(
              <div className="single-prd-item">
                <img className="img-fluid" src={SD_Url.FileUploadPath+item.image} alt="" />
              </div>
          )
          )}
        </div>
      </div> */}
<div className="col-lg-6">
  <div className="s_Product_carousel">
    {photoGalleryList.map((item: photoGalleryModel) => (
      <div className="single-prd-item" key={item.id}>
        <img
          className="img-fluid"
          src={SD_Url.FileUploadPath + item.image}
          alt={item.title || "Product Image"}
        />
      </div>
    ))}
  </div>
</div>
      <div className="col-lg-5 offset-lg-1">
        <div className="s_product_text">
          <h3>{product_data.result.productName}</h3>
          <h2>${product_data.result.productSellingPrice?.toFixed(2)}</h2>

          <ul className="list">
            <li>
              <a className="active" href="#">
                <span>Category</span> : {product_data.result.shopSubCategory.shopSubCategoryName}
              </a>
            </li>
            <li>
              <a href="#">
                <span>Availibility</span> : {product_data.result.productQuantity>0?"In Stock":"Out of Stock"} 
              </a>
            </li>
          </ul>

          <p>
            {product_data.result.propertyShortDescription}
          </p>

          <div className="product_count">
            <label htmlFor="qty">Quantity:</label>
            <input
            readOnly
              type="text"
              name="qty"
              id="sst"
              maxLength={12}
              defaultValue={1}
              value={productCount}
              title="Quantity:"
              className="input-text qty"
            />
             <button className="increase items-count" onClick={()=>handleProductCount("in")} type="button">
              <i className="lnr lnr-chevron-up"></i>
            </button>
            <button className="reduced items-count" onClick={()=>handleProductCount("de")} type="button">
              <i className="lnr lnr-chevron-down"></i>
            </button> 
              
          </div>

          <div className="card_area d-flex align-items-center">
            <a className="primary-btn" href="#" onClick={()=>handleCart()}>
              Add to Cart
            </a>
            {/* <a className="icon_btn" href="#">
              <i className="lnr lnr-diamond"></i>
            </a>
            <a className="icon_btn" href="#">
              <i className="lnr lnr-heart"></i>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* ================= End Single Product Area ================= */}
{/* ================= Product Description Area ================= */}
<section className="product_description_area">
  <div className="container">
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link"
          id="home-tab"
          data-toggle="tab"
          href="#home"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Description
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="profile-tab"
          data-toggle="tab"
          href="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Specification
        </a>
      </li>
    
      <li className="nav-item">
        <a
          className="nav-link active"
          id="review-tab"
          data-toggle="tab"
          href="#review"
          role="tab"
          aria-controls="review"
          aria-selected="false"
        >
          Reviews
        </a>
      </li>
    </ul>

    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      dangerouslySetInnerHTML={{
    __html: product_data.result.propertyDescription??""
  }}>
       
      </div>

      <div
        className="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <tr><td><h5>Width</h5></td><td><h5>{product_data.result.productWidth} mm</h5></td></tr>
              <tr><td><h5>Height</h5></td><td><h5>{product_data.result.productHeight} mm</h5></td></tr>
              <tr><td><h5>Depth</h5></td><td><h5>{product_data.result.productDepth} mm</h5></td></tr>
              <tr><td><h5>Weight</h5></td><td><h5>{product_data.result.productweight} gm</h5></td></tr>
              <tr><td><h5>Quality checking</h5></td><td><h5>{product_data.result.productQualityChecking?"True":"False"}</h5></td></tr>
              <tr><td><h5>Freshness Duration</h5></td><td><h5>{product_data.result.productFreshnessDuration} days</h5></td></tr>
              <tr><td><h5>When packeting</h5></td><td><h5>{product_data.result.productWhenpacketing}</h5></td></tr>
              <tr><td><h5>Each Box contains</h5></td><td><h5>{product_data.result.productEachBoxContains} pcs</h5></td></tr>
            </tbody>
          </table>
        </div>
      </div>

     

     <div
  className="tab-pane fade show active"
  id="review"
  role="tabpanel"
  aria-labelledby="review-tab"
>
  <div className="row">
    <div className="col-lg-6">
      <div className="row total_rate">
        <div className="col-6">
          <div className="box_total">
            <h5>Overall</h5>
            <h4>{overAllRating.toFixed(1)}</h4>
            <h6>({productRating_data?.result?.length} Reviews)</h6>
          </div>
        </div>
        <div className="col-6">
          <div className="rating_list">
            <h3>Based on {productRating_data?.result?.length} Reviews</h3>
            <ul className="list">
              <li>
                <a href="#">
                  5 Star <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" /> 01
                </a>
              </li>
              <li>
                <a href="#">
                  4 Star <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" /> 01
                </a>
              </li>
              <li>
                <a href="#">
                  3 Star <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" /> 01
                </a>
              </li>
              <li>
                <a href="#">
                  2 Star <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" /> 01
                </a>
              </li>
              <li>
                <a href="#">
                  1 Star <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" /> 01
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="review_list">
{productRating_data!=null && productRating_data?.result?.map((item:ShopProductRatingRequestDTO)=>(
<div className="review_item">
          <div className="media">
            <div className="d-flex">
              <img src="/img/blog/user.png" alt="" />
            </div>
            <div className="media-body">
              <h4>{item.senderName}</h4>
              {
                Array.from({ length: item.rating??0 }).map((_,index:number)=>(
                <i className="fa fa-star checked" />
                )
                )
              }
            </div>
          </div>
          <p>
            {item.message}
          </p>
        </div>
)
)}
        

      </div>
    </div>
    <div className="col-lg-6">
      <div className="review_box">
        <h4>Add a Review</h4>
       
        <form noValidate
          className="row contact_form"
          onSubmit={handleSubmit}
          method="post">
          <div className="col-md-12">
           <div className="form-group">
Your Rating: <ul className="list">
   
          {
           
            Array.from({ length: 5 }).map((_,index:number)=>(
              <li> 
                {
                  productRating>(index)?(
                    <i className="fa fa-star checked" onClick={()=>handleProductRating(index+1)} />
                  )
                  :(
                    <i className="fa fa-star" onClick={()=>handleProductRating(index+1)} />
                  )
                }
                  
              </li>
            )
            )
            
          }

         
         
        </ul>
        
        <p ref={rfvRating}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Select Rating</p>
           </div>
            <div className="form-group">
               <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    placeholder="Name"
                    onChange={handleUserInput}
                    value={userInput.fullName}
                  />
                <p ref={rfvFullname}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Full Name Required</p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
             <input
                  type="email"
                  className="form-control"
                  id="email"
                  name='emailId'
                  onChange={handleUserInput}
                  value={userInput.emailId}
                  placeholder="Enter email address"
                />
                <p ref={rfvEmailId}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Email Id Required</p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="phoneNumber"
                name='phoneNumber'
                placeholder="phone number"
                 onChange={handleUserInput}
                  value={userInput.phoneNumber}
              />
              <p ref={rfvPhoneNumber}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Phone Number Required</p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
             <textarea
                className="form-control mb-10"
                rows={5}
                name="message"
                placeholder="Message"
                 onChange={handleUserInput}
                  value={userInput.message}
              ></textarea>
              <p ref={rfvMessage}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Message Required</p>
            </div>
          </div>
          <div className="col-md-12 text-right">
            <button type="submit" value="submit" className="primary-btn">
              Submit Now
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>



    </div>
  </div>
</section>
{/* ================= End Product Description Area ================= */}




    </>
  )
}
