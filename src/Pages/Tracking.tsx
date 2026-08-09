import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useGetArticleNewByTemplateQuery } from '../Apis/articleNewApi';
import { BreadCrumbs } from '../Components/Page/BreadCrumbs';
import { MainLoader } from '../Components/Page/MainLoader';
import { useLazyGetTrackingResultQuery } from '../Apis/orderApi';
import { OrderHeaderModel } from '../Interface';
import { formatDate, inputHelper } from '../Helper';
import { TrackingIndicator } from '../Components/Page/TrackingIndicator';
import { SD_Status } from '../Utility/SD';
 type PageProps={
        page_template:string;
    };
export const Tracking = ({page_template}:PageProps) => {
   const dispatch=useDispatch();
   const [userInput,setUserInput]=useState(
         {
           orderId:"",
           emailId:""
         }
       ); 
   const [trackingResult, setTrackingResult] =
  useState<OrderHeaderModel | null>(null);
const[postback,setPostback]=useState(false);
     const[loading,setLoading]=useState(false);
        const [error,setError]=useState("");
   const {data:article_data,isLoading:article_loading,error:article_error}=useGetArticleNewByTemplateQuery(page_template);
   const [getTrackingResult, { data:tracking_data, isLoading:tracking_loading, error:tracking_error }] = useLazyGetTrackingResultQuery();
   
    const handleUserInput=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
        const tempData=inputHelper(e,userInput);
        setUserInput(tempData);
    }
   const handleTracking =async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
       setLoading(true);
      if(!handleValidation())
      {
        return;
      }
      const trackResult=await getTrackingResult({orderId:userInput.orderId,emailId:userInput.emailId}).unwrap();
      setTrackingResult(trackResult?.result);
      setPostback(true);
       setLoading(false);
     
   }
  
  const rfvOrderId= useRef<HTMLParagraphElement | null>(null); 
  const rfvEmailId= useRef<HTMLParagraphElement | null>(null);  

   const handleValidation=()=>{
    var isValid=true;
      if (userInput.orderId === '') {
          if(rfvOrderId.current) {
              rfvOrderId.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvOrderId.current) {
              rfvOrderId.current.style.display = 'none'; 
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
      return isValid;
    };

   if(article_loading || tracking_loading)
   {
    return <MainLoader/>
   }


  return (
    <>
    <BreadCrumbs article={article_data?.result}/>
  {/*================Tracking Box Area =================*/}
  <section className="tracking_box_area section_gap">
    <div className="container">
      <div className="tracking_box_inner">
        <p>
          To track your order please enter your Order ID in the box below and
          press the "Track" button. This was given to you on your receipt and in
          the confirmation email you should have received.
        </p>
        <form
          className="row tracking_form"
          method="post"
          onSubmit={handleTracking}
        >
          <div className="col-md-12 form-group">
            <input
              type="text"
              className="form-control"
              name="orderId"
              placeholder="Order ID"
               onChange={handleUserInput}
                    value={userInput.orderId}
            />
             <p ref={rfvOrderId}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Order Id Required</p>
          </div>
          <div className="col-md-12 form-group">
            <input
              type="text"
              className="form-control"
              name="emailId"
              placeholder="Billing Email Address"
              onChange={handleUserInput}
              value={userInput.emailId}
            />
            <p ref={rfvEmailId}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Email Id Required</p>
          </div>
          <div className="col-md-12 form-group">
            <button type="submit" value="submit" className="primary-btn">
              Track Order
            </button>
          </div>
        </form>
        
        {/* Order Result Section */}
        {(postback==true)
        ?
          (trackingResult!=null)
          ?
          (
            <>
            {
              (trackingResult.orderStatus!=SD_Status.StatusCancelled)
              ?
              (<TrackingIndicator orderStatus={trackingResult.orderStatus}/>)
              :
              ""
            }
              
              <div className="order-result-container">
              <div className="order-card">
                <div className="order-header">
                  <h3>Order Details</h3>
                  <span className="order-status status-processing">{trackingResult.orderStatus}</span>
                </div>
                <div className="order-body">
                  <div className="order-row">
                    <span className="label">Request ID:</span>
                    <span className="value">{trackingResult.id}</span>
                  </div>
                  <div className="order-row">
                    <span className="label">Order Date:</span>
                    <span className="value">{formatDate(trackingResult.orderDate)}</span>
                  </div>
                  <div className="order-row">
                    <span className="label">Billing Email:</span>
                    <span className="value">{trackingResult.email}</span>
                  </div>
                  <div className="order-row">
                    <span className="label">Current Status:</span>
                    <span className="value highlight">{trackingResult.orderStatus}</span>
                  </div>
                </div>
              </div>
            </div>
            </>
          )
          :
          (
            <div className="order-result-container">
              <h3>No result found</h3>
            </div>
          )
        :
        ""
      }
        

      </div>
    </div>
  </section>
  {/*================End Tracking Box Area =================*/}
</>

  )
}
