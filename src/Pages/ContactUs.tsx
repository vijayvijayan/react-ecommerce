import React, { useRef, useState } from "react";
import { BreadCrumbs } from "../Components/Page/BreadCrumbs";
import { useGetArticleNewByTemplateQuery } from "../Apis/articleNewApi";
import { MainLoader } from "../Components/Page/MainLoader";
import { useNavigate } from "react-router-dom";
import { useCreateContactMutation } from "../Apis/contactApi";
import { inputHelper, toastNotify } from "../Helper";
import apiResponse from "../Interface/apiResponse";

type PageProps = {
  page_template: string;
};
export const ContactUs = ({page_template}:PageProps) => {
    const {data:article_data,isLoading:article_loading,error:article_error}=useGetArticleNewByTemplateQuery(page_template);
    const[loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const[contactInsert]=useCreateContactMutation();
    const [userInput,setUserInput]=useState(
      {
        cName:"",
        cEmail:"",
        cSubject:"",
        cMessage:""
      }
    ); 

    
    const handleUserInput =(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>)=>{
      const tempData=inputHelper(e,userInput);
      setUserInput(tempData);
    }

    const rfvName= useRef<HTMLParagraphElement | null>(null);  
    const rfvEmail= useRef<HTMLParagraphElement | null>(null); 
    const rfvSubject= useRef<HTMLParagraphElement | null>(null); 
    const rfvImage= useRef<HTMLParagraphElement | null>(null); 
    const rfvMessage= useRef<HTMLParagraphElement | null>(null); 

    const handleValidation=()=>{

      var isValid=true;
      if (userInput.cName === '') {
          if(rfvName.current) {
              rfvName.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvName.current) {
              rfvName.current.style.display = 'none'; 
            }
         
      }

      if (userInput.cEmail === '') {
          if(rfvEmail.current) {
              rfvEmail.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvEmail.current) {
              rfvEmail.current.style.display = 'none'; 
            }
      }

      if (userInput.cSubject === '') {
          if(rfvSubject.current) {
              rfvSubject.current.style.display = 'block'; 
            }
          
          isValid=false;
      }
      else
      {
         if(rfvSubject.current) {
              rfvSubject.current.style.display = 'none'; 
            }
      }

      
      if (userInput.cMessage === '') {
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
    }

    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        
        if(!handleValidation())
        {
           return;
        }
        setLoading(true); 
            const formData = new FormData();
            formData.append('Name',userInput.cName);
            formData.append('Email',userInput.cEmail);
            formData.append('Subject',userInput.cSubject);
            formData.append('Message',userInput.cMessage);
            
            const response: apiResponse = await contactInsert(formData); 
             if(response.data?.isSuccess)
              {
                  toastNotify("Submitted Successfully!","error");
                  navigate("/thankyou");
              }
              else if(response.error){
              
              setError(response.error.data.errorMessages[0]);
              }
              setLoading(false);
    }

    if(article_loading)
     {
        return <MainLoader/>
     }
  return (
    <>
     <BreadCrumbs article={article_data?.result}/>
      <section className="contact_area section_gap_bottom">
        <div className="container">
          <div className="row" style={{marginBottom:"100px",marginTop:"80px"}}>
            <div className="col-lg-3">
              <div className="contact_info">
                <div className="info_item">
                  <i className="lnr lnr-home"></i>
                  <h6>California, United States</h6>
                  <p>Santa monica bullevard</p>
                </div>

                <div className="info_item">
                  <i className="lnr lnr-phone-handset"></i>
                  <h6>
                    <a href="#">00 (440) 9865 562</a>
                  </h6>
                  <p>Mon to Fri 9am to 6 pm</p>
                </div>

                <div className="info_item">
                  <i className="lnr lnr-envelope"></i>
                  <h6>
                    <a href="#">support@colorlib.com</a>
                  </h6>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <form className="row contact_form" method="post" onSubmit={handleSubmit} id="contactForm" noValidate encType="multipart/form-data">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="cName"
                      value={userInput.cName}
                      onChange={handleUserInput}
                      placeholder="Enter your name"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Enter your name")}
                    />
                    <p ref={rfvName}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Name Required</p>
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      name="cEmail"
                value={userInput.cEmail}
                onChange={handleUserInput}
                      placeholder="Enter email address"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) =>
                        (e.target.placeholder = "Enter email address")
                      }
                    />
                    <p ref={rfvEmail}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Email Required</p>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="cSubject" 
                      onChange={handleUserInput}
                      value={userInput.cSubject}
                      placeholder="Enter Subject"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Enter Subject")}
                    />
                    <p ref={rfvSubject}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Subject Required</p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="cMessage"
                value={userInput.cMessage}
                onChange={handleUserInput}
                      rows={1}
                      placeholder="Enter Message"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Enter Message")}
                    ></textarea>
                    <p ref={rfvMessage}  className="text-danger" style={{display:"none",marginBottom:"0px"}}>Message Required</p>
                  </div>
                </div>

                <div className="col-md-12 text-right">
                  <button type="submit" value="submit" className="primary-btn">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
