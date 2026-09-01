import React, { useRef, useState } from 'react'
import { useCreateSubscribeMutation } from '../../Apis/subscribeApi';
import apiResponse from '../../Interface/apiResponse';
import { toastNotify } from '../../Helper';
import { useGetMenuQuery } from '../../Apis/menuApi';
import { MainLoader } from '../Page/MainLoader';
import { menuModel } from '../../Interface';
import { Link } from 'react-router-dom';

export const Footer = () => {
  interface subscribeModel {
  email: string;
}
  const subscribeItem: subscribeModel = {
    email: '',
  };
const [subscribeInputs, setSubscribeInputs]=useState(subscribeItem);
  const[createSubscribe]=useCreateSubscribeMutation();
   const [isProcessing,setIsProcessing]=useState(false);
   const rfvSubscription= useRef<HTMLSpanElement | null>(null);
    const rfvSubscriptionEmailIdExpression= useRef<HTMLSpanElement | null>(null);
    const{data:menu_data,isLoading:menu_loading,error:menu_error}=useGetMenuQuery(null);
    const footer_menu=menu_data!=null && menu_data.result.length>0 ? menu_data.result.filter((i:menuModel)=>i.showInFooter==true):null;

    const handleSubscribeInput = (
         e: React.ChangeEvent<
           HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
         >
       ) => {
         const { name, value } = e.target;
         setSubscribeInputs((prevState) => ({
           ...prevState,
           [name]: value, // Update the specific field based on its name
         }));
       };

        const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                var isValid=true;
                if (subscribeInputs.email === '') {
                  if (rfvSubscription.current) {
                    rfvSubscription.current.className = ''; 
                    rfvSubscription.current.className = 'validation-message'; // Show the error message
                    rfvSubscription.current.style.display = 'block'; 
                    rfvSubscription.current.innerHTML="Enter Email Id";
                    }
                   
                    isValid=false;
                  } 
                else {
                    if (rfvSubscription.current) {
                      rfvSubscription.current.style.display = 'none'; // Hide the error message
                      if(subscribeInputs.email.match('@'))
                      {
                          if (rfvSubscriptionEmailIdExpression.current) 
                            rfvSubscriptionEmailIdExpression.current.style.display = 'none'; 
                      }
                      else
                      {
                          if (rfvSubscriptionEmailIdExpression.current) 
                            rfvSubscriptionEmailIdExpression.current.style.display = 'block'; 
                         
                          isValid=false;
                      }
                    }
                }
                if(isValid==false)
                  {
                     return;
                  }
                
               //const formData = new FormData();
            
               //formData.append('EmailId', subscribeInputs.email); 
              
               try {
                   const response: apiResponse = await createSubscribe(
                    {
                      emailId:subscribeInputs.email
                    }
                  ); // Send the FormData
                   if (response) {
                       console.log(response.data?.isSuccess);
                       //if(response.data?.isSuccess))
                    if (response.data?.isSuccess == true)
                    {
                      if (rfvSubscription.current)
                      {
                        toastNotify("Subscribed Successfully!");
                        rfvSubscription.current.style.display = 'block'; 
                        rfvSubscription.current.className = ''; 
                        rfvSubscription.current.className = 'validation-message-success'; 
                        rfvSubscription.current.innerHTML="Subscribed Successfully";
                      }
                      
                    }
                    else
                    {
                        if (response.data?.statusCode == 302)
                        {
                          if (rfvSubscription.current)
                            {
                              toastNotify("Already Subscribed!","error");
                              rfvSubscription.current.style.display = 'block'; 
                              rfvSubscription.current.className = ''; 
                              rfvSubscription.current.className = 'validation-message'; 
                              rfvSubscription.current.innerHTML="Already Subscribed";
                            }
                        }
                        else
                        {
                          if (rfvSubscription.current)
                            {
                              toastNotify("Error Occurred!","error");
                              rfvSubscription.current.style.display = 'block'; 
                              rfvSubscription.current.className = ''; 
                              rfvSubscription.current.className = 'validation-message'; 
                              rfvSubscription.current.innerHTML="Error Occurred";
                            }
                        }
                    }
                    // navigate("/thankyou"); // Navigate after successful submission
                   }
                 } catch (error) {
                   console.error('Error during submission', error);
                 }
               setIsProcessing(false);
              }

      if(menu_loading)
      {
        return <MainLoader/>
      }
      else
      {
        // console.log(menu_data);
        if(footer_menu!=null)
        {
          console.log(footer_menu);
        }
      }

  return (
    <footer className="footer-area section_gap">
  <div className="container">
    <div className="row">

      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="single-footer-widget">
          <h6>About Us</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore dolore
            magna aliqua.
          </p>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="single-footer-widget">
          <h6>Newsletter</h6>
          <p>Stay update with our latest</p>

          <div id="mc_embed_signup">
            <form
              onSubmit={handleSubmit}
              method="post"
              className="form-inline"
              noValidate
            >
              <div className="d-flex flex-row">
                <input
                  className="form-control"
                  placeholder="Your email"
              name='email'
              onChange={handleSubscribeInput} 
              value={subscribeInputs.email}
                  type="text"
                />

                <button className="click-btn btn btn-default" type="submit">
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </button>

                
                {/* <div style={{ position: "absolute", left: "-5000px" }}>
                  <input
                    name="b_36c4fd991d266f23781ded980_aefe40901a"
                    tabIndex={-1}
                    value=""
                    type="text"
                    readOnly
                  />
                </div> */}
                
              </div>

              {/* <div className="info"></div> */}
              <span ref={rfvSubscription}   style={{display:"none"}}></span>
              <span ref={rfvSubscriptionEmailIdExpression} className="text-danger" style={{display:"none"}}>Invalid Email Id</span>
            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="single-footer-widget">
          <h6>Useful Links</h6>
          <ul className="footer-links">
            {
              footer_menu!=null && footer_menu.length>0 && footer_menu.map((item:menuModel)=>(
                <li><Link to={"/"+item.template}>{item.menuName}</Link></li>
              ))
            }
          </ul>
        </div>
      </div>

      <div className="col-lg-2 col-md-6 col-sm-6">
        <div className="single-footer-widget">
          <h6>Follow Us</h6>
          <p>Let us be social</p>
          <div className="footer-social d-flex align-items-center">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-dribbble"></i></a>
            <a href="#"><i className="fa fa-behance"></i></a>
          </div>
        </div>
      </div>

    </div>

    <div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
      <p className="footer-text m-0">
        Copyright © {new Date().getFullYear()} All rights reserved
      </p>
    </div>
  </div>
</footer>

  )
}
